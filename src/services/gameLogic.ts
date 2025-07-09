import { storageService } from './localStorage';
import { mockBadges, mockLessons } from '../data/mockData';

export const gameLogic = {
  calculateLevel: (xp: number): number => {
    if (xp >= 2000) return 5;
    if (xp >= 1000) return 4;
    if (xp >= 600) return 3;
    if (xp >= 200) return 2;
    return 1;
  },

  getXPToNextLevel: (currentXP: number): number => {
    const levels = [0, 200, 600, 1000, 2000];
    const currentLevel = gameLogic.calculateLevel(currentXP);
    
    if (currentLevel >= 5) return 0;
    return levels[currentLevel] - currentXP;
  },

  awardXP: (userId: number, xpAmount: number): void => {
    const currentUser = storageService.getUser();
    if (!currentUser || currentUser.id !== userId) return;

    const newXP = currentUser.xp + xpAmount;
    const newLevel = gameLogic.calculateLevel(newXP);

    storageService.updateUser({
      xp: newXP,
      level: newLevel
    });

    // Check for XP-based badges
    gameLogic.checkXPBadges(userId, newXP);
  },

  checkXPBadges: (userId: number, currentXP: number): void => {
    const xpBadges = mockBadges.filter(badge => badge.criteria === 'earn_xp');
    
    xpBadges.forEach(badge => {
      if (currentXP >= badge.xpRequirement) {
        storageService.awardBadge(userId, badge.id);
      }
    });
  },

  checkLessonBadges: (userId: number): void => {
    const progress = storageService.getProgress();
    const userProgress = progress.filter(p => p.userId === userId);
    const completedLessons = userProgress.filter(p => p.completed && p.lessonId).length;

    // First lesson badge
    if (completedLessons >= 1) {
      const firstLessonBadge = mockBadges.find(b => b.criteria === 'complete_first_lesson');
      if (firstLessonBadge) {
        storageService.awardBadge(userId, firstLessonBadge.id);
      }
    }

    // Multiple lessons badge
    if (completedLessons >= 5) {
      const lessonsCountBadge = mockBadges.find(b => b.criteria === 'complete_lessons');
      if (lessonsCountBadge) {
        storageService.awardBadge(userId, lessonsCountBadge.id);
      }
    }
  },

  checkModuleBadges: (userId: number): void => {
    const progress = storageService.getProgress();
    const userProgress = progress.filter(p => p.userId === userId);
    const completedModules = userProgress.filter(p => p.completed && p.moduleId && !p.lessonId).length;

    // First module badge
    if (completedModules >= 1) {
      const firstModuleBadge = mockBadges.find(b => b.criteria === 'complete_first_module');
      if (firstModuleBadge) {
        storageService.awardBadge(userId, firstModuleBadge.id);
      }
    }

    // All modules badge
    if (completedModules >= 4) { // We have 4 modules
      const allModulesBadge = mockBadges.find(b => b.criteria === 'complete_all_modules');
      if (allModulesBadge) {
        storageService.awardBadge(userId, allModulesBadge.id);
      }
    }
  },

  completeLesson: (userId: number, moduleId: number, lessonId: number): void => {
    // Find the lesson to get XP reward
    const lesson = mockLessons.find(l => l.id === lessonId);
    if (!lesson) return;

    // Add progress
    storageService.addProgress({
      userId,
      moduleId,
      lessonId,
      completed: true,
      completedAt: new Date().toISOString()
    });

    // Award XP
    gameLogic.awardXP(userId, lesson.xpReward);

    // Check for badges
    gameLogic.checkLessonBadges(userId);

    // Check if module is complete
    const moduleProgress = storageService.getProgress().filter(
      p => p.userId === userId && p.moduleId === moduleId && p.lessonId && p.completed
    );
    const moduleLessons = mockLessons.filter(l => l.moduleId === moduleId);

    if (moduleProgress.length === moduleLessons.length) {
      // Complete the module
      storageService.addProgress({
        userId,
        moduleId,
        completed: true,
        completedAt: new Date().toISOString()
      });

      gameLogic.checkModuleBadges(userId);
    }
  }
};