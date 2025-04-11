
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, PiggyBank, CreditCard, Target, Lightbulb, BookOpen, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';

// Feature content for each subpage
const featuresData = {
  "investment-tracking": {
    title: "Investment Tracking",
    icon: TrendingUp,
    description: "Track all your investments in one place with real-time updates and performance analytics.",
    longDescription: "Our investment tracking tool provides comprehensive oversight of your entire portfolio. With real-time data feeds, performance analytics, and customizable dashboards, you can monitor your investments across stocks, bonds, mutual funds, ETFs, and alternative assets. Set up alerts for price movements, receive regular portfolio analysis, and gain insights into your asset allocation and diversification. The tool also provides historical performance data, helping you understand your investment journey and make better decisions for the future.",
    benefits: [
      "Consolidated view of all investment accounts",
      "Real-time performance tracking with visual graphs",
      "Automatic categorization of assets for better analysis",
      "Customizable alerts for price targets and portfolio changes",
      "Detailed reports on gains, losses, and dividend income"
    ]
  },
  "smart-saving": {
    title: "Smart Saving",
    icon: PiggyBank,
    description: "Intelligent tools that analyze your spending patterns and automatically set aside money for your goals.",
    longDescription: "Our Smart Saving feature uses AI to analyze your income and spending patterns, then automatically allocates funds toward your saving goals. The system adapts to your financial behavior, increasing savings when you have extra funds and reducing when you're tight on budget. You can set multiple saving goals with different timelines and priorities. The AI provides personalized recommendations to optimize your saving strategy, helping you reach your targets faster while maintaining daily financial comfort.",
    benefits: [
      "Automated savings based on AI analysis of your spending patterns",
      "Multiple customizable saving goals with progress tracking",
      "Round-up feature that saves small amounts from everyday purchases",
      "Smart scheduling of savings to align with your income cycle",
      "Predictive analytics showing when you'll reach your goals"
    ]
  },
  "debt-management": {
    title: "Debt Management",
    icon: CreditCard,
    description: "Strategies and tools to help you reduce debt faster and save on interest payments.",
    longDescription: "Our comprehensive Debt Management system helps you take control of your liabilities with strategic planning and optimization. Input all your debts to see them organized by interest rates, balances, and terms. Our algorithms then create customized repayment plans using approaches like the avalanche method (highest interest first) or snowball method (smallest balance first). Track your progress with visual debt reduction charts, receive reminders for upcoming payments, and get alerts about opportunities to refinance at better rates.",
    benefits: [
      "Custom debt repayment strategies optimized for your situation",
      "Visual tracking of debt reduction progress",
      "Interest saving calculations to show the impact of extra payments",
      "Payment reminders and scheduling to avoid late fees",
      "Refinancing opportunity alerts based on your credit profile"
    ]
  },
  "goal-planning": {
    title: "Goal Planning",
    icon: Target,
    description: "Set financial goals and get personalized plans to achieve them, whether it's buying a home or retiring early.",
    longDescription: "Our Goal Planning feature transforms your financial dreams into actionable plans. Whether you're saving for a home, planning for retirement, or funding education, our tool creates detailed roadmaps tailored to your specific objectives. Start by defining your goal amount and timeline, then our system analyzes your current financial situation to develop a structured plan. We break down large goals into manageable milestones and adjust recommendations as your circumstances change, providing continuous guidance on the best investment vehicles and saving strategies for each specific goal.",
    benefits: [
      "Customized plans for any financial goal with specific timelines",
      "Scenario modeling to explore different approaches",
      "Milestone tracking to celebrate progress points",
      "Automatic adjustment of plans when life circumstances change",
      "Tailored investment and saving recommendations for each goal"
    ]
  },
  "financial-education": {
    title: "Financial Education",
    icon: Lightbulb,
    description: "Learn about personal finance, investing, and money management through interactive lessons and guides.",
    longDescription: "Our Financial Education hub offers comprehensive learning resources tailored to your knowledge level and interests. From basic budgeting to advanced investment strategies, our interactive courses combine videos, articles, and practical exercises to build your financial literacy. The content adapts based on your learning progress and financial situation, offering relevant examples and case studies. Complete quizzes to test your understanding, earn certificates as you master topics, and receive personalized learning paths that gradually build your expertise from fundamentals to sophisticated financial concepts.",
    benefits: [
      "Personalized learning paths based on your knowledge level",
      "Interactive courses with practical exercises and real-world examples",
      "Library of articles, videos, and infographics on diverse financial topics",
      "Regular updates on market trends and financial regulations",
      "Community forums to discuss concepts and strategies with peers"
    ]
  },
  "resource-library": {
    title: "Resource Library",
    icon: BookOpen,
    description: "Access templates, calculators, and guides to help with budgeting, investment planning, and more.",
    longDescription: "Our comprehensive Resource Library puts powerful financial tools at your fingertips. Access professionally designed templates for budgeting, investment tracking, and financial planning. Use our suite of calculators to run scenarios for loan payments, retirement savings, investment returns, and tax implications. Browse through detailed guides on topics ranging from first-time home buying to estate planning. All resources are regularly updated to reflect current market conditions, tax laws, and financial best practices, ensuring you always have reliable information for making sound financial decisions.",
    benefits: [
      "Comprehensive collection of financial planning templates",
      "Advanced calculators for various financial scenarios",
      "Step-by-step guides for major financial decisions",
      "Downloadable worksheets and checklists for financial organization",
      "Regular updates to reflect current financial regulations and market conditions"
    ]
  }
};

const FeatureDetailed = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Get feature data based on ID, or default to a not found state
  const feature = featuresData[id as keyof typeof featuresData] || {
    title: "Feature Not Found",
    icon: HelpCircle,
    description: "The feature you're looking for doesn't exist.",
    longDescription: "Please navigate back to the home page and select a valid feature.",
    benefits: []
  };
  
  const Icon = feature.icon;
  
  return (
    <div className="min-h-screen w-full text-foreground">
      <AnimatedBackground />
      <Navbar />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
          
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-finance-purple to-finance-blue flex items-center justify-center mr-6">
                <Icon size={32} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{feature.title}</h1>
                <p className="text-foreground/70 text-lg">{feature.description}</p>
              </div>
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-foreground/90">{feature.longDescription}</p>
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Key Benefits</h3>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-finance-purple/20 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-sm font-semibold text-finance-purple">{index + 1}</span>
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Ready to experience {feature.title}?</h3>
            <Button 
              size="lg" 
              className="bg-finance-purple hover:bg-finance-purple/90"
              asChild
            >
              <a href="/auth">Get Started Today</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureDetailed;
