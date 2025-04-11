import React from 'react';
import { BookOpen, PlayCircle, FileText, Landmark, CreditCard, PiggyBank, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import DownloadGuide from '@/components/DownloadGuide';
import FinancialArticle from '@/components/FinancialArticle';
import { Link } from 'react-router-dom';

// Financial Articles Content
const financialArticles = [
  {
    title: "Emergency Funds: Why You Need One",
    icon: <PiggyBank size={24} className="text-finance-purple" />,
    summary: "Learn why having an emergency fund is crucial for financial stability and how to build one.",
    content: [
      "An emergency fund is a financial safety net designed to cover unexpected expenses or financial emergencies without derailing your budget or forcing you into debt.",
      "Financial experts typically recommend saving 3-6 months of essential expenses in an emergency fund. This provides a buffer against job loss, medical emergencies, urgent home repairs, or other unexpected financial shocks.",
      "To build your emergency fund, start by setting a realistic savings goal based on your monthly expenses. Even if you can only save a small amount each month, consistency is key. Consider automating transfers to your emergency fund on payday so you don't have to think about it.",
      "Keep your emergency fund in an accessible but separate account from your checking account. A high-yield savings account is ideal as it provides some return while keeping your money liquid and available when needed.",
      "Remember, an emergency fund should only be used for true emergencies – not vacations, holiday shopping, or non-essential purchases. With a proper emergency fund in place, you can face financial uncertainties with greater confidence and peace of mind."
    ]
  },
  {
    title: "50/30/20 Budgeting Rule Explained",
    icon: <Calculator size={24} className="text-finance-blue" />,
    summary: "A simple approach to budgeting that allocates spending into three main categories.",
    content: [
      "The 50/30/20 budgeting rule is a straightforward approach to managing your money that divides your after-tax income into three major categories: needs, wants, and savings/debt repayment.",
      "According to this rule, 50% of your income should go toward needs. These are essential expenses that you must pay, such as housing, utilities, groceries, transportation, minimum debt payments, and insurance.",
      "Next, 30% of your income is allocated to wants. This category covers non-essential expenses that enhance your lifestyle but aren't absolutely necessary, like dining out, entertainment subscriptions, hobbies, vacations, and shopping for non-essential items.",
      "The remaining 20% should be directed toward savings and debt repayment beyond minimum payments. This includes building an emergency fund, contributing to retirement accounts, investing, and paying down high-interest debt.",
      "What makes the 50/30/20 rule effective is its simplicity and flexibility. You don't need to track every penny spent on specific categories, just ensure your spending broadly fits within these three buckets. If your needs exceed 50% of your income, you might need to look for ways to reduce essential costs or increase your income to achieve better financial balance."
    ]
  },
  {
    title: "Understanding Stocks, Bonds, and ETFs",
    icon: <Landmark size={24} className="text-finance-teal" />,
    summary: "A beginner's guide to the most common investment vehicles in the market.",
    content: [
      "Stocks represent ownership shares in a company. When you buy stock, you're purchasing a small piece of that company and become a shareholder. Stocks offer potential for high returns but come with higher risk. Their value fluctuates based on company performance, market conditions, and investor sentiment.",
      "Bonds are essentially loans you make to entities like governments or corporations. The borrower promises to pay you interest periodically and return your principal on a specific maturity date. Bonds generally offer lower returns than stocks but provide more stability and regular income.",
      "Exchange-Traded Funds (ETFs) are investment funds traded on stock exchanges. They combine features of mutual funds and stocks, holding multiple assets like stocks, bonds, or commodities. ETFs offer instant diversification, lower fees than mutual funds, and the flexibility to trade throughout the day like stocks.",
      "For beginning investors, ETFs often provide an excellent starting point because they offer diversification, which helps manage risk. Instead of trying to pick individual winners in the stock market, you can buy an ETF that tracks a broad market index, effectively owning small pieces of hundreds of companies.",
      "A balanced investment portfolio typically includes a mix of these investment types, with the specific allocation depending on your financial goals, risk tolerance, and investment timeline. Generally, younger investors can afford to weight their portfolios more heavily toward stocks for growth, while those approaching retirement might shift toward more bonds for stability."
    ]
  },
  {
    title: "The Power of Compound Interest",
    icon: <PlayCircle size={24} className="text-finance-purple" />,
    summary: "Discover how compound interest can dramatically grow your investments over time.",
    content: [
      "Compound interest is often called the eighth wonder of the world for good reason: it's the mechanism by which money grows exponentially over time. Unlike simple interest, which is calculated only on the initial principal, compound interest is calculated on both the initial principal and the accumulated interest from previous periods.",
      "The magic of compound interest lies in its snowball effect. As your investment earns returns, those returns begin earning returns of their own. This creates a powerful cycle of growth that accelerates over time. The longer your money compounds, the more dramatic the effect becomes.",
      "There are three key factors that determine how quickly your money will grow through compounding: the principal amount (how much you invest initially), the interest rate (your rate of return), and time (how long you let your money grow). Of these, time is perhaps the most powerful factor.",
      "For example, if you invest $10,000 at a 7% annual return, after 10 years you'd have about $19,672. But after 30 years, that same $10,000 would grow to approximately $76,123 – nearly eight times your original investment.",
      "This is why starting to invest early is so important. Even small amounts invested in your 20s can outpace larger amounts invested in your 40s, simply because those early investments have more time to compound. The best time to start investing was yesterday; the second best time is today."
    ]
  },
  {
    title: "Strategies to Pay Off Debt Faster",
    icon: <FileText size={24} className="text-finance-blue" />,
    summary: "Effective methods to accelerate your debt payoff and save on interest.",
    content: [
      "The debt avalanche method focuses on paying off your highest-interest debt first while making minimum payments on all other debts. This approach saves you the most money in interest over time. Once the highest-interest debt is paid off, you move to the next highest, creating a cascade effect.",
      "Alternatively, the debt snowball method targets your smallest debt balance first, regardless of interest rate. As each small debt is eliminated, you gain psychological wins that can boost motivation. The freed-up payment amount is then added to the next smallest debt, creating growing momentum like a snowball.",
      "Consider debt consolidation if you have multiple high-interest debts. This involves combining several debts into a single loan with a lower interest rate. Options include balance transfer credit cards with 0% introductory rates, personal consolidation loans, or home equity loans if you own property.",
      "Make bi-weekly payments instead of monthly ones. This simple change results in 26 half-payments per year (equivalent to 13 full monthly payments) rather than 12 monthly payments. This extra payment each year can significantly reduce your repayment timeline and interest costs, especially for long-term debts like mortgages.",
      "Whenever possible, pay more than the minimum required payment. Even small additional amounts can dramatically reduce your total interest paid and shorten your repayment period. Consider allocating windfalls like tax refunds, bonuses, or gifts toward debt repayment to accelerate your progress."
    ]
  },
  {
    title: "How to Improve Your Credit Score",
    icon: <CreditCard size={24} className="text-finance-teal" />,
    summary: "Practical steps to build and maintain a strong credit score.",
    content: [
      "Your payment history is the most influential factor in your credit score, accounting for about 35% of your FICO score. Make all your payments on time, every time. Even one late payment can significantly impact your score. Consider setting up automatic payments or payment reminders to ensure you never miss a due date.",
      "Credit utilization—the percentage of your available credit that you're using—accounts for about 30% of your score. Aim to keep your utilization below 30% of your total credit limit, and ideally below 10% for optimal scores. For example, if your credit card has a $10,000 limit, try to keep the balance below $3,000.",
      "The length of your credit history affects about 15% of your score. Keep your oldest accounts open, even if you rarely use them, as they establish your credit longevity. A longer credit history generally leads to a higher score, assuming the history is positive.",
      "Your credit mix (the variety of credit accounts you have) influences about 10% of your score. Having a diverse mix of revolving credit (like credit cards) and installment loans (like mortgages or auto loans) can positively impact your score, showing you can handle different types of credit responsibly.",
      "Regular credit monitoring is essential for maintaining a good score. Check your credit reports from all three major bureaus (Experian, TransUnion, and Equifax) annually for free at AnnualCreditReport.com. Review for errors or fraudulent activities and dispute any inaccuracies you find, as they could be unnecessarily lowering your score."
    ]
  }
];

const Learn = () => {
  return (
    <div className="min-h-screen w-full text-white">
      <AnimatedBackground />
      <Navbar />
      
      <div className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Financial Education Center</h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Expand your financial knowledge with our curated resources and guides</p>
          </div>
          
          <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-finance-teal/30 to-finance-purple/30 mb-16 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Beginner's Investment Guide</h2>
                <p className="text-white/70 mb-6">
                  Start your investment journey with our comprehensive guide. Learn the basics of investing, understand different asset classes, and build your first portfolio with confidence.
                </p>
                <DownloadGuide />
              </div>
              <div className="bg-black/20 p-6 rounded-xl">
                <h3 className="font-semibold mb-4">What's inside:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-finance-teal/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Getting started with investing</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-finance-teal/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Understanding investment types</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-finance-teal/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Building your first portfolio</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-finance-teal/20 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-xs">✓</span>
                    </div>
                    <span>Risk management strategies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Financial Articles Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Financial Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {financialArticles.map((article, index) => (
                <FinancialArticle
                  key={index}
                  title={article.title}
                  icon={article.icon}
                  summary={article.summary}
                  content={article.content}
                />
              ))}
            </div>
          </section>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Ready to learn more?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/5"
                asChild
              >
                <Link to="/investing">
                  Investing Guides
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-white/20 hover:bg-white/5"
                asChild
              >
                <Link to="/resources">
                  Financial Calculators
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
