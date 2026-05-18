import React from 'react';
import { mockDb } from '../services/mockDb';
import { Globe, ShieldCheck, History, ExternalLink, Search } from 'lucide-react';
import Input from '../components/Input';

const Transparency = () => {
  const donations = mockDb.getDonations();
  const campaigns = mockDb.getCampaigns();
  
  const totalDonations = campaigns.reduce((acc, c) => acc + c.raised_amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-900">Transparency Dashboard</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Live tracking of all platform activities. We ensure every transaction is publicly verifiable on the blockchain.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Value Distributed', value: `$${totalDonations.toLocaleString()}`, color: 'bg-primary-50 text-primary-600' },
          { label: 'Active Campaigns', value: campaigns.length, color: 'bg-green-50 text-green-600' },
          { label: 'Platform Uptime', value: '100%', color: 'bg-blue-50 text-blue-600' },
          { label: 'Network Nodes', value: '14,281', color: 'bg-purple-50 text-purple-600' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-3xl ${stat.color} flex flex-col items-center justify-center text-center space-y-1`}>
            <span className="text-sm font-bold opacity-70">{stat.label}</span>
            <span className="text-3xl font-extrabold">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ledger */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <History className="text-primary-600" />
              Public Ledger
            </h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search tx hash..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Transaction Hash</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {donations.length > 0 ? donations.map((tx) => {
                    const campaign = campaigns.find(c => c.id === tx.campaign_id);
                    return (
                      <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 font-mono text-sm text-primary-600">
                            <span className="truncate w-32">{tx.tx_hash}</span>
                            <ExternalLink size={14} className="shrink-0" />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold text-slate-700">{campaign?.title || 'Unknown'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-bold text-slate-900">${tx.amount.toLocaleString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                            Confirmed
                          </span>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                        No transactions found in the ledger yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl" />
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-primary-500" />
              Verified NGO List
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We only partner with NGOs that meet our strict transparency standards. All partner accounts are multi-sig wallets managed by verified humanitarian leaders.
            </p>
            <div className="space-y-4">
              {['Red Cross International', 'Save the Children', 'Global Relief Fund'].map((ngo, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-sm font-medium">{ngo}</span>
                  <ShieldCheck size={16} className="text-primary-500" />
                </div>
              ))}
            </div>
            <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-xl font-bold transition-all">
              Apply as NGO
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900">How to Verify?</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Copy any transaction hash and paste it into a blockchain explorer (Etherscan, Polygonscan) to verify the movement of funds independently.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200 font-mono text-[10px] text-slate-400">
              0x71C7656EC7ab88b098defB751B7401B5f6d8976F
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transparency;
