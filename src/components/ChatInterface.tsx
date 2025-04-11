
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BadgeIndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import { useToast } from '@/components/ui/use-toast';

// Expanded financial advice responses with Indian Rupee context
const financialResponses = [
  "I recommend starting with an emergency fund that covers 3-6 months of expenses before focusing on investments. For an average Indian household, that's about ₹2-5 lakhs.",
  "For a beginner investor in India, consider index funds tracking Nifty 50 or low-cost mutual funds as a starting point.",
  "When tackling debt in India, focus on high-interest loans first - personal loans and credit cards often have interest rates of 12-24% which should be prioritized.",
  "Consider tax-saving investment options in India like ELSS funds, PPF, or NPS that can help you save under Section 80C of the Income Tax Act.",
  "Before investing, make sure you're maximizing your employer's EPF contribution as that's essentially free money with tax benefits.",
  "Small savings schemes in India like PPF and Sukanya Samriddhi Yojana offer government-backed security with decent returns.",
  "SIPs (Systematic Investment Plans) in mutual funds are an excellent way for Indians to build wealth through disciplined monthly investments.",
  "For homebuying in India, aim to save at least 20% for a down payment to get better loan terms. Also factor in 5-7% for registration and other charges.",
  "Young investors in India should consider equity-heavy portfolios as they have time to recover from market volatility.",
  "It's wise to diversify investments across different asset classes including equity, debt, gold, and real estate - which is particularly important in the Indian context.",
  "Health insurance should be a priority for Indians before investing heavily, considering the high cost of medical treatment. Aim for at least ₹5-10 lakhs of coverage.",
  "Consider opening a NPS (National Pension System) account for retirement planning with additional tax benefits beyond the ₹1.5 lakh 80C limit.",
  "For short-term goals (1-3 years), consider more conservative investments like bank FDs or debt funds in India.",
  "Review your tax-saving investments annually before the March 31st deadline to maximize deductions under various sections of the Income Tax Act.",
  "Term insurance should be one of your first financial steps - aim for coverage of at least 10-15 times your annual income in India.",
  "ULIPs (Unit Linked Insurance Plans) combine insurance and investment but often have high charges. Evaluate them carefully against separate insurance and investment options.",
  "RBI bonds and government securities can provide stable, guaranteed returns for conservative investors or retirees in India.",
  "Setting up auto-debits for SIPs and recurring deposits can help enforce financial discipline for Indian investors.",
  "For your child's education in India, start saving early with options like Sukanya Samriddhi Yojana (for girl child) or education-focused mutual funds.",
  "Senior citizens in India should look at the Senior Citizens Savings Scheme (SCSS) and PM Vaya Vandana Yojana for stable returns with higher interest rates."
];

// India-specific suggested questions
const suggestedQuestions = [
  "How do I start investing in the Indian stock market?",
  "What's the best way to save tax in India?",
  "How much should I save for retirement in India?",
  "Should I invest in PPF or ELSS for tax saving?",
  "How do I build an emergency fund in India?",
  "What are the best ways to improve my credit score in India?",
  "How do I create a personal budget in rupees?",
  "What's the difference between ELSS and PPF for tax saving?",
  "How much home loan can I afford in India?",
  "What's the best way to save for my child's education in India?",
  "How should I invest during high inflation in India?",
  "What are liquid funds and how do they work?",
  "How do I start investing in real estate in India?",
  "What are SIPs and why are they recommended?",
  "How do I calculate my net worth in rupees?",
  "What are index funds and which ones are good in India?",
  "How do I financially prepare for having a baby in India?",
  "What's the best strategy for paying off multiple loans?",
  "How do I financially prepare for a recession?",
  "What's the best way to save for a down payment on a house in India?"
];

// India-specific topics for quick selection
const quickTopics = [
  "Tax Saving",
  "SIPs",
  "Mutual Funds",
  "Real Estate",
  "PPF & EPF",
  "Credit Score",
  "Stock Market",
  "Insurance",
  "Gold",
  "Fixed Deposits"
];

