import { User, UserProgress, UserBadge } from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'teachtech_user',
  PROGRESS: 'teachtech_progress',
  BADGES: 'teachtech_badges'
};

export const storageService = {
  // User management
  saveUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  getUser: (): User | null => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : null;
  },

  updateUser: (updates: Partial<User>): User | null => {
    const currentUser = storageService.getUser();
    if (!currentUser) return null;

    const updatedUser = { ...currentUser, ...updates };
    storageService.saveUser(updatedUser);
    return updatedUser;
  },

  clearUser: (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Progress management
  saveProgress: (progress: UserProgress[]): void => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },

  getProgress: (): UserProgress[] => {
    const progressData = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return progressData ? JSON.parse(progressData) : [];
  },

  addProgress: (newProgress: UserProgress): void => {
    const currentProgress = storageService.getProgress();
    const existingIndex = currentProgress.findIndex(
      p => p.userId === newProgress.userId && 
           p.moduleId === newProgress.moduleId && 
           p.lessonId === newProgress.lessonId
    );

    if (existingIndex >= 0) {
      currentProgress[existingIndex] = newProgress;
    } else {
      currentProgress.push(newProgress);
    }

    storageService.saveProgress(currentProgress);
  },

  // Badge management
  saveBadges: (badges: UserBadge[]): void => {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  },

  getUserBadges: (): UserBadge[] => {
    const badgeData = localStorage.getItem(STORAGE_KEYS.BADGES);
    return badgeData ? JSON.parse(badgeData) : [];
  },

  awardBadge: (userId: number, badgeId: number): void => {
    const currentBadges = storageService.getUserBadges();
    const existingBadge = currentBadges.find(
      b => b.userId === userId && b.badgeId === badgeId
    );

    if (!existingBadge) {
      currentBadges.push({
        userId,
        badgeId,
        earned: true,
        earnedAt: new Date().toISOString()
      });
      storageService.saveBadges(currentBadges);
    }
  },

  // Initialize default data
  initializeUserData: (userId: number): void => {
    // Initialize empty progress if none exists
    const progress = storageService.getProgress();
    if (progress.length === 0) {
      storageService.saveProgress([]);
    }

    // Initialize badges if none exist
    const badges = storageService.getUserBadges();
    if (badges.length === 0) {
      storageService.saveBadges([]);
    }
  }
};