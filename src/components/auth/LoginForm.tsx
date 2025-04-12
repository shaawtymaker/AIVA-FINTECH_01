
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import PasswordToggle from './PasswordToggle';

// Form schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

interface LoginFormProps {
  navigateToForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ navigateToForgotPassword }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  // Login form
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;
      
      toast({
        title: "Login successful",
        description: "Welcome back to FinanceWhisper!",
      });
      
      // Redirect happens automatically via the auth listener
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input 
                    placeholder="Your email address" 
                    className="pl-10 bg-background text-foreground" 
                    type="email"
                    {...field} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password" 
                    className="pl-10 pr-10 bg-background text-foreground" 
                    {...field} 
                  />
                  <PasswordToggle 
                    showPassword={showPassword} 
                    toggleVisibility={togglePasswordVisibility} 
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button 
            type="button" 
            variant="link" 
            className="text-white/70 hover:text-white"
            onClick={navigateToForgotPassword}
          >
            Forgot password?
          </Button>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-finance-purple hover:bg-finance-purple/90"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent mr-2" />
              Signing In...
            </>
          ) : (
            <>
              Sign In <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