// India-specific personalized responses
const personalizedResponses = {
  budgeting: "Creating a budget in India starts with tracking your expenses. Try the 50/30/20 rule: 50% for needs (about ₹25,000 from a ₹50,000 monthly income), 30% for wants (₹15,000), and 20% for savings and debt repayment (₹10,000).",
  investing: "For beginners in India, I recommend starting with SIPs in equity mutual funds. Consider index funds like UTI Nifty Index Fund or HDFC Index Fund that track the market with minimal fees around 0.10-0.20%.",
  debt: "When tackling multiple debts in India, focus on high-interest loans first. Credit card debt at 36-42% should be cleared before personal loans at 10-16%, which should be prioritized over home loans at 6.5-9%.",
  retirement: "For retirement in India, aim to save at least 15-20% of your income. Start with EPF through your employer, then consider voluntary NPS contributions for additional tax benefits under Section 80CCD(1B).",
  saving: "For effective saving in India, set up automatic transfers to RDs (Recurring Deposits) or SIPs right after salary credit. Consider debt funds for emergency funds rather than regular savings accounts for better returns."
};

// Advanced market insights with India-specific context
const marketInsights = [
  "The RBI's recent policy decisions suggest a stable interest rate environment in the medium term, which may benefit debt mutual funds.",
  "The Indian equity markets have shown resilience despite global volatility, with mid and small-cap segments outperforming large caps over the last quarter.",
  "Gold prices in India have increased by approximately 15% year-on-year, suggesting a potential hedge against inflation and currency fluctuation.",
  "The real estate market in tier-2 Indian cities is showing stronger growth than metropolitan areas, indicating potential investment opportunities.",
  "Recent tax regulations on debt mutual funds have reduced their tax advantage, making equity investments comparatively more attractive for long-term investors.",
  "FD rates have increased in recent months, with some banks offering special rates of up to 7.5% for specific tenures, making them worth reconsidering.",
  "The depreciation of the Indian Rupee against the USD presents both challenges and opportunities - increasing the appeal of export-oriented sectors for investment.",
  "Recent SEBI regulations have strengthened investor protections in mutual funds, particularly around debt fund liquidity management.",
  "Digital payment growth continues to accelerate in India, suggesting potential investment opportunities in fintech and financial inclusion sectors.",
  "The green energy transition is creating new investment avenues in India, with significant government incentives for clean energy projects and technologies."
];

