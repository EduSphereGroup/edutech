import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Award, Star, Trophy, Compass, Paintbrush as PaintBrush, GraduationCap } from 'lucide-react';

interface ProgressCardProps {
  completedLessons: number;
  totalLessons: number;
  completedModules: number;
  totalModules: number;
  badges: any[];
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  completedLessons,
  totalLessons,
  completedModules,
  totalModules,
  badges,
}) => {
  // Ensure we don't divide by zero and cap at 100%
  const lessonProgress = totalLessons > 0 ? Math.min((completedLessons / totalLessons) * 100, 100) : 0;
  const moduleProgress = totalModules > 0 ? Math.min((completedModules / totalModules) * 100, 100) : 0;

  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'star': return <Star className="h-4 w-4" />;
      case 'trophy': return <Trophy className="h-4 w-4" />;
      case 'compass': return <Compass className="h-4 w-4" />;
      case 'paintbrush': return <PaintBrush className="h-4 w-4" />;
      case 'graduation-cap': return <GraduationCap className="h-4 w-4" />;
      case 'award': return <Award className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  // Get the first 6 badges for display
  const displayBadges = badges.slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Seu Progresso</h3>
      
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Aulas</span>
            </div>
            <span className="text-sm text-gray-500">{completedLessons}/{totalLessons}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${lessonProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-blue-600 h-2 rounded-full"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Target className="h-4 w-4 text-green-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">Módulos</span>
            </div>
            <span className="text-sm text-gray-500">{completedModules}/{totalModules}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${moduleProgress}%` }}
              transition={{ duration: 1, delay: 0.7 }}
              className="bg-green-600 h-2 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Conquistas */}
      <div>
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Conquistas Recentes</h4>
        <div className="grid grid-cols-3 gap-2">
          {displayBadges.map((badge: any, index: number) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className={`p-3 rounded-lg border text-center transition-all duration-300 ${
                badge.earned
                  ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`flex items-center justify-center w-6 h-6 rounded-full mb-2 mx-auto transition-all duration-300 ${
                badge.earned
                  ? 'bg-gradient-to-br from-yellow-100 to-orange-100 text-yellow-600'
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {getBadgeIcon(badge.icon)}
              </div>
              <h5 className={`text-xs font-medium mb-1 ${
                badge.earned ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {badge.name}
              </h5>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressCard;