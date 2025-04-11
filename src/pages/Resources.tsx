
import React from 'react';
import { Calculator, FileText, BookOpen, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';

const Resources = () => {
  return (
    <div className="min-h-screen w-full text-white">
      <AnimatedBackground />
      <Navbar />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Financial Resources</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Tools, calculators, and guides to help you on your financial journey</p>
          </div>
          
          {/* Calculators Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Financial Calculators</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Compound Interest Calculator",
                  description: "See how your investments can grow over time with the power of compound interest."
                },
                {
                  title: "Debt Payoff Calculator",
                  description: "Compare different debt payoff strategies and see how quickly you can become debt-free."
                },
                {
                  title: "Retirement Savings Calculator",
                  description: "Estimate how much you need to save to reach your retirement goals."
                },
                {
                  title: "Budget Calculator",
                  description: "Build a balanced budget based on the 50/30/20 rule for spending and saving."
                },
                {
                  title: "Mortgage Calculator",
                  description: "Calculate monthly payments and total interest for different home loan options."
                },
                {
                  title: "Investment Returns Calculator",
                  description: "Project potential returns for different investment strategies."
                }
              ].map((calculator, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 hover:bg-white/5 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-finance-purple/20 flex items-center justify-center mr-3">
                      <Calculator size={20} className="text-finance-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{calculator.title}</h3>
                      <p className="text-white/70 text-sm">{calculator.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="mt-4 text-sm hover:bg-white/10 w-full justify-between">
                    Use Calculator <ExternalLink size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </section>
          
          {/* Guides Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Financial Guides</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Beginner's Guide to Investing",
                  description: "A comprehensive introduction to investment concepts and strategies.",
                  icon: BookOpen
                },
                {
                  title: "Debt Freedom Roadmap",
                  description: "Step-by-step guide to becoming debt-free and building wealth.",
                  icon: FileText
                },
                {
                  title: "Emergency Fund Builder",
                  description: "How to build and maintain your financial safety net.",
                  icon: BookOpen
                },
                {
                  title: "Retirement Planning Essentials",
                  description: "Key strategies for securing your financial future in retirement.",
                  icon: FileText
                },
                {
                  title: "Home Buying Handbook",
                  description: "Navigate the home buying process from saving to closing.",
                  icon: BookOpen
                },
                {
                  title: "Tax Optimization Strategies",
                  description: "Legal ways to minimize your tax burden and keep more of your money.",
                  icon: FileText
                }
              ].map((guide, index) => (
                <div 
                  key={index} 
                  className="glass-card p-6 hover:bg-white/5 transition-colors animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-finance-blue/20 flex items-center justify-center mr-3">
                      <guide.icon size={20} className="text-finance-blue" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{guide.title}</h3>
                      <p className="text-white/70 text-sm">{guide.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="mt-4 text-sm hover:bg-white/10 w-full justify-between">
                    <Download size={14} className="mr-1" /> Download Guide <ExternalLink size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </section>
          
          {/* Newsletter Section */}
          <section className="glass-card p-8 bg-gradient-to-br from-finance-purple/20 via-finance-blue/20 to-finance-teal/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Get Weekly Financial Tips</h2>
                <p className="text-white/70 mb-2">
                  Join our newsletter for the latest financial education content, market insights, and exclusive resources.
                </p>
                <p className="text-white/50 text-sm mb-6">
                  We'll never spam you or share your information. You can unsubscribe at any time.
                </p>
              </div>
              <div className="flex items-center">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-finance-purple"
                />
                <Button className="bg-finance-purple hover:bg-finance-purple/90 rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resources;
