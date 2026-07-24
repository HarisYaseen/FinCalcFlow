import React, { useState, useMemo } from 'react';
import { PieChart } from './Charts';
import { ShieldCheck, DollarSign, Percent, AlertTriangle, CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';

export default function DtiCalculator({ currencySymbol = '$' }) {
  const [grossIncomeMonthly, setGrossIncomeMonthly] = useState(7500);
  const [housingExpense, setHousingExpense] = useState(1800);
  const [autoLoans, setAutoLoans] = useState(450);
  const [creditCardMinimums, setCreditCardMinimums] = useState(250);
  const [studentLoans, setStudentLoans] = useState(200);
  const [otherDebts, setOtherDebts] = useState(100);

  // Calculations
  const calculations = useMemo(() => {
    const gross = Math.max(1, Number(grossIncomeMonthly) || 0);
    const housing = Math.max(0, Number(housingExpense) || 0);
    const auto = Math.max(0, Number(autoLoans) || 0);
    const cards = Math.max(0, Number(creditCardMinimums) || 0);
    const student = Math.max(0, Number(studentLoans) || 0);
    const other = Math.max(0, Number(otherDebts) || 0);

    const nonHousingDebt = auto + cards + student + other;
    const totalMonthlyDebt = housing + nonHousingDebt;

    const frontEndDti = (housing / gross) * 100;
    const backEndDti = (totalMonthlyDebt / gross) * 100;

    // Risk category assessment
    let riskCategory = 'Favorable';
    let riskBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    let riskDescription = 'Excellent debt ratio. You qualify easily for prime mortgage and personal loan rates.';

    if (backEndDti > 43) {
      riskCategory = 'High Risk';
      riskBadgeColor = 'bg-rose-100 text-rose-800 border-rose-300';
      riskDescription = 'High risk zone. Most conventional mortgage lenders reject DTI above 43% without compensating factors.';
    } else if (backEndDti > 36) {
      riskCategory = 'Manageable';
      riskBadgeColor = 'bg-amber-100 text-amber-800 border-amber-300';
      riskDescription = 'Moderate risk. You may qualify for loans, but lenders may require higher credit scores or reserves.';
    }

    const maxRecommendedDebt36 = gross * 0.36;
    const maxMortgageLimit43 = gross * 0.43;

    return {
      gross,
      housing,
      nonHousingDebt,
      totalMonthlyDebt,
      frontEndDti,
      backEndDti,
      riskCategory,
      riskBadgeColor,
      riskDescription,
      maxRecommendedDebt36,
      maxMortgageLimit43
    };
  }, [grossIncomeMonthly, housingExpense, autoLoans, creditCardMinimums, studentLoans, otherDebts]);

  // Chart data
  const pieChartData = [
    { name: 'Housing Expense', value: calculations.housing, color: '#3b82f6' },
    { name: 'Non-Housing Debts', value: calculations.nonHousingDebt, color: '#f59e0b' },
    { name: 'Remaining Income', value: Math.max(0, calculations.gross - calculations.totalMonthlyDebt), color: '#10b981' }
  ];

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
        <span className="text-slate-900 font-bold">Debt-to-Income (DTI) Calculator</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-black tracking-wider uppercase inline-block border border-amber-100">
          Underwriting & Borrowing Risk Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Debt-to-Income (DTI) Calculator
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Calculate your front-end and back-end Debt-to-Income ratios to evaluate mortgage pre-approval odds and lender risk categories.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-4">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            Income & Debt Commitments
          </h2>

          {/* Gross Monthly Income */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Gross Monthly Income (Pre-Tax $)</span>
              <span className="text-indigo-600 font-bold">${Number(grossIncomeMonthly).toLocaleString()}</span>
            </label>
            <div className="relative">
              <input 
                type="number"
                value={grossIncomeMonthly}
                onChange={(e) => setGrossIncomeMonthly(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
              />
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Monthly Debts Breakdown */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monthly Recurring Debt Payments</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Mortgage / Rent ($)</label>
                <input 
                  type="number"
                  value={housingExpense}
                  onChange={(e) => setHousingExpense(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Auto Loans ($)</label>
                <input 
                  type="number"
                  value={autoLoans}
                  onChange={(e) => setAutoLoans(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Credit Card Minimums ($)</label>
                <input 
                  type="number"
                  value={creditCardMinimums}
                  onChange={(e) => setCreditCardMinimums(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Student Loans ($)</label>
                <input 
                  type="number"
                  value={studentLoans}
                  onChange={(e) => setStudentLoans(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Other Personal Loans / Debt ($)</label>
              <input 
                type="number"
                value={otherDebts}
                onChange={(e) => setOtherDebts(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
              />
            </div>
          </div>

        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest">Underwriting DTI Assessment</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${calculations.riskBadgeColor}`}>
                {calculations.riskCategory}
              </span>
            </div>

            <div className="space-y-2 text-center py-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Back-End DTI Ratio</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {calculations.backEndDti.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed pt-1">
                {calculations.riskDescription}
              </p>
            </div>

            {/* Output Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Front-End (Housing) DTI</span>
                <span className="text-lg font-extrabold text-indigo-300">{calculations.frontEndDti.toFixed(1)}%</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Total Monthly Debt</span>
                <span className="text-lg font-extrabold text-white">${Math.round(calculations.totalMonthlyDebt).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">36% Ideal Debt Cap</span>
                <span className="text-lg font-extrabold text-emerald-400">${Math.round(calculations.maxRecommendedDebt36).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">43% Lender Limit</span>
                <span className="text-lg font-extrabold text-amber-400">${Math.round(calculations.maxMortgageLimit43).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Gross Income Allocation</h3>
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
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span><strong>Last Updated:</strong> July 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span><strong>Methodology:</strong> Lender Underwriting Risk & DTI Engine</span>
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold">100% Client-Side Private</span>
          </div>
        </div>

        {/* 1. Introduction */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 border-b pb-3">The Complete Guide to Debt-to-Income (DTI) Ratios</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              Your Debt-to-Income (DTI) ratio is the single most critical financial metric used by mortgage underwriters, auto lenders, and personal loan providers to assess borrowing risk. While your credit score measures payment history, your DTI ratio measures your capacity to manage monthly debt payments relative to your income.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Debt-to-Income (DTI) Calculator is a lender underwriting simulator. It computes both front-end (housing-only) and back-end (total debt) DTI percentages to categorize your borrowing risk profile.
            </p>
            <p>
              <strong>Who Should Use It:</strong> Essential for prospective homebuyers preparing for mortgage pre-approval, individuals planning personal or auto loan applications, and financial coaches guiding debt management plans.
            </p>
            <p>
              <strong>Why It Is Important:</strong> Conventional mortgage rules (such as Fannie Mae and Freddie Mac guidelines) capped standard back-end DTI at 43%. If your monthly debt commitments exceed 43% of gross income, loan applications face automatic denial or require costly compensating reserves.
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
            <li><strong>Gross Pre-Tax Income Basis:</strong> Underwriting rules evaluate gross monthly income before tax withholdings.</li>
            <li><strong>Exclusion of Living Expenses:</strong> DTI considers only formal debt obligations (loans, credit cards), excluding groceries, utilities, and insurance.</li>
          </ul>
        </div>

        <hr className="border-slate-200" />

        {/* 2. How It Works */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Front-End vs. Back-End DTI Ratios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                Front-End DTI (Housing Ratio)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">(Housing Expense ÷ Gross Income) × 100</code>. Mortgage lenders prefer front-end housing DTI below 28%.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                Back-End DTI (Total Debt Ratio)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">(Total Monthly Debts ÷ Gross Income) × 100</code>. Includes mortgage/rent, auto loans, card minimums, and student loans. Lenders prefer under 36%.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. Formulas */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mathematical Formulas & Variable Definitions</h2>
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Back-End DTI Formula</h3>
            <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 font-bold">
              DTI_backend = ( Total_Monthly_Debts / Gross_Monthly_Income ) &times; 100
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 4. Worked Example */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Worked Step-by-Step Example</h2>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Example: $7,500 Gross Income with $2,800 Monthly Debt</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
              <div><strong>Gross Income:</strong> $7,500/mo</div>
              <div><strong>Housing:</strong> $1,800/mo</div>
              <div><strong>Other Debt:</strong> $1,000/mo</div>
              <div><strong>Front-End DTI:</strong> 24.0%</div>
              <div><strong>Back-End DTI:</strong> 37.3%</div>
              <div><strong>Category:</strong> Manageable</div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 5. FAQs */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-amber-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is a good DTI ratio for mortgage approval?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                36% or lower is ideal. 43% is the standard maximum limit for conventional mortgages.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">How can I quickly lower my DTI ratio?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Pay off small credit card balances to eliminate minimum payments, or consolidate high-payment debt using personal loans.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 6. Contextual Links */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Explore Related Debt Tools</h3>
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
              <p className="text-xs text-slate-500">Model personal loan installments to lower monthly DTI.</p>
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
              <p className="text-xs text-slate-500">Consolidate revolving credit card minimums to optimize DTI ratios.</p>
            </a>
          </div>
        </div>

        {/* References */}
        <div className="pt-4 text-xs text-slate-400 border-t border-slate-100 space-y-1">
          <strong className="text-slate-500 block">Authoritative References & Data Sources:</strong>
          <p>• Consumer Financial Protection Bureau (CFPB): <span className="underline">What is a Debt-to-Income Ratio?</span></p>
          <p>• Fannie Mae Single Family Selling Guide: <span className="underline">Eligibility & DTI Underwriting Standards</span></p>
        </div>

      </div>

    </div>
  );
}
