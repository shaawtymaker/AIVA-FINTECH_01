
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BadgeIndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import { useToast } from '@/hooks/use-toast';

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
  "What's the best way to save for my child's education in India?"
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('http://192.168.90.76:8080/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'hermes-3-llama-3.1-8b',
          messages: [
            {
              role: 'system',
              content: 'You are AIVA (Artificial Intelligence Value Assistant), a financial advisor specialized in Indian financial markets and personal finance. Provide advice that is specific to Indian context, mentioning relevant details like PPF, ELSS, NSE, BSE, RBI policies, Indian tax laws, etc. Keep responses concise and focused on financial advice. Always mention amounts in ₹ (Rupees) when discussing money.'
            },
            ...messages.map(msg => ({
              role: msg.isBot ? 'assistant' : 'user',
              content: msg.text
            })),
            {
              role: 'user',
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling local LLM:', error);
      toast({
        title: "Connection Error",
        description: "Could not connect to local LLM server. Please check if it's running.",
        variant: "destructive"
      });
      return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please check if the local LLM server is running at http://192.168.90.76:8080.";
    }
  };

  const simulateTyping = async (userMessage: string) => {
    setIsTyping(true);
    
    try {
      const response = await generateResponse(userMessage);
      
      setMessages(prev => [...prev, { text: response, isBot: true }]);
      setLatestMessageIndex(prev => prev + 1);
    } catch (error) {
      console.error('Error generating response:', error);
      
      setMessages(prev => [...prev, { 
        text: "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.", 
        isBot: true 
      }]);
      setLatestMessageIndex(prev => prev + 1);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setLatestMessageIndex(prev => prev + 1);
    
    // Clear input
    setInputValue('');
    
    // Generate response from local LLM
    simulateTyping(inputValue);
  };

  const handleSuggestedQuestion = (question: string) => {
    setMessages(prev => [...prev, { text: question, isBot: false }]);
    setLatestMessageIndex(prev => prev + 1);
    
    // Generate response from local LLM
    simulateTyping(question);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    
    // Add user message about the topic
    const message = `Tell me about ${topic.toLowerCase()}`;
    setMessages(prev => [...prev, { text: message, isBot: false }]);
    setLatestMessageIndex(prev => prev + 1);
    
    // Generate response from local LLM
    simulateTyping(message);
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-xl overflow-hidden shadow-lg h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/20 p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold flex items-center">
              <BadgeIndianRupee className="mr-2 h-5 w-5" />
              AIVA - Financial Assistant
            </h2>
            <p className="text-sm text-white/70">Ask me anything about personal finance in India</p>
          </div>
          <div className="text-xs text-white/50">
            Powered by Hermes-3-Llama-3.1-8b
          </div>
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
