import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import Button from './Button';

const CampaignCard = ({ campaign }) => {
  const progress = Math.min((campaign.raised_amount / campaign.goal_amount) * 100, 100);

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={campaign.image_url} 
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-black shadow-sm uppercase tracking-wider">
            Active
          </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-black transition-colors">
          {campaign.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-6">
          {campaign.description}
        </p>
        
        <div className="mt-auto space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400">Progress</span>
              <span className="text-black">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between items-end">
              <div>
                <span className="block text-xs text-slate-400 font-medium">Raised</span>
                <span className="text-lg font-bold text-slate-900">${campaign.raised_amount.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="block text-xs text-slate-400 font-medium">Goal</span>
                <span className="text-sm font-semibold text-slate-600">${campaign.goal_amount.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <Link to={`/campaign/${campaign.id}`} className="block">
            <Button className="w-full justify-between" variant="secondary">
              View Details
              <ArrowRight size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
