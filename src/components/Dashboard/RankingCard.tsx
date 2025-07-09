import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Target, Crown, Medal, Award } from 'lucide-react';

interface RankingCardProps {
  userPreferences: any;
}

const RankingCard: React.FC<RankingCardProps> = ({ userPreferences }) => {
  const [activeTab, setActiveTab] = useState<'subject' | 'general'>('subject');

  // Mock ranking data - in a real app, this would come from an API
  const subjectRanking = [
    { id: 1, name: 'Ana Silva', xp: 2450, level: 5, position: 1 },
    { id: 2, name: 'Carlos Santos', xp: 2200, level: 4, position: 2 },
    { id: 3, name: 'Maria Oliveira', xp: 1980, level: 4, position: 3 },
    { id: 4, name: 'João Pedro', xp: 1750, level: 3, position: 4 },
    { id: 5, name: 'Você', xp: 1500, level: 3, position: 5, isCurrentUser: true },
  ];

  const generalRanking = [
    { id: 1, name: 'Prof. Roberto', xp: 3200, level: 6, position: 1 },
    { id: 2, name: 'Dra. Fernanda', xp: 2950, level: 5, position: 2 },
    { id: 3, name: 'Prof. Lucas', xp: 2800, level: 5, position: 3 },
    { id: 4, name: 'Ana Carolina', xp: 2650, level: 5, position: 4 },
    { id: 5, name: 'Você', xp: 1500, level: 3, position: 12, isCurrentUser: true },
  ];

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <span className="text-sm font-bold text-gray-600">#{position}</span>;
    }
  };

  const currentRanking = activeTab === 'subject' ? subjectRanking : generalRanking;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Ranking</h3>
        <Trophy className="h-5 w-5 text-yellow-500" />
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('subject')}
          className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'subject'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target className="h-4 w-4 mr-1" />
          {userPreferences ? 'Sua Matéria' : 'Matéria'}
        </button>
        <button
          onClick={() => setActiveTab('general')}
          className={`flex-1 flex items-center justify-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
            activeTab === 'general'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users className="h-4 w-4 mr-1" />
          Geral
        </button>
      </div>

      {/* Ranking List */}
      <div className="space-y-2">
        {currentRanking.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              user.isCurrentUser
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8">
                {getRankIcon(user.position)}
              </div>
              <div>
                <p className={`text-sm font-medium ${
                  user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">Nível {user.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${
                user.isCurrentUser ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {user.xp.toLocaleString()} XP
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {activeTab === 'subject' 
            ? `Ranking entre professores de ${userPreferences?.subject || 'sua matéria'}`
            : 'Ranking geral da plataforma'
          }
        </p>
      </div>
    </motion.div>
  );
};

export default RankingCard;