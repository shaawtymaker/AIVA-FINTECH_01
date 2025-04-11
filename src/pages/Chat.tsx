
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ChatInterface from '@/components/ChatInterface';
import AnimatedBackground from '@/components/AnimatedBackground';
import ProfileSettings from '@/components/ProfileSettings';
import { UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chat = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <div className="min-h-screen w-full text-white">
      <AnimatedBackground />
      <Navbar />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-2">AI Financial Assistant</h1>
              <p className="text-white/70">Ask any question about personal finance, investing, or money management</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(!showSettings)} 
              className="border-white/20 hover:bg-white/5"
            >
              <UserCog className="mr-2 h-4 w-4" />
              Profile Settings
            </Button>
          </div>
          
          {showSettings ? <ProfileSettings /> : <ChatInterface />}
        </div>
      </div>
    </div>
  );
};

export default Chat;
