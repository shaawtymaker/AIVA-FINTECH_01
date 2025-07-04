
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleProps {
  showPassword: boolean;
  toggleVisibility: () => void;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({ showPassword, toggleVisibility }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="absolute right-0 top-0 h-10 w-10 px-3 text-white/50"
      onClick={toggleVisibility}
    >
      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
    </Button>
  );
};

export default PasswordToggle;
