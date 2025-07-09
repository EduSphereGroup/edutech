import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useModules, useUserProgress, useUserBadges } from '../../hooks/useGameData';
import { storageService } from '../../services/localStorage';
import StatsCard from './StatsCard';
import ProgressCard from './ProgressCard';
import BadgeCard from './BadgeCard';
import ModuleCard from './ModuleCard';

const Dashboard: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { modules, loading: modulesLoading } = useModules();
  const { progress, loading: progressLoading } = useUserProgress();
  const { badges, loading: badgesLoading } = useUserBadges();

  // Listen for user updates from localStorage
  useEffect(() => {
    const handleUserUpdate = (event: any) => {
      updateUser(event.detail);
    };

    window.addEventListener('userUpdated', handleUserUpdate);
    return () => window.removeEventListener('userUpdated', handleUserUpdate);
  }, [updateUser]);

  if (modulesLoading || progressLoading || badgesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const completedLessons = progress.filter((p: any) => p.completed && p.lessonId).length;
  const totalLessons = 12; // Total lessons across all modules
  const completedModules = progress.filter((p: any) => p.completed && p.moduleId && !p.lessonId).length;
  const earnedBadges = badges.filter((b: any) => b.earned).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-gray-600">
          Continue your journey to master educational technology
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="XP Earned"
          value={user?.xp || 0}
          icon="star"
          color="blue"
          delay={0.1}
        />
        <StatsCard
          title="Current Level"
          value={user?.level || 1}
          icon="trophy"
          color="green"
          delay={0.2}
        />
        <StatsCard
          title="Lessons Complete"
          value={completedLessons}
          icon="check"
          color="purple"
          delay={0.3}
        />
        <StatsCard
          title="Badges Earned"
          value={earnedBadges}
          icon="award"
          color="yellow"
          delay={0.4}
        />
      </div>

      {/* Progress and Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProgressCard
          completedLessons={completedLessons}
          totalLessons={totalLessons}
          completedModules={completedModules}
          totalModules={modules.length}
        />
        <BadgeCard badges={badges} />
      </div>

      {/* Learning Modules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Continue Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module: any, index: number) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={progress}
              delay={index * 0.1}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;