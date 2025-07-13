import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { personalizationService } from "../../services/personalizationService";
import {
  gradeNames,
  subjectNames,
  difficultyNames,
} from "../../data/personalizedContent";
import PersonalizationModal from "../Onboarding/PersonalizationModal";
import StatsCard from "./StatsCard";
import ProgressCard from "./ProgressCard";
import PersonalizedModuleCard from "./PersonalizedModuleCard";
import RankingCard from "./RankingCard";
import { Settings, RefreshCw } from "lucide-react";
import { useUserStats } from "../../hooks/useUserStats";
import { usePersonalizedModules } from "../../hooks/usePersonalizedModules";
import { useBadgesAPI } from "../../hooks/useBadgesAPI";
import { useProgressAPI } from "../../hooks/useProgressAPI";

const PersonalizedDashboard: React.FC = () => {
  const { user, updateUser, profile } = useAuth();

  const { stats, loading: statsLoading } = useUserStats();
  const { badges, loading: badgesLoading } = useBadgesAPI();
  const { progress, loading: progressLoading } = useProgressAPI();

  const [showPersonalization, setShowPersonalization] = useState(false);
  const [userPreferences, setUserPreferences] = useState<any>(null);

  const { modules: personalizedModules, loading: modulesLoading } =
    usePersonalizedModules({
      grade: userPreferences?.grade || "",
      subject: userPreferences?.subject || "",
      difficulty: userPreferences?.difficulty || "",
    });

  useEffect(() => {
    if (user) {
      const preferences = personalizationService.getUserPreferences(
        profile?.id ?? ""
      );
      setUserPreferences(preferences);

      if (!preferences?.completedOnboarding) {
        setShowPersonalization(true);
      }
    }
  }, [user]);

  useEffect(() => {
    const handleUserUpdate = (event: any) => {
      updateUser(event.detail);
    };

    window.addEventListener("userUpdated", handleUserUpdate);
    return () => window.removeEventListener("userUpdated", handleUserUpdate);
  }, [updateUser]);

  const handlePersonalizationComplete = (data: {
    grade: string;
    subject: string;
    difficulty: string;
  }) => {
    if (!user) return;

    personalizationService.completeOnboarding(
      profile?.id ?? "",
      data.grade,
      data.subject,
      data.difficulty
    );
    setUserPreferences({
      ...data,
      userId: profile?.id ?? "",
      completedOnboarding: true,
    });
    setShowPersonalization(false);
  };

  const handleReconfigure = () => {
    setShowPersonalization(true);
  };

  if (progressLoading || badgesLoading || statsLoading || modulesLoading) {
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

  const completedLessons = progress.filter(
    (p: any) => p.completed && p.lessonId
  ).length;
  const totalLessons = personalizedModules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );
  const completedModules = progress.filter(
    (p: any) => p.completed && p.moduleId && !p.lessonId
  ).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo, Professor! Hoje será um dia incrível!
            </h2>
            {userPreferences && (
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {gradeNames[userPreferences.grade]}
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  {subjectNames[userPreferences.subject]}
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {difficultyNames[userPreferences.difficulty]}
                </span>
              </div>
            )}
            <p className="text-gray-600 mt-2">
              Conteúdo personalizado para sua área de atuação
            </p>
          </div>

          {userPreferences && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReconfigure}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              <Settings className="h-4 w-4" />
              <span>Reconfigurar</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="XP Conquistado"
          value={stats?.xp || 0}
          icon="star"
          color="blue"
          delay={0.1}
        />
        <StatsCard
          title="Nível Atual"
          value={stats?.level || 1}
          icon="trophy"
          color="green"
          delay={0.2}
        />
        <StatsCard
          title="Aulas Concluídas"
          value={stats?.completedLessons || 0}
          icon="check"
          color="purple"
          delay={0.3}
        />
        <StatsCard
          title="Conquistas"
          value={stats?.earnedBadges || 0}
          icon="award"
          color="yellow"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProgressCard
          completedLessons={completedLessons}
          totalLessons={totalLessons}
          completedModules={completedModules}
          totalModules={personalizedModules.length}
          badges={badges}
        />
        <RankingCard userPreferences={userPreferences} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Seus Módulos Personalizados
          </h2>
          {personalizedModules.length === 0 && userPreferences && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReconfigure}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Escolher Conteúdo</span>
            </motion.button>
          )}
        </div>

        {personalizedModules.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalizedModules.map((module: any, index: number) => (
              <PersonalizedModuleCard
                key={module.id}
                module={module}
                progress={progress}
                delay={index * 0.1}
              />
            ))}
          </div>
        ) : userPreferences ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-gray-50 rounded-xl"
          >
            <div className="text-gray-400 mb-4">
              <RefreshCw className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Conteúdo em Desenvolvimento
            </h3>
            <p className="text-gray-600 mb-4">
              Estamos preparando conteúdo específico para{" "}
              {gradeNames[userPreferences.grade]} -{" "}
              {subjectNames[userPreferences.subject]}
            </p>
            <button
              onClick={handleReconfigure}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Escolher Outra Área
            </button>
          </motion.div>
        ) : null}
      </motion.div>

      <PersonalizationModal
        isOpen={showPersonalization}
        onClose={() => {
          if (userPreferences?.completedOnboarding) {
            setShowPersonalization(false);
          }
        }}
        onComplete={handlePersonalizationComplete}
      />
    </div>
  );
};

export default PersonalizedDashboard;
