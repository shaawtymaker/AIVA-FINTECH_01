
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCog, BadgeIndianRupee, Save, Globe, Bell, Lock, Moon, CreditCard, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

// Form schema
const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  currency: z.string().default("INR"),
  language: z.string().default("en"),
  darkMode: z.boolean().default(true),
  notifications: z.boolean().default(true),
  newsletter: z.boolean().default(false),
  twoFactorAuth: z.boolean().default(false),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Default values for form
  const defaultValues: Partial<ProfileFormValues> = {
    name: "Akarsh Kalapuri",
    email: "akarsh.kalapurmut@gmail.com",
    phone: "+91 9876543210",
    currency: "INR",
    language: "en",
    darkMode: true,
    notifications: true,
    newsletter: false,
    twoFactorAuth: false,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Profile settings updated:", data);
      toast({
        title: "Settings updated",
        description: "Your profile settings have been saved successfully.",
      });
      setIsLoading(false);
    }, 1500);
  }

  return (
    <div className="w-full max-w-4xl mx-auto glass-card rounded-xl overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-finance-purple/20 to-finance-blue/20 p-4 border-b border-white/10">
        <div className="flex items-center">
          <UserCog className="mr-2 h-5 w-5" />
          <h2 className="text-lg font-semibold">Profile Settings</h2>
        </div>
        <p className="text-sm text-white/70">Manage your account preferences</p>
      </div>
      
      <div className="p-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="general" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="INR">
                              <div className="flex items-center">
                                <BadgeIndianRupee className="mr-2 h-4 w-4" />
                                <span>Indian Rupee (₹)</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="USD">
                              <div className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>US Dollar ($)</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="EUR">
                              <div className="flex items-center">
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Euro (€)</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en">
                              <div className="flex items-center">
                                <Globe className="mr-2 h-4 w-4" />
                                <span>English</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="hi">
                              <div className="flex items-center">
                                <Globe className="mr-2 h-4 w-4" />
                                <span>Hindi</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="darkMode"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center">
                              <Moon className="mr-2 h-4 w-4" />
                              Dark Mode
                            </div>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center">
                              <Bell className="mr-2 h-4 w-4" />
                              Push Notifications
                            </div>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="newsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center">
                              <Mail className="mr-2 h-4 w-4" />
                              Email Newsletter
                            </div>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="twoFactorAuth"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            <div className="flex items-center">
                              <Lock className="mr-2 h-4 w-4" />
                              Two-Factor Authentication
                            </div>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Password</h3>
                    <Button variant="outline" type="button" className="w-full">
                      Change Password
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-red-500/10">
                    <h3 className="font-medium mb-2 text-red-400">Danger Zone</h3>
                    <Button variant="destructive" type="button" className="w-full">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <div className="flex justify-end">
                <Button type="submit" className="bg-finance-purple hover:bg-finance-purple/90" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileSettings;
