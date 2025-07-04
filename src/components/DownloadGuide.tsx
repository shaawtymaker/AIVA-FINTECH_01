
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { jsPDF } from 'jspdf';

const DownloadGuide = () => {
  const { toast } = useToast();
  
  const handleDownload = () => {
    // Create PDF content dynamically
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(22);
    doc.setTextColor(100, 100, 255);
    doc.text("Beginner's Investment Guide", 20, 20);
    
    // Add subtitle
    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text("AIVA", 20, 30);
    
    // Add content sections
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    
    // Section 1
    doc.text("1. Getting Started with Investing", 20, 50);
    doc.setFontSize(12);
    doc.text("Before diving into investments, ensure you have:", 20, 60);
    doc.text("• An emergency fund covering 3-6 months of expenses", 25, 70);
    doc.text("• Paid off high-interest debt", 25, 80);
    doc.text("• Clear financial goals (retirement, house, education)", 25, 90);
    
    // Section 2
    doc.setFontSize(14);
    doc.text("2. Understanding Investment Types", 20, 110);
    doc.setFontSize(12);
    doc.text("• Stocks: Ownership in companies", 25, 120);
    doc.text("• Bonds: Lending money to governments or corporations", 25, 130);
    doc.text("• ETFs: Baskets of securities that trade like stocks", 25, 140);
    doc.text("• Mutual Funds: Professionally managed investment pools", 25, 150);
    
    // Section 3
    doc.setFontSize(14);
    doc.text("3. Building Your First Portfolio", 20, 170);
    doc.setFontSize(12);
    doc.text("• Start with broad market index funds", 25, 180);
    doc.text("• Consider your risk tolerance and time horizon", 25, 190);
    doc.text("• Diversify across asset classes and sectors", 25, 200);
    doc.text("• Regularly contribute to your investments", 25, 210);
    
    // Add new page
    doc.addPage();
    
    // Section 4
    doc.setFontSize(14);
    doc.text("4. Common Investment Strategies", 20, 20);
    doc.setFontSize(12);
    doc.text("• Dollar-Cost Averaging: Investing a fixed amount regularly", 25, 30);
    doc.text("• Buy and Hold: Long-term investment approach", 25, 40);
    doc.text("• Asset Allocation: Balancing risk through diversification", 25, 50);
    
    // Section 5
    doc.setFontSize(14);
    doc.text("5. Managing Investment Risk", 20, 70);
    doc.setFontSize(12);
    doc.text("• Diversify your investments", 25, 80);
    doc.text("• Only invest money you won't need soon", 25, 90);
    doc.text("• Regularly review and rebalance your portfolio", 25, 100);
    doc.text("• Stay informed but avoid emotional decisions", 25, 110);
    
    // Closing note
    doc.setFontSize(14);
    doc.text("Remember: Successful investing is a marathon, not a sprint.", 20, 140);
    doc.text("Start small, stay consistent, and focus on your long-term goals.", 20, 150);
    
    // Contact information
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text("For more personalized financial guidance, contact us at:", 20, 180);
    doc.text("support@financegwhisper.com", 20, 190);
    
    // Save the PDF
    doc.save("beginners_investment_guide.pdf");
    
    // Show success toast
    toast({
      title: "Guide Downloaded",
      description: "Your Beginner's Investment Guide has been downloaded. Happy investing!",
    });
  };
  
  return (
    <Button 
      onClick={handleDownload} 
      className="bg-finance-purple hover:bg-finance-purple/90"
    >
      <Download className="mr-2" size={16} />
      Download Beginner's Guide
    </Button>
  );
};

export default DownloadGuide;
