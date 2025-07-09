import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database(join(__dirname, 'database.sqlite'));

// Initialize database
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Modules table
  db.run(`CREATE TABLE IF NOT EXISTS modules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    xp_reward INTEGER DEFAULT 100,
    order_index INTEGER DEFAULT 0
  )`);

  // Lessons table
  db.run(`CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    module_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT,
    xp_reward INTEGER DEFAULT 25,
    order_index INTEGER DEFAULT 0,
    FOREIGN KEY (module_id) REFERENCES modules (id)
  )`);

  // User progress table
  db.run(`CREATE TABLE IF NOT EXISTS user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    module_id INTEGER,
    lesson_id INTEGER,
    completed BOOLEAN DEFAULT FALSE,
    completed_at DATETIME,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (module_id) REFERENCES modules (id),
    FOREIGN KEY (lesson_id) REFERENCES lessons (id)
  )`);

  // Badges table
  db.run(`CREATE TABLE IF NOT EXISTS badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    criteria TEXT,
    xp_requirement INTEGER DEFAULT 0
  )`);

  // User badges table
  db.run(`CREATE TABLE IF NOT EXISTS user_badges (
    user_id INTEGER NOT NULL,
    badge_id INTEGER NOT NULL,
    earned BOOLEAN DEFAULT FALSE,
    earned_at DATETIME,
    PRIMARY KEY (user_id, badge_id),
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (badge_id) REFERENCES badges (id)
  )`);

  // Insert initial data
  db.get("SELECT COUNT(*) as count FROM modules", (err, row) => {
    if (row.count === 0) {
      // Insert modules
      const modules = [
        { title: "Introduction to Canva for Education", description: "Learn the basics of Canva for Education", xp_reward: 150, order_index: 1 },
        { title: "Creating Your First Design", description: "Create engaging presentations and materials", xp_reward: 200, order_index: 2 },
        { title: "Interactive Educational Materials", description: "Design quizzes and interactive content", xp_reward: 250, order_index: 3 }
      ];

      modules.forEach(module => {
        db.run("INSERT INTO modules (title, description, xp_reward, order_index) VALUES (?, ?, ?, ?)",
          [module.title, module.description, module.xp_reward, module.order_index]);
      });

      // Insert lessons
      setTimeout(() => {
        const lessons = [
          { module_id: 1, title: "What is Canva for Education?", content: "Canva for Education is a free design platform...", xp_reward: 50, order_index: 1 },
          { module_id: 1, title: "Creating Your Account", content: "Setting up your educator account...", xp_reward: 25, order_index: 2 },
          { module_id: 1, title: "Navigating the Interface", content: "Understanding the Canva interface...", xp_reward: 75, order_index: 3 },
          { module_id: 2, title: "Creating a Presentation", content: "Building your first presentation...", xp_reward: 100, order_index: 1 },
          { module_id: 2, title: "Working with Images", content: "Adding and editing images...", xp_reward: 100, order_index: 2 },
          { module_id: 3, title: "Creating Interactive Quizzes", content: "Build engaging quizzes...", xp_reward: 125, order_index: 1 },
          { module_id: 3, title: "Designing Worksheets", content: "Create educational worksheets...", xp_reward: 125, order_index: 2 }
        ];

        lessons.forEach(lesson => {
          db.run("INSERT INTO lessons (module_id, title, content, xp_reward, order_index) VALUES (?, ?, ?, ?, ?)",
            [lesson.module_id, lesson.title, lesson.content, lesson.xp_reward, lesson.order_index]);
        });
      }, 100);

      // Insert badges
      const badges = [
        { name: "Getting Started", description: "Complete your first lesson", icon: "star", criteria: "complete_first_lesson", xp_requirement: 0 },
        { name: "Module Master", description: "Complete your first module", icon: "trophy", criteria: "complete_first_module", xp_requirement: 0 },
        { name: "Design Novice", description: "Earn 500 XP", icon: "paintbrush", criteria: "earn_xp", xp_requirement: 500 },
        { name: "Tech Explorer", description: "Complete all modules", icon: "compass", criteria: "complete_all_modules", xp_requirement: 0 }
      ];

      badges.forEach(badge => {
        db.run("INSERT INTO badges (name, description, icon, criteria, xp_requirement) VALUES (?, ?, ?, ?, ?)",
          [badge.name, badge.description, badge.icon, badge.criteria, badge.xp_requirement]);
      });
    }
  });
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }

    if (!user) {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Could not create user' });
        }

        const token = jwt.sign({ userId: this.lastID, username }, JWT_SECRET);
        res.json({ token, user: { id: this.lastID, username, xp: 0, level: 1 } });
      });
    } else {
      // Verify existing user
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);
      res.json({ token, user: { id: user.id, username: user.username, xp: user.xp, level: user.level } });
    }
  });
});

