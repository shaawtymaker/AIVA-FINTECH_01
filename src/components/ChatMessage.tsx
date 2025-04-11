
import React from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChatMessageProps = {
  message: string;
  isBot: boolean;
  animate?: boolean;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, animate = false }) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      animate ? "animate-fade-in" : ""
    )}>
      <div className={cn(
        "flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3",
        isBot ? "bg-finance-purple" : "bg-finance-blue"
      )}>
        {isBot ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className={cn(
        "glass-card p-4 max-w-[80%] text-sm md:text-base",
        isBot ? "bg-finance-purple/10" : "bg-finance-blue/10"
      )}>
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
