import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Heart, User, ChevronDown, 
  ArrowUpRight, CarFront, Sparkles, CheckCircle2, 
  AlertTriangle, AlertCircle, ArrowUpCircle, ArrowDownLeft
} from 'lucide-react';
import SearchPage from './SearchPage';
import TCOCalculator from './TCOCalculator';
import SellPage from './SellPage';
import SellMyCar from './pages/SellMyCar';
import VehicleDetailPage from './VehicleDetailPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import HeroSearch from './components/HeroSearch';
import InventoryGrid from './components/InventoryGrid';
import VisionPage from './VisionPage';
import TeamPage from './TeamPage';
import PressPage from './PressPage';
import PublicRelationsPage from './PublicRelationsPage';
import FAQPage from './FAQPage';
import ContactPage from './ContactPage';
import DealersPage from './DealersPage';
import InfluencersPage from './InfluencersPage';
import { MarketCheckCar } from './services/marketcheck';
import { supabase } from './supabaseClient';
import MarketPulse from './components/MarketPulse';
import MarketPulsePage from './MarketPulsePage';
import OnboardingPage from '../app/admin/onboarding/page';

const NavBar = ({ onSearchClick, onSellClick, onHomeClick, onSignInClick, onDashboardClick, onMarketPulseClick, session }: { onSearchClick: () => void; onSellClick: () => void; onHomeClick: () => void; onSignInClick: () => void; onDashboardClick: () => void; onMarketPulseClick: () => void; session: any }) => (
  <header className="light-glass sticky top-0 z-50">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-8">
          <div className="cursor-pointer flex items-center shrink-0" onClick={onHomeClick}>
            <img 
              src="https://www.image2url.com/r2/default/images/1777060703818-28c3abbb-38ac-4291-b8f5-fd07d1cbb81e.png" 
              alt="CarGurus Logo" 
              className="h-7 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <nav className="hidden md:flex gap-6 text-[13px] font-bold text-gray-800">
            <div className="relative group">
              <button onClick={onSearchClick} className="flex items-center gap-1.5 hover:text-[#29abe2] transition-colors py-5 outline-none">Shop <ChevronDown size={14} strokeWidth={1}/></button>
              <div className="light-glass-card absolute top-[90%] left-0 w-[200px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 flex flex-col py-2">
                <button onClick={onSearchClick} className="text-left px-4 py-2 hover:bg-slate-100/50 hover:text-[#29abe2] transition-colors">Buy</button>
                <button onClick={onSellClick} className="text-left px-4 py-2 hover:bg-slate-100/50 hover:text-[#29abe2] transition-colors">Sell</button>
                <a href="#" className="px-4 py-2 hover:bg-slate-100/50 hover:text-[#29abe2] transition-colors">Certified Pre-Owned</a>
              </div>
            </div>
            
            <div className="relative group">
              <button onClick={onSellClick} className="flex items-center gap-1.5 hover:text-[#29abe2] transition-colors py-5 outline-none">Sell <ChevronDown size={14} strokeWidth={1}/></button>
              <div className="light-glass-card absolute top-[90%] left-0 w-[160px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 flex flex-col py-2">
                <button onClick={onSellClick} className="text-left px-4 py-2 hover:bg-slate-100/50 hover:text-[#29abe2] transition-colors">Sell my car</button>
                <a href="#" className="px-4 py-2 hover:bg-slate-100/50 hover:text-[#29abe2] transition-colors">Car Values</a>
              </div>
            </div>
            
            <a href="#" className="flex items-center gap-1.5 hover:text-[#29abe2] transition-colors py-5">Finance <ChevronDown size={14} strokeWidth={1}/></a>
            <a href="#" onClick={(e) => { e.preventDefault(); onSellClick(); }} className="flex items-center gap-1.5 hover:text-[#29abe2] transition-colors py-5">Sell My Car</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-[#29abe2] transition-colors text-[#D9232A] py-5">
               <Sparkles size={14} strokeWidth={1}/>
               Discover
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onMarketPulseClick(); }} className="flex items-center gap-1.5 hover:text-[#29abe2] transition-colors py-5">Market Pulse</a>
          </nav>
        </div>
        <div className="flex items-center gap-5 text-gray-500">
          <button 
            onClick={session ? onDashboardClick : onSignInClick}
            className="hover:text-[#29abe2] transition-colors"
          >
            <Heart size={20} strokeWidth={1} />
          </button>
          <button 
            onClick={session ? onDashboardClick : onSignInClick}
            className="hover:text-[#29abe2] transition-colors flex items-center gap-2"
          >
            <User size={20} strokeWidth={1} />
            <span className="text-[13px] font-bold text-gray-800 hidden sm:inline">
              {session ? 'Account' : 'Sign In'}
            </span>
          </button>
        </div>
      </div>
    </div>
  </header>
);

