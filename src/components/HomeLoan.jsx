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
            <div className="h-48 flex items-center justify-center">
              <PieChart data={pieChartData} currencySymbol={currencySymbol} />
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
              Securing a home loan is the single largest financial commitment most individuals undertake. A mortgage enables buyers to acquire residential property by putting down a portion of the purchase price upfront while borrowing the remainder from a financial institution. However, the true monthly cost of homeownership extends far beyond principal and interest payments.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Home Loan Calculator is an all-inclusive mortgage amortization and property tax modeling engine. It computes your principal and interest (P&I) payments across 15-year or 30-year fixed terms while incorporating property taxes, homeowners insurance, and HOA fees to determine your total monthly outflow.
            </p>
            <p>
              <strong>Who Should Use It:</strong> This tool is essential for prospective homebuyers determining purchase budgets, homeowners considering mortgage refinancing, real estate agents estimating buyer affordability, and financial planners evaluating housing ratios.
            </p>
            <p>
              <strong>Why It Is Important:</strong> Many buyers calculate affordability based solely on the mortgage principal and interest payment. Failing to budget for property tax assessments, homeowners insurance premiums, and HOA dues can lead to severe housing cost distress. This calculator exposes your total monthly housing obligation (PITI + HOA) so you can purchase with confidence.
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
                Calculated using standard monthly amortization (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">M = P × [ r(1 + r)ⁿ ] ÷ [ (1 + r)ⁿ - 1 ]</code>). Interest dominates early payments, while principal reduction dominates later years.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                2. Property Taxes & Escrows
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Annual property taxes and home insurance are divided by 12 and collected monthly by lenders into escrow accounts to ensure bill payments.
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
              <h3 className="text-lg font-bold text-slate-900">Example: $400,000 Purchase at 20% Down vs 5% Down</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>20% Down:</strong> $80,000 Cash</div>
                <div><strong>Loan Amount:</strong> $320,000</div>
                <div><strong>P&I (6.5%):</strong> $2,022/mo</div>
                <div><strong>5% Down:</strong> $20,000 Cash</div>
                <div><strong>Loan Amount:</strong> $380,000</div>
                <div><strong>P&I (6.5%):</strong> $2,401/mo</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Analysis:</strong> Putting 20% down lowers monthly payment by <strong>$379/mo</strong> and saves <strong>$136,800 in total interest</strong> over 30 years while avoiding PMI fees entirely!</p>
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
                PITI stands for Principal, Interest, Taxes, and Insurance—the four core components of a total monthly mortgage payment.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">How much down payment do I really need?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Conventional loans require as little as 3% to 5% down; 20% down avoids PMI fees entirely.
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
