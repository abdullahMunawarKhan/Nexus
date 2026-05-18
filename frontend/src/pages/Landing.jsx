import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { ShieldCheck, Zap, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  return (
    <div className="bg-white min-h-screen text-black flex flex-col justify-center py-20">
      {/* Hero Section */}
      <section className="px-6 flex-grow flex flex-col justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
              Absolute <br /> Transparency.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
              We leverage blockchain to ensure every single dollar you donate is tracked, verified, and delivered to those who need it most. No compromises.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link to="/signup">
              <Button size="lg" className="px-12 h-16 rounded-full text-lg">
                Join the Network
              </Button>
            </Link>
            <Link to="/transparency" className="text-lg font-bold hover:underline underline-offset-4 decoration-2">
              View Public Ledger
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Minimal Features */}
      <section className="px-6 py-32 border-t border-zinc-100 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            {[
              {
                title: 'Immutable Ledger',
                desc: 'Every transaction is permanently recorded. Trust is enforced by code, not promises.',
                icon: ShieldCheck
              },
              {
                title: 'Direct Impact',
                desc: 'Funds move directly from your wallet to verified NGOs. Zero middleman fees.',
                icon: Zap
              },
              {
                title: 'Global Reach',
                desc: 'Borderless transactions allow immediate aid deployment across the globe.',
                icon: Globe
              }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center space-y-4">
                <div className="h-16 w-16 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
                  <feature.icon size={28} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed max-w-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-zinc-50 p-16 rounded-[3rem]">
           <Heart size={48} fill="currentColor" className="mx-auto" />
           <h2 className="text-4xl font-black tracking-tight">Ready to make a difference?</h2>
           <div className="pt-8 flex justify-center">
             <Link to="/signup">
               <Button size="lg" className="px-12 rounded-full">
                 Start Donating
               </Button>
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