const ActionBanners = () => (
  <div className="max-w-[1000px] mx-auto px-4 -mt-10 relative z-10 mb-16">
    <div className="light-glass-card rounded-[14px] p-2.5 max-w-[280px] mb-6 flex justify-between items-center hidden md:flex cursor-pointer hover:bg-white/80 transition-colors">
      <div>
        <h4 className="text-[11px] font-bold text-slate-900">Recent searches</h4>
        <div className="text-[11px] text-[#29abe2] font-semibold mt-0.5">All Cars <span className="text-gray-400 font-medium">Allen, TX</span></div>
      </div>
      <div className="bg-slate-200/50 hover:bg-slate-200 p-1 rounded-full"><ChevronDown size={14} strokeWidth={1} className="text-gray-600"/></div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="light-glass-card p-6 rounded-[20px] flex flex-col justify-between relative cursor-pointer min-h-[160px] overflow-hidden group">
        <div className="z-10 relative">
          <h3 className="text-[20px] font-bold leading-tight mb-2 pr-4 text-slate-900">Sell your car for the best price</h3>
          <p className="text-[12px] text-slate-600 font-medium max-w-[150px]">Compare multiple offers in minutes</p>
        </div>
        <div className="absolute right-4 bottom-4 z-10 w-7 h-7 bg-white border border-slate-200/50 group-hover:bg-white/80 transition-colors rounded-full flex items-center justify-center">
          <ArrowUpRight size={16} strokeWidth={1} className="text-slate-900" />
        </div>
        <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80" className="absolute -bottom-8 -right-8 w-40 h-40 object-cover rounded-full opacity-30 mix-blend-multiply" alt="Car"/>
      </div>
      
      <div className="bg-[#29abe2] text-white p-6 rounded-[20px] flex flex-col justify-between relative cursor-pointer min-h-[160px] group shadow-[0_8px_30px_rgb(0,0,0,0.07)]">
        <div className="flex justify-between items-start">
          <h3 className="text-[20px] font-bold leading-tight max-w-[160px] text-white">Start your financing online</h3>
          <div className="bg-white/20 border border-white/20 text-white p-1 rounded flex items-center justify-center w-6 h-6 shadow-sm"><span className="text-[11px] font-bold">%</span></div>
        </div>
        <div className="absolute right-4 bottom-4 w-7 h-7 bg-white/20 border border-white/20 group-hover:bg-white/30 transition-colors rounded-full flex items-center justify-center">
          <ArrowUpRight size={16} strokeWidth={1} className="text-white" />
        </div>
      </div>

      <div className="light-glass-card p-6 rounded-[20px] flex flex-col justify-between relative cursor-pointer min-h-[160px] group">
        <h3 className="text-[20px] font-bold leading-tight max-w-[180px] text-slate-900">
          Search <span className="text-[#CC0000]">in your own words</span> with AI
        </h3>
        <div className="absolute top-5 right-5 text-[#CC0000]">
          <Sparkles size={20} className="text-[#CC0000]" strokeWidth={1}/>
        </div>
        <div className="absolute right-4 bottom-4 w-7 h-7 bg-white border border-slate-200/50 group-hover:bg-white/80 transition-colors rounded-full flex items-center justify-center">
          <ArrowUpRight size={16} strokeWidth={1} className="text-slate-900" />
        </div>
      </div>
    </div>
  </div>
);

