
import React from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import AnimatedBackground from '@/components/AnimatedBackground';

const Chat = () => {
  return (
    <div className="min-h-screen w-full text-white">
      <AnimatedBackground />
      <Navbar />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">AIVA Financial Assistant</h1>
            <p className="text-xs text-white/50 mb-2">Artificial Intelligence Value Assistant</p>
            <p className="text-white/70">Ask any question about personal finance, investing, or money management</p>
          </div>
          
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Chat;
