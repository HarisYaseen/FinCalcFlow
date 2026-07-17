import React, { useEffect } from 'react';
import { Cpu, TrendingUp, ShieldAlert, Globe, Users, Landmark, Truck, CreditCard } from 'lucide-react';

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
          About Our Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Users className="w-8 h-8" />
          </span>
          About FinCalc Flow
        </h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          Learn about our mission, our commitment to privacy, and the mathematical formulas powering our calculators.
        </p>
      </div>

      {/* Main Info Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Story */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4 text-left">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Our Mission & Story
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            FinCalc Flow was created out of frustration with existing online financial tools. Most calculators today are cluttered with heavy ads, pushy popup tracking consent forms, and slow backend servers that track your inputs.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            We built a completely free, professional-grade financial calculator hub that operates 100% on the client side. By leveraging serverless design, we ensure calculations are lightning-fast and entirely offline-capable.
          </p>
        </div>

        {/* Who is behind */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4 text-left">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500" />
            Who We Are
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            FinCalc Flow is built and maintained by an independent developer dedicated to financial literacy and software excellence. Our focus is to provide standard-compliant mathematical models that require zero sign-ups or user profiles.
          </p>
          <h3 className="text-sm font-bold text-slate-900 pt-2">Approach to Accuracy</h3>
          <p className="text-slate-600 text-xs leading-relaxed">
            All formulas and computations are based on standard financial and trucking industry methodologies, replicating calculations used by banks, lenders, and logistics dispatchers.
          </p>
        </div>
      </div>

      {/* Our Tools Grid */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6 text-left">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-500" />
          Our Professional-Grade Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-600">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Landmark className="w-4 h-4 text-blue-500" /> Rent vs. Buy Simulator
            </h3>
            <p className="text-xs text-slate-500">Compare renting versus purchasing a home with comprehensive equity growth comparisons.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Truck className="w-4 h-4 text-blue-500" /> Trucking Cost Per Mile
            </h3>
            <p className="text-xs text-slate-500">Calculate trucking operations expenses, fuel efficiencies, and driver break-even points.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
              <CreditCard className="w-4 h-4 text-emerald-500" /> Debt Consolidation Optimizer
            </h3>
            <p className="text-xs text-slate-500">Calculate payoff acceleration and interest savings through personal loan consolidation.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Cpu className="w-4 h-4 text-indigo-500" /> AdSense Revenue Planner
            </h3>
            <p className="text-xs text-slate-500">Estimate traffic requirement metrics and click rate yields to hit revenue goals.</p>
          </div>
        </div>
      </div>

      {/* Part 2: Calculator Methodologies */}
      <div id="methodology" className="space-y-6 pt-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 px-2 text-left">
          <Cpu className="w-5 h-5 text-indigo-500" />
          Methodology & Calculator Formulas
        </h2>

        <div className="grid grid-cols-1 gap-6 text-left">
          
          {/* Tool 1: Rent vs Buy */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Landmark className="w-4 h-4" /></span>
              Rent vs. Buy Simulator Math
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                The simulator projects asset value and opportunity costs year-by-year. Here is the step-by-step logic:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Buyer Mortgage Amortization:</strong> The monthly Principal & Interest (P&I) payment is calculated using:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] overflow-x-auto text-center">
                    M = P * [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                  </div>
                  Where <code>P</code> is the mortgage amount (Home Price minus Down Payment), <code>r</code> is monthly interest (Annual Rate / 12), and <code>n</code> is 360 (30-year fixed term).
                </li>
                <li>
                  <strong>Property Tax and Maintenance:</strong> Calculated annually based on the appreciated home value:
                  <code className="block mt-1">Property Tax = (Home Price * Tax Rate %) / 12</code>
                  <code className="block">Maintenance & Ins. = (Home Price * Maint Rate %) / 12</code>
                </li>
                <li>
                  <strong>Appreciation:</strong> Home Value compounds monthly: 
                  <code className="block mt-1">Value_new = Value_old * (1 + Annual Appreciation % / 12)</code>
                </li>
                <li>
                  <strong>Renter Stock Opportunities:</strong> The renter starts with a portfolio equal to the buyer's down payment. Every month, the difference between the buyer's monthly outgoings (P&I + taxes + maintenance) and the renter's monthly rent is calculated. If buying is more expensive, the renter invests the difference. If renting is more expensive, the difference is deducted. The renter's stock portfolio grows monthly at the stock market return rate.
                </li>
                <li>
                  <strong>Net Worth at stay end:</strong> 
                  <code className="block mt-1">Buyer Net Worth = Current Home Value - Remaining Mortgage Principal - 6% Selling Fee</code>
                  <code className="block">Renter Net Worth = Renter Stock Value</code>
                </li>
              </ul>
            </div>
          </div>

          {/* Tool 2: Cost Per Mile */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Truck className="w-4 h-4" /></span>
              Trucking Cost Per Mile Math
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                Designed for logistics operators, this tool calculates the operational break-even rate per mile:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Monthly Fixed Overhead:</strong> Aggregates costs that do not change based on driving distance:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Fixed Costs = Truck Payment + Insurance + (Annual Permits / 12)
                  </div>
                </li>
                <li>
                  <strong>Monthly Fuel Costs:</strong> Calculated based on expected distance and efficiency parameters:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Fuel Cost = (Miles Driven / Fuel Efficiency MPG) * Fuel Price Per Gallon
                  </div>
                </li>
                <li>
                  <strong>Monthly Maintenance Costs:</strong> Direct per-mile variable allocations:
                  <code className="block mt-1">Maintenance Cost = Miles Driven * Maint Rate Per Mile</code>
                </li>
                <li>
                  <strong>Total Cost Per Mile:</strong>
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Cost Per Mile = [Fixed Costs + Fuel Costs + Maintenance Costs] / Miles Driven
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Tool 3: Debt Consolidation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><CreditCard className="w-4 h-4" /></span>
              Debt Consolidation Optimizer Math
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                Compares paying off multiple individual revolving cards versus one installment consolidation loan:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Weighted Interest Rate (APR):</strong> The average interest rate representing all cards:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Weighted APR = Sum(Card Balance * Card APR) / Total Balance
                  </div>
                </li>
                <li>
                  <strong>Credit Card Payoff Simulation:</strong> Revolving credit card minimum payments decrease as the balance drops. The simulation calculates payments month-by-month:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Monthly Payment = Max(25, Interest Accrued + 1.5% of Current Balance)
                  </div>
                  Interest Accrued is calculated as <code>Current Balance * (Card APR / 12)</code>. The simulation stops when the balance reaches zero or at 360 months (30 years).
                </li>
                <li>
                  <strong>Loan Offer Amortization:</strong> Fixed installment payments:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Loan Payment = Total Balance * [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                  </div>
                  Where <code>r</code> is Monthly Loan APR / 12, and <code>n</code> is Loan Term in months.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
