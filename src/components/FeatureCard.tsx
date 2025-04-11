
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type FeatureCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient?: string;
  delay?: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon,
  title, 
  description,
  gradient = "from-finance-purple to-finance-blue",
  delay = 0
}) => {
  return (
    <div 
      className="glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4",
        gradient
      )}>
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
