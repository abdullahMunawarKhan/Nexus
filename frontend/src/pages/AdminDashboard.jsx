import React from 'react';
import { mockDb } from '../services/mockDb';
import { ShieldCheck, Users, BarChart3, AlertCircle, Check, X, Search } from 'lucide-react';
import Button from '../components/Button';

const AdminDashboard = () => {
  const ngos = [
    { id: '1', name: 'Global Relief Foundation', email: 'contact@grf.org', status: 'verified', joined: '2024-01-15' },
    { id: '2', name: 'Direct Aid Network', email: 'help@dan.com', status: 'pending', joined: '2024-05-10' },
    { id: '3', name: 'World Care Inc', email: 'admin@worldcare.io', status: 'rejected', joined: '2024-03-22' },
  ];

  const campaigns = mockDb.getCampaigns();
  const totalRaised = campaigns.reduce((acc, c) => acc + c.raised_amount, 0);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `$${totalRaised.toLocaleString()}`, icon: BarChart3, color: 'text-primary-600' },
          { label: 'Total Users', value: '2,841', icon: Users, color: 'text-blue-600' },
          { label: 'Active NGOs', value: '142', icon: ShieldCheck, color: 'text-green-600' },
          { label: 'Flagged Activities', value: '3', icon: AlertCircle, color: 'text-red-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
             <div className={`h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
                <stat.icon size={24} />
             </div>
             <div>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
               <p className="text-xl font-bold text-slate-900">{stat.value}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* NGO Requests */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold text-slate-900" id="ngos">NGO Verification Queue</h3>
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input type="text" placeholder="Search NGOs..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20" />
             </div>
           </div>

           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
             <table className="w-full text-left">
               <thead className="bg-slate-50 border-b border-slate-100">
                 <tr>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Organization</th>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date Joined</th>
                   <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                 {ngos.map((ngo) => (
                   <tr key={ngo.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-6 py-4">
                       <div>
                         <p className="text-sm font-bold text-slate-900">{ngo.name}</p>
                         <p className="text-xs text-slate-400">{ngo.email}</p>
                       </div>
                     </td>
                     <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          ngo.status === 'verified' ? 'bg-green-50 text-green-700 border-green-100' :
                          ngo.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                          'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {ngo.status}
                        </span>
                     </td>
                     <td className="px-6 py-4 text-sm text-slate-500">{ngo.joined}</td>
                     <td className="px-6 py-4 text-right">
                       <div className="flex justify-end gap-2">
                         <button className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm">
                           <Check size={16} />
                         </button>
                         <button className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm">
                           <X size={16} />
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>

        {/* System Alerts */}
        <div className="space-y-6">
           <h3 className="text-xl font-bold text-slate-900">Recent Alerts</h3>
           <div className="space-y-4">
             {[
               { title: 'Suspicious Activity', desc: 'Multiple failed login attempts from IP 192.168.1.1', time: '2 mins ago', type: 'error' },
               { title: 'New Campaign Flagged', desc: 'Campaign "Fast Relief" contains unverified images.', time: '1 hour ago', type: 'warning' },
               { title: 'System Update', desc: 'V3 Transparency Engine successfully deployed.', time: '5 hours ago', type: 'success' },
             ].map((alert, i) => (
               <div key={i} className={`p-4 rounded-2xl border ${
                 alert.type === 'error' ? 'bg-red-50 border-red-100' :
                 alert.type === 'warning' ? 'bg-amber-50 border-amber-100' :
                 'bg-blue-50 border-blue-100'
               }`}>
                 <p className="text-sm font-bold text-slate-900">{alert.title}</p>
                 <p className="text-xs text-slate-500 mt-1 leading-relaxed">{alert.desc}</p>
                 <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-widest">{alert.time}</p>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
