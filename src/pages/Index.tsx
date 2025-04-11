
import React, { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp, PiggyBank, CreditCard, Target, Lightbulb, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import FeatureCard from '@/components/FeatureCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = (scrollY * 0.2).toFixed(2);

  const features = [
    {
      id: "investment-tracking",
      icon: TrendingUp,
      title: "Investment Tracking",
      description: "Track all your investments in one place with real-time updates and performance analytics.",
      gradient: "from-finance-purple to-finance-blue",
      delay: 0
    },
    {
      id: "smart-saving",
      icon: PiggyBank,
      title: "Smart Saving",
      description: "Intelligent tools that analyze your spending patterns and automatically set aside money for your goals.",
      gradient: "from-finance-blue to-finance-teal",
      delay: 100
    },
    {
      id: "debt-management",
      icon: CreditCard,
      title: "Debt Management",
      description: "Strategies and tools to help you reduce debt faster and save on interest payments.",
      gradient: "from-finance-lavender to-finance-purple",
      delay: 200
    },
    {
      id: "goal-planning",
      icon: Target,
      title: "Goal Planning",
      description: "Set financial goals and get personalized plans to achieve them, whether it's buying a home or retiring early.",
      gradient: "from-finance-teal to-finance-blue",
      delay: 300
    },
    {
      id: "financial-education",
      icon: Lightbulb,
      title: "Financial Education",
      description: "Learn about personal finance, investing, and money management through interactive lessons and guides.",
      gradient: "from-finance-purple to-finance-lavender",
      delay: 400
    },
    {
      id: "resource-library",
      icon: BookOpen,
      title: "Resource Library",
      description: "Access templates, calculators, and guides to help with budgeting, investment planning, and more.",
      gradient: "from-finance-blue to-finance-purple",
      delay: 500
    }
  ];

  return (
    <div className="min-h-screen w-full text-foreground">
      <AnimatedBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="z-10">
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in"
              style={{ animationDelay: '200ms' }}
            >
              Your AI Financial <span className="text-gradient">Guide</span>
            </h1>
            <p 
              className="text-xl text-foreground/80 mb-8 animate-fade-in"
              style={{ animationDelay: '400ms' }}
            >
              Personalized financial guidance to help you make better decisions about saving, investing, and managing debt.
            </p>
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-fade-in"
              style={{ animationDelay: '600ms' }}
            >
              <Button 
                size="lg" 
                className="bg-finance-purple hover:bg-finance-purple/90"
                onClick={() => setShowChat(true)}
              >
                Try AI Assistant <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-foreground/20 hover:bg-foreground/5"
                asChild
              >
                <Link to="/learn">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          
          <div 
            className="relative z-10 animate-fade-in"
            style={{ 
              animationDelay: '800ms',
              transform: `translateY(${parallaxOffset}px)` 
            }}
          >
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-finance-purple to-finance-blue"></div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-finance-purple/20 flex items-center justify-center">
                    <TrendingUp className="text-finance-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium">Investment Growth</h3>
                    <p className="text-foreground/70 text-sm">+12.4% this year</p>
                  </div>
                </div>
                
                <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-finance-purple to-finance-blue rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-foreground/5 p-4 rounded-lg">
                    <p className="text-sm text-foreground/70">Savings Goal</p>
                    <p className="text-xl font-semibold">$10,000</p>
                    <p className="text-xs text-foreground/70">$6,540 saved</p>
                  </div>
                  <div className="bg-foreground/5 p-4 rounded-lg">
                    <p className="text-sm text-foreground/70">Debt Reduction</p>
                    <p className="text-xl font-semibold">-$4,320</p>
                    <p className="text-xs text-foreground/70">This year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-background/30 z-0"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 relative wave-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How AIVA Helps You</h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">Personalized guidance and education to improve your financial knowledge and decision-making.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={feature.gradient}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Preview */}
      {showChat ? (
        <section className="py-20 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Talk to Our AI Assistant</h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">Get personalized financial advice and answers to your questions instantly.</p>
              <Button 
                variant="outline" 
                className="mt-4 border-foreground/20" 
                onClick={() => setShowChat(false)}
              >
                Hide Chat
              </Button>
            </div>
            
            <ChatInterface />
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-background to-black/50 dark:from-background dark:to-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Improve Your Financial Future?</h2>
          <p className="text-xl text-foreground/80 mb-8">
            Join thousands of users who are making smarter financial decisions with AIVA.
          </p>
          <Button 
            size="lg" 
            className="bg-finance-purple hover:bg-finance-purple/90"
            asChild
          >
            <Link to="/auth">
              Get Started - It's Free <ArrowRight className="ml-2" size={16} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
