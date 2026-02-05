'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Settings, LogOut, User, ArrowRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogoutButton } from '../LogoutButton';

export default function WorkspaceHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Sophisticated Background Layer */}
      <div className="absolute inset-0">
        {/* Base Image with Dramatic Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url(/workspace.jpg)',
          }}
        />
        
        {/* Gradient Vignette */}
        <div className="absolute inset-0 bg-linear-to-br from-black via-black/60 to-black" />
        
        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />

        {/* Accent Glow - Brand Color */}
        <div className="absolute top-0 right-0 w-200 h-200 bg-[#E08476]/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-150 h-150 bg-[#E08476]/3 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Refined Header */}
        <header className="border-b border-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-5 md:px-12 md:py-6 flex items-center justify-between">
            {/* Minimal Logo */}
            <Link href="/" className="flex items-center gap-3 group transition-opacity hover:opacity-80">
              <div className="relative">
                <div className="w-8 h-8 border border-[#E08476]/30 rotate-45" />
                <div className="absolute inset-0 w-8 h-8 bg-[#E08476]/10 border border-[#E08476] rotate-45 transition-transform group-hover:rotate-55" />
              </div>
              <span className="text-xl md:text-2xl font-light tracking-[0.02em] text-white">
                SyncSpace
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative w-9 h-9 rounded-none border border-white/10 text-white/70 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-white/10">
                  <DropdownMenuLabel className="font-normal text-white/50 text-xs uppercase tracking-wider">Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
                    <User className="w-4 h-4 mr-3" />
                    <Link href="/profile">
                    View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-3" />
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-none border border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-white/10">
                  <DropdownMenuLabel className="font-normal text-white/50 text-xs uppercase tracking-wider">Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
                    <User className="w-4 h-4 mr-3" />
                    <Link href="/profile">
                    View Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/5" />
                  <DropdownMenuItem className="text-white/70 hover:text-white hover:bg-white/5 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-3" />
                    <LogoutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6 py-16 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              
              {/* Left Column - Content */}
              <div className="space-y-8">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-3">
                  <div className="h-px w-12 bg-linear-to-r from-transparent to-[#E08476]" />
                  <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
                    Workspace
                  </span>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.3] tracking-tight text-white">
                  Your teams,
                  <br />
                  <span className="font-normal text-[#E08476]">unified</span>
                </h1>

                {/* Description */}
                <p className="text-lg md:text-xl text-white/50 leading-relaxed max-w-lg font-light">
                  A singular environment for collaborative work. Streamlined, focused, and built for teams that create.
                </p>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href="/app/workspaces/new">
                    <Button
                      size="lg"
                      className="group relative bg-[#E08476] hover:bg-[#D67567] text-white font-normal tracking-wide px-8 h-14 transition-all duration-300 border-0 rounded-none"
                    >
                      <span>Create Workspace</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Visual Element */}
              <div className="hidden md:block relative">
                <div className="relative aspect-square">
                  {/* Geometric Frame */}
                  <div className="absolute inset-0 border border-white/10" />
                  <div className="absolute inset-4 border border-[#E08476]/20" />
                  <div className="absolute inset-8 border border-white/5" />
                  
                  {/* Floating Cards */}
                  <div className="absolute top-[15%] left-[10%] w-48 h-32 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-6 transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                    <div className="h-2 w-16 bg-[#E08476]/50 mb-3" />
                    <div className="h-1 w-full bg-white/20 mb-2" />
                    <div className="h-1 w-3/4 bg-white/10" />
                  </div>
                  
                  <div className="absolute bottom-[20%] right-[15%] w-56 h-40 bg-linear-to-br from-white/5 to-black/20 backdrop-blur-sm border border-white/10 p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="h-2 w-20 bg-[#E08476]/40 mb-4" />
                    <div className="h-1 w-full bg-white/10 mb-2" />
                    <div className="h-1 w-2/3 bg-white/10 mb-2" />
                    <div className="h-1 w-4/5 bg-white/5" />
                  </div>

                  {/* Center Glow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-[#E08476]/10 rounded-full blur-3xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Minimal Footer Indicator */}
        <div className="pb-24 text-center">
          <div className="inline-flex flex-col items-center gap-3 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
            <div className="h-12 w-px bg-linear-to-b from-transparent via-white to-transparent" />
            <span className="text-[10px] text-white uppercase tracking-[0.3em]">Scroll</span>
          </div>
        </div>
      </div>
    </div>
  );
}