type Message = {
  text: string;
  isBot: boolean;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "नमस्ते! I'm your AI financial assistant. How can I help you with your finances today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [latestMessageIndex, setLatestMessageIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showMarketInsights, setShowMarketInsights] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // More sophisticated response generator with Indian context
  const generateResponse = (userMessage: string) => {
    // Check for topic-specific keywords for more targeted responses
    const lowerCaseMessage = userMessage.toLowerCase();
    
    // First check for advanced market analysis request
    if (lowerCaseMessage.includes("market") || lowerCaseMessage.includes("trend") || 
        lowerCaseMessage.includes("economy") || lowerCaseMessage.includes("outlook")) {
      return "Based on current market analysis: " + marketInsights[Math.floor(Math.random() * marketInsights.length)];
    }
    // Check for specific Indian financial instruments
    else if (lowerCaseMessage.includes("sip") || lowerCaseMessage.includes("mutual fund")) {
      return "For SIPs and mutual funds in India: " + personalizedResponses.investing;
    }
    else if (lowerCaseMessage.includes("ppf") || lowerCaseMessage.includes("epf") || lowerCaseMessage.includes("nps")) {
      return "Government-backed investment schemes like PPF offer tax benefits under Section 80C with current interest rates around 7.1%. They provide guaranteed returns with a 15-year lock-in, making them ideal for long-term goals with tax-free withdrawals after maturity.";
    }
    else if (lowerCaseMessage.includes("tax") || lowerCaseMessage.includes("80c") || lowerCaseMessage.includes("saving")) {
      return "For tax planning in India, utilize the full ₹1.5 lakh limit under Section 80C through a mix of ELSS funds (equity exposure with just 3-year lock-in), PPF (for guaranteed returns), and EPF (automatic through employer). Also consider additional deductions under 80D for health insurance, 80CCD(1B) for NPS, and 80EEA for first-time home buyers.";
    }
    // Then check for general financial topics
    else if (lowerCaseMessage.includes("budget") || lowerCaseMessage.includes("spending")) {
      return personalizedResponses.budgeting;
    } else if (lowerCaseMessage.includes("invest") || lowerCaseMessage.includes("stock") || lowerCaseMessage.includes("equity")) {
      return personalizedResponses.investing;
    } else if (lowerCaseMessage.includes("debt") || lowerCaseMessage.includes("loan") || lowerCaseMessage.includes("credit card")) {
      return personalizedResponses.debt;
    } else if (lowerCaseMessage.includes("retire") || lowerCaseMessage.includes("pension")) {
      return personalizedResponses.retirement;
    } else if (lowerCaseMessage.includes("save") || lowerCaseMessage.includes("emergency fund")) {
      return personalizedResponses.saving;
    } else {
      // If no specific keywords match, use a random response
      return financialResponses[Math.floor(Math.random() * financialResponses.length)];
    }
  };

  const simulateTyping = (response: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking time - varies by response length for realism
    const thinkTime = Math.min(1000 + response.length * 10, 3000);
    
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
      setLatestMessageIndex(prev => prev + 1);
    }, thinkTime);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setLatestMessageIndex(prev => prev + 1);
    
    // Clear input
    setInputValue('');
    
    // Generate personalized response
    const response = generateResponse(inputValue);
    
    // Simulate AI response
    simulateTyping(response);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessages(prev => [...prev, { text: question, isBot: false }]);
    setLatestMessageIndex(prev => prev + 1);
    
    // Generate personalized response
    const response = generateResponse(question);
    
    // Simulate AI response
    simulateTyping(response);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    
    // Add user message about the topic
    const message = `Tell me about ${topic.toLowerCase()}`;
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setLatestMessageIndex(prev => prev + 1);
    
    // Get the appropriate response for the topic
    let response = '';
    
    switch(topic.toLowerCase()) {
      case 'tax saving':
        response = "For tax savings in India, consider these options: ELSS mutual funds (Section 80C, 3-year lock-in), PPF (80C, 15-year lock-in, ~7.1% interest), NPS (additional ₹50,000 under 80CCD(1B)), health insurance premiums (Section 80D, up to ₹25,000 for self, additional for parents), and home loan interest (Section 24, up to ₹2 lakh).";
        break;
      case 'sips':
        response = "SIPs (Systematic Investment Plans) are a disciplined approach to investing in Indian mutual funds with as little as ₹500 monthly. They offer rupee-cost averaging, reducing impact of market volatility, and can be started online through AMCs or investment platforms like Groww, Zerodha, or Kuvera.";
        break;
      case 'mutual funds':
        response = "Mutual funds in India are categorized as Equity, Debt, Hybrid, and Solution-oriented. For beginners, consider large-cap index funds like UTI Nifty Index Fund or HDFC Nifty 50 ETF. For tax efficiency, ELSS funds offer Section 80C benefits with only a 3-year lock-in period. Always check the expense ratio (ideally below 1%) and fund manager's track record.";
        break;
      case 'real estate':
        response = "In the Indian real estate market, consider RERA-registered properties only. For investment, rental yields average 2-3% in major cities, with potential capital appreciation of 5-10% annually in growing areas. REITs offer a more liquid alternative with lower entry barriers (starting from ~₹10,000). Factor in property tax, maintenance costs, and stamp duty (5-7%) when calculating returns.";
        break;
      case 'ppf & epf':
        response = "PPF offers tax-free interest (~7.1%) with 15-year lock-in and Section 80C benefits. You can invest ₹500-1.5 lakh yearly with limited withdrawal options after 5 years. EPF has mandatory 12% contribution from your basic salary with matching employer contribution, currently earning ~8.15%. Both offer EEE (Exempt-Exempt-Exempt) tax status, making them excellent long-term savings vehicles.";
        break;
      case 'credit score':
        response = "In India, maintain a credit score above 750 (out of 900) for the best loan terms. Check your CIBIL score for free annually. Pay credit card bills in full by due date, keep credit utilization below 30%, avoid multiple loan applications in short periods, and maintain a mix of secured and unsecured credit. Regularly review your credit report for errors through the CIBIL dispute resolution system.";
        break;
      case 'stock market':
        response = "To start investing in the Indian stock market, open a demat account with brokers like Zerodha, Upstox, or Groww. Consider beginning with blue-chip companies in Nifty 50 or index ETFs. Use the NSE website for market education and SEBI guidelines. For taxation, equity investments held over one year attract 10% LTCG tax above ₹1 lakh annual profits, while short-term gains are taxed at your income slab rate.";
        break;
      case 'insurance':
        response = "In India, prioritize term life insurance (10-15x annual income) and health insurance (minimum ₹5-10 lakhs for a family) before investment-linked policies. Look for claim settlement ratios above 95% for life insurance and 85% for health insurance. Consider riders like critical illness and accidental disability based on your profile. For health insurance, check for sub-limits, waiting periods, and network hospitals before purchasing.";
        break;
      case 'gold':
        response = "For gold investment in India, consider Sovereign Gold Bonds (offering 2.5% annual interest plus gold price appreciation, with tax-free returns if held till maturity) or Gold ETFs (more liquid, with minimal making charges). Digital gold through platforms like PhonePe or Groww offers flexibility with small amounts, while physical gold incurs making charges (8-25%) and storage concerns. Gold mutual funds provide professional management with SIP options.";
        break;
      case 'fixed deposits':
        response = "Bank FDs in India currently offer 5.5-7.5% interest rates, with small finance banks and some private banks offering higher rates. Senior citizens get an additional 0.25-0.5%. For tax efficiency, consider 5-year tax-saving FDs under Section 80C. Company FDs offer higher returns (8-9%) but with increased risk - check company ratings (AA or above is preferable). FD interest is taxable at your income slab rate, making them less tax-efficient than certain alternatives.";
        break;
      default:
        response = financialResponses[Math.floor(Math.random() * financialResponses.length)];
    }
    
    // Simulate AI response
    simulateTyping(response);
  };
  
  const toggleMarketInsights = () => {
    setShowMarketInsights(!showMarketInsights);
    
    if (!showMarketInsights) {
      // If turning on market insights, add a message
      const insight = marketInsights[Math.floor(Math.random() * marketInsights.length)];
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          text: "Here's today's market insight: " + insight, 
          isBot: true 
        }]);
        setLatestMessageIndex(prev => prev + 1);
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-xl overflow-hidden shadow-lg h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/20 p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center">
              <BadgeIndianRupee className="mr-2 h-5 w-5" />
              Financial Assistant
            </h2>
            <p className="text-sm text-white/70">Ask me anything about personal finance in India</p>
          </div>
          <Button
            variant="outline" 
            size="sm"
            onClick={toggleMarketInsights}
            className={showMarketInsights ? "bg-finance-purple/20" : "bg-white/5"}
          >
            {showMarketInsights ? "Market Insights: ON" : "Market Insights: OFF"}
          </Button>
        </div>
      </div>
      
      {/* Topic selectors */}
      <div className="bg-black/30 p-3 border-b border-white/10 overflow-x-auto">
        <div className="flex space-x-2">
          {quickTopics.map((topic, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-xs whitespace-nowrap transition-colors ${
                selectedTopic === topic 
                  ? 'bg-finance-purple text-white' 
                  : 'bg-white/5 hover:bg-white/10 text-white/80'
              }`}
              onClick={() => handleTopicSelect(topic)}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index} 
            message={msg.text} 
            isBot={msg.isBot} 
            animate={index === latestMessageIndex}
          />
        ))}
        
        {isTyping && (
          <div className="flex items-center text-white/70 animate-pulse">
            <div className="bg-finance-purple h-8 w-8 rounded-full flex items-center justify-center mr-3">
              <Bot size={16} />
            </div>
            <div className="glass-card p-4">
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="h-2 w-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-white/10 bg-black/30">
        <div className="mb-4">
          <p className="text-sm text-white/70 mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <button
                key={index}
                className="text-xs bg-white/5 hover:bg-white/10 rounded-full px-3 py-1 transition-colors"
                onClick={() => handleSuggestedQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a financial question..."
            className="flex-1 bg-white/5 border-white/10 focus:border-finance-purple"
          />
          <Button 
            type="submit" 
            className="bg-finance-purple hover:bg-finance-purple/90"
            disabled={isTyping}
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
