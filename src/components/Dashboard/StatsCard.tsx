import React from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, CheckCircle, Award } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  color: string;
  delay?: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color, delay = 0 }) => {
  const getIcon = () => {
    switch (icon) {
      case 'star': return <Star className="h-6 w-6" />;
      case 'trophy': return <Trophy className="h-6 w-6" />;
      case 'check': return <CheckCircle className="h-6 w-6" />;
      case 'award': return <Award className="h-6 w-6" />;
      default: return <Star className="h-6 w-6" />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${getColorClasses()}`}>
          {getIcon()}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;