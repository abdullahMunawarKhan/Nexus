const STORAGE_KEY = 'disaster_relief_db';

const getDb = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : {
    users: [],
    ngos: [],
    campaigns: [
      {
        id: '1',
        ngo_id: 'ngo-1',
        title: 'Flood Relief 2024',
        description: 'Providing food and shelter to those affected by the recent floods in the coastal region.',
        goal_amount: 50000,
        raised_amount: 15000,
        image_url: 'https://images.unsplash.com/photo-1547683905-f686c993a9e6?auto=format&fit=crop&q=80&w=800',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        ngo_id: 'ngo-2',
        title: 'Earthquake Recovery',
        description: 'Helping families rebuild their homes after the devastating earthquake.',
        goal_amount: 100000,
        raised_amount: 45000,
        image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
        created_at: new Date().toISOString()
      }
    ],
    donation_logs: [],
    fund_usage: []
  };
};

const saveDb = (db) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
};

export const mockDb = {
  // Users & Auth
  getUsers: () => getDb().users,
  addUser: (user) => {
    const db = getDb();
    const newUser = { ...user, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    db.users.push(newUser);
    saveDb(db);
    return newUser;
  },
  getUserByEmail: (email) => getDb().users.find(u => u.email === email),
  
  // NGOs
  getNgos: () => getDb().ngos,
  addNgo: (ngo) => {
    const db = getDb();
    const newNgo = { ...ngo, id: crypto.randomUUID(), verification_status: 'pending' };
    db.ngos.push(newNgo);
    saveDb(db);
    return newNgo;
  },
  updateNgoStatus: (id, status) => {
    const db = getDb();
    const index = db.ngos.findIndex(n => n.id === id);
    if (index !== -1) {
      db.ngos[index].verification_status = status;
      saveDb(db);
    }
  },

  // Campaigns
  getCampaigns: () => getDb().campaigns,
  getCampaignById: (id) => getDb().campaigns.find(c => c.id === id),
  addCampaign: (campaign) => {
    const db = getDb();
    const newCampaign = { 
      ...campaign, 
      id: crypto.randomUUID(), 
      raised_amount: 0,
      created_at: new Date().toISOString() 
    };
    db.campaigns.push(newCampaign);
    saveDb(db);
    return newCampaign;
  },

  // Donations
  getDonations: () => getDb().donation_logs,
  getDonationsByCampaign: (campaignId) => getDb().donation_logs.filter(d => d.campaign_id === campaignId),
  getDonationsByDonor: (donorId) => getDb().donation_logs.filter(d => d.donor_id === donorId),
  addDonation: (donation) => {
    const db = getDb();
    const newDonation = { ...donation, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    db.donation_logs.push(newDonation);
    
    // Update campaign raised amount
    const campaignIndex = db.campaigns.findIndex(c => c.id === donation.campaign_id);
    if (campaignIndex !== -1) {
      db.campaigns[campaignIndex].raised_amount += donation.amount;
    }
    
    saveDb(db);
    return newDonation;
  },

  // Fund Usage
  getFundUsage: (campaignId) => getDb().fund_usage.filter(f => f.campaign_id === campaignId),
  addFundUsage: (usage) => {
    const db = getDb();
    const newUsage = { ...usage, id: crypto.randomUUID(), created_at: new Date().toISOString() };
    db.fund_usage.push(newUsage);
    saveDb(db);
    return newUsage;
  }
};
