"use client";

import { 
  AlignCenter,
  BookText,
  Bookmark, 
  Code2, 
  FileCode,
  FileText, 
  Github, 
  Mail, 
  MessageSquare, 
  Pencil,
  Search,
  Slack,
  Table, 
  Terminal, 
  Type,
  Video,
  Zap
} from "lucide-react";
import { IconCloud } from "~/components/magicui/icon-cloud";

export default function CompatibleApps() {
  // Icon array for the cloud - representing popular apps
  const appIcons = [
    <Mail size={100} color="#EA4335" strokeWidth={1.5} />, // Gmail
    <Slack size={100} color="#4A154B" strokeWidth={1.5} />, // Slack
    <Github size={100} color="#181717" strokeWidth={1.5} />, // GitHub
    <FileCode size={100} color="#007ACC" strokeWidth={1.5} />, // VS Code
    <Terminal size={100} color="#000000" strokeWidth={1.5} />, // Terminal/Cursor
    <MessageSquare size={100} color="#10A37F" strokeWidth={1.5} />, // ChatGPT
    <Zap size={100} color="#8E75B2" strokeWidth={1.5} />, // Gemini
    <BookText size={100} color="#000000" strokeWidth={1.5} />, // Notion
    <Type size={100} color="#4285F4" strokeWidth={1.5} />, // Google Docs
    <Table size={100} color="#0F9D58" strokeWidth={1.5} />, // Google Sheets
    <Video size={100} color="#DB4437" strokeWidth={1.5} />, // Google Meet
    <Search size={100} color="#4285F4" strokeWidth={1.5} />, // Google Search
    <Pencil size={100} color="#FBBC05" strokeWidth={1.5} />, // Google Keep
    <Code2 size={100} color="#F24E1E" strokeWidth={1.5} />, // Figma
    <Bookmark size={100} color="#0072C6" strokeWidth={1.5} />, // Outlook
    <AlignCenter size={100} color="#00ADEF" strokeWidth={1.5} />, // Microsoft Word
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
        
        <div className="relative mx-auto h-[550px] w-full max-w-4xl flex items-center justify-center">
          <IconCloud icons={appIcons} />
        </div>
      </div>
    </section>
  );
} 