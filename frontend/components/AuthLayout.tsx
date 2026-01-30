import Image from "next/image";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #ffffff, #ffffff, #ffe8e0)",
      }}
    >
      {/* Left Side - Hero Image */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #ff9966 0%, #ff6b4a 100%)",
        }}
      >
        <Image
          src="/authenticate.jpg"
          alt="Auth hero"
          fill
          className="object-cover animate-fade-in"
          priority
        />
        
        {/* Color Overlay with E08476 */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(224, 132, 118, 0.7), rgba(224, 132, 118, 0.4), rgba(224, 132, 118, 0.2))",
          }}
        />
        
        {/* Subtle Design Overlay - Centered elegant elements */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {/* Center decorative element - Elegant circle with text */}
          <div className="relative animate-fade-in-center">
            {/* Main decorative circle */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse-ring"
                style={{ 
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  animation: 'pulse-ring 3s ease-in-out infinite'
                }}
              ></div>
              
              {/* Middle ring */}
              <div 
                className="absolute inset-4 rounded-full"
                style={{ 
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              ></div>
              
              {/* Inner content */}
              <div className="relative z-10 text-center px-8">
                <div 
                  className="text-5xl font-bold mb-2 tracking-wider text-white"
                  style={{ 
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  SyncSpace
                </div>
                <div className="h-0.5 w-32 mx-auto mb-2 bg-white opacity-70"></div>
                <div className="text-white/95 text-sm font-light tracking-wide">
                  Organize • Collaborate • Succeed
                </div>
              </div>
              
              {/* Decorative dots around the circle */}
              <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-white"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full -translate-x-1/2 translate-y-1/2 bg-white"></div>
              <div className="absolute left-0 top-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-white"></div>
              <div className="absolute right-0 top-1/2 w-2 h-2 rounded-full translate-x-1/2 -translate-y-1/2 bg-white"></div>
            </div>
            
            {/* Subtle floating icons around main element */}
            <div className="absolute -top-16 -right-16 animate-float-slow">
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <div className="absolute -bottom-12 -left-16 animate-float-slower">
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            
            <div className="absolute top-20 -left-20 animate-float-slow" style={{ animationDelay: '1s' }}>
              <div className="bg-white/15 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between p-8">
          <div className="animate-slide-down">
            <h1 className="text-4xl font-bold text-white text-pretty">
              {title}
            </h1>
            <p className="text-white/90 text-lg mt-2">{subtitle}</p>
          </div>
          <div className="text-white/70 text-sm animate-fade-in">
            © 2026 SyncSpace. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #fff5f0 50%, #ffe8e0 100%)",
        }}
      >
        <style>{`
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slide-down {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in-center {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes pulse-ring {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.6;
            }
          }

          @keyframes float-slow {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
          }

          @keyframes float-slower {
            0%, 100% {
              transform: translateY(0px) translateX(0px);
            }
            50% {
              transform: translateY(-10px) translateX(5px);
            }
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
            opacity: 0;
          }

          .animate-slide-down {
            animation: slide-down 0.6s ease-out forwards;
          }

          .animate-fade-in-center {
            animation: fade-in-center 1s ease-out forwards;
            animation-delay: 0.3s;
            opacity: 0;
          }

          .animate-pulse-ring {
            animation: pulse-ring 3s ease-in-out infinite;
          }

          .animate-float-slow {
            animation: float-slow 4s ease-in-out infinite;
          }

          .animate-float-slower {
            animation: float-slower 5s ease-in-out infinite;
          }

          .auth-input {
            border-color: #e5e7eb;
            color: #1f2937;
            transition: all 0.3s duration;
          }

          .auth-input:hover {
            border-color: rgba(224, 132, 118, 0.3);
          }

          .auth-input:focus {
            outline: none;
            border-color: #e08476;
            box-shadow: 0 0 0 3px rgba(224, 132, 118, 0.1);
          }

          .auth-button {
            background-color: #e08476;
            color: white;
            transition: all 0.3s duration;
          }

          .auth-button:hover:not(:disabled) {
            background-color: #d07364;
            transform: scale(1.05);
            box-shadow: 0 10px 15px -3px rgba(224, 132, 118, 0.4);
          }

          .auth-button:active:not(:disabled) {
            transform: scale(0.95);
          }

          .auth-button:disabled {
            background-color: rgba(224, 132, 118, 0.5);
            cursor: not-allowed;
          }

          .auth-label {
            color: #1f2937;
            font-weight: 500;
            font-size: 0.875rem;
          }

          .auth-link {
            color: #e08476;
            transition: all 0.3s duration;
          }

          .auth-link:hover {
            color: #d07364;
            transform: scale(1.05);
            display: inline-block;
          }

          .auth-divider {
            background: linear-gradient(to right, transparent, #e5e7eb, transparent);
          }

          .auth-text {
            color: #6b7280;
          }

          .auth-icon {
            color: #e08476;
            transition: all 0.3s duration;
          }

          .auth-input:focus ~ .auth-icon,
          .auth-input:focus-within ~ .auth-icon {
            color: #e08476;
          }
        `}</style>
        <div className="w-full max-w-sm animate-fade-in-up">
          {children}
        </div>
      </div>
    </div>
  );
}