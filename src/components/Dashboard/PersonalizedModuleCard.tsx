import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PersonalizedModuleCardProps {
  module: any;
  progress: any[];
  delay?: number;
}

const PersonalizedModuleCard: React.FC<PersonalizedModuleCardProps> = ({
  module,
  progress,
  delay = 0,
}) => {
  const navigate = useNavigate();

  // Contabiliza apenas as aulas concluídas (ignorando o progresso do módulo)
  const moduleLessonsCompleted = progress.filter(
    (p: any) => p.moduleId === module.id && p.lessonId && p.completed
  ).length;

  const totalLessons = module.lessons.length;

  const progressPercentage =
    totalLessons > 0 ? (moduleLessonsCompleted / totalLessons) * 100 : 0;

  // Verifica se o módulo completo foi marcado como concluído (sem lessonId)
  const isCompleted = progress.some(
    (p: any) => p.moduleId === module.id && p.completed && !p.lessonId
  );

  const handleStartModule = () => {
    navigate(`/personalized-modules/${module.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Personalizado
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {module.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {module.description}
          </p>
        </div>
        {isCompleted && (
          <CheckCircle className="h-6 w-6 text-green-600 ml-2 flex-shrink-0" />
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-700">Progresso</span>
          <span className="text-xs text-gray-500">
            {Math.round(progressPercentage)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: delay + 0.2 }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>{module.xpReward} XP</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{module.lessons.length} aulas</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleStartModule}
        className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md"
      >
        {isCompleted ? "Revisar Módulo" : "Começar Aprendizado"}
        <ArrowRight className="h-4 w-4 ml-2" />
      </motion.button>
    </motion.div>
  );
};

export default PersonalizedModuleCard;
