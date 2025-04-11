
import React from 'react';
import { Calculator } from 'lucide-react';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import FinancialCalculator from '@/components/FinancialCalculator';

const Resources = () => {
  return (
    <div className="min-h-screen w-full text-white">
      <AnimatedBackground />
      <Navbar />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Financial Calculators</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Interactive tools to help you plan your financial future</p>
          </div>
          
          {/* Calculators Section */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              <FinancialCalculator
                title="Compound Interest Calculator"
                type="compound"
              />
              <FinancialCalculator
                title="Debt Payoff Calculator"
                type="debt"
              />
              <FinancialCalculator
                title="Retirement Savings Calculator"
                type="retirement"
              />
              <FinancialCalculator
                title="Budget Calculator"
                type="budget"
              />
              <FinancialCalculator
                title="Mortgage Calculator"
                type="mortgage"
              />
              <FinancialCalculator
                title="Investment Returns Calculator"
                type="investment"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resources;
