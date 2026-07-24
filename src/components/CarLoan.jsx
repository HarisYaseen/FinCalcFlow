import React, { useState, useMemo } from 'react';
import { PieChart } from './Charts';
import { Truck, DollarSign, Calendar, Percent, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function CarLoan({ currencySymbol = '$' }) {
  const [vehiclePrice, setVehiclePrice] = useState(35000);
  const [downPayment, setDownPayment] = useState(5000);
  const [tradeInValue, setTradeInValue] = useState(2000);
  const [salesTaxPercent, setSalesTaxPercent] = useState(7.0);
  const [interestRate, setInterestRate] = useState(6.9);
  const [loanTermMonths, setLoanTermMonths] = useState(60);
  const [showAmortization, setShowAmortization] = useState(false);

  // Calculations
  const calculations = useMemo(() => {
    const price = Math.max(0, Number(vehiclePrice) || 0);
    const down = Math.max(0, Number(downPayment) || 0);
    const trade = Math.max(0, Number(tradeInValue) || 0);
    const taxRate = Math.max(0, Number(salesTaxPercent) || 0) / 100;

    const taxableAmount = Math.max(0, price - trade);
    const salesTaxAmount = taxableAmount * taxRate;
    const financedAmount = Math.max(0, price - down - trade + salesTaxAmount);

    const annualRate = Math.max(0, Number(interestRate) || 0);
    const monthlyRate = annualRate / 100 / 12;
    const months = Math.max(1, Number(loanTermMonths) || 60);

    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = (financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
    } else {
      monthlyPayment = financedAmount / months;
    }

    const totalRepayment = monthlyPayment * months;
    const totalInterest = Math.max(0, totalRepayment - financedAmount);
    const totalVehicleOutflow = down + trade + totalRepayment;

    // Amortization Schedule
    let balance = financedAmount;
    const schedule = [];
    for (let month = 1; month <= months && balance > 0; month++) {
      const interestForMonth = balance * monthlyRate;
      let principalForMonth = monthlyPayment - interestForMonth;

      if (principalForMonth > balance) {
        principalForMonth = balance;
      }

      balance -= principalForMonth;

      schedule.push({
        month,
        payment: monthlyPayment,
        principalPayment: principalForMonth,
        interestPayment: interestForMonth,
        remainingBalance: Math.max(0, balance)
      });
    }

    return {
      salesTaxAmount,
      financedAmount,
      monthlyPayment,
      totalInterest,
      totalRepayment,
      totalVehicleOutflow,
      schedule
    };
  }, [vehiclePrice, downPayment, tradeInValue, salesTaxPercent, interestRate, loanTermMonths]);

  // Chart data
  const pieChartData = [
    { name: 'Financed Principal', value: calculations.financedAmount, color: '#3b82f6' },
    { name: 'Total Interest', value: calculations.totalInterest, color: '#f59e0b' },
    { name: 'Sales Tax', value: calculations.salesTaxAmount, color: '#10b981' }
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
        <span className="text-slate-900 font-bold">Car Loan Calculator</span>
      </nav>

      {/* Header */}
      <div className="text-center space-y-3">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black tracking-wider uppercase inline-block border border-indigo-100">
          Auto Financing Engine
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Car Loan Calculator
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Calculate monthly auto loan payments, sales tax, trade-in credits, and total interest for new or used vehicles.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Panel */}
        <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b pb-4">
            <Truck className="w-5 h-5 text-indigo-600" />
            Vehicle & Loan Inputs
          </h2>

          {/* Vehicle Price */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex justify-between">
              <span>Vehicle Purchase Price ($)</span>
              <span className="text-indigo-600 font-bold">${Number(vehiclePrice).toLocaleString()}</span>
            </label>
            <div className="relative">
              <input 
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
              />
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          {/* Down Payment & Trade-In */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Cash Down Payment ($)</label>
              <div className="relative">
                <input 
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                />
                <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Trade-In Credit ($)</label>
              <div className="relative">
                <input 
                  type="number"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                />
                <DollarSign className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>

          {/* Sales Tax & Interest Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Sales Tax (%)</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={salesTaxPercent}
                  onChange={(e) => setSalesTaxPercent(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
                />
                <Percent className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

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
          </div>

          {/* Loan Duration */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Loan Duration</label>
            <div className="grid grid-cols-6 gap-2">
              {[24, 36, 48, 60, 72, 84].map((term) => (
                <button
                  key={term}
                  onClick={() => setLoanTermMonths(term)}
                  className={`py-2 rounded-xl font-bold text-xs transition-all border ${
                    Number(loanTermMonths) === term
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {term} Mo
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Results Panel */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            <div className="border-b border-slate-800 pb-4 flex justify-between items-center">
              <span className="text-xs font-extrabold text-indigo-400 uppercase tracking-widest">Monthly Auto Payment</span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
                {loanTermMonths} Months Term
              </span>
            </div>

            <div className="space-y-2 text-center py-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Estimated Monthly Outflow</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                ${Math.round(calculations.monthlyPayment).toLocaleString()}
                <span className="text-sm font-normal text-slate-400">/mo</span>
              </div>
            </div>

            {/* Output Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Amount Financed</span>
                <span className="text-lg font-extrabold text-white">${Math.round(calculations.financedAmount).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Total Interest</span>
                <span className="text-lg font-extrabold text-amber-400">${Math.round(calculations.totalInterest).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Sales Tax</span>
                <span className="text-lg font-extrabold text-indigo-300">${Math.round(calculations.salesTaxAmount).toLocaleString()}</span>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-1">
                <span className="text-slate-400 block font-semibold">Total Repayment</span>
                <span className="text-lg font-extrabold text-emerald-400">${Math.round(calculations.totalRepayment).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Financed Principal vs. Interest vs. Tax</h3>
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

      {/* Step 1 Educational Guide */}
      <div className="seo-content-container bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-10 space-y-10 text-left">
        
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span><strong>Last Updated:</strong> July 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span><strong>Methodology:</strong> Auto Financing & Tax Amortization Model</span>
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full font-bold">100% Client-Side Private</span>
          </div>
        </div>

        {/* 1. Introduction */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 border-b pb-3">The Complete Guide to Car Loans & Auto Financing</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              Purchasing a vehicle is the second-largest purchase most households make after homeownership. Whether buying a new sedan, an electric vehicle, or a reliable used truck, car loans provide structured installment financing over terms ranging from 24 to 84 months.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Car Loan Calculator is a complete auto financing engine. It factors in vehicle purchase price, cash down payments, trade-in allowances, state sales tax percentages, and interest rates to calculate your net financed principal and exact monthly payment.
            </p>
            <p>
              <strong>Who Should Use It:</strong> This tool is engineered for car shoppers evaluating dealership financing options against credit union quotes, vehicle owners calculating trade-in equity impact, and budget planners determining maximum vehicle price thresholds.
            </p>
            <p>
              <strong>Why It Is Important:</strong> Dealership finance offices often negotiate based on monthly payment targets rather than total loan cost. Extending loan duration to 72 or 84 months lowers your monthly payment but drastically expands interest expense and leaves you "upside down" (owing more on the loan than the car is worth) as the vehicle depreciates. This calculator reveals the true cost of auto financing.
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
            <li><strong>Sales Tax Calculation:</strong> Sales tax is calculated on price minus trade-in value (applicable in most U.S. states).</li>
            <li><strong>Dealer Fees Excluded:</strong> Documentation fees ($200–$800) and title fees vary by state and dealer.</li>
            <li><strong>Fixed APR Rate:</strong> Auto loans utilize simple interest fixed rates calculated on remaining balance.</li>
          </ul>
        </div>

        <hr className="border-slate-200" />

        {/* 2. How It Works */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">How Car Loan Calculation Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                1. Net Amount Financed
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                $Financed = (Vehicle Price - Down Payment - Trade In) \times (1 + Sales Tax)$. Trade-in equity reduces taxable purchase amount in most jurisdictions.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                2. Monthly Payment Amortization
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Uses standard monthly installment math over your chosen term (24 to 84 months).
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. Formulas */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mathematical Formulas & Variable Definitions</h2>
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Auto Loan Payment Equation</h3>
            <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-indigo-300 font-bold">
              M = Financed &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 4. Worked Examples */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Worked Step-by-Step Examples</h2>
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Example: $35,000 Vehicle (60 Months @ 6.9% APR)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
              <div><strong>Down Payment:</strong> $5,000</div>
              <div><strong>Trade-In:</strong> $2,000</div>
              <div><strong>Sales Tax (7%):</strong> $1,960</div>
              <div><strong>Financed:</strong> $29,960</div>
              <div><strong>Monthly Payment:</strong> $592.50/mo</div>
              <div><strong>Total Interest:</strong> $5,590</div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 5. FAQs */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">Is 72 or 84 month car financing a good idea?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Long 72-84 month terms lower monthly payments but lead to high interest expense and negative equity due to vehicle depreciation.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is negative equity (being "underwater")?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Negative equity occurs when you owe more on your car loan than the vehicle is currently worth on trade-in or resale.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 6. Contextual Links */}
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
              <p className="text-xs text-slate-500">Compare auto financing against unsecured personal loan terms.</p>
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
              <p className="text-xs text-slate-500">Calculate how an auto loan payment affects your borrowing capacity.</p>
            </a>
          </div>
        </div>

        {/* References */}
        <div className="pt-4 text-xs text-slate-400 border-t border-slate-100 space-y-1">
          <strong className="text-slate-500 block">Authoritative References & Data Sources:</strong>
          <p>• Consumer Financial Protection Bureau (CFPB): <span className="underline">Auto Financing & Dealership Disclosure Guidelines</span></p>
          <p>• Federal Trade Commission (FTC): <span className="underline">Understanding Vehicle Financing & Trade-In Equity</span></p>
        </div>

      </div>

    </div>
  );
}
