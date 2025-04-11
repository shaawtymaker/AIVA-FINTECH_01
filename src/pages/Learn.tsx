
import React from 'react';
import { ArrowRight, BookOpen, PlayCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Link } from 'react-router-dom';

const topicCategories = [
  {
    title: "Saving Basics",
    topics: [
      "Emergency Funds: Why You Need One",
      "50/30/20 Budgeting Rule Explained",
      "Automating Your Savings: Set It and Forget It"
    ],
    icon: BookOpen,
    color: "bg-finance-purple"
  },
  {
    title: "Investing 101",
    topics: [
      "Understanding Stocks, Bonds, and ETFs",
      "The Power of Compound Interest",
      "Diversification: Don't Put All Eggs in One Basket"
    ],
    icon: PlayCircle,
    color: "bg-finance-blue"
  },
  {
    title: "Debt Management",
    topics: [
      "Strategies to Pay Off Debt Faster",
      "Good Debt vs. Bad Debt: What's the Difference?",
      "How to Improve Your Credit Score"
    ],
    icon: FileText,
    color: "bg-finance-teal"
  }
];

const Learn = () => {
  return (
    <div className="min-h-screen w-full text-white">
      <AnimatedBackground />
      <Navbar />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Financial Education Center</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Expand your financial knowledge with our curated resources and guides</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {topicCategories.map((category, index) => (
              <div key={index} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-start">
                      <ArrowRight size={16} className="mr-2 mt-1 text-white/70" />
                      <a href="#" className="text-white/90 hover:text-white transition-colors hover:underline">
                        {topic}
                      </a>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="mt-4 hover:bg-white/10 w-full justify-between">
                  View All <ArrowRight size={16} />
                </Button>
              </div>
            ))}
          </div>
          
          <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-finance-purple/30 to-finance-blue/30 mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Free Financial Assessment</h2>
                <p className="text-white/70 mb-6">
                  Take our comprehensive financial health check to receive personalized recommendations and a roadmap to improve your finances.
                </p>
                <Button className="bg-finance-purple hover:bg-finance-purple/90">
                  Start Assessment <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
              <div className="bg-black/20 p-6 rounded-xl">
                <h3 className="font-semibold mb-4">You'll receive:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-finance-purple/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Personalized financial score</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-finance-purple/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Custom improvement plan</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-finance-purple/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Priority areas to focus on</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-finance-purple/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Resource recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to learn more?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/5"
                asChild
              >
                <Link to="/investing">
                  Investing Guides
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/5"
                asChild
              >
                <Link to="/resources">
                  Financial Calculators
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/5"
                asChild
              >
                <a href="#">
                  <Download size={16} className="mr-2" /> Free E-Books
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