const EstimateBudgetSection = () => {
  const [downPayment, setDownPayment] = React.useState(2350);
  const [loanTerm, setLoanTerm] = React.useState(60);
  const [apr, setApr] = React.useState(0.0979); 
  const [monthlyPayment, setMonthlyPayment] = React.useState(418);
  const [includeTradeIn, setIncludeTradeIn] = React.useState(false);
  const [tradeInAmount, setTradeInAmount] = React.useState(0);

  const monthlyRate = apr / 12;
  const maxLoanAmount = monthlyRate > 0 
    ? monthlyPayment * (1 - Math.pow(1 + monthlyRate, -loanTerm)) / monthlyRate 
    : monthlyPayment * loanTerm;
    
  const totalBudget = Math.round(maxLoanAmount + downPayment + (includeTradeIn ? tradeInAmount : 0));

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-8 mb-20 px-4 md:px-0">
      <div className="w-full lg:w-[35%] pt-4">
        <h2 className="text-[40px] font-extrabold mb-6 tracking-tight text-[#0f1111] leading-tight">Estimate your budget</h2>
        <p className="text-[#0f1111] font-medium mb-8 text-[15px] leading-relaxed">Then get personalized rates with no impact on your credit score</p>
        <button className="bg-[#29abe2] text-white px-6 py-2.5 rounded-full font-bold text-[15px] hover:bg-[#2089b5] transition-colors">
          Get pre-qualified
        </button>
      </div>
      
      <div className="w-full lg:w-[65%]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-[12px] font-bold text-[#0f1111] mb-2">Est. down payment</label>
            <div className="light-glass rounded-md p-3 text-[15px] text-[#0f1111] flex focus-within:ring-1 focus-within:ring-[#29abe2] focus-within:border-[#29abe2] transition-all">
              <span className="text-[#0f1111] mr-1">$</span>
              <input 
                type="number" 
                value={downPayment} 
                onChange={e => setDownPayment(Number(e.target.value))}
                className="w-full outline-none font-medium bg-transparent text-[#0f1111]"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[12px] font-bold text-[#0f1111] mb-2">Loan term</label>
            <div className="light-glass rounded-md p-3 text-[15px] text-[#0f1111] relative">
              <select 
                value={loanTerm} 
                onChange={e => setLoanTerm(Number(e.target.value))}
                className="w-full appearance-none outline-none bg-transparent font-medium text-[#0f1111] cursor-pointer"
              >
                <option value={36}>36 months</option>
                <option value={48}>48 months</option>
                <option value={60}>60 months</option>
                <option value={72}>72 months</option>
              </select>
              <ChevronDown size={16} strokeWidth={1} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
            </div>
          </div>
          
          <div>
            <label className="block text-[12px] font-bold text-[#0f1111] mb-2">Credit score</label>
            <div className="light-glass rounded-md p-3 text-[15px] text-[#0f1111] relative">
              <select 
                value={apr} 
                onChange={e => setApr(Number(e.target.value))}
                className="w-full appearance-none outline-none bg-transparent font-medium text-[#0f1111] cursor-pointer"
              >
                <option value={0.065}>740+ (Excellent)</option>
                <option value={0.0979}>680-739 (Good)</option>
                <option value={0.1400}>630-679 (Fair)</option>
                <option value={0.2000}>Below 630</option>
              </select>
              <ChevronDown size={16} strokeWidth={1} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
            </div>
          </div>
          
          <div>
            <label className="block text-[12px] font-bold text-[#0f1111] mb-2">Est. monthly payment</label>
            <div className="light-glass rounded-md p-3 text-[15px] text-[#0f1111] flex focus-within:ring-1 focus-within:ring-[#29abe2] focus-within:border-[#29abe2] transition-all">
              <span className="text-[#0f1111] mr-1">$</span>
              <input 
                type="number" 
                value={monthlyPayment} 
                onChange={e => setMonthlyPayment(Number(e.target.value))}
                className="w-full outline-none font-medium bg-transparent text-[#0f1111]"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 mb-10 h-10">
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setIncludeTradeIn(!includeTradeIn)}>
            <div className={`w-[42px] h-6 rounded-full relative transition-colors ${includeTradeIn ? 'bg-[#29abe2]' : 'bg-[#999999]'}`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.1)] border border-slate-200/50 transition-all ${includeTradeIn ? 'left-[20px]' : 'left-[2px]'}`}></div>
            </div>
            <span className="text-[14px] text-[#0f1111] font-medium">Include trade-in</span>
          </div>

          {includeTradeIn && (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-4 duration-300">
              <label className="text-[14px] text-[#0f1111] font-medium whitespace-nowrap">Trade-in value:</label>
              <div className="light-glass rounded-md p-2 text-[15px] text-[#0f1111] flex focus-within:ring-1 focus-within:ring-[#29abe2] focus-within:border-[#29abe2] transition-all w-32">
                <span className="text-[#0f1111] mr-1">$</span>
                <input 
                  type="number" 
                  value={tradeInAmount} 
                  onChange={e => setTradeInAmount(Number(e.target.value))}
                  className="w-full outline-none font-medium bg-transparent text-[#0f1111]"
                  placeholder="0"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <span className="text-[52px] md:text-[68px] font-extrabold tracking-tighter text-[#0f1111] leading-none">${totalBudget.toLocaleString()}</span>
          <span className="text-[16px] md:text-[18px] font-bold text-[#0f1111] flex items-center tracking-tight">
            with {(apr * 100).toFixed(2)}% APR 
            <div className="ml-1.5 w-[18px] h-[18px] rounded-full border-[1.5px] border-[#0f1111] text-[#0f1111] flex items-center justify-center text-[11px] font-bold cursor-help relative -top-0.5">?</div>
          </span>
        </div>
        
        <p className="text-[13px] text-[#0f1111] font-medium mt-8">
          Not ready to pre-qualify? <a href="#" className="font-bold underline decoration-[1.5px] underline-offset-2 hover:text-[#29abe2] hover:decoration-[#29abe2] transition-colors">Shop by estimated budget</a>
        </p>
      </div>
    </div>
  );
};

const DiscoverBanner = () => (
  <div 
    className="md:rounded-[40px] max-w-[1000px] w-full mx-auto my-14 relative bg-cover bg-center h-[350px] flex items-center justify-center p-8 group overflow-hidden cursor-pointer shadow-xl shadow-slate-200/50"
    style={{ backgroundImage: 'url(https://www.image2url.com/r2/default/images/1777315584853-8c5b178f-06a1-46e3-a841-d7f7f06dd0f9.jpg)' }}
  >
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
    <div className="relative z-10 max-w-[800px] mx-auto text-center">
      <h2 className="text-[36px] md:text-[48px] font-extrabold text-white tracking-tight drop-shadow-xl shadow-black">Discover your perfect car</h2>
    </div>
  </div>
);

const BrowseByBodyType = ({ onCategoryClick }: { onCategoryClick: (category: string) => void }) => {
  const bodyTypes = [
    { name: "SUVs", image: "https://www.image2url.com/r2/default/images/1777076688091-58e09a91-5b3b-4dd7-b654-601a5c63f23f.png" },
    { name: "Trucks", image: "https://www.image2url.com/r2/default/images/1777076717445-1b9247fb-8052-48e7-8c93-12ae7eab3246.png" },
    { name: "Sedans", image: "https://www.image2url.com/r2/default/images/1777076745922-a40daeac-f2f6-47dd-ae25-20531dc8e4dc.png" },
    { name: "Minivans", image: "https://www.image2url.com/r2/default/images/1777078730143-68ee0acb-9d6c-4346-be9b-9d9b17c9846c.png" },
    { name: "Hatchbacks", image: "https://www.image2url.com/r2/default/images/1777078912101-fc5cbb47-d8b3-4c26-bf42-30c36e8c9476.png" },
    { name: "Wagons", image: "https://www.image2url.com/r2/default/images/1777087101613-38ede01b-918c-4bc8-b1ae-1806a01a96ab.png" },
    { name: "Coupes", image: "https://www.image2url.com/r2/default/images/1777087179492-c16fb7d2-b502-44df-b5c6-ef8d394fb26a.png" }
  ];
  
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardStyle = (index: number) => {
    const total = bodyTypes.length;
    // Calculate distance from active index (0 is active, 1 is right, -1 is left, etc.)
    let diff = (index - activeIndex) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;

    // The front 3 cards (diff: -1, 0, 1) are sharp, others are blurred and pushed back
    const isFront = Math.abs(diff) <= 1;
    
    // Calculate 3D transforms
    const translateZ = isFront ? 0 : -200;
    const translateX = diff * 165; 
    const scale = isFront ? (diff === 0 ? 1 : 0.9) : 0.7;
    const opacity = isFront ? 1 : 0.6;
    const blur = isFront ? 'blur(0px)' : 'blur(4px)';
    const zIndex = isFront ? (diff === 0 ? 30 : 20) : 10;

    return {
      transform: `translateX(calc(-50% + ${translateX}px)) translateZ(${translateZ}px) scale(${scale})`,
      opacity,
      filter: blur,
      zIndex,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <div className="text-center mb-24 overflow-hidden py-10">
      <h2 className="text-[24px] font-bold text-slate-900 mb-12 tracking-tight">Browse by body type</h2>
      <div 
        className="relative h-[300px] w-full max-w-[1000px] mx-auto perspective-1000"
        style={{ perspective: '1000px' }}
      >
        {bodyTypes.map((type, i) => (
          <div 
            key={i} 
            className="absolute left-1/2 top-0 light-glass-card rounded-2xl w-[240px] h-[240px] p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white/80"
            style={getCardStyle(i)}
            onClick={() => {
              if (activeIndex === i) {
                // Determine the correct API value for the body type
                let apiValue = type.name;
                if (type.name === 'SUVs') apiValue = 'SUV';
                if (type.name === 'Trucks') apiValue = 'Pickup Truck';
                if (type.name === 'Sedans') apiValue = 'Sedan';
                if (type.name === 'Minivans') apiValue = 'Minivan';
                if (type.name === 'Hatchbacks') apiValue = 'Hatchback';
                if (type.name === 'Wagons') apiValue = 'Wagon';
                if (type.name === 'Coupes') apiValue = 'Coupe';
                onCategoryClick(apiValue);
              } else {
                setActiveIndex(i);
              }
            }}
          >
            <div className="h-36 w-full flex items-center justify-center mb-3">
               <img src={type.image} alt={type.name} className="w-full h-full object-contain" />
            </div>
            <span className="text-[16px] font-bold text-slate-800">{type.name}</span>
          </div>
        ))}
      </div>
      
      {/* Navigation Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {bodyTypes.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === activeIndex ? 'bg-[#29abe2] w-6' : 'bg-slate-300 hover:bg-slate-400'
            }`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

