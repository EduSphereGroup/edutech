import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, BookOpen, ArrowRight, Check, Zap, Target, Brain } from 'lucide-react';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (data: { grade: string; subject: string; difficulty: string }) => void;
}

const PersonalizationModal: React.FC<PersonalizationModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const grades = [
    { id: 'infantil', name: 'Educação Infantil', description: '0-5 anos' },
    { id: 'fundamental1', name: 'Fundamental I', description: '1º ao 5º ano' },
    { id: 'fundamental2', name: 'Fundamental II', description: '6º ao 9º ano' },
    { id: 'medio', name: 'Ensino Médio', description: '1º ao 3º ano' },
    { id: 'superior', name: 'Ensino Superior', description: 'Graduação/Pós' },
    { id: 'eja', name: 'EJA', description: 'Educação de Jovens e Adultos' }
  ];

  const subjects = [
    { id: 'portugues', name: 'Português', icon: '📚' },
    { id: 'matematica', name: 'Matemática', icon: '🔢' },
    { id: 'ciencias', name: 'Ciências', icon: '🔬' },
    { id: 'historia', name: 'História', icon: '📜' },
    { id: 'geografia', name: 'Geografia', icon: '🌍' },
    { id: 'ingles', name: 'Inglês', icon: '🇺🇸' },
    { id: 'artes', name: 'Artes', icon: '🎨' },
    { id: 'educacao_fisica', name: 'Educação Física', icon: '⚽' },
    { id: 'filosofia', name: 'Filosofia', icon: '🤔' },
    { id: 'sociologia', name: 'Sociologia', icon: '👥' },
    { id: 'fisica', name: 'Física', icon: '⚛️' },
    { id: 'quimica', name: 'Química', icon: '🧪' },
    { id: 'biologia', name: 'Biologia', icon: '🧬' },
    { id: 'multidisciplinar', name: 'Multidisciplinar', icon: '🌟' }
  ];

  const difficulties = [
    { 
      id: 'facil', 
      name: 'Fácil', 
      description: 'Conceitos básicos e introdutórios',
      icon: <Zap className="h-6 w-6" />,
      color: 'green'
    },
    { 
      id: 'moderada', 
      name: 'Moderada', 
      description: 'Desafios intermediários e práticos',
      icon: <Target className="h-6 w-6" />,
      color: 'blue'
    },
    { 
      id: 'dificil', 
      name: 'Difícil', 
      description: 'Conceitos avançados e complexos',
      icon: <Brain className="h-6 w-6" />,
      color: 'purple'
    },
    { 
      id: 'mista', 
      name: 'Mista', 
      description: 'Combinação de todos os níveis',
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'orange'
    }
  ];

  const handleNext = () => {
    if (step === 1 && selectedGrade) {
      setStep(2);
    } else if (step === 2 && selectedSubject) {
      setStep(3);
    } else if (step === 3 && selectedDifficulty) {
      onComplete({ grade: selectedGrade, subject: selectedSubject, difficulty: selectedDifficulty });
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setStep(1);
    setSelectedGrade('');
    setSelectedSubject('');
    setSelectedDifficulty('');
    onClose();
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'border-green-500 bg-green-50 text-green-700';
      case 'blue': return 'border-blue-500 bg-blue-50 text-blue-700';
      case 'purple': return 'border-purple-500 bg-purple-50 text-purple-700';
      case 'orange': return 'border-orange-500 bg-orange-50 text-orange-700';
      default: return 'border-gray-500 bg-gray-50 text-gray-700';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Personalize sua Experiência</h2>
                <p className="text-blue-100">
                  {step === 1 && 'Selecione o nível de ensino que você trabalha'}
                  {step === 2 && 'Escolha sua principal área de atuação'}
                  {step === 3 && 'Defina o nível de dificuldade dos desafios'}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors flex-shrink-0"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Progress */}
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 1 ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                }`}>
                  {step > 1 ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <span className="text-sm">Série/Nível</span>
              </div>
              <div className="flex-1 h-1 bg-blue-500 rounded-full">
                <div className={`h-full bg-white rounded-full transition-all duration-300 ${
                  step >= 2 ? 'w-1/2' : 'w-0'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 2 ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                }`}>
                  {step > 2 ? <Check className="h-4 w-4" /> : '2'}
                </div>
                <span className="text-sm">Matéria</span>
              </div>
              <div className="flex-1 h-1 bg-blue-500 rounded-full">
                <div className={`h-full bg-white rounded-full transition-all duration-300 ${
                  step >= 3 ? 'w-full' : 'w-0'
                }`} />
              </div>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 3 ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
                }`}>
                  3
                </div>
                <span className="text-sm">Dificuldade</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 overflow-y-auto flex-1">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Qual nível você ensina?</h3>
                  <p className="text-gray-600">Isso nos ajudará a personalizar o conteúdo para você</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {grades.map((grade) => (
                    <motion.button
                      key={grade.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedGrade(grade.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                        selectedGrade === grade.id
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900 mb-1">{grade.name}</h4>
                      <p className="text-sm text-gray-600">{grade.description}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Qual sua principal matéria?</h3>
                  <p className="text-gray-600">Vamos focar no conteúdo mais relevante para você</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subjects.map((subject) => (
                    <motion.button
                      key={subject.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSubject(subject.id)}
                      className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                        selectedSubject === subject.id
                          ? 'border-purple-500 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{subject.icon}</div>
                      <h4 className="font-medium text-gray-900 text-sm">{subject.name}</h4>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Brain className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Qual nível de desafio você prefere?</h3>
                  <p className="text-gray-600">Escolha a dificuldade que melhor se adapta ao seu perfil</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {difficulties.map((difficulty) => (
                    <motion.button
                      key={difficulty.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDifficulty(difficulty.id)}
                      className={`p-6 rounded-lg border-2 text-left transition-all duration-200 ${
                        selectedDifficulty === difficulty.id
                          ? getColorClasses(difficulty.color) + ' shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <div className={`p-2 rounded-full mr-3 ${
                          selectedDifficulty === difficulty.id 
                            ? `bg-${difficulty.color}-100` 
                            : 'bg-gray-100'
                        }`}>
                          {difficulty.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900">{difficulty.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{difficulty.description}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between items-center flex-shrink-0">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Voltar
              </button>
            ) : (
              <div />
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedGrade) || 
                (step === 2 && !selectedSubject) || 
                (step === 3 && !selectedDifficulty)
              }
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? 'Finalizar' : 'Próximo'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PersonalizationModal;