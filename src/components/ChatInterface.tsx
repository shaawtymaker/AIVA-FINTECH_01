
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import { useToast } from '@/components/ui/use-toast';

// Mock financial advice responses
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
  "It's often wise to diversify your investments across different asset classes including stocks, bonds, and real estate."
];

// Mock questions to suggest to the user
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
  "What's the best way to save for my child's education?"
];

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateTyping = (response: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setIsTyping(false);
      setLatestMessageIndex(prev => prev + 1);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setLatestMessageIndex(prev => prev + 1);
    
    // Clear input
    setInputValue('');
    
    // Get random response
    const randomResponse = financialResponses[Math.floor(Math.random() * financialResponses.length)];
    
    // Simulate AI response
    simulateTyping(randomResponse);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessages(prev => [...prev, { text: question, isBot: false }]);
    setLatestMessageIndex(prev => prev + 1);
    
    // Get random response
    const randomResponse = financialResponses[Math.floor(Math.random() * financialResponses.length)];
    
    // Simulate AI response
    simulateTyping(randomResponse);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-xl overflow-hidden shadow-lg h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/20 p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Financial Assistant</h2>
        <p className="text-sm text-white/70">Ask me anything about personal finance</p>
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
