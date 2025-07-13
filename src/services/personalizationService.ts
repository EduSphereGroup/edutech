import { storageService } from './localStorage';

export interface UserPreferences {
  userId: string;
  grade: string;
  subject: string;
  difficulty: string;
  completedOnboarding: boolean;
}

const PREFERENCES_KEY = 'teachtech_preferences';

export const personalizationService = {
  savePreferences: (preferences: UserPreferences): void => {
    const allPreferences = personalizationService.getAllPreferences();
    const existingIndex = allPreferences.findIndex(p => p.userId === preferences.userId);
    
    if (existingIndex >= 0) {
      allPreferences[existingIndex] = preferences;
    } else {
      allPreferences.push(preferences);
    }
    
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(allPreferences));
  },

  getUserPreferences: (userId: string): UserPreferences | null => {
    const allPreferences = personalizationService.getAllPreferences();
    return allPreferences.find(p => p.userId === userId) || null;
  },

  getAllPreferences: (): UserPreferences[] => {
    const data = localStorage.getItem(PREFERENCES_KEY);
    return data ? JSON.parse(data) : [];
  },

  hasCompletedOnboarding: (userId: string): boolean => {
    const preferences = personalizationService.getUserPreferences(userId);
    return preferences?.completedOnboarding || false;
  },

  completeOnboarding: (userId: string, grade: string, subject: string, difficulty: string): void => {
    personalizationService.savePreferences({
      userId,
      grade,
      subject,
      difficulty,
      completedOnboarding: true
    });
  }
};