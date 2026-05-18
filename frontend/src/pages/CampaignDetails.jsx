import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockDb } from '../services/mockDb';
import { useAuth } from '../context/AuthContext';
import { Heart, Share2, ShieldCheck, History, ArrowLeft, Wallet } from 'lucide-react';
import Button from '../components/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { toast } from 'sonner';

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const campaign = mockDb.getCampaignById(id);
  const [donationAmount, setDonationAmount] = useState('');
  const [isDonating, setIsDonating] = useState(false);

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 space-y-6">
        <h2 className="text-3xl font-bold text-slate-900">Campaign Not Found</h2>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }

  const progress = Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100);
  const donations = mockDb.getDonationsByCampaign(id);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to donate');
      navigate('/login');
      return;
    }
    
    if (!donationAmount || isNaN(donationAmount) || parseFloat(donationAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsDonating(true);
    // Simulate Blockchain Transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      mockDb.addDonation({
        campaign_id: id,
        donor_id: user.id,
        amount: parseFloat(donationAmount),
        tx_hash: `0x${Math.random().toString(16).slice(2, 42)}`
      });
      
      toast.success(`Thank you! Your donation of $${donationAmount} was successful.`);
      setDonationAmount('');
    } catch (err) {
      toast.error('Donation failed');
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Media & Description */}
        <div className="lg:col-span-2 space-y-8">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={campaign.image_url} 
              alt={campaign.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
              {campaign.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 items-center py-4 border-y border-slate-100">
               <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-bold">
                 <ShieldCheck size={18} />
                 Verified NGO
               </div>
               <span className="text-slate-400">|</span>
               <div className="text-sm text-slate-500">
                 Created on {new Date(campaign.created_at).toLocaleDateString()}
               </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed">
                {campaign.description}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mt-4">
                This campaign is focused on providing immediate relief to the victims of the recent disaster. Your contributions will be used for essential supplies including food, clean water, medical aid, and temporary shelter.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <History className="text-primary-600" />
                Recent Donations
              </h2>
              <div className="space-y-4">
                {donations.length > 0 ? donations.slice(0, 5).map((d) => (
                  <div key={d.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                        {d.id.slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Anonymous Donor</p>
                        <p className="text-xs text-slate-400 font-mono truncate w-32">{d.tx_hash}</p>
                      </div>
                    </div>
                    <span className="font-bold text-primary-600">${d.amount.toLocaleString()}</span>
                  </div>
                )) : (
                  <p className="text-slate-400 italic">No donations yet. Be the first to help!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Donation Card */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-3xl font-extrabold text-slate-900">${campaign.raised_amount.toLocaleString()}</span>
                  <span className="text-slate-400 font-medium ml-2">raised of ${campaign.goal_amount.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-500 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(14,165,233,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-500">
                <span>{donations.length} Donations</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
               <div className="bg-slate-50 p-4 rounded-2xl flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="p-2 bg-white rounded-lg shadow-sm">
                     <Wallet size={20} className="text-slate-600" />
                   </div>
                   <span className="text-sm font-semibold text-slate-700">Wallet</span>
                 </div>
                 <ConnectButton label="Connect" accountStatus="avatar" chainStatus="icon" showBalance={false} />
               </div>

               <form onSubmit={handleDonate} className="space-y-4">
                 <div className="relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-slate-400">$</span>
                   <input 
                     type="number"
                     placeholder="0.00"
                     value={donationAmount}
                     onChange={(e) => setDonationAmount(e.target.value)}
                     className="w-full pl-8 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-500 focus:bg-white rounded-2xl text-xl font-bold focus:outline-none transition-all"
                   />
                 </div>
                 <Button 
                   type="submit" 
                   className="w-full h-16 text-lg rounded-2xl" 
                   loading={isDonating}
                 >
                   Donate Now
                 </Button>
               </form>

               <div className="flex items-center gap-2 justify-center text-xs text-slate-400 font-medium">
                 <ShieldCheck size={14} className="text-green-500" />
                 Secure Blockchain Transaction
               </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-grow gap-2">
                <Share2 size={18} />
                Share
              </Button>
              <Button variant="secondary" className="w-16">
                <Heart size={18} />
              </Button>
            </div>
          </div>

          <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 flex gap-4">
            <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center shrink-0">
               <Heart className="text-primary-600" size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-bold text-primary-900">100% Goes to the Cause</p>
              <p className="text-xs text-primary-700 mt-1 leading-relaxed">
                We don't take any platform fees. All operational costs are covered by corporate sponsors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
