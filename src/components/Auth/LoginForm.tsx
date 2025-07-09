import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  User,
  Lock,
  ArrowRight,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { toast } from "sonner";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        await register(email, password);
        toast.success("Conta criada! Faça login para continuar ✨");
        setEmail("");
        setPassword("");
        setIsSignUp(false);
        return;
      } else {
        await login(email, password);
        navigate("/dashboard");
        toast.success("Bem vindo! 🎉");
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        const msg =
          (
            {
              "auth/user-not-found": "Usuário não encontrado.",
              "auth/wrong-password": "Senha incorreta.",
              "auth/invalid-credential": "Senha incorreta.",
              "auth/invalid-email": "Formato de e-mail inválido.",
              "auth/too-many-requests":
                "Muitas tentativas. Tente novamente mais tarde.",
              "auth/email-already-in-use": "E-mail já está em uso.",
              "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
            } as Record<string, string>
          )[err.code] || `Erro: ${err.message}`;
        setError(msg);
      } else {
        setError("Erro inesperado. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    setError("Login social será implementado em breve!");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Purple Gradient with Decorative Elements */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0">
          {/* Organic Shapes */}
          <svg
            className="absolute top-10 left-10 w-20 h-20 text-white opacity-20"
            viewBox="0 0 100 100"
          >
            <path d="M20,50 Q50,20 80,50 Q50,80 20,50" fill="currentColor" />
          </svg>

          <svg
            className="absolute top-1/3 right-20 w-32 h-32 text-white opacity-10"
            viewBox="0 0 100 100"
          >
            <path
              d="M10,30 Q30,10 50,30 Q70,10 90,30 Q70,50 50,30 Q30,50 10,30"
              fill="currentColor"
            />
          </svg>

          <svg
            className="absolute bottom-20 left-1/4 w-24 h-24 text-white opacity-15"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" fill="currentColor" />
          </svg>

          {/* Dotted Pattern */}
          <div className="absolute top-20 right-1/3">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white opacity-30 rounded-full"
                />
              ))}
            </div>
          </div>

          {/* Plus Signs */}
          <div className="absolute top-1/4 left-1/3 text-white opacity-25">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2v20M2 12h20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="absolute bottom-1/3 right-1/4 text-white opacity-25">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 2v20M2 12h20"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Flowing Lines */}
          <svg
            className="absolute bottom-0 left-0 w-full h-64 text-white opacity-10"
            viewBox="0 0 400 200"
          >
            <path
              d="M0,100 Q100,50 200,100 T400,100 L400,200 L0,200 Z"
              fill="currentColor"
            />
          </svg>

          <svg
            className="absolute top-0 right-0 w-64 h-full text-white opacity-5"
            viewBox="0 0 200 400"
          >
            <path
              d="M100,0 Q150,100 100,200 T100,400 L200,400 L200,0 Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm mr-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">EduTech Brasil</h1>
                <p className="text-purple-200">
                  Tecnologia Educacional Brasileira
                </p>
              </div>
            </div>

            <h2 className="text-4xl font-bold mb-6 leading-tight">
              {isSignUp ? "Crie sua conta!" : "Bem-vindo de volta!"}
            </h2>

            <p className="text-lg text-purple-100 mb-8 leading-relaxed">
              {isSignUp
                ? "Junte-se a milhares de educadores brasileiros que já transformaram suas aulas com tecnologia."
                : "Você pode fazer login para acessar sua conta existente e continuar sua jornada de aprendizado."}
            </p>

            <div className="flex items-center space-x-4 text-purple-200">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm">+10.000 professores</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-sm">100% gratuito</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">EduTech Brasil</h1>
            <p className="text-gray-600">Tecnologia Educacional Brasileira</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isSignUp ? "Criar Conta" : "Entrar"}
              </h2>
              <p className="text-gray-600">
                {isSignUp
                  ? "Preencha os dados para criar sua conta"
                  : "Digite suas credenciais para acessar"}
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin("google")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-gray-700 font-medium">
                  Continuar com Google
                </span>
              </button>

              <button
                onClick={() => handleSocialLogin("microsoft")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#F25022" d="M11.4 11.4H0V0h11.4v11.4z" />
                  <path fill="#00A4EF" d="M24 11.4H12.6V0H24v11.4z" />
                  <path fill="#7FBA00" d="M11.4 24H0V12.6h11.4V24z" />
                  <path fill="#FFB900" d="M24 24H12.6V12.6H24V24z" />
                </svg>
                <span className="text-gray-700 font-medium">
                  Continuar com Microsoft
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  {isSignUp ? "Nome de usuário" : "E-mail ou usuário"}
                </label>
                <div className="relative">
                  {isSignUp ? (
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  ) : (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  )}
                  <input
                    id="username"
                    name="username"
                    type={isSignUp ? "text" : "email"}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder={
                      isSignUp
                        ? "Digite seu nome de usuário"
                        : "Digite seu e-mail"
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Lembrar de mim
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <span className="flex items-center">
                    {isSignUp ? "Criar Conta" : "Entrar"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </motion.button>
            </form>

            {/* Toggle between login and signup */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                {isSignUp
                  ? "Já tem uma conta? Faça login"
                  : "Não tem conta? Cadastre-se"}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p className="mb-2">
              🇧🇷{" "}
              <span className="font-medium">
                Feito para educadores brasileiros
              </span>
            </p>
            <p>Plataforma nacional de capacitação tecnológica</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
