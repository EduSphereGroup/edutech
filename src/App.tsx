import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Layout/Header";
import LoginForm from "./components/Auth/LoginForm";
import PersonalizedDashboard from "./components/Dashboard/PersonalizedDashboard";
import ModuleView from "./components/Learning/ModuleView";
import PersonalizedModuleView from "./components/Learning/PersonalizedModuleView";
import { Toaster } from "sonner"; // <-- Import do Toaster

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">
            Carregando TeachTech Academy...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/dashboard" element={<PersonalizedDashboard />} />
          <Route path="/modules/:id" element={<ModuleView />} />
          <Route
            path="/personalized-modules/:id"
            element={<PersonalizedModuleView />}
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>

      {/* Toaster global para notificações */}
      <Toaster richColors position="top-center" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
