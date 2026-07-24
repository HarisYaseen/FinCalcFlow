import React, { useState, useMemo } from 'react';
import { PieChart } from './Charts';
import { Calculator, DollarSign, Calendar, Percent, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function PersonalLoan({ currencySymbol = '$' }) {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [loanTermYears, setLoanTermYears] = useState(3);
  const [extraPayment, setExtraPayment] = useState(0);
  const [showAmortization, setShowAmortization] = useState(false);

  // Amortization & Payoff Calculations
  const calculations = useMemo(() => {
    const principal = Math.max(0, Number(loanAmount) || 0);
    const annualRate = Math.max(0, Number(interestRate) || 0);
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = Math.max(1, (Number(loanTermYears) || 0) * 12);
    const extra = Math.max(0, Number(extraPayment) || 0);

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      monthlyPayment = principal / totalMonths;
    }

    // Generate month-by-month schedule
    let balance = principal;
    let totalInterestPaid = 0;
    let totalInterestWithExtra = 0;
    let monthsToPayoff = 0;
    const schedule = [];

    for (let month = 1; month <= totalMonths && balance > 0; month++) {
      const interestForMonth = balance * monthlyRate;
      let principalForMonth = (monthlyPayment - interestForMonth) + extra;

      if (principalForMonth > balance) {
        principalForMonth = balance;
      }

      balance -= principalForMonth;
      totalInterestPaid += interestForMonth;
      monthsToPayoff = month;

      schedule.push({
        month,
        payment: principalForMonth + interestForMonth,
        principalPayment: principalForMonth,
        interestPayment: interestForMonth,
        remainingBalance: Math.max(0, balance)
      });
    }

    const totalRepayment = principal + totalInterestPaid;
    const standardTotalInterest = (monthlyPayment * totalMonths) - principal;
    const interestSaved = Math.max(0, standardTotalInterest - totalInterestPaid);
    const monthsSaved = Math.max(0, totalMonths - monthsToPayoff);

    return {
      monthlyPayment,
      totalPaymentWithExtra: monthlyPayment + extra,
      totalPrincipal: principal,
      totalInterest: totalInterestPaid,
      totalRepayment,
      monthsToPayoff,
      interestSaved,
      monthsSaved,
      schedule
    };
  }, [loanAmount, interestRate, loanTermYears, extraPayment]);

  // Chart data for Principal vs Interest breakdown
  const pieChartData = [
    { name: 'Principal Amount', value: calculations.totalPrincipal, color: '#3b82f6' },
    { name: 'Total Interest', value: calculations.totalInterest, color: '#f59e0b' }
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
        <span className="text-slate-900 font-bold">Personal Loan Calculator</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black tracking-wider uppercase inline-block border border-indigo-100">
          Fixed Installment Modeling
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Personal Loan Calculator
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Calculate your exact monthly payments, total interest costs, and early payoff savings with a full interactive amortization schedule.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-4">
            <Calculator className="w-5 h-5 text-indigo-600" />
            Loan Parameters
          </h2>

          {/* Loan Amount */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Loan Amount ($)</span>
              <span className="text-indigo-600 font-bold">${Number(loanAmount).toLocaleString()}</span>
            </label>
            <div className="relative">
              <input 
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                placeholder="15000"
              />
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
            <input 
              type="range"
              min="1000"
              max="100000"
              step="1000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Interest Rate (APR %)</span>
              <span className="text-indigo-600 font-bold">{interestRate}%</span>
            </label>
            <div className="relative">
              <input 
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                placeholder="9.5"
              />
              <Percent className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
            <input 
              type="range"
              min="3"
              max="35"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Loan Term Years */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Loan Term</span>
              <span className="text-indigo-600 font-bold">{loanTermYears} Years ({loanTermYears * 12} Months)</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 5, 7].map((term) => (
                <button
                  key={term}
                  onClick={() => setLoanTermYears(term)}
                  className={`py-2.5 rounded-xl font-bold text-xs transition-all border ${
                    Number(loanTermYears) === term
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {term} {term === 1 ? 'Yr' : 'Yrs'}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Monthly Payment */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Extra Monthly Payment (Optional)</span>
              <span className="text-emerald-600 font-bold">+${Number(extraPayment).toLocaleString()}/mo</span>
            </label>
            <div className="relative">
              <input 
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-sm"
                placeholder="0"
              />
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">Monthly Commitment</span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
                Fixed Rate
              </span>
            </div>

            <div className="space-y-2 text-center py-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Estimated Monthly Payment</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ${Math.round(calculations.totalPaymentWithExtra).toLocaleString()}
                <span className="text-sm font-normal text-slate-400">/mo</span>
              </div>
              {extraPayment > 0 && (
                <p className="text-xs text-emerald-400 font-semibold">
                  Includes ${extraPayment}/mo extra principal payoff
                </p>
              )}
            </div>

            {/* Output Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Total Principal</span>
                <span className="text-lg font-extrabold text-white">${Math.round(calculations.totalPrincipal).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Total Interest</span>
                <span className="text-lg font-extrabold text-amber-400">${Math.round(calculations.totalInterest).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Total Repayment</span>
                <span className="text-lg font-extrabold text-indigo-300">${Math.round(calculations.totalRepayment).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Payoff Duration</span>
                <span className="text-lg font-extrabold text-emerald-400">{calculations.monthsToPayoff} Months</span>
              </div>
            </div>

            {/* Extra Payment Savings Callout */}
            {extraPayment > 0 && (
              <div className="bg-emerald-950/60 border border-emerald-500/40 p-4 rounded-2xl space-y-1 text-xs text-emerald-200">
                <strong className="text-emerald-300 block">🚀 Early Payoff Savings:</strong>
                <p>
                  Adding ${extraPayment}/mo saves <strong>${Math.round(calculations.interestSaved).toLocaleString()}</strong> in interest and clears debt <strong>{calculations.monthsSaved} months earlier</strong>!
                </p>
              </div>
            )}
          </div>

          {/* Interactive Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Principal vs. Interest Breakdown</h3>
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
                  <th className="py-3 px-4">Payment</th>
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
            <span><strong>Methodology:</strong> Amortization Schedule & Interest Modeling</span>
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-bold">100% Client-Side Private</span>
          </div>
        </div>

        {/* 1. Introduction (250–400 Words) */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 border-b pb-3">The Complete Guide to Personal Loans & Amortization</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              Personal loans are one of the most versatile financial tools available to consumers. Unlike credit cards that rely on variable interest rates and open-ended revolving balances, personal loans are installment products. When you take out a personal loan, you borrow a fixed lump sum of money and agree to repay it in equal monthly installments over a set period—typically ranging from 12 to 84 months.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Personal Loan Calculator is a full amortization engine. It models the mathematical interaction between loan principal, fixed annual interest rate (APR), monthly repayment terms, and optional extra principal payments to project your total interest costs and exact payoff date.
            </p>
            <p>
              <strong>Who Should Use It:</strong> This tool is engineered for borrowers evaluating personal loan quotes from online lenders or credit unions, consumers consolidating credit card balances, homeowners financing home renovations, and budget planners structuring monthly debt payoff schedules.
            </p>
            <p>
              <strong>Why It Is Important:</strong> Selecting a personal loan involves trade-offs between monthly payment affordability and long-term interest expense. Choosing a 7-year term reduces your monthly payment but significantly increases total interest paid over the life of the loan. Conversely, choosing a 3-year term increases monthly payments but saves thousands in interest. This calculator exposes the exact financial impact of loan terms and extra principal payments.
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
            <li><strong>Fixed Rate Mechanics:</strong> The model assumes a fixed APR for the entire duration of the loan term.</li>
            <li><strong>No Prepayment Penalties:</strong> Extra payment savings calculations assume your lender does not charge prepayment penalty fees.</li>
            <li><strong>Exclusion of Origination Fees:</strong> Upfront lender origination fees (typically 1%–8%) are deducted from loan proceeds upon funding; always include origination fees in your total loan amount when borrowing.</li>
          </ul>
        </div>

        <hr className="border-slate-200" />

        {/* 2. How It Works */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">How Personal Loan Calculation Works</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Personal loan payments follow standard installment loan amortization, where each monthly payment is divided into interest charges and principal reduction:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                1. Monthly Interest Accrual
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Interest is computed monthly on the remaining principal balance ($Interest = Balance \times \frac{APR}{12}$). In the early months of the loan, interest accounts for a larger portion of your payment.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                2. Accelerated Principal Paydown
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                As your principal balance declines, monthly interest decreases. Consequently, a growing percentage of your fixed monthly payment goes directly toward reducing principal, accelerating payoff over time.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. Formulas & Variable Definitions */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mathematical Formulas & Variable Definitions</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The core equations governing fixed installment personal loans are defined below:
          </p>

          <div className="space-y-6">
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">1. Monthly Amortized Payment Formula</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-indigo-300 font-bold">
                M = P &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>M:</strong> Monthly Principal & Interest Payment ($)</div>
                <div><strong>P:</strong> Principal Loan Amount ($)</div>
                <div><strong>r:</strong> Monthly Interest Rate ($APR / 12 / 100$)</div>
                <div><strong>n:</strong> Total Amortization Months ($Years \times 12$)</div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">2. Total Repayment & Interest Formula</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 font-bold">
                Total Interest = ( M &times; n ) - P
              </div>
              <div className="text-xs text-slate-300 pt-2">
                <strong>Total Repayment:</strong> $Total Repayment = P + Total Interest$. Represents the full cash amount paid back to the lender over the loan term.
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 4. Worked Step-by-Step Examples */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Worked Step-by-Step Examples</h2>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Example 1: $15,000 Loan at 9.5% APR over 3 Years vs 5 Years</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Loan Amount:</strong> $15,000</div>
                <div><strong>APR:</strong> 9.5%</div>
                <div><strong>3-Yr Payment:</strong> $480.46/mo</div>
                <div><strong>3-Yr Interest:</strong> $2,296</div>
                <div><strong>5-Yr Payment:</strong> $315.00/mo</div>
                <div><strong>5-Yr Interest:</strong> $3,900</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Analysis:</strong> The 5-year option lowers monthly payment by $165.46/mo, making it budget-friendly. However, the 3-year term saves <strong>$1,604 in total interest</strong>.</p>
                <p><strong>Takeaway:</strong> Choose shorter terms whenever monthly cash flow allows to minimize total borrowing costs.</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Example 2: Adding $100/mo Extra Principal Payment</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Loan Amount:</strong> $20,000</div>
                <div><strong>APR:</strong> 11.0%</div>
                <div><strong>Standard Term:</strong> 5 Years (60 Mos)</div>
                <div><strong>Base Payment:</strong> $434.85/mo</div>
                <div><strong>Extra Payment:</strong> +$100/mo ($534.85)</div>
                <div><strong>New Duration:</strong> 47 Months</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Result:</strong> Paying an extra $100/month clears the loan <strong>13 months early</strong> and saves <strong className="text-emerald-600">$1,382 in total interest</strong>.</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 5. When to Use This Calculator */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">When to Use This Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">💳 Credit Card Debt Consolidation</strong>
              Compare fixed personal loan APRs against high revolving credit card rates.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">🏡 Home Improvement Financing</strong>
              Estimate monthly payments for kitchen or roof upgrades before applying for financing.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">🏦 Comparing Lender Quotes</strong>
              Test competing pre-approval offers from credit unions and online lenders to find the true lowest cost option.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">🚀 Early Payoff Strategy</strong>
              Model how adding $50 or $100 per month accelerates your debt-free milestone.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 6. Common Mistakes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">7 Common Mistakes When Taking a Personal Loan</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>1. Ignoring Origination Fees:</strong> A 5% origination fee on a $20,000 loan reduces funded cash to $19,000 while you still repay $20,000 plus interest.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>2. Choosing Terms Based Only on Monthly Payment:</strong> Extending loan length lowers monthly outflow but dramatically expands total interest paid.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>3. Borrowing for Discretionary Spending:</strong> Personal loans should fund wealth-building or high-interest debt elimination, not vacations or luxury items.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>4. Not Shopping Multiple Lenders:</strong> Interest rates vary widely based on credit tier; always request soft-check pre-qualifications from 3+ sources.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>5. Re-running Credit Card Balances:</strong> Consolidating card debt without curbing spending habits leads to double the debt burden.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>6. Overlooking Prepayment Penalty Clauses:</strong> Ensure your loan agreement permits penalty-free early payoff.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>7. Forgetting Auto-Pay Discounts:</strong> Most lenders offer a 0.25% APR rate discount when enrolling in automatic monthly bank draft.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 7. Expanded FAQs (8 items) */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">What credit score do I need for a personal loan?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Most lenders require a minimum credit score of 600–640. Scores above 740 qualify for prime interest rates (6%–11% APR).
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Are personal loan payments fixed or variable?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Almost all personal loans feature fixed interest rates and fixed monthly payments, protecting you from interest rate increases.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">How fast can I get personal loan funds?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Online lenders often fund approved personal loans within 1 to 3 business days via direct bank deposit.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Can I pay off my personal loan early?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Yes. Most reputable lenders do not charge prepayment penalties, allowing you to pay extra principal and save on interest.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is the difference between secured and unsecured personal loans?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Unsecured loans require no collateral. Secured loans require collateral (savings account or vehicle) but offer lower APRs.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is a good APR for a personal loan?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                In 2026, average personal loan APRs range from 8% to 14% for good credit, compared to 22%+ for credit cards.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">Does applying for a personal loan affect my credit score?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Pre-qualification checks use soft inquiries (no score impact). Formal submission triggers a hard inquiry (5 point temporary drop).
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Are personal loan interest payments tax deductible?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Personal loan interest is generally not tax deductible unless funds are strictly used for qualified business operations.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 8. Contextual Scenario-Driven Internal Navigation */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Explore Related Loan & Debt Tools</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Compare personal loan modeling against specific asset and debt payoff calculators:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <a 
              href="/calculators/home-loan-calculator"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/calculators/home-loan-calculator'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center justify-between mb-1">
                <span>Home Loan Calculator</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">
                Planning property financing? Model mortgage principal, interest, taxes, insurance, and HOA dues with our <strong>Home Loan Calculator</strong>.
              </p>
            </a>
            <a 
              href="/calculators/car-loan-calculator"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/calculators/car-loan-calculator'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center justify-between mb-1">
                <span>Car Loan Calculator</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">
                Financing a new or used vehicle? Calculate auto payments, trade-in credits, and sales tax with our <strong>Car Loan Calculator</strong>.
              </p>
            </a>
            <a 
              href="/calculators/loan-payoff-calculator"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/calculators/loan-payoff-calculator'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center justify-between mb-1">
                <span>Loan Payoff Calculator</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">
                Accelerating existing debt? See how much interest and time you save by adding lump sums or extra payments with our <strong>Loan Payoff Calculator</strong>.
              </p>
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
              <p className="text-xs text-slate-500">
                Applying for new credit? Calculate your borrowing capacity and lender risk category using our <strong>DTI Calculator</strong>.
              </p>
            </a>
          </div>
        </div>

        {/* 9. Authoritative References */}
        <div className="pt-4 text-xs text-slate-400 border-t border-slate-100 space-y-1">
          <strong className="text-slate-500 block">Authoritative References & Data Sources:</strong>
          <p>• Consumer Financial Protection Bureau (CFPB): <span className="underline">Understanding Personal Loans & Amortization</span></p>
          <p>• Federal Reserve System (G.19 Report): <span className="underline">Consumer Credit Outstanding & Average Personal Loan APRs</span></p>
          <p>• Federal Trade Commission (FTC): <span className="underline">Shopping for Personal Loans & Credit Card Consolidation</span></p>
        </div>

      </div>

    </div>
  );
}
