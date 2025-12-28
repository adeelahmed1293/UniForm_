import React from "react";
import { Shield, Clock, Settings, ChevronRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#f0f9fa] selection:bg-[#1a7a83]/20">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left z-10">
              <h1 className="text-5xl lg:text-6xl font-black text-[#2c3e50] leading-tight mb-6">
                Automate University <br />
                Communications. <br />
                <span className="text-[#1a7a83]">Effortlessly.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 font-medium">
                Timely Fee Challans, bulk sending & Updates delivered with 100% precision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/signup" className="px-10 py-4 bg-[#4a90e2] text-white rounded-lg font-bold shadow-lg hover:bg-blue-600 transition-all active:scale-95 text-center">
                  Get Started
                </Link>
                <Link to="/login" className="px-10 py-4 bg-white border-2 border-[#4a90e2] text-[#4a90e2] rounded-lg font-bold hover:bg-blue-50 transition-all text-center">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right Side: Illustration Mockup */}
            <div className="mt-16 lg:mt-0 relative">
              <div className="relative bg-white p-4 rounded-3xl shadow-2xl border-4 border-white">
                <img 
                  src="https://img.freepik.com/free-vector/customer-support-concept-illustration_114360-5217.jpg" 
                  alt="Automation Illustration"
                  className="rounded-2xl w-full"
                />
                {/* Floating Status Card */}
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-bounce-slow">
                  <p className="text-xs font-bold text-gray-400">Sending 10,000+ Emails</p>
                  <div className="w-48 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                    <div className="w-2/3 h-full bg-orange-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section - Exact match to your image design */}
      <div className="py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-black text-center text-[#2c3e50] mb-16">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="text-[#1a7a83]" />} 
              title="Accuracy & Security" 
              desc="Ensuring every record is handled with bank-grade encryption and precision."
            />
            <FeatureCard 
              icon={<Clock className="text-[#1a7a83]" />} 
              title="Timely Delivery" 
              desc="Automated scheduling ensures announcements reach students exactly when needed."
            />
            <FeatureCard 
              icon={<Settings className="text-[#1a7a83]" />} 
              title="Effortless Automation" 
              desc="Simplify complex workflows with our one-click management dashboard."
            />
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}} />
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-all duration-300 group">
    <div className="w-16 h-16 bg-[#f0f9fa] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-xl font-black text-[#2c3e50] mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default LandingPage;