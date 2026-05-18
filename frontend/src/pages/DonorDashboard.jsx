import React from 'react';
import { mockDb } from '../services/mockDb';
import { useAuth } from '../context/AuthContext';
import CampaignCard from '../components/CampaignCard';
import { Wallet, History, Heart, ArrowUpRight } from 'lucide-react';

const DonorDashboard = () => {
  const { user } = useAuth();
  const campaigns = mockDb.getCampaigns();
  const myDonations = mockDb.getDonationsByDonor(user?.id);
  const totalDonated = myDonations.reduce((acc, d) => acc + d.amount, 0);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-primary-50 text-primary-600 rounded-2xl flex items-center justify-center">
            <Heart size={24} fill="currentColor" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Donated</p>
            <p className="text-2xl font-bold text-slate-900">${totalDonated.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
            <History size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Donations Made</p>
            <p className="text-2xl font-bold text-slate-900">{myDonations.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Impact Score</p>
            <p className="text-2xl font-bold text-slate-900">84/100</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donation History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-900" id="history">My Donation History</h3>
            <button className="text-sm font-bold text-primary-600 hover:text-primary-700">View All</button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
             {myDonations.length > 0 ? (
               <div className="divide-y divide-slate-50">
                 {myDonations.map((d) => {
                   const campaign = campaigns.find(c => c.id === d.campaign_id);
                   return (
                     <div key={d.id} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <img src={campaign?.image_url} alt="" className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <p className="font-bold text-slate-900">{campaign?.title}</p>
                            <p className="text-xs text-slate-400 font-mono">{d.tx_hash.slice(0, 10)}...</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary-600">+${d.amount.toLocaleString()}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(d.created_at).toLocaleDateString()}</p>
                        </div>
                     </div>
                   );
                 })}
               </div>
             ) : (
               <div className="py-20 text-center space-y-4">
                 <div className="h-16 w-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
                    <History size={32} />
                 </div>
                 <p className="text-slate-500 font-medium">No donations yet.</p>
               </div>
             )}
          </div>
        </div>

        {/* Suggested Campaigns */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Recommended for You</h3>
          <div className="space-y-4">
            {campaigns.slice(0, 2).map((campaign) => (
              <div key={campaign.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm group">
                <div className="relative h-32 rounded-2xl overflow-hidden mb-4">
                  <img src={campaign.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">{campaign.title}</h4>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-primary-600">${campaign.raised_amount.toLocaleString()} raised</span>
                  <button className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-600 hover:text-white transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
