import React from 'react';
import { 
  UploadCloud, 
  Cpu, 
  Mail, 
  ShieldCheck, 
  MousePointerClick, 
  BarChart3 
} from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-[#f8fdfe] pt-24 pb-16">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-20">
        <h1 className="text-4xl md:text-5xl font-black text-[#2c3e50] mb-6">
          Streamlined <span className="text-[#1a7a83]">Automation</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium leading-relaxed">
          Uni-Email bridges the gap between administrative data and student communication 
          using a high-speed automation engine. Here is how we handle your records.
        </p>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-dashed bg-[#1a7a83]/20 -translate-y-1/2 z-0"></div>
          
          <StepCard 
            number="01"
            icon={<UploadCloud className="text-[#1a7a83]" size={32} />}
            title="Import Records"
            desc="Upload your student CSV or enter details manually via our React-powered dashboard."
          />
          <StepCard 
            number="02"
            icon={<Cpu className="text-[#1a7a83]" size={32} />}
            title="Processing"
            desc="Our FastAPI backend validates the data and triggers the n8n automation engine."
          />
          <StepCard 
            number="03"
            icon={<Mail className="text-[#1a7a83]" size={32} />}
            title="Instant Delivery"
            desc="Personalized fee challans and updates are dispatched via secure SMTP channels."
          />
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="mt-32 max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
          <h2 className="text-3xl font-black text-[#2c3e50] mb-10 text-center">What can you do?</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <CapabilityItem 
              icon={<ShieldCheck className="text-green-500" />}
              title="Secure Challan Handling"
              text="Automatically attach and send PDF fee vouchers to the correct student ID without manual intervention."
            />
            <CapabilityItem 
              icon={<MousePointerClick className="text-blue-500" />}
              title="Bulk Announcements"
              text="Send semester start dates or exam schedule updates to thousands of students in one click."
            />
            <CapabilityItem 
              icon={<BarChart3 className="text-purple-500" />}
              title="Real-time Tracking"
              text="Monitor delivery success rates and identify failed email attempts immediately through the dashboard."
            />
            <CapabilityItem 
              icon={<Cpu className="text-orange-500" />}
              title="Workflow Integration"
              text="Leverage n8n workflows to connect your email system with other university databases seamlessly."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ number, icon, title, desc }) => (
  <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-50 text-center hover:-translate-y-2 transition-transform duration-300">
    <div className="absolute -top-4 -right-4 text-6xl font-black text-gray-100 select-none">
      {number}
    </div>
    <div className="w-16 h-16 bg-[#f0f9fa] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#2c3e50] mb-3">{title}</h3>
    <p className="text-gray-500 text-sm font-medium leading-relaxed">{desc}</p>
  </div>
);

const CapabilityItem = ({ icon, title, text }) => (
  <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
    <div className="mt-1">{icon}</div>
    <div>
      <h4 className="font-bold text-[#2c3e50] mb-1">{title}</h4>
      <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

export default HowItWorks;