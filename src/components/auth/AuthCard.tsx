
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthCard: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleForgotPassword = () => {
    // Handle forgot password functionality
    console.log('Navigate to forgot password');
  };

  return (
    <div className="glass-card p-8 rounded-2xl">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h1>
        <p className="text-white/70">
          {isLogin 
            ? "Sign in to continue your financial journey" 
            : "Join thousands improving their financial wellness"}
        </p>
      </div>
      
      <div className="flex mb-6">
        <Button
          variant={isLogin ? "default" : "outline"}
          className={`flex-1 ${isLogin ? "bg-finance-purple" : "bg-transparent border-white/20"}`}
          onClick={() => setIsLogin(true)}
        >
          Sign In
        </Button>
        <Button
          variant={!isLogin ? "default" : "outline"}
          className={`flex-1 ${!isLogin ? "bg-finance-purple" : "bg-transparent border-white/20"}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </Button>
      </div>
      
      {isLogin ? (
        <LoginForm navigateToForgotPassword={handleForgotPassword} />
      ) : (
        <SignupForm />
      )}
    </div>
  );
};

export default AuthCard;
