import React, { useState, useEffect } from 'react';
import RentVsBuy from './components/RentVsBuy';
import CostPerMile from './components/CostPerMile';
import DebtConsolidation from './components/DebtConsolidation';
import RevenuePlanner from './components/RevenuePlanner';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Home, Truck, CreditCard, ArrowRight, ShieldAlert, Globe, Menu, X, DollarSign, ExternalLink, HelpCircle, TrendingUp, ChevronDown } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcsDropdownOpen, setCalcsDropdownOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

  // Handle initial route on mount and popstate events (browser back/forward)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, ''); // strip leading/trailing slashes
      if (['rent-vs-buy', 'cost-per-mile', 'debt-consolidation', 'revenue-planner', 'privacy'].includes(path)) {
        setActivePage(path);
      } else {
        setActivePage('home');
      }
    };

    handleLocationChange(); // Run on initial load
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Sync page state changes back to the browser URL path
  useEffect(() => {
    const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
    const targetPath = activePage === 'home' ? '' : activePage;
    if (currentPath !== targetPath) {
      window.history.pushState(null, '', '/' + targetPath);
    }
  }, [activePage]);

  // Smooth scroll and update dynamic SEO metadata when active page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let title = "FinCalc Pro Hub | Free Serverless Financial Calculators";
    let desc = "Calculate Rent vs. Buy equity, Trucking Cost Per Mile, and Credit Card Debt Consolidation instantly in your browser. 100% private, serverless financial tools.";

    switch (activePage) {
      case 'home':
        title = "FinCalc Pro Hub | Rent vs Buy, Cost Per Mile & Debt Optimizer";
        desc = "Free, serverless, and private financial calculator hub. Calculate Rent vs. Buy equity, Trucking Cost Per Mile, and Credit Card Debt Consolidation instantly in your browser.";
        break;
      case 'rent-vs-buy':
        title = "Rent vs. Buy Calculator | House Equity & Rent Comparison Simulator";
        desc = "Compare the long-term wealth impact of renting vs. buying a home. Simulates down payments, appreciation, maintenance costs, and investment returns.";
        break;
      case 'cost-per-mile':
        title = "Trucking Cost Per Mile Calculator | Freight Expense Estimator";
        desc = "Calculate your commercial trucking cost per mile. Accounts for fixed monthly costs, variable operational expenses, fuel efficiency, and driver wages.";
        break;
      case 'debt-consolidation':
        title = "Debt Consolidation Calculator | Credit Card Payoff Optimizer";
        desc = "Find out how much interest you can save by consolidating multiple credit card balances into a single low-interest personal loan.";
        break;
      case 'revenue-planner':
        title = "Google AdSense Revenue Calculator | Website Traffic Planner";
        desc = "Estimate your website's daily, monthly, and annual ad earnings based on traffic volume, Click-Through Rate (CTR), and Cost-Per-Click (CPC).";
        break;
      case 'privacy':
        title = "Privacy Policy | FinCalc Pro Hub";
        desc = "Learn how we protect your financial privacy. FinCalc Pro is a serverless application; no financial data is ever collected or sent to servers.";
        break;
      default:
        break;
    }

    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }

    // Dynamic Canonical URL
    const canonicalPath = activePage === 'home' ? '' : activePage;
    const canonicalUrl = `https://www.fincalcflow.com/${canonicalPath}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // Dynamic Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', desc);
    }
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }
  }, [activePage]);

  const currencyOptions = [
    { symbol: '$', label: 'USD / CAD ($)' },
    { symbol: '£', label: 'GBP (£)' },
    { symbol: '€', label: 'EUR (€)' },
    { symbol: '₨', label: 'INR / PKR (₨)' },
    { symbol: 'A$', label: 'AUD (A$)' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand Logo */}
            <div 
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
                <TrendingUp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  FinCalc <span className="text-emerald-600">Flow</span>
                </span>
                <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest -mt-1">100% Free Tools</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-5">
              <button
                onClick={() => setActivePage('home')}
                className={`text-sm font-bold transition-all py-2 ${
                  activePage === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => setActivePage('rent-vs-buy')}
                className={`text-sm font-bold transition-all py-2 ${
                  activePage === 'rent-vs-buy' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rent vs. Buy
              </button>

              <button
                onClick={() => setActivePage('cost-per-mile')}
                className={`text-sm font-bold transition-all py-2 ${
                  activePage === 'cost-per-mile' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cost Per Mile
              </button>

              <button
                onClick={() => setActivePage('debt-consolidation')}
                className={`text-sm font-bold transition-all py-2 ${
                  activePage === 'debt-consolidation' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Debt Consolidation
              </button>

              <button
                onClick={() => setActivePage('revenue-planner')}
                className={`text-sm font-bold transition-all py-2 ${
                  activePage === 'revenue-planner' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Revenue Planner
              </button>
            </nav>

            {/* Currency Selector & Get Started Button */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl">
                <Globe className="w-4 h-4 text-slate-500" />
                <select
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {currencyOptions.map((opt) => (
                    <option key={opt.symbol} value={opt.symbol}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setActivePage('home');
                  setTimeout(() => {
                    const target = document.getElementById('our-tools-heading');
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-4 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-green-900/10"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <select
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 px-2 py-1.5 rounded-lg focus:outline-none"
              >
                {currencyOptions.map((opt) => (
                  <option key={opt.symbol} value={opt.symbol}>
                    {opt.symbol}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-50 focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner">
            <button
              onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => { setActivePage('rent-vs-buy'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'rent-vs-buy' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Rent vs. Buy Simulator
            </button>
            <button
              onClick={() => { setActivePage('cost-per-mile'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'cost-per-mile' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Trucking Cost Per Mile
            </button>
            <button
              onClick={() => { setActivePage('debt-consolidation'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'debt-consolidation' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Debt Consolidation Optimizer
            </button>
            <button
              onClick={() => { setActivePage('revenue-planner'); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'revenue-planner' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              AdSense Revenue Planner
            </button>
          </div>
        )}
      </header>


      {/* 3. Main Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <div className="w-full flex flex-col">
            
            {/* 1. Full-width Hero Banner Image from Mockup */}
            <div className="w-full relative overflow-hidden select-none bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500">
              <div className="sr-only">
                <h1>Powerful Financial Calculators, 100% Free</h1>
                <p>Make informed decisions with our easy-to-use, private tools.</p>
              </div>
              <img
                src="/hero-banner.png"
                alt="SmartCalc Tools Banner: Powerful Financial Calculators, 100% Free"
                className="w-full h-auto object-cover"
              />
              
              {/* Invisible Overlay clickable button matching the position of 'Try Our Calculators' in the mockup banner */}
              <button
                onClick={() => {
                  const target = document.getElementById('our-tools-heading');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="absolute left-[5%] bottom-[13%] w-[20%] h-[20%] cursor-pointer opacity-0 focus:opacity-10 focus:ring-2 focus:ring-green-400 focus:outline-none rounded-lg"
                aria-label="Try Our Calculators"
              />
            </div>

            {/* 2. Constrained Main Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              
              {/* Section Header */}
              <div id="our-tools-heading" className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Tools</h2>
                <p className="text-slate-500 text-sm">Simple calculators to guide your financial choices.</p>
              </div>

            {/* Tool Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: Rent vs Buy */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-8 space-y-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Home className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Rent vs. Buy Calculator</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  Compare the costs of renting vs. buying your home. Run year-by-year estimations of asset growth and equity.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActivePage('rent-vs-buy')}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Card 2: Cost Per Mile */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-8 space-y-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Trucking Cost Per Mile</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  Calculate your cost per mile to manage trucking expenses, fuel costs, and maximize driver profitability.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActivePage('cost-per-mile')}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Card 3: Debt Consolidation */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col p-8 space-y-4 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-6 h-6 stroke-[2]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">Credit Card Payoff</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  Plan your debt consolidation and payoff strategy to find interest savings and clear balances sooner.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setActivePage('debt-consolidation')}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>



            {/* Premium Full-Width Banner: AdSense Revenue Planner */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group border border-indigo-900/40">
              <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl opacity-30 -mr-20 -mt-20"></div>
              <div className="space-y-4 max-w-2xl relative z-10 text-left">
                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-[11px] font-black tracking-wider uppercase inline-block border border-indigo-500/30">
                  Creator & Webmaster Tool
                </span>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Plan Your Google AdSense Earnings & Traffic</h3>
                <p className="text-slate-350 text-sm leading-relaxed">
                  Are you aiming to monetize your website or tool? Run simulation estimates for ad click rates (CTR), cost-per-click (CPC), and pageview requirements to forecast your daily, monthly, and yearly income milestones.
                </p>
              </div>
              <button
                onClick={() => setActivePage('revenue-planner')}
                className="flex items-center gap-2 px-6 py-4 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-2xl font-bold text-sm shadow-lg shadow-green-500/20 hover:shadow-green-500/30 transition-all flex-shrink-0 group-hover:scale-105 duration-200"
              >
                Launch Revenue Planner
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Info grid / why client side */}
            <div id="how-it-works-heading" className="bg-[#1e3a8a] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-900 rounded-full filter blur-3xl opacity-30 -mr-20 -mb-20"></div>
              <div className="max-w-2xl space-y-4 relative z-10 text-left">
                <h3 className="text-2xl font-black">Private, Lightweight, and Serverless</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  We don't collect, store, or transmit your financial data. All calculations run instantly in your browser's JavaScript engine. This design allows you to bookmark the tool and use it completely offline.
                </p>
                <div className="pt-2 flex gap-4 text-xs font-bold text-blue-200">
                  <span className="flex items-center gap-1.5"><ShieldAlert className="w-4 h-4 text-blue-300" /> 100% Data Privacy</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-blue-300" /> 0% Cloud Dependencies</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

        {activePage === 'rent-vs-buy' && <RentVsBuy currencySymbol={currencySymbol} />}
        {activePage === 'cost-per-mile' && <CostPerMile currencySymbol={currencySymbol} />}
        {activePage === 'debt-consolidation' && <DebtConsolidation currencySymbol={currencySymbol} />}
        {activePage === 'revenue-planner' && <RevenuePlanner />}
        {activePage === 'privacy' && <PrivacyPolicy />}
      </main>


      {/* 5. Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Column 1: Brand & Core Promise */}
            <div className="md:col-span-6 space-y-4">
              <div 
                onClick={() => setActivePage('home')}
                className="flex items-center gap-2.5 cursor-pointer select-none group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                  <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-base font-black tracking-tight text-white">
                  FinCalc <span className="text-emerald-400">Flow</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed text-left">
                Advanced serverless financial calculators engineered for clarity, speed, and privacy. 100% of calculations run securely in your web browser.
              </p>
              <div className="flex gap-4 text-xs font-bold text-emerald-400">
                <span className="flex items-center gap-1">✦ Offline Ready</span>
                <span className="flex items-center gap-1">✦ Zero Tracking</span>
                <span className="flex items-center gap-1">✦ Instant Calculations</span>
              </div>
            </div>

            {/* Column 2: Quick Tool Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Financial Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => setActivePage('home')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Main Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePage('rent-vs-buy')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Rent vs. Buy Simulator
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePage('cost-per-mile')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Trucking Cost Per Mile
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePage('debt-consolidation')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Debt Consolidation
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePage('revenue-planner')}
                    className="hover:text-white transition-colors text-left"
                  >
                    AdSense Revenue Planner
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Policy & Info Resources */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={() => setActivePage('privacy')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActivePage('privacy')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Math Methodology
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setAboutOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setContactOpen(true)}
                    className="hover:text-white transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Legal Disclaimer & Copyright */}
          <div className="border-t border-slate-800 mt-12 pt-8 space-y-4">
            <p className="text-slate-500 text-xs leading-relaxed max-w-5xl">
              <strong>Disclaimer:</strong> This website provides educational and informational tools only. Calculations are estimates based on standard formulaic projections and do not constitute professional financial, tax, or investment advice. Always consult with a licensed professional before making major financial commitments.
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 border-t border-slate-800/50 text-[11px] text-slate-600">
              <p>&copy; {new Date().getFullYear()} FinCalc Flow. All rights reserved.</p>
              <p className="text-emerald-400/80 font-bold">100% Client-Side Engine</p>
            </div>
          </div>

        </div>
      </footer>

      {/* About Us Modal */}
      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setAboutOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-655 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4 text-left">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-md">
                <TrendingUp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">About FinCalc Flow</h3>
              <div className="space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  <strong>FinCalc Flow</strong> is a premium, 100% free financial calculator hub built to make complex calculations simple, transparent, and private.
                </p>
                <p>
                  Our tool suite covers:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Rent vs. Buy Simulator</strong>: Long-term wealth builder.</li>
                  <li><strong>Trucking Cost Per Mile</strong>: Operations cost tracker.</li>
                  <li><strong>Debt Consolidation Optimizer</strong>: Loan consolidation payoff solver.</li>
                  <li><strong>AdSense Revenue Planner</strong>: Ad revenue forecaster.</li>
                </ul>
                <p>
                  Every computation runs directly in your browser. We never track, store, or see your numbers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Us Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => { setContactOpen(false); setContactFormSubmitted(false); }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-655 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="space-y-4 text-left">
              <h3 className="text-2xl font-black text-slate-900">Contact Us</h3>
              <p className="text-xs text-slate-500">
                Have questions or feedback? Drop us a line below or reach out directly at <a href="mailto:support@fincalcflow.com" className="text-blue-600 hover:underline">support@fincalcflow.com</a>.
              </p>
              
              {contactFormSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2">
                  <p className="text-sm font-bold text-emerald-800">Message Sent Successfully!</p>
                  <p className="text-xs text-emerald-600">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactFormSubmitted(true);
                  }}
                  className="space-y-3.5"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                      placeholder="Your name" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                      placeholder="you@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Message</label>
                    <textarea 
                      required 
                      rows={3} 
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                      placeholder="How can we help you?" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/10"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
