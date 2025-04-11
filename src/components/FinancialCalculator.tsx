
import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface CalculatorProps {
  title: string;
  type: 'compound' | 'debt' | 'retirement' | 'budget' | 'mortgage' | 'investment';
}

const FinancialCalculator: React.FC<CalculatorProps> = ({ title, type }) => {
  const { toast } = useToast();
  const [result, setResult] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Form states for different calculators
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [currentAge, setCurrentAge] = useState<string>('');
  const [retirementAge, setRetirementAge] = useState<string>('');
  const [currentSavings, setCurrentSavings] = useState<string>('');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [housePrice, setHousePrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const handleCalculate = () => {
    setIsCalculating(true);
    
    try {
      let calculatedResult = '';
      
      switch (type) {
        case 'compound':
          if (principal && rate && time) {
            const p = parseFloat(principal);
            const r = parseFloat(rate) / 100;
            const t = parseFloat(time);
            const amount = p * Math.pow(1 + r, t);
            const interest = amount - p;
            calculatedResult = `After ${t} years, your investment of ${formatCurrency(p)} will grow to ${formatCurrency(amount)}. That's a total interest of ${formatCurrency(interest)}.`;
          }
          break;
          
        case 'debt':
          if (principal && rate && monthlyPayment) {
            const debt = parseFloat(principal);
            const interestRate = parseFloat(rate) / 100 / 12;
            const payment = parseFloat(monthlyPayment);
            
            let balance = debt;
            let months = 0;
            
            while (balance > 0 && months < 600) {
              const interestAmount = balance * interestRate;
              const principalAmount = Math.min(payment - interestAmount, balance);
              balance -= principalAmount;
              months++;
            }
            
            const years = Math.floor(months / 12);
            const remainingMonths = months % 12;
            calculatedResult = `It will take ${years} years and ${remainingMonths} months to pay off your debt with a ${formatCurrency(payment)} monthly payment.`;
          }
          break;
          
        case 'retirement':
          if (currentAge && retirementAge && currentSavings && monthlyPayment) {
            const age = parseFloat(currentAge);
            const retireAge = parseFloat(retirementAge);
            const years = retireAge - age;
            const savings = parseFloat(currentSavings);
            const monthlyContribution = parseFloat(monthlyPayment);
            const annualContribution = monthlyContribution * 12;
            
            // Assuming 7% average annual return
            const rate = 0.07;
            let futureValue = savings;
            
            for (let i = 0; i < years; i++) {
              futureValue = futureValue * (1 + rate) + annualContribution;
            }
            
            calculatedResult = `By age ${retireAge}, your retirement savings could grow to approximately ${formatCurrency(futureValue)}.`;
          }
          break;
          
        case 'budget':
          if (monthlyIncome) {
            const income = parseFloat(monthlyIncome);
            const needs = income * 0.5;
            const wants = income * 0.3;
            const savings = income * 0.2;
            
            calculatedResult = `Based on the 50/30/20 rule for monthly income of ${formatCurrency(income)}:
            \n• Needs (50%): ${formatCurrency(needs)}
            \n• Wants (30%): ${formatCurrency(wants)}
            \n• Savings (20%): ${formatCurrency(savings)}`;
          }
          break;
          
        case 'mortgage':
          if (housePrice && downPayment && interestRate && loanTerm) {
            const price = parseFloat(housePrice);
            const down = parseFloat(downPayment);
            const loanAmount = price - down;
            const rate = parseFloat(interestRate) / 100 / 12;
            const term = parseFloat(loanTerm) * 12;
            
            const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
            const totalPaid = monthlyPayment * term;
            const totalInterest = totalPaid - loanAmount;
            
            calculatedResult = `For a ${formatCurrency(loanAmount)} loan:
            \n• Monthly Payment: ${formatCurrency(monthlyPayment)}
            \n• Total Paid: ${formatCurrency(totalPaid)}
            \n• Total Interest: ${formatCurrency(totalInterest)}`;
          }
          break;
          
        case 'investment':
          if (principal && rate && time && monthlyPayment) {
            const initialInvestment = parseFloat(principal);
            const monthlyContribution = parseFloat(monthlyPayment);
            const annualRate = parseFloat(rate) / 100;
            const years = parseFloat(time);
            
            const monthlyRate = annualRate / 12;
            const numPayments = years * 12;
            
            let futureValue = initialInvestment;
            for (let i = 0; i < numPayments; i++) {
              futureValue = futureValue * (1 + monthlyRate) + monthlyContribution;
            }
            
            const totalContributions = initialInvestment + (monthlyContribution * numPayments);
            const interestEarned = futureValue - totalContributions;
            
            calculatedResult = `After ${years} years:
            \n• Future Value: ${formatCurrency(futureValue)}
            \n• Total Contributions: ${formatCurrency(totalContributions)}
            \n• Interest Earned: ${formatCurrency(interestEarned)}`;
          }
          break;
      }
      
      if (calculatedResult) {
        setResult(calculatedResult);
      } else {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields to calculate the result.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "There was an error calculating your results. Please check your inputs.",
        variant: "destructive"
      });
    } finally {
      setIsCalculating(false);
    }
  };
  
  const renderCalculatorInputs = () => {
    switch (type) {
      case 'compound':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Investment ($)</Label>
              <Input 
                id="principal" 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(e.target.value)} 
                placeholder="10000"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input 
                id="rate" 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(e.target.value)} 
                placeholder="7"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Period (years)</Label>
              <Input 
                id="time" 
                type="number" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                placeholder="10"
                className="bg-white/10 text-white"
              />
            </div>
          </>
        );
        
      case 'debt':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="principal">Current Debt Amount ($)</Label>
              <Input 
                id="principal" 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(e.target.value)} 
                placeholder="15000"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input 
                id="rate" 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(e.target.value)} 
                placeholder="18"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
              <Input 
                id="monthlyPayment" 
                type="number" 
                value={monthlyPayment} 
                onChange={(e) => setMonthlyPayment(e.target.value)} 
                placeholder="500"
                className="bg-white/10 text-white"
              />
            </div>
          </>
        );
        
      case 'retirement':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input 
                id="currentAge" 
                type="number" 
                value={currentAge} 
                onChange={(e) => setCurrentAge(e.target.value)} 
                placeholder="30"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retirementAge">Retirement Age</Label>
              <Input 
                id="retirementAge" 
                type="number" 
                value={retirementAge} 
                onChange={(e) => setRetirementAge(e.target.value)} 
                placeholder="65"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentSavings">Current Savings ($)</Label>
              <Input 
                id="currentSavings" 
                type="number" 
                value={currentSavings} 
                onChange={(e) => setCurrentSavings(e.target.value)} 
                placeholder="50000"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">Monthly Contribution ($)</Label>
              <Input 
                id="monthlyPayment" 
                type="number" 
                value={monthlyPayment} 
                onChange={(e) => setMonthlyPayment(e.target.value)} 
                placeholder="500"
                className="bg-white/10 text-white"
              />
            </div>
          </>
        );
        
      case 'budget':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Income ($)</Label>
              <Input 
                id="monthlyIncome" 
                type="number" 
                value={monthlyIncome} 
                onChange={(e) => setMonthlyIncome(e.target.value)} 
                placeholder="5000"
                className="bg-white/10 text-white"
              />
            </div>
          </>
        );
        
      case 'mortgage':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="housePrice">House Price ($)</Label>
              <Input 
                id="housePrice" 
                type="number" 
                value={housePrice} 
                onChange={(e) => setHousePrice(e.target.value)} 
                placeholder="300000"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="downPayment">Down Payment ($)</Label>
              <Input 
                id="downPayment" 
                type="number" 
                value={downPayment} 
                onChange={(e) => setDownPayment(e.target.value)} 
                placeholder="60000"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input 
                id="interestRate" 
                type="number" 
                value={interestRate} 
                onChange={(e) => setInterestRate(e.target.value)} 
                placeholder="5.5"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTerm">Loan Term (years)</Label>
              <Input 
                id="loanTerm" 
                type="number" 
                value={loanTerm} 
                onChange={(e) => setLoanTerm(e.target.value)} 
                placeholder="30"
                className="bg-white/10 text-white"
              />
            </div>
          </>
        );
        
      case 'investment':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="principal">Initial Investment ($)</Label>
              <Input 
                id="principal" 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(e.target.value)} 
                placeholder="10000"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Annual Interest Rate (%)</Label>
              <Input 
                id="rate" 
                type="number" 
                value={rate} 
                onChange={(e) => setRate(e.target.value)} 
                placeholder="7"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time Period (years)</Label>
              <Input 
                id="time" 
                type="number" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                placeholder="20"
                className="bg-white/10 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">Monthly Contribution ($)</Label>
              <Input 
                id="monthlyPayment" 
                type="number" 
                value={monthlyPayment} 
                onChange={(e) => setMonthlyPayment(e.target.value)} 
                placeholder="500"
                className="bg-white/10 text-white"
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="glass-card p-6 hover:bg-white/5 transition-colors animate-fade-in">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-lg bg-finance-purple/20 flex items-center justify-center mr-3">
          <Calculator size={20} className="text-finance-purple" />
        </div>
        <div>
          <h3 className="font-semibold mb-1">{title}</h3>
        </div>
      </div>
      
      <div className="mt-4 space-y-4">
        {renderCalculatorInputs()}
        
        <Button 
          onClick={handleCalculate} 
          className="w-full bg-finance-purple hover:bg-finance-purple/90 mt-4"
          disabled={isCalculating}
        >
          {isCalculating ? 'Calculating...' : 'Calculate'}
        </Button>
        
        {result && (
          <div className="bg-white/10 p-4 rounded-md mt-4">
            <h4 className="font-medium mb-2">Result:</h4>
            <p className="text-white/80 whitespace-pre-line">{result}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default FinancialCalculator;
