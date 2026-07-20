import React, { useState } from 'react';
import { HelpCircle, DollarSign, TrendingUp, Sparkles, BarChart2, Info, AlertCircle } from 'lucide-react';

export default function RevenuePlanner() {
  // Input states
  const [pageviews, setPageviews] = useState(100000);
  const [ctr, setCtr] = useState(1.5); // Percentage
  const [cpc, setCpc] = useState(0.60); // Currency

  // Presets
  const presets = [
    {
      name: 'Starter Blog',
      views: 20000,
      ctr: 1.0,
      cpc: 0.25,
      desc: 'Typical low-competition informational niche blog.'
    },
    {
      name: 'Finance Tool Site',
      views: 150000,
      ctr: 2.0,
      cpc: 1.20,
      desc: 'High-value niche calculator (like finance/loans) with better CTR/CPC.'
    },
    {
      name: 'Authority Portal',
      views: 1000000,
      ctr: 1.5,
      cpc: 0.50,
      desc: 'Large media portal or directory with high volume but average CPC.'
    }
  ];

  const applyPreset = (p) => {
    setPageviews(p.views);
    setCtr(p.ctr);
    setCpc(p.cpc);
  };

  // Calculations
  const monthlyClicks = Math.round(pageviews * (ctr / 100));
  const monthlyEarnings = monthlyClicks * cpc;
  const dailyEarnings = monthlyEarnings / 30.417;
  const yearlyEarnings = monthlyEarnings * 12;

  // Milestone Calculations
  const viewsFor100aDay = Math.round((100 / (cpc * (ctr / 100))) * 30.417);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      
      {/* Header Segment */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-6">
        <div>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block mb-2">
            MONETIZATION PLANNER
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            AdSense Traffic & Revenue Planner
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Simulate traffic volumes, ad click rates, and cost-per-click CPC variables to forecast website earnings.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3.5 py-2 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-xs font-bold text-slate-700 hover:text-indigo-600 rounded-xl transition-all shadow-sm flex flex-col items-start gap-0.5 text-left"
            >
              <span>{p.name}</span>
              <span className="text-[10px] text-slate-400 font-medium font-mono">
                {new Intl.NumberFormat().format(p.views)} views • {p.ctr}% • ${p.cpc.toFixed(2)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Sliders */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-8">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            Monetization Settings
          </h3>

          <div className="space-y-6">
            {/* Monthly Pageviews Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Monthly Pageviews
                  <span className="group relative">
                    <HelpCircle className="w-3.5 h-3.5 cursor-pointer text-slate-400 hover:text-slate-600" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white text-xs rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 leading-normal">
                      The total number of page loads your website receives each month from search traffic.
                    </span>
                  </span>
                </span>
                <span className="text-slate-900 font-mono text-sm bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                  {new Intl.NumberFormat().format(pageviews)}
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="3000000"
                step="5000"
                value={pageviews}
                onChange={(e) => setPageviews(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
                <span>5k</span>
                <span>1.5M</span>
                <span>3.0M</span>
              </div>
            </div>

            {/* Click-Through Rate (CTR) Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Click-Through Rate (CTR)
                  <span className="group relative">
                    <HelpCircle className="w-3.5 h-3.5 cursor-pointer text-slate-400 hover:text-slate-600" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white text-xs rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 leading-normal">
                      The percentage of page visitors who actually click on an advertisement. Average is 1% to 2%.
                    </span>
                  </span>
                </span>
                <span className="text-slate-900 font-mono text-sm bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                  {ctr.toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="8.0"
                step="0.1"
                value={ctr}
                onChange={(e) => setCtr(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
                <span>0.2%</span>
                <span>4.0%</span>
                <span>8.0%</span>
              </div>
            </div>

            {/* Cost Per Click (CPC) Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Cost Per Click (CPC)
                  <span className="group relative">
                    <HelpCircle className="w-3.5 h-3.5 cursor-pointer text-slate-400 hover:text-slate-600" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-slate-800 text-white text-xs rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 leading-normal">
                      The amount of money you earn each time a user clicks on an ad. High CPC Niches (like Finance/Loans) pay much more.
                    </span>
                  </span>
                </span>
                <span className="text-slate-900 font-mono text-sm bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-100">
                  ${cpc.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="5.00"
                step="0.05"
                value={cpc}
                onChange={(e) => setCpc(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono">
                <span>$0.05</span>
                <span>$2.50</span>
                <span>$5.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Earnings Summary & Insights */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Earnings Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-md">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">DAILY EARNINGS</span>
              <span className="block text-xl font-extrabold text-slate-900 mt-1">
                ${new Intl.NumberFormat().format(Math.round(dailyEarnings))}
              </span>
            </div>
            <div className="bg-indigo-600 p-5 rounded-2xl text-white shadow-xl shadow-indigo-100">
              <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider block">MONTHLY EARNINGS</span>
              <span className="block text-2xl font-black mt-1">
                ${new Intl.NumberFormat().format(Math.round(monthlyEarnings))}
              </span>
            </div>
            <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-md">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">YEARLY ESTIMATE</span>
              <span className="block text-xl font-extrabold text-slate-900 mt-1">
                ${new Intl.NumberFormat().format(Math.round(yearlyEarnings))}
              </span>
            </div>
          </div>

          {/* Plain-English Breakdown */}
          <div className="bg-indigo-50/50 border border-indigo-100/70 p-6 rounded-3xl space-y-4">
            <h3 className="text-base font-extrabold text-indigo-950 flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-600" />
              Earnings Breakdown & Milestone Forecast
            </h3>
            <p className="text-xs text-indigo-900/90 leading-relaxed font-medium">
              Receiving {new Intl.NumberFormat().format(pageviews)} monthly views with an average click-through rate of {ctr}% will generate approximately <strong>{new Intl.NumberFormat().format(monthlyClicks)} ad clicks</strong> monthly. At ${cpc.toFixed(2)} cost-per-click, this brings in <strong>${new Intl.NumberFormat().format(Math.round(monthlyEarnings))} per month</strong>.
            </p>
            <div className="border-t border-indigo-100/80 pt-4 flex gap-3 text-xs text-indigo-950/80 leading-relaxed">
              <TrendingUp className="w-5 h-5 flex-shrink-0 text-indigo-600 mt-0.5" />
              <p>
                <strong>Goal to hit $100/day ($3,000/mo):</strong> To earn $100 per day at your current CTR ({ctr}%) and CPC (${cpc.toFixed(2)}), you will need to scale your monthly search traffic to approximately <strong>{new Intl.NumberFormat().format(viewsFor100aDay)} pageviews</strong>.
              </p>
            </div>
          </div>

          {/* Alert Note */}
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-amber-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <p className="text-xs leading-relaxed font-medium">
              <strong>Niche selection tip:</strong> General humor and news sites have high traffic but very low CPC ($0.05 - $0.15). Utility sites, financial calculators, and corporate insurance tools attract the highest CPC keywords, often reaching $1.00 - $3.00+ per click.
            </p>
          </div>

        </div>
      </div>

      {/* Complete Guide to Google AdSense Traffic & Revenue Planning (SEO Content) */}
      <div className="seo-content-container max-w-7xl mx-auto px-4 py-8 text-slate-800 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 mt-12 text-left">
        
        <h2 className="text-3xl font-bold mb-4 text-slate-900 border-b pb-2">The Complete Guide to Google AdSense Traffic & Revenue Planning</h2>
        <p className="mb-6 text-lg leading-relaxed text-slate-600">
          For digital publishers, web developers, and content creators, scaling traffic is only half the equation of web monetization. The actual revenue your website generates is heavily dictated by your niche, geographic audience distribution, and ad layout. Many sites with millions of monthly visitors struggle to make a sustainable income, while small, niche utility platforms with targeted tools pull in thousands of dollars per month in high-value CPC ads.
        </p>
        <p className="mb-6 leading-relaxed">
          Our serverless AdSense Revenue calculator lets you model earnings dynamically in your browser. Below, we break down the key performance metrics, cost-per-click dynamics, and optimization math that professional publishers use to estimate their ad revenue.
        </p>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">Understanding Website Monetization Metrics: Pageviews, CTR, and CPC</h2>
        <p className="mb-4 leading-relaxed">
          To predict your website's ad earnings accurately, you must understand how traffic volume interacts with user behavior and advertiser demand.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <h3 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-2">
              🔒 High-Traffic, Low-CPC Niches
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">These sites (e.g. general news, viral videos, humor content) attract large audiences but low ad budgets:</p>
            <ul className="list-disc list-inside text-sm space-y-2 text-slate-700 font-semibold">
              <li><strong>Broad Appeal:</strong> Easy to get high pageview volumes via social media sharing.</li>
              <li><strong>Low CTR:</strong> Banner blindness and generic ad content result in low clicks.</li>
              <li><strong>Low CPC:</strong> Advertisers pay minimal amounts ($0.05 to $0.20 per click) for generic impressions.</li>
              <li><strong>High Traffic Demand:</strong> Millions of pageviews are needed to generate sustainable monthly revenue.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <h3 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-2">
              ⚡ High-CPC, Target-Audience Niches
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">These sites (e.g. B2B, finance, legal, trucking tools) attract smaller, commercial audiences with large budgets:</p>
            <ul className="list-disc list-inside text-sm space-y-2 text-slate-700 font-semibold">
              <li><strong>High CPC:</strong> High advertiser competition drives bids up ($1.00 to $5.00+ per click).</li>
              <li><strong>High CTR:</strong> Interactive financial calculators and search utilities capture user clicks.</li>
              <li><strong>Search-Driven:</strong> Traffic originates from search engines, showing strong user intent.</li>
              <li><strong>Efficient Income:</strong> A few thousand monthly views can yield significant revenue.</li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">How Ad Revenue Calculation Works</h2>
        <p className="mb-4 leading-relaxed">
          The revenue planner models ad performance based on standard industry metrics for Google AdSense and competitive programmatic bidding networks.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6">
          {/* Revenue Formula */}
          <div className="bg-indigo-50/20 border border-indigo-100/70 rounded-2xl p-6 space-y-4">
            <h4 className="font-black text-indigo-800 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              1. The Revenue Formula
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              AdSense earnings depend on two primary visitor activities: viewing the page (creating ad impressions) and clicking the ads.
            </p>
            <div className="space-y-3 pt-2">
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Click Earnings Formula</span>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                  Earnings are calculated by multiplying clicks by cost-per-click:
                </p>
                <div className="py-2.5 px-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-center text-xs font-bold shadow-inner border border-slate-800">
                  Earnings = [Pageviews &times; CTR] &times; CPC
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Important Definitions</span>
                <ul className="text-xs space-y-1 text-slate-500 list-inside list-disc">
                  <li><strong>CTR (Click-Through Rate):</strong> Ad Clicks divided by Pageviews. A 1% CTR means 1 click per 100 views.</li>
                  <li><strong>CPC (Cost Per Click):</strong> The price advertisers pay to search engines/publishers for a single click.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RPM calculations Card */}
          <div className="bg-slate-50/50 border border-slate-150 rounded-2xl p-6 space-y-4">
            <h4 className="font-black text-slate-800 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              2. RPM (Revenue Per Mille)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              RPM represents your estimated earnings for every 1,000 page views or ad impressions you receive.
            </p>
            <div className="space-y-3 pt-2">
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">RPM Formula</span>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                  Used by web publishers to compare performance across different ad categories:
                </p>
                <div className="py-2.5 px-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-center text-xs font-bold shadow-inner border border-slate-800">
                  Page RPM = (Estimated Earnings / Pageviews) &times; 1,000
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">RPM Optimization</span>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  To increase your RPM, focus on placing ads near the top fold of the web page, using native-looking link colors, and generating high CPC finance content.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">Google AdSense & Web Earnings: Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-indigo-500">
            <h3 className="text-base font-extrabold text-slate-800">How does Google AdSense pay site owners?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Google AdSense pays on a monthly basis, usually around the 21st of each month. Payouts are made via direct bank deposit or wire transfer once your account balance reaches the payment threshold (usually $100 or €70).
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-emerald-500">
            <h3 className="text-base font-extrabold text-slate-800">What is a good average CTR for AdSense?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              A standard CTR for display banner ads is between 0.5% and 2.0%. However, interactive utility tool pages (like calculators and conversion apps) often receive significantly higher CTR rates (2.5% to 5.0%) because users are highly engaged and spend more time looking at the page layout.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-indigo-500">
            <h3 className="text-base font-extrabold text-slate-800">How can I increase the CPC of my website ads?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              CPC is dictated by advertiser competition. To target high CPC ads, publish content targeting premium niches like finance, insurance, loans, freight shipping, trucking, and debt management. These industries have high client values, so advertisers bid much more per click.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-150 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-emerald-500">
            <h3 className="text-base font-extrabold text-slate-800">How much traffic is needed to make $100 a day?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              At a standard 1.5% CTR and $0.50 CPC, you will need approximately 13,333 pageviews per day (around 400,000 views per month) to make $100/day. If you raise your CPC to $1.20 (by targeting premium finance calculators), the traffic needed drops to only 5,550 views per day.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
          Website monetization models can be applied to physical logistics businesses that publish instructional content. If you are exploring how transportation expenses relate to online logistics blogs, utilize our <a href="/cost-per-mile" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/cost-per-mile'); window.dispatchEvent(new Event('popstate')); }} className="text-indigo-650 font-bold hover:underline">Trucking Cost Per Mile Calculator</a>.
        </div>

      </div>

    </div>
  );
}
