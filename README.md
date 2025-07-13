# 🎓 TeachTech Academy - EduTech Platform

> Uma plataforma gamificada de capacitação para professores desenvolvida para o Hackathon FIAP

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)
![Vite](https://img.shields.io/badge/Vite-5.4.2-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.1-cyan)
![Firebase](https://img.shields.io/badge/Firebase-11.10.0-orange)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura](#arquitetura)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [APIs e Serviços](#apis-e-serviços)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🎯 Sobre o Projeto

A **TeachTech Academy** é uma plataforma educacional gamificada projetada especificamente para capacitar professores em tecnologias educacionais. Desenvolvida como parte do Hackathon FIAP, a aplicação combina aprendizado personalizado, elementos de gamificação e uma interface moderna para criar uma experiência de ensino envolvente.

### 🌟 Diferenciais

- **Personalização Inteligente**: Conteúdo adaptado ao nível, matéria e dificuldade preferida do usuário
- **Gamificação Completa**: Sistema de XP, níveis, badges e rankings
- **Interface Moderna**: Design responsivo com animações fluidas usando Framer Motion
- **Aprendizado Progressivo**: Módulos estruturados com acompanhamento detalhado de progresso
- **Autenticação Segura**: Integração com Firebase Authentication

## ✨ Funcionalidades

### 🔐 Autenticação e Onboarding
- Login/Registro com Firebase Auth
- Onboarding personalizado para configurar preferências de aprendizado
- Perfil de usuário com estatísticas detalhadas

### 📚 Sistema de Aprendizagem
- **Módulos Personalizados**: Conteúdo adaptado baseado em:
  - Nível de ensino (Fundamental I, II, Médio)
  - Disciplina (Matemática, Português, Ciências, etc.)
  - Dificuldade (Iniciante, Intermediário, Avançado)
- **Aulas Interativas**: Modal de lições com sistema de etapas
- **Progresso Visual**: Barras de progresso e indicadores visuais

### 🎮 Gamificação
- **Sistema de XP**: Ganhe pontos por completar lições e módulos
- **Níveis**: Progressão baseada em experiência acumulada
- **Badges**: Conquistas especiais por marcos alcançados
- **Ranking**: Compare seu progresso com outros usuários

### 📊 Dashboard Personalizado
- **Estatísticas em Tempo Real**: XP, nível, progresso geral
- **Cards de Progresso**: Visualização do avanço por módulo
- **Badges Conquistadas**: Exibição das conquistas do usuário
- **Ranking Global**: Posição entre todos os usuários

## 🏗️ Arquitetura

### Frontend (React + TypeScript)
```
src/
├── components/          # Componentes React organizados por funcionalidade
│   ├── Auth/           # Autenticação
│   ├── Dashboard/      # Painel principal
│   ├── Learning/       # Sistema de aprendizagem
│   ├── Layout/         # Componentes de layout
│   └── Onboarding/     # Processo de boas-vindas
├── contexts/           # Context API para estado global
├── hooks/              # Custom hooks para lógica reutilizável
├── services/           # Serviços e utilitários
└── data/              # Dados mockados e tipos
```

### Backend (Express + SQLite)
```
server/
├── index.js           # Servidor Express principal
├── database.sqlite    # Banco de dados SQLite
└── (migrations)       # Scripts de inicialização do DB
```

### Padrões Arquiteturais
- **Component-Based Architecture**: Componentes reutilizáveis e modulares
- **Context API**: Gerenciamento de estado global para autenticação
- **Custom Hooks**: Lógica de negócio encapsulada e reutilizável
- **Service Layer**: Separação de responsabilidades para APIs e persistência

## 🛠️ Tecnologias Utilizadas

### Core Frontend
- **React 18.3.1**: Biblioteca principal para interface
- **TypeScript 5.5.3**: Tipagem estática para maior robustez
- **Vite 5.4.2**: Build tool moderna e rápida
- **React Router Dom 6.26.1**: Roteamento SPA

### UI/UX
- **TailwindCSS 3.4.1**: Framework CSS utilitário
- **Framer Motion 11.5.4**: Animações fluidas e microinterações
- **Lucide React 0.344.0**: Ícones modernos e consistentes
- **Sonner 2.0.6**: Sistema de notificações toast

### Backend e Dados
- **Firebase 11.10.0**: Autenticação e serviços cloud
- **Express.js**: Framework web para API REST
- **SQLite3**: Banco de dados local para desenvolvimento
- **Axios 1.10.0**: Cliente HTTP para requisições

### Desenvolvimento
- **ESLint**: Linting e padronização de código
- **PostCSS**: Processamento de CSS
- **Autoprefixer**: Compatibilidade cross-browser

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta Firebase (para autenticação)

### 1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd edutech
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Firebase
1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative o Authentication (Email/Password)
3. Copie as configurações do projeto
4. Crie o arquivo `src/firebase.ts` com suas configurações:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Suas configurações do Firebase
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

### 4. Configure o servidor backend
```bash
cd server
npm install
```

### 5. Execute o projeto

**Frontend (desenvolvimento):**
```bash
npm run dev
```

**Backend:**
```bash
cd server
node index.js
```

A aplicação estará disponível em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
edutech/
├── public/                 # Arquivos estáticos
├── server/                 # Backend Express + SQLite
│   ├── index.js           # Servidor principal
│   └── database.sqlite    # Banco de dados
├── src/
│   ├── components/        # Componentes React
│   │   ├── Auth/          # LoginForm
│   │   ├── Dashboard/     # Stats, Progress, Ranking
│   │   ├── Learning/      # Módulos e Lições
│   │   ├── Layout/        # Header e estrutura
│   │   └── Onboarding/    # Personalização inicial
│   ├── contexts/          # Context API (Auth)
│   ├── hooks/             # Custom hooks para APIs
│   ├── services/          # Lógica de negócio
│   ├── data/              # Tipos e dados mockados
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── package.json           # Dependências e scripts
├── vite.config.ts         # Configuração Vite
├── tailwind.config.js     # Configuração TailwindCSS
└── tsconfig.json          # Configuração TypeScript
```

## 🔌 APIs e Serviços

### Custom Hooks para APIs
- `useAPI`: Cliente HTTP configurado
- `useBadgesAPI`: Gerenciamento de badges
- `useGameData`: Dados de gamificação
- `useModuleById`: Módulos específicos
- `usePersonalizedModules`: Conteúdo personalizado
- `useProgressAPI`: Progresso do usuário
- `useUserStats`: Estatísticas do usuário

### Serviços
- `personalizationService`: Personalização de conteúdo
- `localStorage`: Persistência local
- `gameLogic`: Lógica de gamificação

### Endpoints Backend
```
POST /auth/register          # Registro de usuário
POST /auth/login             # Login
GET  /user/stats/:userId     # Estatísticas do usuário
POST /user/progress/complete # Completar lição/módulo
GET  /modules                # Lista de módulos
GET  /badges                 # Badges disponíveis
GET  /ranking                # Ranking global
```

## 🎨 Design System

### Cores Principais
- **Primary**: Azul (#3B82F6) - Elementos principais
- **Secondary**: Roxo (#8B5CF6) - Elementos secundários
- **Success**: Verde (#10B981) - Feedback positivo
- **Warning**: Amarelo (#F59E0B) - Alertas
- **Error**: Vermelho (#EF4444) - Erros

### Animações
- **Framer Motion**: Transições suaves entre telas
- **Micro-interações**: Hover states e feedback visual
- **Loading States**: Spinners e skeletons personalizados

## 🧪 Desenvolvimento

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build de produção
npm run preview  # Preview do build
npm run lint     # Verificação de código
```

### Padrões de Código
- **ESLint**: Configuração para React e TypeScript
- **Prettier**: Formatação automática (se configurado)
- **TypeScript Strict**: Tipagem rigorosa habilitada

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto foi desenvolvido para o Hackathon FIAP. Todos os direitos reservados.

---

<div align="center">

**Desenvolvido com ❤️ para o Hackathon FIAP**

[🔗 Demo](https://seu-link-demo.com) • [📧 Contato](mailto:seu-email@email.com) • [🐛 Report Bug](https://github.com/seu-usuario/issues)

</div>