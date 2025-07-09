import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Lightbulb, ExternalLink } from 'lucide-react';
import { useUserProgress } from '../../hooks/useGameData';
import { useAuth } from '../../contexts/AuthContext';
import { getPersonalizedModules } from '../../data/personalizedContent';
import { personalizationService } from '../../services/personalizationService';
import PersonalizedLessonModal from './PersonalizedLessonModal';

const PersonalizedModuleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress, completeLesson } = useUserProgress();
  
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [module, setModule] = useState<any>(null);

  useEffect(() => {
    if (user && id) {
      const preferences = personalizationService.getUserPreferences(user.id);
      if (preferences) {
        const modules = getPersonalizedModules(preferences.grade, preferences.subject);
        const foundModule = modules.find(m => m.id === parseInt(id));
        setModule(foundModule);
      }
    }
  }, [user, id]);

  const isLessonCompleted = (lessonId: number) => {
    return progress.some((p: any) => p.lessonId === lessonId && p.completed);
  };

  const handleLessonComplete = async (lessonId: number) => {
    if (!module || !user) return;
    
    completeLesson(module.id, lessonId);
  };

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Módulo não encontrado</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  const completedLessons = module.lessons.filter((lesson: any) => isLessonCompleted(lesson.id)).length;
  const progressPercentage = module.lessons.length > 0 ? (completedLessons / module.lessons.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Dashboard
        </button>

        <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-8 mb-8 border border-purple-100">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <Lightbulb className="h-6 w-6 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">
                  Conteúdo Personalizado
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{module.title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{module.description}</p>
            </div>
            <div className="ml-6 p-4 bg-purple-100 rounded-full">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">XP Disponível</p>
              <p className="text-xl font-bold text-gray-900">{module.xpReward}</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <BookOpen className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Total de Aulas</p>
              <p className="text-xl font-bold text-gray-900">{module.lessons.length}</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <CheckCircle className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Concluídas</p>
              <p className="text-xl font-bold text-gray-900">{completedLessons}</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progresso</span>
              <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Aulas do Módulo</h2>
          {module.lessons.map((lesson: any, index: number) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3">
                      Aula {lesson.orderIndex}
                    </span>
                    {isLessonCompleted(lesson.id) && (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {lesson.content.substring(0, 150)}...
                  </p>
                  
                  {lesson.practicalActivity && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-1">
                        <Lightbulb className="h-4 w-4 text-blue-600 mr-1" />
                        <span className="text-xs font-medium text-blue-800">Atividade Prática</span>
                      </div>
                      <p className="text-sm text-blue-700">{lesson.practicalActivity}</p>
                    </div>
                  )}

                  {lesson.resources && lesson.resources.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center mb-2">
                        <ExternalLink className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-xs font-medium text-gray-700">Recursos Recomendados</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {lesson.resources.map((resource: string, idx: number) => (
                          <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                          >
                            {resource}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{lesson.xpReward} XP</span>
                  </div>
                </div>
                
                <div className="ml-6">
                  {isLessonCompleted(lesson.id) ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedLesson(lesson)}
                      className="flex items-center px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Revisar
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedLesson(lesson)}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Iniciar Aula
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedLesson && (
        <PersonalizedLessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onComplete={handleLessonComplete}
        />
      )}
    </div>
  );
};

export default PersonalizedModuleView;