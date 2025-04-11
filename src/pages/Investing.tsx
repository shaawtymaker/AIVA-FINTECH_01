
import React from 'react';
import { BarChart3, DollarSign, Percent, TrendingUp, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import FeatureCard from '@/components/FeatureCard';

const investmentTypes = [
  {
    title: "Stocks",
    description: "Individual company shares offering higher potential returns with higher risk.",
    riskLevel: "High",
    minTimeline: "5+ years",
    expectedReturn: "7-10% annually"
  },
  {
    title: "ETFs",
    description: "Exchange-traded funds that bundle many securities for instant diversification.",
    riskLevel: "Medium",
    minTimeline: "3-5 years",
    expectedReturn: "6-8% annually"
  },
  {
    title: "Bonds",
    description: "Fixed-income securities with lower risk but also lower returns.",
    riskLevel: "Low",
    minTimeline: "2+ years",
    expectedReturn: "2-5% annually"
  },
  {
    title: "Real Estate",
    description: "Property investments offering income and potential appreciation.",
    riskLevel: "Medium-High",
    minTimeline: "7+ years",
    expectedReturn: "4-8% annually"
  }
];

const Investing = () => {
  return (
    <div className="min-h-screen w-full text-white">
      <AnimatedBackground />
      <Navbar />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Investing Fundamentals</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Learn the basics of investing and build a portfolio aligned with your goals</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-card p-8 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Why Start Investing?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-lg bg-finance-purple/20 flex items-center justify-center mr-3 mt-1">
                    <TrendingUp size={18} className="text-finance-purple" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Beat Inflation</h3>
                    <p className="text-white/70">Protect your purchasing power as the cost of living increases over time.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-lg bg-finance-blue/20 flex items-center justify-center mr-3 mt-1">
                    <DollarSign size={18} className="text-finance-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Build Wealth</h3>
                    <p className="text-white/70">Grow your money through compound interest and market appreciation.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-lg bg-finance-teal/20 flex items-center justify-center mr-3 mt-1">
                    <Percent size={18} className="text-finance-teal" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Passive Income</h3>
                    <p className="text-white/70">Generate additional income streams through dividends and interest.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
              <ol className="space-y-4 list-decimal list-inside">
                <li className="text-white/90">
                  <span className="font-medium">Set clear financial goals</span>
                  <p className="text-white/70 ml-6 mt-1">Define what you're investing for (retirement, home purchase, etc.) and your timeline.</p>
                </li>
                <li className="text-white/90">
                  <span className="font-medium">Establish your emergency fund first</span>
                  <p className="text-white/70 ml-6 mt-1">Aim for 3-6 months of expenses before investing significantly.</p>
                </li>
                <li className="text-white/90">
                  <span className="font-medium">Determine your risk tolerance</span>
                  <p className="text-white/70 ml-6 mt-1">Be honest about how much volatility you can handle emotionally.</p>
                </li>
                <li className="text-white/90">
                  <span className="font-medium">Start small and consistent</span>
                  <p className="text-white/70 ml-6 mt-1">Regular investments over time often outperform trying to time the market.</p>
                </li>
              </ol>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-8 text-center">Common Investment Types</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {investmentTypes.map((investment, index) => (
              <div 
                key={index} 
                className="glass-card p-6 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h3 className="text-xl font-semibold mb-3">{investment.title}</h3>
                <p className="text-white/70 text-sm mb-4">{investment.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Risk Level:</span>
                    <span className="font-medium">{investment.riskLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Time Horizon:</span>
                    <span className="font-medium">{investment.minTimeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Expected Return:</span>
                    <span className="font-medium">{investment.expectedReturn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass-card p-6 border border-yellow-500/20 bg-yellow-500/5 mb-16">
            <div className="flex items-start">
              <AlertCircle size={24} className="text-yellow-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Investment Risk Disclaimer</h3>
                <p className="text-white/70 text-sm">
                  All investments involve risk and may lose value. The information provided is for educational purposes only and should not be considered financial advice. Always conduct your own research or consult with a qualified financial advisor before making investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investing;
