import React, { useEffect } from 'react';
import { Cpu, TrendingUp, ShieldAlert, Globe, Users, Landmark, Truck, CreditCard, Heart, Code2 } from 'lucide-react';

export default function About() {
  // Handle scrolling to methodology section if hash is present
  useEffect(() => {
    if (window.location.hash === '#methodology') {
      const el = document.getElementById('methodology');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
          Behind the Project
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Users className="w-8 h-8" />
          </span>
          About FinCalc Flow
        </h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          The story behind FinCalc Flow, our dedication to client-side data privacy, and the transparent math formulas powering our tools.
        </p>
      </div>

      {/* Main Info Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Story */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-4 text-left">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" />
            Why I Built FinCalc Flow
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Hi, I’m <strong>Haris Yaseen</strong>, the developer behind FinCalc Flow. I built this site out of personal frustration with existing online calculators. Most financial tools on the web today are bogged down by aggressive ad popups, forced account signups, slow backend servers, and cookie trackers that collect your private financial inputs.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            I wanted a clean, fast, 100% free hub where anyone can calculate mortgage trade-offs, trucking cost margins, or credit card payoff schedules without sacrificing their data privacy.
          </p>
        </div>

        {/* Who is behind */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-4 text-left">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-500" />
            100% Client-Side & Private
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            FinCalc Flow is built as a serverless web app. That means <strong>every single calculation runs locally in your own web browser</strong> using JavaScript. We don't have backend databases storing your numbers, and your financial data never leaves your device.
          </p>
          <h3 className="text-sm font-bold text-slate-900 pt-2">Our Commitment to Accuracy</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            Every formula used across our simulators (from 30-year fixed loan amortization to logistics cost per mile) is double-checked against official banking formulas and industry benchmarks.
          </p>
        </div>
      </div>

      {/* Our Tools Grid */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6 text-left">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Our Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-600">
          <a
            href="/rent-vs-buy"
            onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/rent-vs-buy'); window.dispatchEvent(new Event('popstate')); }}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/10 block transition-all group"
          >
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1 group-hover:text-indigo-650 transition-colors">
              <Landmark className="w-4 h-4 text-indigo-500" /> Rent vs. Buy Simulator
            </h3>
            <p className="text-xs text-slate-500">Compare home equity growth against renting and investing your down payment in stocks.</p>
          </a>
          <a
            href="/cost-per-mile"
            onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/cost-per-mile'); window.dispatchEvent(new Event('popstate')); }}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/10 block transition-all group"
          >
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1 group-hover:text-indigo-650 transition-colors">
              <Truck className="w-4 h-4 text-indigo-500" /> Trucking Cost Per Mile
            </h3>
            <p className="text-xs text-slate-500">Calculate fixed overhead, diesel fuel costs, driver wages, and breakeven rates per mile.</p>
          </a>
          <a
            href="/debt-consolidation"
            onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/debt-consolidation'); window.dispatchEvent(new Event('popstate')); }}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/10 block transition-all group"
          >
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1 group-hover:text-indigo-650 transition-colors">
              <CreditCard className="w-4 h-4 text-indigo-500" /> Debt Consolidation Optimizer
            </h3>
            <p className="text-xs text-slate-500">Calculate interest savings and payoff timelines by consolidating cards into a single loan.</p>
          </a>
          <a
            href="/revenue-planner"
            onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/revenue-planner'); window.dispatchEvent(new Event('popstate')); }}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/10 block transition-all group"
          >
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1 group-hover:text-indigo-650 transition-colors">
              <Cpu className="w-4 h-4 text-indigo-500" /> AdSense Revenue Planner
            </h3>
            <p className="text-xs text-slate-500">Simulate traffic volume, CTR, and CPC bids to forecast monthly website ad earnings.</p>
          </a>
        </div>
      </div>

      {/* Part 2: Calculator Methodologies */}
      <div id="methodology" className="space-y-6 pt-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 px-2 text-left">
          <Cpu className="w-5 h-5 text-indigo-500" />
          Transparent Mathematical Formulas
        </h2>

        <div className="grid grid-cols-1 gap-6 text-left">
          
          {/* Tool 1: Rent vs Buy */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Landmark className="w-4 h-4" /></span>
              1. Rent vs. Buy Simulation Formula
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                Our housing simulator models mortgage interest, property tax, maintenance overhead, and opportunity cost month-by-month:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Mortgage Amortization Equation:</strong> Monthly Principal & Interest is calculated using standard financial compounding:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] overflow-x-auto text-center">
                    M = P * [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                  </div>
                  Where <code>P</code> is Loan Principal (Home Price minus Down Payment), <code>r</code> is Monthly Interest (APR / 12), and <code>n</code> is 360 months (30 years).
                </li>
                <li>
                  <strong>Opportunity Cost Growth:</strong> The renter starts with an investment portfolio equal to the buyer's down payment and closing costs, compounding monthly at your chosen stock market return rate.
                </li>
              </ul>
            </div>
          </div>

          {/* Tool 2: Cost Per Mile */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Truck className="w-4 h-4" /></span>
              2. Trucking Cost Per Mile Equation
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                Designed for owner-operators to find their true break-even rate per mile:
              </p>
              <div className="my-2 p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                Cost Per Mile = [Monthly Fixed Overhead + Diesel Fuel Cost + Maintenance Reserve] / Total Miles Driven
              </div>
            </div>
          </div>

          {/* Tool 3: Debt Consolidation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><CreditCard className="w-4 h-4" /></span>
              3. Debt Consolidation Optimizer Formula
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                Calculates weighted APR across multiple credit cards and compares revolving card minimums against a fixed loan:
              </p>
              <div className="my-2 p-3 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                Weighted APR = ∑(Card Balance * Card APR) / Total Balance
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
