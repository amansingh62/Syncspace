"use client";

import { Button } from "./Button";

export function TitlePage() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&family=Crimson+Pro:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300&family=Inter:wght@300;400;500&display=swap');
        
        .aesthetic-3 {
          font-family: "Roboto Mono", monospace;
          letter-spacing: 0.12em;
          font-weight: 900;
          font-size: 0.7rem;
        }
        
        .professional-3 {
          font-family: "Roboto Mono", monospace;
          letter-spacing: 0.2em;
          font-weight: 800;
        }

        .main-heading-italic {
          font-family: 'Crimson Pro', serif;
          font-weight: 300;
        }

        .gradient-word {
          background: linear-gradient(to right, #E08476, #F1C6C0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: "Roboto Mono", monospace;

        }

        .main-heading-italic {
          font-family: 'Crimson Pro', serif;
          font-weight: 300;
        }

        .description-text {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          line-height: 1.6;
        }
      `}</style>

      <div className="mt-6 max-w-7xl bg-white mx-auto rounded-2xl space-y-8 p-8 bg-[radial-gradient(circle_at_top_right,#E08476_0%,#E08476_20%,white_60%)]">
        <div>
          <Button text="NextGen Collab" className="mt-44"/>
        </div>

        <div className="w-8/14 tracking-tight leading-16 text-5xl">
          <h1 className="main-heading">
            SyncSpace brings your
            <span className="main-heading-italic italic text-gray-700">
             <span className="text-[#E08476] gradient-word"> Team,</span> <span className="text-[#E08476] gradient-word">Tasks,</span> and 
              <span className="text-[#E08476] gradient-word tracking-tighter"> Conversations</span>
            </span>{" "}
            together.
          </h1>
        </div>

        <div className="professional-3 flex items-center gap-6 text-xs text-gray-700">
          <span>SECURE</span>
          <span className="h-8 w-px bg-gray-400"></span>
          <span>ORGANIZED</span>
          <span className="h-8 w-px bg-gray-400"></span>
          <span>FAST</span>
        </div>

        <div className="w-1/2 mb-6">
          <p className="description-text text-gray-500/70">
            SyncSpace is an internal collaboration platform that helps
            organizations organize conversations, teams, and workspaces in one
            secure place.
          </p>
        </div>
      </div>
    </>
  );
}

export default TitlePage;