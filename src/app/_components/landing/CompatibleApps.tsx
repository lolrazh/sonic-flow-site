"use client";

import { 
  AlignCenter, 
  Book, 
  Calendar, 
  MessageCircle,
  Code, 
  FileText, 
  Github, 
  Mail, 
  MessageSquare, 
  Settings, 
  Table, 
  Terminal, 
  Type,
} from "lucide-react";
import { IconCloud } from "~/components/magicui/icon-cloud";

export default function CompatibleApps() {
  // Icon array for the cloud
  const appIcons = [
    <Terminal size={75} color="#F97316" strokeWidth={1.5} />,
    <Book size={75} color="#EC4899" strokeWidth={1.5} />,
    <Calendar size={75} color="#8B5CF6" strokeWidth={1.5} />,
    <AlignCenter size={75} color="#1D4ED8" strokeWidth={1.5} />,
    <Code size={75} color="#10B981" strokeWidth={1.5} />,
    <MessageCircle size={75} color="#F59E0B" strokeWidth={1.5} />,
    <Github size={75} color="#6B7280" strokeWidth={1.5} />,
    <Mail size={75} color="#EF4444" strokeWidth={1.5} />,
    <MessageSquare size={75} color="#8B5CF6" strokeWidth={1.5} />,
    <Table size={75} color="#0EA5E9" strokeWidth={1.5} />,
    <FileText size={75} color="#6366F1" strokeWidth={1.5} />,
    <Type size={75} color="#EF4444" strokeWidth={1.5} />,
    <Settings size={75} color="#6B7280" strokeWidth={1.5} />,
  ];

  return (
    <section className="bg-gradient-to-b from-dark-800 to-dark-900 py-24 overflow-hidden" id="features">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-center text-3xl font-bold text-dark-50 md:text-4xl">
          Works <span className="text-accent-600">Everywhere</span> You Type
        </h2>
        
        <p className="mx-auto mb-12 max-w-2xl text-center text-dark-200">
          Seamlessly compatible with all your favorite apps and platforms
        </p>
        
        <div className="relative mx-auto h-[400px] w-full max-w-3xl">
          <IconCloud icons={appIcons} />
        </div>
        
        {/* Orange accent line */}
        <div className="mx-auto mt-8 h-1 w-24 rounded bg-gradient-to-r from-accent-800 to-accent-600"></div>
      </div>
    </section>
  );
} 