const ResearchAndReviews = () => {
  const reviews = [
    { title: "2026 Cadillac Escalade Review", rating: "7.7/10", img: "https://images.unsplash.com/photo-1606841362432-841f3918a6e9?auto=format&fit=crop&w=600&q=80" },
    { title: "2026 Dodge Durango Review", rating: "6.5/10", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80" },
    { title: "2026 Lexus LX Hybrid Review", rating: "6.8/10", img: "https://images.unsplash.com/photo-1614026480209-cd9934144671?auto=format&fit=crop&w=600&q=80" },
    { title: "2026 Hyundai Venue Review", rating: "5.2/10", img: "https://images.unsplash.com/photo-1550262141-8631bc0cb67f?auto=format&fit=crop&w=600&q=80" },
  ];
  
  const guides = [
    { title: "The Best Gas Mileage Trucks of 2026", img: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=600&q=80" },
    { title: "The Best Cars for Remote Work in 2026", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80" },
    { title: "Toyota Avalon Buying Guide", img: "https://image.pollinations.ai/prompt/Toyota%20Avalon%20sedan%20cinematic%20photography?width=600&height=400&nologo=true" },
    { title: "Toyota 4-Runner Buying Guide", img: "https://image.pollinations.ai/prompt/Toyota%204Runner%20SUV%20offroad%20cinematic%20photography?width=600&height=400&nologo=true" },
  ];

  const CardSlider = ({ title, items, isReview = false }: { title: string, items: any[], isReview?: boolean }) => (
    <div className="mb-12">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-[20px] font-bold text-slate-900 tracking-tight">{title}</h3>
        <a href="#" className="text-[11px] font-bold text-slate-900 underline underline-offset-[3px] hover:text-[#29abe2] decoration-[1.5px] decoration-gray-300 hover:decoration-[#29abe2] transition-colors pb-0.5">View all</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="cursor-pointer group light-glass rounded-[16px] p-2 hover:bg-white/80 transition-all">
            <div className="rounded-[12px] overflow-hidden mb-3 h-[140px] relative">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            {isReview ? (
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-bold text-slate-600">
                <div className="w-[5px] h-[5px] rounded-full bg-[#29abe2]"></div>
                Expert rating: {item.rating}
              </div>
            ) : (
              <div className="mb-1 px-1 text-[10px] font-bold text-slate-900">Expert guide</div>
            )}
            <h4 className="font-bold px-1 text-[13px] text-slate-900 leading-[1.3] group-hover:underline underline-offset-2 decoration-[1.5px]">{item.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <MarketPulse />
      <div>
        <h2 className="text-[24px] font-bold text-slate-900 mb-8 tracking-tight">Research and reviews</h2>
        <CardSlider title="Car reviews" items={reviews} isReview={true} />
        <CardSlider title="Buying guides" items={guides} />
      </div>
    </div>
  );
}

const BottomSearch = () => (
  <div className="bg-transparent py-16 px-4">
    <div className="max-w-[800px] mx-auto text-center light-glass-card rounded-[40px] py-16 px-8">
      <h2 className="text-[28px] font-extrabold text-slate-900 mb-2 tracking-tight">Search for our best deals</h2>
      <p className="text-slate-600 font-semibold mb-8 text-[13px]">Our AI powered tool can find the needle in the haystack.</p>
      
      <div className="flex items-center light-glass rounded-full px-3 py-1.5 w-full max-w-[600px] mx-auto mb-8 shadow-sm focus-within:ring-4 focus-within:ring-[#29abe2]/20 transition-all">
        <input 
          type="text" 
          placeholder="Ask anything or try a suggestion below..." 
          className="flex-1 outline-none bg-transparent text-slate-900 text-[13px] font-bold placeholder:font-medium placeholder:text-slate-500 h-8 ml-3"
        />
        <div className="text-slate-500 bg-white/50 hover:bg-white transition-colors cursor-pointer p-1.5 rounded-lg mr-0.5"><ArrowUpRight size={16} strokeWidth={1}/></div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { text: "Great deals under $10,000", icon: "🚙" },
          { text: "Budget friendly low mileage", icon: "🪙" },
          { text: "Three rows under $30,000", icon: "🚗" }
        ].map((chip, idx) => (
          <button key={idx} className="light-glass text-slate-900 rounded-full px-4 py-2 text-[11px] font-bold hover:bg-white/80 transition-colors flex items-center gap-2">
            <span className="opacity-90">{chip.icon}</span> {chip.text}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const Footer = ({ onNavigate }: { onNavigate: (path: 'home' | 'search' | 'sell' | 'vision' | 'team' | 'press' | 'pr' | 'faq' | 'contact' | 'dealers' | 'influencers' | 'market_pulse' | 'admin_onboarding') => void }) => (
  <footer className="bg-[#000000] pt-16 mt-auto">
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src="https://www.image2url.com/r2/default/images/1777076293809-42633873-14cc-4535-95df-47dc762b0621.png" 
            alt="CarMeta Logo" 
            className="h-8 w-auto" 
            referrerPolicy="no-referrer"
          />
        </div>
        
        {/* Categories */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full md:w-auto flex-1 max-w-[800px] md:pl-10">
          <div>
            <h4 className="text-white font-bold text-[15px] mb-4">Products</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">Used</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">New</a></li>
              <li><button onClick={() => onNavigate('sell')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium text-left">Sell Your Car</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-[15px] mb-4">Work With CarMeta</h4>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('dealers')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium text-left">Dealers</button></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">Partners</a></li>
              <li><button onClick={() => onNavigate('influencers')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium text-left">Influencers</button></li>
              <li><button onClick={() => onNavigate('admin_onboarding')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium text-left">Dealer Intake (Admin)</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-[15px] mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">Blog</a></li>
              <li><button onClick={() => onNavigate('faq')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">FAQ</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">Contact Us</button></li>
              <li><button onClick={() => onNavigate('market_pulse')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium text-left">Market Pulse</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-[15px] mb-4">About</h4>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('vision')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">Vision</button></li>
              <li><button onClick={() => onNavigate('team')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">Team</button></li>
              <li><button onClick={() => onNavigate('press')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">Press</button></li>
              <li><button onClick={() => onNavigate('pr')} className="text-slate-400 hover:text-white transition-colors text-[13px] font-medium">Public Relations</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    {/* Bottom Band */}
    <div className="bg-[#29abe2] py-4">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <p className="text-white text-[13px] font-medium">© 2026 CarMeta LLC. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentPath, setCurrentPath] = useState<'home' | 'search' | 'sell' | 'vehicle_detail' | 'signin' | 'signup' | 'dashboard' | 'vision' | 'team' | 'press' | 'pr' | 'faq' | 'contact' | 'dealers' | 'influencers' | 'market_pulse' | 'admin_onboarding'>('home');
  const [selectedVehicle, setSelectedVehicle] = useState<MarketCheckCar | null>(null);
  const [session, setSession] = useState<any>(null);
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [showSignupSuccess, setShowSignupSuccess] = useState(false);
  const [searchFilters, setSearchFilters] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSelectVehicle = (vehicle: MarketCheckCar) => {
    setSelectedVehicle(vehicle);
    setCurrentPath('vehicle_detail');
  };

  // Protected route logic
  const navigateTo = (path: 'home' | 'search' | 'sell' | 'vehicle_detail' | 'signin' | 'signup' | 'dashboard' | 'vision' | 'team' | 'press' | 'pr' | 'faq' | 'contact' | 'dealers' | 'influencers' | 'market_pulse' | 'admin_onboarding') => {
    const protectedPaths = ['dashboard'];
    if (protectedPaths.includes(path) && !session) {
      setCurrentPath('signin');
    } else {
      setCurrentPath(path);
    }
  };

  return (
    <div className="font-sans text-slate-900 min-h-screen selection:bg-[#29abe2]/20 relative flex flex-col">
      <NavBar 
        onSearchClick={() => navigateTo('search')}
        onSellClick={() => navigateTo('sell')}
        onHomeClick={() => navigateTo('home')}
        onSignInClick={() => navigateTo('signin')}
        onDashboardClick={() => navigateTo('dashboard')}
        onMarketPulseClick={() => navigateTo('market_pulse')}
        session={session}
      />
      
      <div className="flex-1">
        {currentPath === 'search' ? (
          <SearchPage 
            onClose={() => navigateTo('home')} 
            onSelectVehicle={handleSelectVehicle}
            initialFilters={searchFilters}
          />
        ) : currentPath === 'sell' ? (
          <SellMyCar />
        ) : currentPath === 'dashboard' ? (
          <Dashboard onBack={() => navigateTo('home')} />
        ) : currentPath === 'signin' ? (
          <SignIn 
            onBack={() => navigateTo('home')} 
            onSignUp={() => {
              setShowSignupSuccess(false);
              navigateTo('signup');
            }}
            onSuccess={() => {
              setShowSignupSuccess(false);
              navigateTo('home');
            }}
            initialEmail={signupEmail}
            signupSuccess={showSignupSuccess}
          />
        ) : currentPath === 'signup' ? (
          <SignUp 
            onBack={() => navigateTo('home')} 
            onSignIn={() => navigateTo('signin')}
            onSuccess={(email) => {
              setSignupEmail(email);
              setShowSignupSuccess(true);
              navigateTo('signin');
            }}
          />
        ) : currentPath === 'vehicle_detail' && selectedVehicle ? (
          <VehicleDetailPage 
            vehicle={selectedVehicle} 
            onBack={() => navigateTo('search')} 
          />
        ) : currentPath === 'vision' ? (
          <VisionPage />
        ) : currentPath === 'team' ? (
          <TeamPage />
        ) : currentPath === 'press' ? (
          <PressPage />
        ) : currentPath === 'pr' ? (
          <PublicRelationsPage />
        ) : currentPath === 'faq' ? (
          <FAQPage />
        ) : currentPath === 'contact' ? (
          <ContactPage />
        ) : currentPath === 'dealers' ? (
          <DealersPage />
        ) : currentPath === 'influencers' ? (
          <InfluencersPage />
        ) : currentPath === 'market_pulse' ? (
          <MarketPulsePage onBack={() => navigateTo('home')} />
        ) : currentPath === 'admin_onboarding' ? (
          <OnboardingPage />
        ) : (
          <>
            <HeroSearch 
              onSearch={(filters) => {
                setSearchFilters(filters);
                navigateTo('search');
              }} 
              onSell={() => navigateTo('sell')}
            />
          
          <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
            <BrowseByBodyType 
              onCategoryClick={(category) => {
                setSearchFilters({ bodyTypes: [category] });
                navigateTo('search');
              }}
            />
            <EstimateBudgetSection />
            <TCOCalculator />
            
            <div className="border-t border-slate-100 pt-16 mt-16">
              <InventoryGrid />
            </div>
          </main>
          
          <DiscoverBanner />
          
          <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
            <ResearchAndReviews />
          </main>
          
          <BottomSearch />
        </>
      )}
      </div>
      
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
