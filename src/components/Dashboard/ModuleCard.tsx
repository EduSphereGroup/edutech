import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  module: any;
  progress: any[];
  delay?: number;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module, progress, delay = 0 }) => {
  const navigate = useNavigate();

  const moduleProgress = progress.filter((p: any) => 
    p.module_id === module.id && p.completed
  ).length;

  const isCompleted = progress.some((p: any) => 
    p.module_id === module.id && p.completed && !p.lesson_id
  );

  const handleStartModule = () => {
    navigate(`/modules/${module.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
          <p className="text-sm text-gray-600 mb-4">{module.description}</p>
        </div>
        {isCompleted && (
          <CheckCircle className="h-6 w-6 text-green-600 ml-2 flex-shrink-0" />
        )}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{module.xp_reward} XP</span>
        </div>
        <div className="text-sm text-gray-500">
          {moduleProgress} lessons completed
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartModule}
        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        {isCompleted ? 'Review Module' : 'Start Learning'}
        <ArrowRight className="h-4 w-4 ml-2" />
      </motion.button>
    </motion.div>
  );
};

export default ModuleCard;