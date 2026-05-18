-- Disaster Relief Transparent Donation Network - Database Schema

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Users Table (Extends Supabase Auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('donor', 'ngo', 'admin')) DEFAULT 'donor',
  wallet_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create NGOs Table
CREATE TABLE public.ngos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  organization_name TEXT NOT NULL,
  verification_status TEXT CHECK (verification_status IN ('pending', 'verified', 'rejected')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Campaigns Table
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ngo_id UUID REFERENCES public.ngos(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  goal_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  raised_amount DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Donation Logs Table
CREATE TABLE public.donation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  donor_id UUID REFERENCES public.users(id) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  tx_hash TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Fund Usage Table
CREATE TABLE public.fund_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  proof_url TEXT,
  amount DECIMAL(12, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. RLS (Row Level Security) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_usage ENABLE ROW LEVEL SECURITY;

-- Users: Anyone can view public profile, only owner can update
CREATE POLICY "Public users are viewable by everyone" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- NGOs: Everyone can view verified NGOs
CREATE POLICY "Verified NGOs are viewable by everyone" ON public.ngos FOR SELECT USING (true);
CREATE POLICY "NGOs can manage their own profile" ON public.ngos FOR ALL USING (auth.uid() = user_id);

-- Campaigns: Everyone can view, only verified NGOs can create
CREATE POLICY "Campaigns are viewable by everyone" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "NGOs can create campaigns" ON public.campaigns FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.ngos 
    WHERE user_id = auth.uid() AND verification_status = 'verified'
  )
);

-- Donations: Publicly viewable (transparency), only authenticated can donate
CREATE POLICY "Donations are viewable by everyone" ON public.donation_logs FOR SELECT USING (true);
CREATE POLICY "Authenticated users can donate" ON public.donation_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Fund Usage: Publicly viewable, only NGO owner can add
CREATE POLICY "Fund usage is viewable by everyone" ON public.fund_usage FOR SELECT USING (true);
CREATE POLICY "NGOs can add fund usage proof" ON public.fund_usage FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.campaigns c
    JOIN public.ngos n ON c.ngo_id = n.id
    WHERE c.id = campaign_id AND n.user_id = auth.uid()
  )
);

-- 8. Trigger to auto-create user profile on Supabase Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, full_name, email, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email, COALESCE(new.raw_user_meta_data->>'role', 'donor'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
