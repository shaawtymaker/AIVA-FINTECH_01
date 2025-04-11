
import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FinancialArticleProps {
  title: string;
  icon: React.ReactNode;
  summary: string;
  content: string[];
}

const FinancialArticle: React.FC<FinancialArticleProps> = ({ 
  title, 
  icon, 
  summary,
  content 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="glass-card p-6 hover:bg-white/5 transition-colors">
      <div className="flex items-start">
        <div className="h-12 w-12 rounded-lg bg-finance-purple/20 flex items-center justify-center mr-3">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-white/70 mb-4">{summary}</p>
          
          {isExpanded && (
            <div className="mt-4 space-y-4 bg-white/5 p-4 rounded-lg">
              {content.map((paragraph, index) => (
                <p key={index} className="text-white/90">{paragraph}</p>
              ))}
            </div>
          )}
          
          <Button 
            variant="ghost" 
            className="mt-2 hover:bg-white/10"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <>
                <ChevronUp size={16} className="mr-1" /> Read Less
              </>
            ) : (
              <>
                <ChevronDown size={16} className="mr-1" /> Read More
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FinancialArticle;
