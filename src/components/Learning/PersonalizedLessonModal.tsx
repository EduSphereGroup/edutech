import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Star, ArrowRight, ArrowLeft, BookOpen, Lightbulb, ExternalLink } from 'lucide-react';

interface PersonalizedLessonModalProps {
  lesson: any;
  onClose: () => void;
  onComplete: (lessonId: number) => void;
}

const PersonalizedLessonModal: React.FC<PersonalizedLessonModalProps> = ({ lesson, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showComplete, setShowComplete] = useState(false);

  const steps = [
    {
      title: "Conteúdo",
      content: lesson.content,
      icon: <BookOpen className="h-6 w-6" />
    },
    ...(lesson.practicalActivity ? [{
      title: "Atividade Prática",
      content: lesson.practicalActivity,
      icon: <Lightbulb className="h-6 w-6" />
    }] : []),
    {
      title: "Aplicação",
      content: "Excelente! Você concluiu o conteúdo teórico e a atividade prática. Agora é hora de aplicar esse conhecimento em sua sala de aula. Lembre-se de adaptar as estratégias aprendidas ao contexto dos seus alunos. Clique em 'Concluir Aula' para marcar como finalizada e ganhar seus pontos de experiência!",
      icon: <Star className="h-6 w-6" />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowComplete(true);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const handleComplete = () => {
    onComplete(lesson.id);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {!showComplete ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{lesson.title}</h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {steps[currentStep].icon}
                        <span className="text-lg font-medium">{steps[currentStep].title}</span>
                      </div>
                      <div className="text-sm opacity-90">
                        Etapa {currentStep + 1} de {steps.length}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex space-x-2">
                    {steps.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                          index <= currentStep ? 'bg-white' : 'bg-white bg-opacity-30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[55vh]">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="prose max-w-none"
                >
                  <div className="text-gray-700 leading-relaxed text-lg">
                    {steps[currentStep].content}
                  </div>

                  {/* Show resources if available and on first step */}
                  {currentStep === 0 && lesson.resources && lesson.resources.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center mb-3">
                        <ExternalLink className="h-5 w-5 text-blue-600 mr-2" />
                        <h4 className="text-lg font-semibold text-blue-800">Recursos Recomendados</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {lesson.resources.map((resource: string, idx: number) => (
                          <div
                            key={idx}
                            className="bg-white p-3 rounded-lg border border-blue-200 text-center"
                          >
                            <span className="text-sm font-medium text-gray-700">{resource}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </button>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{lesson.xpReward} XP</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-md"
                >
                  {currentStep === steps.length - 1 ? 'Concluir Aula' : 'Próximo'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </motion.button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <CheckCircle className="h-10 w-10 text-green-600" />
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-bold text-gray-900 mb-3"
              >
                Aula Concluída! 🎉
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 mb-6 text-lg"
              >
                Parabéns! Você ganhou <span className="font-bold text-purple-600">{lesson.xpReward} XP</span>
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center space-x-1 mb-8"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <Star className="h-8 w-8 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleComplete}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
              >
                Continuar Aprendendo
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PersonalizedLessonModal;