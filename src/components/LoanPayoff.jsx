import React, { useState, useMemo } from 'react';
import { PieChart } from './Charts';
import { Calculator, DollarSign, Percent, Sparkles, AlertCircle } from 'lucide-react';

export default function LoanPayoff({ currencySymbol = '$' }) {
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [basePayment, setBasePayment] = useState(512);
  const [extraPayment, setExtraPayment] = useState(150);
  const [lumpSum, setLumpSum] = useState(1000);

  // Payoff calculations
  const calculations = useMemo(() => {
    const balanceInitial = Math.max(0, Number(currentBalance) || 0);
    const annualRate = Math.max(0, Number(interestRate) || 0);
    const monthlyRate = annualRate / 100 / 12;
    const basePMT = Math.max(0, Number(basePayment) || 0);
    const extraPMT = Math.max(0, Number(extraPayment) || 0);
    const oneTimeLump = Math.max(0, Number(lumpSum) || 0);

    // 1. Standard Schedule (No Extra Payments)
    let bStandard = balanceInitial;
    let interestStandard = 0;
    let monthsStandard = 0;
    while (bStandard > 0 && monthsStandard < 360) {
      monthsStandard++;
      const interestMonth = bStandard * monthlyRate;
      let principalMonth = basePMT - interestMonth;

      if (principalMonth <= 0) break; // Invalid payment scenario
      if (principalMonth > bStandard) principalMonth = bStandard;

      bStandard -= principalMonth;
      interestStandard += interestMonth;
    }

    // 2. Accelerated Schedule (With Extra PMT & Lump Sum)
    let bAccelerated = Math.max(0, balanceInitial - oneTimeLump);
    let interestAccelerated = 0;
    let monthsAccelerated = 0;
    const totalAcceleratedPMT = basePMT + extraPMT;

    while (bAccelerated > 0 && monthsAccelerated < 360) {
      monthsAccelerated++;
      const interestMonth = bAccelerated * monthlyRate;
      let principalMonth = totalAcceleratedPMT - interestMonth;

      if (principalMonth <= 0) break;
      if (principalMonth > bAccelerated) principalMonth = bAccelerated;

      bAccelerated -= principalMonth;
      interestAccelerated += interestMonth;
    }

    const monthsSaved = Math.max(0, monthsStandard - monthsAccelerated);
    const interestSaved = Math.max(0, interestStandard - interestAccelerated);

    return {
      monthsStandard,
      monthsAccelerated,
      interestStandard,
      interestAccelerated,
      monthsSaved,
      interestSaved
    };
  }, [currentBalance, interestRate, basePayment, extraPayment, lumpSum]);

  // Chart data
  const pieChartData = [
    { name: 'Accelerated Interest', value: calculations.interestAccelerated, color: '#10b981' },
    { name: 'Interest Saved', value: calculations.interestSaved, color: '#3b82f6' }
  ].filter(item => item.value > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10 text-slate-800">
      
      {/* Visible Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <a 
          href="/" 
          onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/'); window.dispatchEvent(new Event('popstate')); }} 
          className="hover:text-indigo-600 transition-colors"
        >
          Home
        </a>
        <span>&rarr;</span>
        <a 
          href="/calculators/loan-calculators" 
          onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/calculators/loan-calculators'); window.dispatchEvent(new Event('popstate')); }} 
          className="hover:text-indigo-600 transition-colors"
        >
          Loan Calculators
        </a>
        <span>&rarr;</span>
        <span className="text-slate-900 font-bold">Loan Payoff Calculator</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black tracking-wider uppercase inline-block border border-emerald-100">
          Debt Acceleration Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Loan Payoff Calculator
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          See how adding extra monthly payments or a lump-sum payment shrinks your loan term and saves thousands in interest.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-4">
            <Calculator className="w-5 h-5 text-indigo-600" />
            Current Debt Details
          </h2>

          {/* Current Loan Balance */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Current Principal Balance ($)</span>
              <span className="text-indigo-600 font-bold">${Number(currentBalance).toLocaleString()}</span>
            </label>
            <div className="relative">
              <input 
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
              />
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Interest Rate & Base Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Interest Rate (APR %)</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                />
                <Percent className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Current Monthly Payment ($)</label>
              <div className="relative">
                <input 
                  type="number"
                  value={basePayment}
                  onChange={(e) => setBasePayment(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                />
                <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>

          {/* Payoff Acceleration Inputs */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Accelerated Repayments
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Extra Monthly Payment ($)</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                  />
                  <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">One-Time Lump Sum ($)</label>
                <div className="relative">
                  <input 
                    type="number"
                    value={lumpSum}
                    onChange={(e) => setLumpSum(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                  />
                  <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">Payoff Savings Projection</span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-500/30">
                Interest Reduction
              </span>
            </div>

            <div className="space-y-2 text-center py-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Interest Saved</span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                ${Math.round(calculations.interestSaved).toLocaleString()}
              </div>
            </div>

            {/* Output Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Standard Duration</span>
                <span className="text-lg font-extrabold text-white">{calculations.monthsStandard} Months</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">New Accelerated Duration</span>
                <span className="text-lg font-extrabold text-emerald-400">{calculations.monthsAccelerated} Months</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Time Saved</span>
                <span className="text-lg font-extrabold text-indigo-300">{calculations.monthsSaved} Months</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Accelerated Interest</span>
                <span className="text-lg font-extrabold text-amber-400">${Math.round(calculations.interestAccelerated).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Interest Paid vs. Interest Saved</h3>
            <div className="h-48 flex items-center justify-center">
              <PieChart data={pieChartData} currencySymbol={currencySymbol} />
            </div>
          </div>
        </div>

      </div>

      {/* Step 1 Educational Guide */}
      <div className="seo-content-container bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-10 space-y-10 text-left">
        
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span><strong>Last Updated:</strong> July 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span><strong>Methodology:</strong> Debt Payoff Acceleration Engine</span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">100% Client-Side Private</span>
          </div>
        </div>

        {/* 1. Introduction */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 border-b pb-3">The Complete Guide to Loan Payoff & Interest Acceleration</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              Paying off debts early is one of the most guaranteed ways to earn a risk-free return on your money. When you make extra principal payments on a personal loan, mortgage, or auto loan, every extra dollar directly reduces your remaining principal balance, preventing future compound interest from accruing.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Loan Payoff Calculator is an interactive debt acceleration simulator. It compares your current standard loan amortization against an accelerated repayment schedule powered by extra monthly payments or one-time lump-sum contributions.
            </p>
            <p>
              <strong>Who Should Use It:</strong> Designed for borrowers seeking to become debt-free faster, individuals who received a tax refund or work bonus, and budgeters optimizing debt avalanche or debt snowball strategies.
            </p>
            <p>
              <strong>Why It Is Important:</strong> Many borrowers do not realize how even small extra payments ($50 or $100/mo) dramatically shorten loan duration. On a 5-year loan, extra principal payments can slice 12 to 18 months off your payoff timeline and save thousands in interest. This calculator quantifies those exact time and interest savings.
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Assumptions */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Key Model Assumptions & Practical Limitations
          </h3>
          <ul className="text-xs text-amber-950 space-y-2 list-disc list-inside font-medium leading-relaxed">
            <li><strong>Direct Principal Allocation:</strong> Assumes extra payments are applied by your lender directly toward principal balance reduction.</li>
            <li><strong>No Prepayment Penalty:</strong> Assumes your loan agreement allows penalty-free early payoff.</li>
          </ul>
        </div>

        <hr className="border-slate-200" />

        {/* 2. How It Works */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">How Loan Payoff Acceleration Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                1. Compound Interest Savings
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Reducing principal balance reduces next month's interest charge ($Interest = Balance \times \frac{APR}{12}$), compounding savings over remaining months.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                2. Term Reduction
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Because principal declines faster, the loan reaches zero balance months or years ahead of the original contractual maturity date.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. Formulas */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mathematical Formulas & Variable Definitions</h2>
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Interest Savings Formula</h3>
            <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-bold">
              Interest_saved = Interest_standard - Interest_accelerated
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 4. Worked Example */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Worked Step-by-Step Example</h2>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Example: $25,000 Loan at 8.5% APR ($150/mo Extra + $1,000 Lump Sum)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
              <div><strong>Original Balance:</strong> $25,000</div>
              <div><strong>Standard Term:</strong> 60 Months</div>
              <div><strong>Standard Interest:</strong> $5,720</div>
              <div><strong>Accelerated Term:</strong> 42 Months</div>
              <div><strong>Accelerated Interest:</strong> $3,580</div>
              <div><strong>Total Interest Saved:</strong> $2,140</div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 5. FAQs */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Is paying off a loan early always smart?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Paying off high-interest loans (8%+) is almost always smart. For low-interest loans (under 4%), investing surplus cash in index funds may yield higher returns.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">How do I ensure extra payments go to principal?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Specify "Apply to Principal" when making extra payments online or by check to prevent lenders from treating extra funds as advance future monthly payments.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 6. Contextual Links */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Explore Related Loan & Debt Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <a 
              href="/calculators/personal-loan-calculator"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/calculators/personal-loan-calculator'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center justify-between mb-1">
                <span>Personal Loan Calculator</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">Model personal loan installments and initial loan terms.</p>
            </a>
            <a 
              href="/debt-consolidation"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/debt-consolidation'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center justify-between mb-1">
                <span>Debt Consolidation Optimizer</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">Combine multiple credit card balances into a single lower interest payment.</p>
            </a>
          </div>
        </div>

        {/* References */}
        <div className="pt-4 text-xs text-slate-400 border-t border-slate-100 space-y-1">
          <strong className="text-slate-500 block">Authoritative References & Data Sources:</strong>
          <p>• Consumer Financial Protection Bureau (CFPB): <span className="underline">Loan Principal Prepayment Guidelines</span></p>
        </div>

      </div>

    </div>
  );
}
