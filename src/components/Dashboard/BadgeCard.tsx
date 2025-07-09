import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy, Compass, Paintbrush as PaintBrush, GraduationCap } from 'lucide-react';

interface BadgeCardProps {
  badges: any[];
}

const BadgeCard: React.FC<BadgeCardProps> = ({ badges }) => {
  const getBadgeIcon = (icon: string) => {
    switch (icon) {
      case 'star': return <Star className="h-6 w-6" />;
      case 'trophy': return <Trophy className="h-6 w-6" />;
      case 'compass': return <Compass className="h-6 w-6" />;
      case 'paintbrush': return <PaintBrush className="h-6 w-6" />;
      case 'graduation-cap': return <GraduationCap className="h-6 w-6" />;
      case 'award': return <Award className="h-6 w-6" />;
      default: return <Award className="h-6 w-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Conquistas</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {badges.map((badge: any, index: number) => (
          <motion.div
            key={badge.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              badge.earned
                ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 shadow-md'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-full mb-3 transition-all duration-300 ${
              badge.earned
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100 text-yellow-600 shadow-sm'
                : 'bg-gray-100 text-gray-400'
            }`}>
              {getBadgeIcon(badge.icon)}
            </div>
            <h4 className={`text-sm font-medium mb-1 ${
              badge.earned ? 'text-gray-900' : 'text-gray-400'
            }`}>
              {badge.name}
            </h4>
            <p className={`text-xs leading-relaxed ${
              badge.earned ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {badge.description}
            </p>
            {badge.earned && badge.earnedAt && (
              <p className="text-xs text-yellow-600 mt-2 font-medium">
                Conquistado em {new Date(badge.earnedAt).toLocaleDateString('pt-BR')}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BadgeCard;