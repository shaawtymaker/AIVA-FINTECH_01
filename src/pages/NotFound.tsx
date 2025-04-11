
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <AnimatedBackground />
      <div className="text-center glass-card p-10 max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-white/80 mb-8">Oops! This financial path doesn't exist</p>
        <Button asChild className="bg-finance-purple hover:bg-finance-purple/90">
          <Link to="/" className="inline-flex items-center">
            <Home size={18} className="mr-2" /> Return to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
