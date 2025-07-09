import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { storageService } from '../services/localStorage';
import { gameLogic } from '../services/gameLogic';
import { mockModules, mockLessons, mockBadges, UserProgress, UserBadge } from '../data/mockData';

export const useModules = () => {
  return {
    modules: mockModules,
    loading: false,
    error: null
  };
};

export const useUserProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userProgress = storageService.getProgress().filter(p => p.userId === user.id);
      setProgress(userProgress);
    }
    setLoading(false);
  }, [user]);

  const completeLesson = (moduleId: number, lessonId: number) => {
    if (!user) return;

    gameLogic.completeLesson(user.id, moduleId, lessonId);
    
    // Refresh progress
    const updatedProgress = storageService.getProgress().filter(p => p.userId === user.id);
    setProgress(updatedProgress);

    // Update user data in context
    const updatedUser = storageService.getUser();
    if (updatedUser) {
      // This will trigger a re-render with updated XP/level
      window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
    }
  };

  return {
    progress,
    loading,
    error: null,
    completeLesson
  };
};

export const useUserBadges = () => {
  const { user } = useAuth();
  const [badges, setBadges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const userBadges = storageService.getUserBadges().filter(b => b.userId === user.id);
      
      // Combine with badge definitions
      const badgesWithDetails = mockBadges.map(badge => {
        const userBadge = userBadges.find(ub => ub.badgeId === badge.id);
        return {
          ...badge,
          earned: userBadge?.earned || false,
          earnedAt: userBadge?.earnedAt
        };
      });

      setBadges(badgesWithDetails);
    }
    setLoading(false);
  }, [user]);

  // Listen for badge updates
  useEffect(() => {
    const handleUserUpdate = () => {
      if (user) {
        const userBadges = storageService.getUserBadges().filter(b => b.userId === user.id);
        const badgesWithDetails = mockBadges.map(badge => {
          const userBadge = userBadges.find(ub => ub.badgeId === badge.id);
          return {
            ...badge,
            earned: userBadge?.earned || false,
            earnedAt: userBadge?.earnedAt
          };
        });
        setBadges(badgesWithDetails);
      }
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, [user]);

  return {
    badges,
    loading,
    error: null
  };
};

export const useModuleLessons = (moduleId: number) => {
  const lessons = mockLessons.filter(lesson => lesson.moduleId === moduleId);
  
  return {
    lessons,
    loading: false,
    error: null
  };
};

export const useLesson = (lessonId: number) => {
  const lesson = mockLessons.find(l => l.id === lessonId);
  
  return {
    lesson,
    loading: false,
    error: null
  };
};