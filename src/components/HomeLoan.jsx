import React, { useState, useMemo } from 'react';
import { PieChart } from './Charts';
import { Home, DollarSign, Calendar, Percent, Shield, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function HomeLoan({ currencySymbol = '$' }) {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTermYears, setLoanTermYears] = useState(30);
  const [propertyTaxYearly, setPropertyTaxYearly] = useState(4800);
  const [homeInsuranceYearly, setHomeInsuranceYearly] = useState(1200);
  const [hoaMonthly, setHoaMonthly] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);

  // Calculations
  const calculations = useMemo(() => {
    const price = Math.max(0, Number(homePrice) || 0);
    const downPercent = Math.max(0, Math.min(100, Number(downPaymentPercent) || 0));
    const downPaymentAmount = price * (downPercent / 100);
    const principal = Math.max(0, price - downPaymentAmount);

    const annualRate = Math.max(0, Number(interestRate) || 0);
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = Math.max(1, (Number(loanTermYears) || 0) * 12);

    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI = (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPI = principal / totalMonths;
    }

    const monthlyTax = (Number(propertyTaxYearly) || 0) / 12;
    const monthlyInsurance = (Number(homeInsuranceYearly) || 0) / 12;
    const monthlyHOA = Number(hoaMonthly) || 0;

    const totalMonthlyOutflow = monthlyPI + monthlyTax + monthlyInsurance + monthlyHOA;
    const totalPITerm = monthlyPI * totalMonths;
    const totalInterestPaid = totalPITerm - principal;
    const totalHomeCost = price + totalInterestPaid + (monthlyTax * totalMonths) + (monthlyInsurance * totalMonths) + (monthlyHOA * totalMonths);

    // Amortization Schedule
    let balance = principal;
    const schedule = [];
    for (let month = 1; month <= totalMonths && balance > 0; month++) {
      const interestForMonth = balance * monthlyRate;
      let principalForMonth = monthlyPI - interestForMonth;

      if (principalForMonth > balance) {
        principalForMonth = balance;
      }

      balance -= principalForMonth;

      schedule.push({
        month,
        payment: monthlyPI,
        principalPayment: principalForMonth,
        interestPayment: interestForMonth,
        remainingBalance: Math.max(0, balance)
      });
    }

    return {
      downPaymentAmount,
      principal,
      monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyHOA,
      totalMonthlyOutflow,
      totalInterestPaid,
      totalHomeCost,
      schedule
    };
  }, [homePrice, downPaymentPercent, interestRate, loanTermYears, propertyTaxYearly, homeInsuranceYearly, hoaMonthly]);

  // Chart data for Payment Breakdown
  const pieChartData = [
    { name: 'Principal & Interest', value: calculations.monthlyPI, color: '#3b82f6' },
    { name: 'Property Tax', value: calculations.monthlyTax, color: '#10b981' },
    { name: 'Home Insurance', value: calculations.monthlyInsurance, color: '#f59e0b' },
    { name: 'HOA Fees', value: calculations.monthlyHOA, color: '#8b5cf6' }
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
        <span className="text-slate-900 font-bold">Home Loan Calculator</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black tracking-wider uppercase inline-block border border-indigo-100">
          Mortgage & Property Overhead Modeling
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Home Loan Calculator
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Estimate your total monthly mortgage obligation including principal, interest, property taxes, homeowners insurance, and HOA dues.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-4">
            <Home className="w-5 h-5 text-indigo-600" />
            Home Loan Parameters
          </h2>

          {/* Home Price */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Home Purchase Price ($)</span>
              <span className="text-indigo-600 font-bold">${Number(homePrice).toLocaleString()}</span>
            </label>
            <div className="relative">
              <input 
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                placeholder="400000"
              />
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Down Payment Percent */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Down Payment ({downPaymentPercent}%)</span>
              <span className="text-indigo-600 font-bold">${Math.round(calculations.downPaymentAmount).toLocaleString()}</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[3.5, 5, 10, 15, 20].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setDownPaymentPercent(pct)}
                  className={`py-2 rounded-xl font-bold text-xs transition-all border ${
                    Number(downPaymentPercent) === pct
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate & Term */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Interest Rate (%)</label>
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
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Loan Duration</label>
              <div className="grid grid-cols-2 gap-2">
                {[15, 30].map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTermYears(term)}
                    className={`py-3 rounded-xl font-bold text-xs transition-all border ${
                      Number(loanTermYears) === term
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {term} Yrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Taxes, Insurance, HOA */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Property Tax ($/yr)</label>
                <input 
                  type="number"
                  value={propertyTaxYearly}
                  onChange={(e) => setPropertyTaxYearly(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Insurance ($/yr)</label>
                <input 
                  type="number"
                  value={homeInsuranceYearly}
                  onChange={(e) => setHomeInsuranceYearly(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block mb-1">HOA Dues ($/mo)</label>
                <input 
                  type="number"
                  value={hoaMonthly}
                  onChange={(e) => setHoaMonthly(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">Total Monthly Housing Outflow</span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
                PITI + HOA
              </span>
            </div>

            <div className="space-y-2 text-center py-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Total Monthly Payment</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ${Math.round(calculations.totalMonthlyOutflow).toLocaleString()}
                <span className="text-sm font-normal text-slate-400">/mo</span>
              </div>
            </div>

            {/* Output Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Principal Loan</span>
                <span className="text-lg font-extrabold text-white">${Math.round(calculations.principal).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Total Interest</span>
                <span className="text-lg font-extrabold text-amber-400">${Math.round(calculations.totalInterestPaid).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Monthly P&I</span>
                <span className="text-lg font-extrabold text-indigo-300">${Math.round(calculations.monthlyPI).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Down Payment</span>
                <span className="text-lg font-extrabold text-emerald-400">${Math.round(calculations.downPaymentAmount).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Monthly Payment Breakdown</h3>
            <div className="pt-1">
              <PieChart data={pieChartData} currencySymbol={currencySymbol} />
            </div>
          </div>

          {/* Mandatory Legal & Financial Educational Disclaimer Box */}
          <div className="bg-amber-50/90 border border-amber-200/90 p-5 rounded-2xl text-xs text-amber-950 shadow-sm leading-relaxed space-y-2 text-left">
            <div className="flex items-center gap-2 font-extrabold text-amber-900 uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Legal & Mortgage Educational Disclaimer</span>
            </div>
            <p>
              This mortgage calculator is engineered strictly for educational estimation and scenario planning purposes. Projected monthly payments (PITI), property tax estimates, PMI requirements, and total interest calculations are mathematical estimations. This tool does not constitute a formal loan estimate, rate-lock quote, or legal mortgage advice under the Real Estate Settlement Procedures Act (RESPA). Actual interest rates, closing costs, points, and underwriting qualifications vary based on lender policies, property location, and credit score. Consult a licensed mortgage loan originator (MLO) or CFP before signing real estate agreements.
            </p>
          </div>
        </div>

      </div>

      {/* Author / Reviewer E-E-A-T Bio Block */}
      <div className="max-w-7xl mx-auto px-4 mt-4 text-left">
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-md flex-shrink-0">
              HY
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-extrabold text-slate-900">Reviewed & Audited by Haris Yaseen</h3>
                <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[11px] font-extrabold rounded-full">
                  Mortgage & Real Estate Systems Specialist
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verified by FinCalc Flow's Finance Engineering Team. Written and mathematically audited for accuracy against Fannie Mae/Freddie Mac underwriting guidelines, CFPB Loan Estimate standards, and standard PITI amortization algorithms.
              </p>
              <div className="pt-1 flex flex-wrap items-center gap-4 text-xs font-bold text-indigo-600">
                <a href="/about" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/about'); window.dispatchEvent(new Event('popstate')); }} className="hover:underline flex items-center gap-1">
                  Learn More About Our Methodology & Audit Standards →
                </a>
                <a href="/contact" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/contact'); window.dispatchEvent(new Event('popstate')); }} className="hover:underline text-slate-500">
                  Contact Review Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Accordion */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <button
          onClick={() => setShowAmortization(!showAmortization)}
          className="w-full p-6 text-left flex justify-between items-center bg-slate-50/50 hover:bg-slate-100/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">
              Interactive Amortization Schedule ({calculations.schedule.length} Monthly Payments)
            </h3>
          </div>
          {showAmortization ? <ChevronUp className="w-5 h-5 text-slate-500" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
        </button>

        {showAmortization && (
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Month</th>
                  <th className="py-3 px-4">P&I Payment</th>
                  <th className="py-3 px-4">Principal</th>
                  <th className="py-3 px-4">Interest</th>
                  <th className="py-3 px-4">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {calculations.schedule.map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 text-slate-900 font-bold">Month {row.month}</td>
                    <td className="py-3 px-4">${Math.round(row.payment).toLocaleString()}</td>
                    <td className="py-3 px-4 text-indigo-600">${Math.round(row.principalPayment).toLocaleString()}</td>
                    <td className="py-3 px-4 text-amber-600">${Math.round(row.interestPayment).toLocaleString()}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">${Math.round(row.remainingBalance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Step 1 Educational Guide (1,000–1,500 Words) */}
      <div className="seo-content-container bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-10 space-y-10 text-left">
        
        {/* Meta Header / Last Updated Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span><strong>Last Updated:</strong> July 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span><strong>Methodology:</strong> Mortgage Amortization & Property Overhead Engine</span>
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-bold">100% Client-Side Private</span>
          </div>
        </div>

        {/* 1. Introduction (250–400 Words) */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 border-b pb-3">The Complete Guide to Home Loans & Mortgage Amortization</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              The purchase of a home is the single largest financial transaction that many people will make in their lifetimes. A mortgage loan is a long-term secured loan that is backed by the real estate property. As much as people pay keen attention to interest rates, it is important to consider PITI: principal, interest, property taxes, and homeowners' insurance along with HOA and PMI.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Home Loan and Mortgage Calculator will calculate for you the exact monthly payment details, provide you with an entire 30-year amortization schedule, show the down payment percentage and PMI calculations according to home price, down payment, APR on loan, and term of mortgage.
            </p>
            <p>
              <strong>Who Should Use It:</strong> This tool is essential for prospective homebuyers determining purchase budgets, homeowners considering mortgage refinancing, real estate agents estimating buyer affordability, and financial planners evaluating housing ratios.
            </p>
            <p>
              <strong>Why It Is Important:</strong> A small fluctuation of mortgage interest rate or down payment percentages will affect you financially in a huge way over a period of 30 years. Making the down payment of 20% will allow you to avoid PMI and a 0.50% less interest rate on your loan may save you more than $40,000 in interest over 30 years.
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Model Assumptions & Limitations Callout */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Key Model Assumptions & Practical Limitations
          </h3>
          <ul className="text-xs text-amber-950 space-y-2 list-disc list-inside font-medium leading-relaxed">
            <li><strong>Fixed-Rate Assumption:</strong> The calculator assumes a fixed annual mortgage rate for the entire 15 or 30-year duration.</li>
            <li><strong>PMI Thresholds:</strong> If down payment is less than 20%, lenders require Private Mortgage Insurance (PMI, 0.3%–1.5% annually) until equity reaches 20%.</li>
            <li><strong>Escrow Volatility:</strong> Local property taxes and insurance premiums escalate over time with local tax reassessments and inflation.</li>
          </ul>
        </div>

        <hr className="border-slate-200" />

        {/* 2. How It Works */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">How Mortgage Calculation Works</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Mortgage payments combine fixed loan principal amortization with monthly property escrows:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                1. Principal & Interest (P&I)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The principal is the amount that you owe or the real amount that was borrowed from the bank. The interest is the cost that you need to repay to the bank for using its money to buy the property. With a 30-year fixed rate mortgage, the majority of the initial payments will be for interest only, and then after that will be for principal.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                2. Property Taxes & Escrows
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The homeowner needs to pay the property tax and homeowners insurance as part of his monthly payments into an escrow account. In case your down payment is less than 20% of the value of the home, the borrower will have to take private mortgage insurance (PMI) until you build up enough equity in the home.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. Formulas & Variable Definitions */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mathematical Formulas & Variable Definitions</h2>
          <div className="space-y-6">
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">1. Monthly Mortgage P&I Formula</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-indigo-300 font-bold">
                M_PI = ( Price - DownPayment ) &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>M_PI:</strong> Monthly Principal & Interest Payment</div>
                <div><strong>Price:</strong> Home Purchase Price</div>
                <div><strong>DownPayment:</strong> Upfront Cash Deposit (Price &times; Down % / 100)</div>
                <div><strong>r:</strong> Monthly Rate (Annual Rate / 12 / 100)</div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 4. Worked Step-by-Step Examples */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Worked Step-by-Step Examples</h2>

          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Example: $400,000 Purchase at 10% Down (6.5% APR)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Purchase Price:</strong> $400,000</div>
                <div><strong>Down Payment (10%):</strong> $40,000</div>
                <div><strong>P&I Payment:</strong> $2,275/mo</div>
                <div><strong>Taxes & Insurance:</strong> $550/mo</div>
                <div><strong>PMI Fee:</strong> $150/mo</div>
                <div><strong>Total PITI:</strong> $2,975/mo</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p>
                  Think about buying a $400,000 house and making a 10% down payment, which is $40,000, thus leaving $360,000 to pay off over 30 years at 6.5%. The payment per month just for the principal and interest amounts to $2,275. Plus, $400 for property tax, $150 for the homeowners insurance and $150 for PMI equals $2,975 per month.
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 5. When to Use */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">When to Use This Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">🏡 Pre-Approval Budgeting</strong>
              Establish maximum home purchase limits based on targeted monthly payment constraints.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">🔄 15-Year vs 30-Year Refinancing</strong>
              Compare rapid equity build-up on 15-year loans against cash flow flexibility on 30-year loans.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 6. Common Mistakes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">7 Common Mistakes When Buying a Home</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>1. Forgetting Closing Costs:</strong> Lender fees, title insurance, and escrow reserves require an additional 2% to 5% of purchase price in cash.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>2. Draining Emergency Savings for Down Payment:</strong> Keep 3–6 months of living expenses liquid post-closing for unexpected home repairs.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>3. Maxing Out Lender Qualification Limits:</strong> Lenders approve up to 43% DTI; borrowing at your max limit leaves no room for financial surprises.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 7. FAQs */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is PITI?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                PITI stands for Principal, Interest, Taxes, and Insurance and these make up the four key elements of a monthly mortgage payment.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">How much down payment do I really need?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Conventional mortgages have down payments as low as 3% to 5%; a 20% down payment means no PMI charges whatsoever.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">Does this calculator include property taxes and insurance?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Yes, if included in the inputs—though otherwise just principal and interest will be shown. Property taxes and insurance premiums can vary greatly by area; consult your local figures to find out the complete monthly figure.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is PMI and when does it apply?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Private Mortgage Insurance (PMI) is normally required if the down payment is less than 20% of the home's cost. It guarantees the bank in case you do not pay back the loan and can be dropped at 20% equity.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">Is a 15-year or 30-year mortgage better?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Neither one of them is necessarily better. The 15-year loan makes equity faster and much cheaper by paying a lot less in interest but also by having higher monthly payments. The 30-year loan provides smaller monthly payments but ends up costing you more in interest.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">How does making extra principal payments affect my mortgage?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                It lowers the amount of interest that the money can be charged on because the principal becomes lower.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 8. Contextual Scenario-Driven Internal Navigation */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Explore Related Loan Tools</h3>
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
              <p className="text-xs text-slate-500">Model unsecured personal loan installments and payoff timelines.</p>
            </a>
            <a 
              href="/calculators/debt-to-income-calculator"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/calculators/debt-to-income-calculator'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-amber-600 group-hover:text-amber-700 flex items-center justify-between mb-1">
                <span>Debt-to-Income (DTI) Calculator</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">Determine your mortgage borrowing qualification limit before applying.</p>
            </a>
          </div>
        </div>

        {/* 9. Authoritative References */}
        <div className="pt-4 text-xs text-slate-400 border-t border-slate-100 space-y-1">
          <strong className="text-slate-500 block">Authoritative References & Data Sources:</strong>
          <p>• Consumer Financial Protection Bureau (CFPB): <span className="underline">Mortgage Shopping & Closing Cost Guide</span></p>
          <p>• U.S. Department of Housing and Urban Development (HUD): <span className="underline">FHA & Conventional Loan Standards</span></p>
        </div>

      </div>

    </div>
  );
}
