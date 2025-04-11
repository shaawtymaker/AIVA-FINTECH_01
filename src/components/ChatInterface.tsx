
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import { useToast } from '@/components/ui/use-toast';

// Expanded financial advice responses
const financialResponses = [
  "I recommend starting with an emergency fund that covers 3-6 months of expenses before focusing on investments.",
  "For a beginner investor, a diversified ETF that tracks the total market is often a good starting point.",
  "When tackling debt, consider the avalanche method (highest interest first) or the snowball method (smallest balance first).",
  "A good rule of thumb is to save at least 15-20% of your income for retirement, starting as early as possible.",
  "Before investing, make sure you're maximizing any employer 401(k) match as that's essentially free money.",
  "Consider keeping your emergency fund in a high-yield savings account that offers better interest than traditional savings.",
  "Dollar-cost averaging—investing a fixed amount regularly—can help reduce the impact of market volatility.",
  "For homebuying, aim to save at least 20% for a down payment to avoid private mortgage insurance (PMI).",
  "When you're young, you can generally afford to take on more investment risk since you have time to recover from market downturns.",
  "It's often wise to diversify your investments across different asset classes including stocks, bonds, and real estate.",
  "Paying off high-interest debt should typically be prioritized over investing, with the exception of retirement accounts with employer matching.",
  "A Roth IRA can be advantageous if you expect to be in a higher tax bracket in retirement than you are now.",
  "For short-term goals (1-3 years), consider more conservative investments like high-yield savings accounts or short-term CDs.",
  "The rule of 72 is a simple way to estimate how long it will take your money to double: divide 72 by your expected annual return percentage.",
  "Rebalancing your portfolio annually helps maintain your desired asset allocation and risk level.",
  "Consider tax-efficient investing strategies, such as holding tax-inefficient investments in tax-advantaged accounts.",
  "When choosing between paying off a mortgage early or investing, compare your mortgage interest rate to potential investment returns.",
  "Setting up automatic transfers to savings and investment accounts can help enforce financial discipline.",
  "For college savings, consider tax-advantaged accounts like 529 plans or Coverdell Education Savings Accounts.",
  "Reviewing your insurance coverage (health, life, disability, property) is an important part of a comprehensive financial plan."
];

// Expanded suggested questions
const suggestedQuestions = [
  "How do I start investing with limited income?",
  "What's the best way to pay off student loans?",
  "How much should I save for retirement?",
  "Should I pay off debt or invest first?",
  "How do I build an emergency fund?",
  "What are the best ways to improve my credit score?",
  "How do I create a personal budget?",
  "What's the difference between a Roth IRA and Traditional IRA?",
  "How much house can I afford to buy?",
  "What's the best way to save for my child's education?",
  "How should I invest during high inflation?",
  "What's the 4% retirement withdrawal rule?",
  "How do I start investing in real estate?",
  "What's dollar-cost averaging and why is it important?",
  "How do I calculate my net worth?",
  "What are index funds and why are they recommended?",
  "How do I prepare financially for having a baby?",
  "What's the best strategy for paying off multiple debts?",
  "How do I financially prepare for a recession?",
  "What's the best way to save for a down payment on a house?"
];

// Topics for quick selection
const quickTopics = [
  "Budgeting",
  "Investing",
  "Debt",
  "Retirement",
  "Saving",
  "Credit Score",
  "Real Estate",
  "Taxes",
  "Insurance",
  "Education"
];

// For personalized responses
const personalizedResponses = {
  budgeting: "Creating a budget starts with tracking your expenses. Try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
  investing: "For beginners, I recommend starting with low-cost index funds that track the entire market. Services like Vanguard, Fidelity, or Schwab offer excellent options with minimal fees.",
  debt: "When tackling multiple debts, focus on either high-interest debts first (avalanche method) or small balances first for quick wins (snowball method). Both approaches work, but the avalanche method typically saves more on interest.",
  retirement: "The general rule is to save 15-20% of your income for retirement. Start with your employer's 401(k) if they offer matching contributions, then consider maxing out an IRA.",
  saving: "For effective saving, automate transfers to a separate account on payday before you can spend the money. High-yield savings accounts are great for emergency funds and short-term goals."
};

type Message = {
  text: string;
  isBot: boolean;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! I'm your AI financial assistant. How can I help you today?", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [latestMessageIndex, setLatestMessageIndex] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // More sophisticated response generator
  const generateResponse = (userMessage: string) => {
    // Check for topic-specific keywords for more targeted responses
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes("budget") || lowerCaseMessage.includes("spending")) {
      return personalizedResponses.budgeting;
    } else if (lowerCaseMessage.includes("invest") || lowerCaseMessage.includes("stock") || lowerCaseMessage.includes("etf")) {
      return personalizedResponses.investing;
    } else if (lowerCaseMessage.includes("debt") || lowerCaseMessage.includes("loan") || lowerCaseMessage.includes("credit card")) {
      return personalizedResponses.debt;
    } else if (lowerCaseMessage.includes("retire") || lowerCaseMessage.includes("401k") || lowerCaseMessage.includes("ira")) {
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
      case 'budgeting':
        response = personalizedResponses.budgeting;
        break;
      case 'investing':
        response = personalizedResponses.investing;
        break;
      case 'debt':
        response = personalizedResponses.debt;
        break;
      case 'retirement':
        response = personalizedResponses.retirement;
        break;
      case 'saving':
        response = personalizedResponses.saving;
        break;
      default:
        response = financialResponses[Math.floor(Math.random() * financialResponses.length)];
    }
    
    // Simulate AI response
    simulateTyping(response);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-xl overflow-hidden shadow-lg h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/20 p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Financial Assistant</h2>
        <p className="text-sm text-white/70">Ask me anything about personal finance</p>
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
