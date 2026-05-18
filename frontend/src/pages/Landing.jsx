import React from 'react';
import { Link } from 'react-router-dom';
import { mockDb } from '../services/mockDb';
import CampaignCard from '../components/CampaignCard';
import Button from '../components/Button';
import { ShieldCheck, Zap, Globe, Heart, ArrowRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const campaigns = mockDb.getCampaigns();

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-100/50 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-bold mb-6 tracking-wide border border-primary-100">
              BLOCKCHAIN POWERED TRANSPARENCY
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
              Changing Disaster Relief <br />
              <span className="text-primary-600 italic">One Transaction at a Time</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
              The world's first fully transparent donation network. We use blockchain technology to ensure every dollar you give reaches those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="px-10 h-16 rounded-2xl shadow-2xl shadow-primary-500/30">
                  Start Donating Now
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="px-10 h-16 rounded-2xl gap-3">
                <PlayCircle size={22} />
                Watch How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Transparency Preview */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Total Donations', value: '$1.2M+', icon: Globe },
            { label: 'Lives Impacted', value: '45,000+', icon: Heart },
            { label: 'NGOs Verified', value: '120+', icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="h-14 w-14 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center shrink-0">
                <stat.icon size={28} />
              </div>
              <div>
                <p className="text-slate-500 font-medium text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Urgent Campaigns</h2>
            <p className="text-slate-500 leading-relaxed">
              Explore active disaster relief efforts and provide immediate assistance to affected communities worldwide.
            </p>
          </div>
          <Link to="/transparency">
            <Button variant="outline" className="gap-2">
              View All Campaigns
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-slate-900 py-24 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Transparency Matters</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              We've built a platform where trust is hard-coded into the system, ensuring your generosity makes its intended impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Blockchain Tracking',
                desc: 'Every donation creates a permanent record on the blockchain, visible to anyone.',
                icon: ShieldCheck
              },
              {
                title: 'Real-time Analytics',
                desc: 'Watch the impact of your donation in real-time as funds are allocated to specific needs.',
                icon: Zap
              },
              {
                title: 'Verified NGOs only',
                desc: 'We strictly vet every organization on our platform to prevent fraud and misuse.',
                icon: Heart
              }
            ].map((feature, i) => (
              <div key={i} className="space-y-6 group">
                <div className="h-16 w-16 bg-primary-500/10 border border-primary-500/20 text-primary-500 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-primary-600 rounded-[3rem] p-8 md:p-16 text-white text-center relative overflow-hidden shadow-2xl shadow-primary-500/40">
           <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500 opacity-50" />
           <div className="relative z-10">
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to make a difference?</h2>
             <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto">
               Join thousands of donors who are already using our platform to help people in need with 100% confidence.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <Link to="/signup">
                 <Button size="lg" className="bg-white text-primary-600 hover:bg-slate-100 border-none px-12">
                   Sign Up as Donor
                 </Button>
               </Link>
               <Link to="/signup">
                 <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-12">
                   Apply as NGO
                 </Button>
               </Link>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
