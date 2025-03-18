"use client";

export default function CompatibleApps() {
  // Placeholder logos array with icon representations
  // In a real implementation, these would be actual images/logos
  const appLogos = [
    {
      name: "Google Docs",
      logoClassName: "bg-dark-700 text-blue-400",
      icon: "GD",
    },
    {
      name: "Microsoft Word",
      logoClassName: "bg-dark-700 text-blue-500",
      icon: "MW",
    },
    {
      name: "Slack",
      logoClassName: "bg-dark-700 text-purple-400",
      icon: "SL",
    },
    {
      name: "Notion",
      logoClassName: "bg-dark-700 text-gray-300",
      icon: "NO",
    },
    {
      name: "Trello",
      logoClassName: "bg-dark-700 text-blue-300",
      icon: "TR",
    },
    {
      name: "GitHub",
      logoClassName: "bg-dark-700 text-gray-300",
      icon: "GH",
    },
    {
      name: "VS Code",
      logoClassName: "bg-dark-700 text-blue-400",
      icon: "VS",
    },
    {
      name: "Gmail",
      logoClassName: "bg-dark-700 text-red-400",
      icon: "GM",
    },
    {
      name: "Discord",
      logoClassName: "bg-dark-700 text-indigo-400",
      icon: "DC",
    },
    {
      name: "Outlook",
      logoClassName: "bg-dark-700 text-blue-400",
      icon: "OL",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-dark-800 to-dark-900 py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-dark-800/30 py-12 px-6 backdrop-blur-sm shadow-card border border-dark-600">
          <h2 className="mb-6 text-center text-3xl font-bold text-dark-50 md:text-4xl">
            Works <span className="text-accent-600">Everywhere</span> You Type
          </h2>
          
          <p className="mx-auto mb-12 max-w-2xl text-center text-dark-200">
            Seamlessly compatible with all your favorite apps and platforms
          </p>
          
          <div className="relative overflow-hidden py-8">
            {/* First row of animated logos */}
            <div className="flex animate-scroll-right space-x-8 py-4">
              {appLogos.slice(0, 5).map((app, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <div
                    className={`mb-3 flex h-20 w-20 items-center justify-center rounded-2xl ${app.logoClassName} text-xl font-bold shadow-md border border-dark-600`}
                  >
                    {app.icon}
                  </div>
                  <span className="text-sm text-dark-300">{app.name}</span>
                </div>
              ))}
            </div>
            
            {/* Second row of animated logos going in opposite direction */}
            <div className="flex animate-scroll-left space-x-8 py-4">
              {appLogos.slice(5).map((app, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <div
                    className={`mb-3 flex h-20 w-20 items-center justify-center rounded-2xl ${app.logoClassName} text-xl font-bold shadow-md border border-dark-600`}
                  >
                    {app.icon}
                  </div>
                  <span className="text-sm text-dark-300">{app.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Orange accent line */}
          <div className="mx-auto mt-8 h-1 w-24 rounded bg-gradient-to-r from-accent-800 to-accent-600"></div>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-160px * 2.5));
          }
        }
        @keyframes scrollLeft {
          0% {
            transform: translateX(calc(-160px * 2.5));
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-right {
          animation: scrollRight 30s linear infinite;
        }
        .animate-scroll-left {
          animation: scrollLeft 30s linear infinite;
        }
      `}</style>
    </section>
  );
} 