// User routes
app.get('/api/user/:id', authenticateToken, (req, res) => {
  const userId = req.params.id;
  
  db.get("SELECT id, username, xp, level, created_at FROM users WHERE id = ?", [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(user);
  });
});

app.get('/api/user/:id/progress', authenticateToken, (req, res) => {
  const userId = req.params.id;
  
  db.all(`SELECT up.*, m.title as module_title, l.title as lesson_title 
          FROM user_progress up 
          LEFT JOIN modules m ON up.module_id = m.id 
          LEFT JOIN lessons l ON up.lesson_id = l.id 
          WHERE up.user_id = ?`, [userId], (err, progress) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(progress);
  });
});

app.post('/api/user/:id/progress', authenticateToken, (req, res) => {
  const userId = req.params.id;
  const { moduleId, lessonId, completed } = req.body;
  
  if (completed) {
    db.run("INSERT OR REPLACE INTO user_progress (user_id, module_id, lesson_id, completed, completed_at) VALUES (?, ?, ?, ?, ?)",
      [userId, moduleId, lessonId, true, new Date().toISOString()], function(err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        
        // Award XP
        db.get("SELECT xp_reward FROM lessons WHERE id = ?", [lessonId], (err, lesson) => {
          if (lesson) {
            db.run("UPDATE users SET xp = xp + ? WHERE id = ?", [lesson.xp_reward, userId], (err) => {
              if (!err) {
                // Update level based on XP
                db.run("UPDATE users SET level = CASE WHEN xp >= 1000 THEN 4 WHEN xp >= 600 THEN 3 WHEN xp >= 200 THEN 2 ELSE 1 END WHERE id = ?", [userId]);
              }
            });
          }
        });
        
        res.json({ success: true });
      });
  }
});

app.get('/api/user/:id/badges', authenticateToken, (req, res) => {
  const userId = req.params.id;
  
  db.all(`SELECT b.*, ub.earned, ub.earned_at 
          FROM badges b 
          LEFT JOIN user_badges ub ON b.id = ub.badge_id AND ub.user_id = ?`, [userId], (err, badges) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(badges);
  });
});

// Module routes
app.get('/api/modules', (req, res) => {
  db.all("SELECT * FROM modules ORDER BY order_index", (err, modules) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(modules);
  });
});

app.get('/api/modules/:id', (req, res) => {
  const moduleId = req.params.id;
  
  db.get("SELECT * FROM modules WHERE id = ?", [moduleId], (err, module) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(module);
  });
});

app.get('/api/modules/:id/lessons', (req, res) => {
  const moduleId = req.params.id;
  
  db.all("SELECT * FROM lessons WHERE module_id = ? ORDER BY order_index", [moduleId], (err, lessons) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(lessons);
  });
});

// Lesson routes
app.get('/api/lessons/:id', (req, res) => {
  const lessonId = req.params.id;
  
  db.get("SELECT * FROM lessons WHERE id = ?", [lessonId], (err, lesson) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(lesson);
  });
});

// Badge routes
app.get('/api/badges', (req, res) => {
  db.all("SELECT * FROM badges", (err, badges) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(badges);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});