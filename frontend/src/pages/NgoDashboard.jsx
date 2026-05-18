import React, { useState } from 'react';
import { mockDb } from '../services/mockDb';
import { useAuth } from '../context/AuthContext';
import { Megaphone, Plus, Image as ImageIcon, CheckCircle, Clock, Trash2, FileText } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const campaignSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  goal_amount: z.string().transform((val) => parseFloat(val)).pipe(z.number().min(1, 'Goal must be at least $1')),
  image_url: z.string().url('Invalid image URL'),
});

const NgoDashboard = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const myCampaigns = mockDb.getCampaigns().filter(c => c.ngo_id === user?.id || c.ngo_id === 'ngo-1'); // Including mock ngo-1 for demo
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(campaignSchema),
  });

  const onSubmit = (data) => {
    mockDb.addCampaign({
      ...data,
      ngo_id: user.id
    });
    toast.success('Campaign created successfully!');
    setShowCreateModal(false);
    reset();
  };

  return (
    <div className="space-y-8">
      {/* Header with CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-primary-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary-500/20">
        <div>
          <h3 className="text-2xl font-bold mb-1">Fundraising Management</h3>
          <p className="text-primary-100 opacity-80">Launch and manage your relief campaigns globally.</p>
        </div>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="bg-white text-primary-600 hover:bg-slate-50 border-none shrink-0"
          size="lg"
        >
          <Plus size={20} />
          Launch New Campaign
        </Button>
      </div>

      {/* Campaigns Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2" id="campaigns">
          <Megaphone className="text-primary-600" />
          Your Active Campaigns
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myCampaigns.map((campaign) => {
             const progress = (campaign.raised_amount / campaign.goal_amount) * 100;
             return (
               <div key={campaign.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-6 group hover:shadow-md transition-all">
                  <div className="h-32 w-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={campaign.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-slate-900">{campaign.title}</h4>
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold uppercase rounded-full border border-green-100">
                        Active
                      </span>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <span>Progress</span>
                        <span>${campaign.raised_amount.toLocaleString()} / ${campaign.goal_amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button className="flex-grow py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-1">
                        <FileText size={14} />
                        Usage Logs
                      </button>
                      <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
               </div>
             );
          })}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-white w-full max-w-xl rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Launch Campaign</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input 
                label="Campaign Title" 
                placeholder="e.g. Hurricane Relief Florida" 
                {...register('title')}
                error={errors.title?.message}
              />
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-700 ml-1">Description</label>
                <textarea 
                  className={`w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all min-h-[120px] ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Detailed explanation of how funds will be used..."
                  {...register('description')}
                />
                {errors.description && <p className="text-xs font-medium text-red-500 ml-1">{errors.description.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Goal Amount ($)" 
                  type="number" 
                  placeholder="5000" 
                  {...register('goal_amount')}
                  error={errors.goal_amount?.message}
                />
                <Input 
                  label="Image URL" 
                  placeholder="https://..." 
                  {...register('image_url')}
                  error={errors.image_url?.message}
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" className="flex-grow" type="button" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button className="flex-grow" type="submit">
                  Create Campaign
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NgoDashboard;
