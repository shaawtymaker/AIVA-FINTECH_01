
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

  return (
    <div className="min-h-screen w-full text-white">
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
              className="text-xl text-white/80 mb-8 animate-fade-in"
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
                className="border-white/20 hover:bg-white/5"
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
                    <p className="text-white/70 text-sm">+12.4% this year</p>
                  </div>
                </div>
                
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-finance-purple to-finance-blue rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-white/70">Savings Goal</p>
                    <p className="text-xl font-semibold">$10,000</p>
                    <p className="text-xs text-white/70">$6,540 saved</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-lg">
                    <p className="text-sm text-white/70">Debt Reduction</p>
                    <p className="text-xl font-semibold">-$4,320</p>
                    <p className="text-xs text-white/70">This year</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/30 z-0"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 relative wave-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How FinanceWhisper Helps You</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Personalized guidance and education to improve your financial knowledge and decision-making.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={PiggyBank}
              title="Smart Saving Strategies"
              description="Learn effective techniques to build emergency funds and reach your saving goals faster."
              gradient="from-finance-purple to-finance-blue"
              delay={200}
            />
            <FeatureCard 
              icon={TrendingUp}
              title="Investment Guidance"
              description="Get personalized recommendations for investing based on your goals and risk tolerance."
              gradient="from-finance-blue to-finance-teal"
              delay={400}
            />
            <FeatureCard 
              icon={CreditCard}
              title="Debt Management"
              description="Create actionable plans to pay down debt efficiently and improve your credit score."
              gradient="from-finance-teal to-finance-pink"
              delay={600}
            />
            <FeatureCard 
              icon={Target}
              title="Goal Planning"
              description="Set financial goals and track your progress with customized milestones."
              gradient="from-finance-pink to-finance-purple"
              delay={800}
            />
            <FeatureCard 
              icon={Lightbulb}
              title="Financial Education"
              description="Access easy-to-understand explanations of complex financial concepts."
              gradient="from-finance-purple to-finance-teal"
              delay={1000}
            />
            <FeatureCard 
              icon={BookOpen}
              title="Resource Library"
              description="Browse our curated collection of guides, templates, and calculators."
              gradient="from-finance-blue to-finance-pink"
              delay={1200}
            />
          </div>
        </div>
      </section>
      
      {/* Chat Demo Section */}
      <section className="py-20 px-4 sm:px-6 relative bg-gradient-to-b from-black/30 to-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ask Our AI Financial Assistant</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Get instant answers to your financial questions, personalized advice, and actionable recommendations.</p>
          </div>
          
          {showChat ? (
            <ChatInterface />
          ) : (
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-finance-purple hover:bg-finance-purple/90"
                onClick={() => setShowChat(true)}
              >
                Try the AI Assistant <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto glass-card p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Financial Future?</h2>
          <p className="text-xl text-white/70 mb-8">
            Start your journey to financial wellness with personalized guidance and education.
          </p>
          <Button 
            size="lg" 
            className="bg-finance-purple hover:bg-finance-purple/90"
          >
            Get Started For Free <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-white/50">© 2025 FinanceWhisper. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
