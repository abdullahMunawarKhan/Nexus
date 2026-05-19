import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Landmark, Heart, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import bgImage from '../../bg.png';

const Landing = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white antialiased font-sans">
      
      {/* Background Cinematic Asset */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Cinematic Disaster Relief Context"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Dark cinematic color-grading layer mimicking the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

  
      <header>  
        <div className="flex items-center gap-6">
          <button className="text-zinc-300 hover:text-white transition hidden sm:inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
          <Link to="/signup">
            <button className="bg-white text-black font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-zinc-200 transition">
              Join Us
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 min-h-[calc(100vh-88px)] flex flex-col justify-between pb-8">
        
        {/* Hero Section */}
        <section className="grid lg:grid-cols-12 gap-8 items-center pt-12 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Main Headline */}
            <div className="relative inline-block">
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.95]">
                Small help.
                <br />
                <span className="text-lime-400">Big impact.</span>
              </h1>
              {/* Abstract hand-drawn circle element matching the mock UI */}
              <div className="absolute -top-4 -left-6 w-[115%] h-[120%] border-4 border-zinc-500/30 rounded-[50%] pointer-events-none transform -rotate-2" />
            </div>

            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-xl font-normal">
              We ensure every donation is transparent, verified, and makes a real difference in someone's life.
            </p>

            {/* CTA Elements */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link to="/signup">
                <button className="bg-lime-400 hover:bg-lime-300 text-black font-bold px-8 py-4 rounded-full text-base transition duration-300 shadow-xl flex items-center gap-2">
                  Join the Network &rarr;
                </button>
              </Link>

              <button className="flex items-center gap-3 text-base font-semibold text-white group bg-black/20 hover:bg-black/40 backdrop-blur-md px-5 py-3.5 rounded-full border border-white/10 transition">
                <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:scale-105 transition">
                  <Play size={12} fill="white" className="ml-0.5" />
                </div>
                Watch How It Works
              </button>
            </div>
          </motion.div>

          {/* Right Floating Transparent Tracking Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex lg:justify-end mt-8 lg:mt-0"
          >
            <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-xs shadow-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-lime-400/10 flex items-center justify-center flex-shrink-0 mt-1">
                <ShieldCheck className="text-lime-400" size={22} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white mb-1">100% Transparent</h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Every rupee tracked securely on blockchain.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Integrated Floating Metrics Dashboard Bottom Section */}
        <section className="mt-16 lg:mt-auto">
          <div className="bg-zinc-950/60 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 lg:p-10 shadow-2xl">
            
            {/* Top row mini features layout indicators inside the frame */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-8 border-b border-white/10 mb-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-lime-400 flex-shrink-0" size={20} />
                <div>
                  <h5 className="text-sm font-bold text-white">Verified NGOs</h5>
                  <p className="text-xs text-zinc-400">Every NGO verified before listing.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="text-lime-400 flex-shrink-0" size={20} />
                <div>
                  <h5 className="text-sm font-bold text-white">Verified Volunteers</h5>
                  <p className="text-xs text-zinc-400">Every volunteer is background checked.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Landmark className="text-lime-400 flex-shrink-0" size={20} />
                <div>
                  <h5 className="text-sm font-bold text-white">Transparent Tracking</h5>
                  <p className="text-xs text-zinc-400">Track every donation in real-time.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Heart className="text-lime-400 flex-shrink-0" size={20} />
                <div>
                  <h5 className="text-sm font-bold text-white">Real Impact</h5>
                  <p className="text-xs text-zinc-400">See the real impact of your money.</p>
                </div>
              </div>
            </div>

            {/* Bottom row statistical numbers */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-white">1200+</h3>
                <p className="text-xs text-zinc-400 font-medium mt-1 uppercase tracking-wider">Verified NGOs</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-white">25,000+</h3>
                <p className="text-xs text-zinc-400 font-medium mt-1 uppercase tracking-wider">Volunteers</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-white">₹12.8 Cr+</h3>
                <p className="text-xs text-zinc-400 font-medium mt-1 uppercase tracking-wider">Donations Tracked</p>
              </div>
              <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-white">3.4M+</h3>
                <p className="text-xs text-zinc-400 font-medium mt-1 uppercase tracking-wider">Lives Impacted</p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Landing;