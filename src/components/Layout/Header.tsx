import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, LogOut, Trophy, Star, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { gameLogic } from '../../services/gameLogic';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-gray-100 text-gray-800 border-gray-300';
      case 2: return 'bg-blue-100 text-blue-800 border-blue-300';
      case 3: return 'bg-green-100 text-green-800 border-green-300';
      case 4: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 5: return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-indigo-100 text-indigo-800 border-indigo-300';
    }
  };

  const getXPToNextLevel = (xp: number) => {
    return gameLogic.getXPToNextLevel(xp);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="p-2 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mr-3">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">EduTech Brasil</h1>
                <p className="text-xs text-gray-500">Tecnologia Educacional Brasileira</p>
              </div>
            </motion.div>
          </div>

          {/* User Info Section */}
          {user && (
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              {/* XP Display */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-50 to-orange-50 px-2 sm:px-3 py-1.5 rounded-lg border border-yellow-200">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-gray-700">{user.xp}</span>
                  <span className="text-xs text-gray-500 hidden sm:inline">XP</span>
                </div>
                {getXPToNextLevel(user.xp) > 0 && (
                  <div className="text-xs text-gray-500 mt-0.5 flex items-center">
                    <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5" />
                    <span className="hidden sm:inline">{getXPToNextLevel(user.xp)} para nível {user.level + 1}</span>
                    <span className="sm:hidden">+{getXPToNextLevel(user.xp)}</span>
                  </div>
                )}
              </motion.div>

              {/* Level Display */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border ${getLevelColor(user.level)}`}
              >
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="hidden sm:inline">Nível {user.level}</span>
                  <span className="sm:hidden">{user.level}</span>
                </div>
              </motion.div>

              {/* User Welcome - Hidden on mobile */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="hidden md:block text-sm text-gray-700 font-medium"
              >
                Bem-vindo, {user.email}!
              </motion.div>

              {/* Logout Button */}
              <motion.button
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="hidden sm:inline">Sair</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;