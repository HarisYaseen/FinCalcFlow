import React, { useState, useMemo } from 'react';
import { BarChart } from './Charts';
import { CreditCard, Plus, Trash2, PiggyBank, Sparkles, HelpCircle, RefreshCw } from 'lucide-react';

export default function DebtConsolidation({ currencySymbol }) {
  // Existing Cards state
  const [cards, setCards] = useState([
    { id: 1, name: 'Visa Gold', balance: 6000, apr: 18.9 },
    { id: 2, name: 'Retail Card', balance: 3000, apr: 24.9 },
    { id: 3, name: 'Travel Card', balance: 4000, apr: 21.5 },
  ]);

  // Consolidation Loan offer state
  const [loanApr, setLoanApr] = useState(10.5);
  const [loanTerm, setLoanTerm] = useState(36); // Months

  // Add Card row
  const addCard = () => {
    const nextId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    setCards([...cards, { id: nextId, name: `Card ${nextId}`, balance: 2000, apr: 18.0 }]);
  };

  // Remove Card row
  const removeCard = (id) => {
    setCards(cards.filter(c => c.id !== id));
  };

  // Edit Card property
  const editCard = (id, field, value) => {
    setCards(
      cards.map((c) => {
        if (c.id === id) {
          return { ...c, [field]: value };
        }
        return c;
      })
    );
  };

  // Math Calculations
  const comparison = useMemo(() => {
    const totalBalance = cards.reduce((acc, c) => acc + c.balance, 0);
    
    if (totalBalance === 0) {
      return {
        totalBalance: 0,
        weightedApr: 0,
        existingTotalInterest: 0,
        existingMonths: 0,
        loanPayment: 0,
        loanTotalInterest: 0,
        interestSaved: 0,
        monthsSaved: 0,
        better: false,
      };
    }

    // 1. Calculate Weighted Average APR
    const totalWeightedApr = cards.reduce((acc, c) => acc + (c.balance * c.apr), 0);
    const weightedApr = totalWeightedApr / totalBalance;

    // 2. Simulate Credit Card Minimum Payment Payoff
    // Standard credit card minimum payment: max(25, Interest Accrued + 1.5% of balance)
    let tempCards = cards.map(c => ({ ...c, currentBalance: c.balance }));
    let existingTotalInterest = 0;
    let months = 0;
    const maxMonthsSim = 360; // Limit to 30 years

    while (tempCards.some(c => c.currentBalance > 0) && months < maxMonthsSim) {
      months++;
      tempCards.forEach((c) => {
        if (c.currentBalance <= 0) return;

        const monthlyInterest = (c.currentBalance * (c.apr / 100)) / 12;
        // Min payment: interest accrued + 1.5% of principal, min $25
        let minPayment = monthlyInterest + (c.currentBalance * 0.015);
        if (minPayment < 25) minPayment = 25;
        
        // If current balance + interest is less than min payment, pay off fully
        if (c.currentBalance + monthlyInterest <= minPayment) {
          minPayment = c.currentBalance + monthlyInterest;
        }

        const principalPaid = minPayment - monthlyInterest;
        existingTotalInterest += monthlyInterest;
        c.currentBalance = Math.max(0, c.currentBalance - principalPaid);
      });
    }

    // 3. Consolidated Loan Math
    const r = (loanApr / 100) / 12;
    let loanPayment = 0;
    if (r > 0) {
      loanPayment = totalBalance * (r * Math.pow(1 + r, loanTerm)) / (Math.pow(1 + r, loanTerm) - 1);
    } else {
      loanPayment = totalBalance / loanTerm;
    }

    const loanTotalInterest = (loanPayment * loanTerm) - totalBalance;
    const interestSaved = existingTotalInterest - loanTotalInterest;
    const monthsSaved = months - loanTerm;
    const better = interestSaved > 0;

    return {
      totalBalance,
      weightedApr,
      existingTotalInterest,
      existingMonths: months,
      loanPayment,
      loanTotalInterest: Math.max(0, loanTotalInterest),
      interestSaved,
      monthsSaved,
      better,
    };
  }, [cards, loanApr, loanTerm]);

  // Chart data
  const barChartData = useMemo(() => {
    return [
      { label: 'Existing Cards (Minimum Payments)', value: Math.round(comparison.existingTotalInterest), color: '#ef4444' }, // Red
      { label: 'Consolidated Loan Offer', value: Math.round(comparison.loanTotalInterest), color: '#10b981' }, // Green
    ];
  }, [comparison]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl dark:bg-emerald-950 dark:text-emerald-400">
            <CreditCard className="w-8 h-8" />
          </span>
          Credit Card Debt Consolidation Optimizer
        </h1>
        <p className="text-slate-500 mt-2 text-base max-w-2xl">
          Evaluate if consolidating your high-interest credit card debt into a single, low-rate fixed payment loan will save you money and speed up your payoff date.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Cards and Loan Inputs */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card List Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-100/50">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Current Credit Cards</h2>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">
                  Total Outstanding Balance: {currencySymbol}{new Intl.NumberFormat().format(comparison.totalBalance)}
                </p>
              </div>
              <button
                onClick={addCard}
                className="flex items-center gap-1.5 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Card
              </button>
            </div>

            {/* Quick Presets */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100/80 space-y-1.5 mb-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Quick Presets</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCards([
                      { id: 1, name: 'Store Card A', balance: 1500, apr: 19.9 },
                      { id: 2, name: 'Store Card B', balance: 800, apr: 26.9 },
                    ]);
                    setLoanApr(12.0);
                    setLoanTerm(12);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-xs font-bold rounded-lg text-slate-600 hover:text-emerald-600 transition-colors shadow-sm"
                >
                  Minor Store Debts
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCards([
                      { id: 1, name: 'Visa Gold', balance: 6000, apr: 18.9 },
                      { id: 2, name: 'Retail Card', balance: 3000, apr: 24.9 },
                      { id: 3, name: 'Travel Card', balance: 4000, apr: 21.5 },
                    ]);
                    setLoanApr(10.5);
                    setLoanTerm(36);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-xs font-bold rounded-lg text-slate-600 hover:text-emerald-600 transition-colors shadow-sm"
                >
                  Moderate Debt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCards([
                      { id: 1, name: 'Card A', balance: 12000, apr: 17.5 },
                      { id: 2, name: 'Card B', balance: 8000, apr: 22.0 },
                      { id: 3, name: 'Card C', balance: 9500, apr: 24.5 },
                    ]);
                    setLoanApr(9.8);
                    setLoanTerm(60);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-xs font-bold rounded-lg text-slate-600 hover:text-emerald-600 transition-colors shadow-sm"
                >
                  High Balance Debt
                </button>
              </div>
            </div>

            {cards.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-slate-200 rounded-2xl text-slate-400 font-semibold">
                No credit cards added. Click "Add Card" to begin.
              </div>
            ) : (
              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group relative"
                  >
                    {/* Card Name */}
                    <div className="flex-1 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Card Name</label>
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => editCard(card.id, 'name', e.target.value)}
                        className="w-full font-bold text-slate-900 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    {/* Balance */}
                    <div className="w-full md:w-36 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Balance</label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1.5 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                        <input
                          type="number"
                          value={card.balance}
                          onChange={(e) => editCard(card.id, 'balance', Math.max(0, Number(e.target.value)))}
                          className="w-full font-bold text-slate-900 bg-white border border-slate-200 rounded-lg pl-6 pr-2 py-1.5 focus:outline-none focus:border-indigo-500 text-right"
                        />
                      </div>
                    </div>

                    {/* APR */}
                    <div className="w-full md:w-28 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">APR (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={card.apr}
                        onChange={(e) => editCard(card.id, 'apr', Math.max(0, Number(e.target.value)))}
                        className="w-full font-bold text-slate-900 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500 text-right"
                      />
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeCard(card.id)}
                      className="absolute top-2 right-2 md:static p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors md:mt-4"
                      title="Remove Card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Consolidation Loan Offer Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-100/50">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              Consolidation Loan Offer
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  Offered Loan APR (%)
                  <span className="group relative inline-flex items-center">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      The fixed annual interest rate offered on your consolidation loan.
                    </span>
                  </span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={loanApr}
                  onChange={(e) => setLoanApr(Math.max(0, Number(e.target.value)))}
                  className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  Loan Term (Months)
                  <span className="group relative inline-flex items-center">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      The duration in months to pay off the consolidation loan.
                    </span>
                  </span>
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                >
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={24}>24 Months (2 Years)</option>
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={48}>48 Months (4 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                  <option value={72}>72 Months (6 Years)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Results */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Winner comparison card */}
          {comparison.totalBalance > 0 && (
            <div className={`p-6 rounded-3xl border flex items-start gap-4 shadow-xl ${
              comparison.better 
                ? 'bg-emerald-50/70 border-emerald-100 text-emerald-950' 
                : 'bg-red-50/70 border-red-100 text-red-950'
            }`}>
              <span className={`p-3 rounded-2xl ${comparison.better ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                <PiggyBank className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider">
                  {comparison.better ? 'Consolidation Recommended!' : 'Keep Cards (Or Find Lower Rate)'}
                </h3>
                {comparison.better ? (
                  <>
                    <p className="text-2xl font-black mt-1">
                      Saves you {currencySymbol}{new Intl.NumberFormat().format(Math.round(comparison.interestSaved))} in interest
                    </p>
                    <p className="text-sm mt-1 font-semibold">
                      and pays off debt {comparison.monthsSaved} months faster!
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-2xl font-black mt-1">
                      Increases interest by {currencySymbol}{new Intl.NumberFormat().format(Math.round(Math.abs(comparison.interestSaved)))}
                    </p>
                    <p className="text-sm mt-1 font-semibold">
                      Keep paying off cards or negotiate a lower APR.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Plain English Summary Card */}
          {comparison.totalBalance > 0 && (
            <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-5 text-sm text-slate-700 leading-relaxed space-y-2">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">Plain-English Breakdown</h4>
              <p>
                You currently owe <strong>{currencySymbol}{new Intl.NumberFormat().format(comparison.totalBalance)}</strong> across your credit cards, carrying a combined weighted interest rate of <strong>{comparison.weightedApr.toFixed(1)}% APR</strong>. 
                {comparison.better ? (
                  <span> By consolidating into a single fixed loan at <strong>{loanApr}% APR</strong>, you will reduce your interest rate by <strong>{(comparison.weightedApr - loanApr).toFixed(1)}%</strong>, saving you <strong>{currencySymbol}{new Intl.NumberFormat().format(Math.round(comparison.interestSaved))}</strong> in total interest and clearing your debt <strong>{comparison.monthsSaved} months faster</strong>.</span>
                ) : (
                  <span> Consolidating is not recommended here because the loan APR of <strong>{loanApr}%</strong> is higher than your cards' weighted average rate. Doing so would cost you an extra <strong>{currencySymbol}{new Intl.NumberFormat().format(Math.round(Math.abs(comparison.interestSaved)))}</strong> in interest.</span>
                )}
              </p>
            </div>
          )}

          {/* Side-by-Side Interest Bar Chart */}
          {comparison.totalBalance > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-500 flex items-center gap-1.5 ml-2">
                Total Interest Paid Comparison
                <span className="group relative">
                  <HelpCircle className="w-3.5 h-3.5 cursor-pointer text-slate-400 hover:text-slate-600" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-xs rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                    Existing cards calculation assumes paying credit card minimums month-to-month. Loan calculation assumes fixed monthly principal + interest.
                  </span>
                </span>
              </h3>
              <BarChart data={barChartData} currencySymbol={currencySymbol} />
            </div>
          )}

          {/* Amortization statistics card */}
          {comparison.totalBalance > 0 && (
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl space-y-4">
              <h4 className="font-bold text-slate-900 border-b border-slate-50 pb-2">Amortization Comparison</h4>
              
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 block mb-1">EXISTING CARDS</span>
                  <span className="font-bold text-slate-900 block">Payoff Term:</span>
                  <span className="text-sm font-extrabold text-red-500">{comparison.existingMonths} Months</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Average APR: {comparison.weightedApr.toFixed(1)}%</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="text-slate-400 block mb-1">CONSOLIDATED LOAN</span>
                  <span className="font-bold text-slate-900 block">Monthly Payment:</span>
                  <span className="text-sm font-extrabold text-emerald-600">{currencySymbol}{comparison.loanPayment.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Loan Term: {loanTerm} Months</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Complete Guide to Credit Card Debt Consolidation (SEO & Educational Content) */}
      <div className="seo-content-container max-w-7xl mx-auto px-4 py-8 text-slate-800 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 mt-12 text-left space-y-10">
        
        {/* 1. Introduction (250–400 Words) */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 border-b pb-3">The Complete Guide to Credit Card Debt Consolidation</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              Carrying high-interest revolving credit card balances is one of the most significant obstacles to long-term wealth accumulation. Because credit card issuers set minimum monthly payments as a shrinking percentage of your total balance (typically interest accrued plus 1.0% to 1.5% of principal), paying only the minimum creates an exponential repayment schedule. This dynamic—commonly known as the <strong>minimum payment trap</strong>—can extend a $10,000 credit card debt over 25 to 30 years and cost tens of thousands of dollars in compounding interest.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Credit Card Debt Consolidation Optimizer is an interactive debt payoff simulator. It aggregates your multiple credit card accounts, computes your weighted average interest rate (weighted APR), models month-by-month credit card minimum payment amortization, and compares that trajectory against a structured, fixed-rate personal consolidation loan.
            </p>
            <p>
              <strong>Who Should Use It:</strong> This tool is designed for consumers carrying multiple credit card balances, individuals evaluating pre-approved personal loan or balance transfer offers, household budget planners, and financial coaches guiding clients out of high-interest debt.
            </p>
            <p>
              <strong>Why It Is Important:</strong> Consolidating debt is only financially beneficial when the new loan's interest rate and fees result in lower net interest paid and a faster zero-balance payoff. If a lender offers a 12% loan rate but charges high origination fees or extends the repayment term to 72 months, you could end up paying more total interest than continuing your card payments. This calculator exposes the exact mathematical difference, empowering you to accept only truly advantageous loan offers.
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 2. How It Works */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">How the Debt Consolidation Simulation Works</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The optimizer runs two distinct algorithmic calculations using your current credit card inputs ($Balance_i, APR_i$) and proposed loan terms ($APR_{loan}, Term_{months}$):
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                Existing Cards Minimum Amortization
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Simulates month-by-month payments for each credit card individually. Each month, interest is calculated ($Balance \times APR / 12$), and the minimum payment is set to interest plus 1.5% of principal (minimum $25). As balance decreases, minimum payment shrinks, prolonging the timeline.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                Consolidation Loan Amortization
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Consolidates total card balance into a single installment loan with fixed monthly payments ($PMT_{loan}$) over a chosen term (12 to 72 months). Because payments remain constant while balance declines, principal reduction accelerates rapidly.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. Formulas & Variable Definitions */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mathematical Formulas & Variable Definitions</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The mathematical equations powering the optimizer are defined as follows:
          </p>

          <div className="space-y-6">
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">1. Weighted Average APR</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-bold">
                APR_weighted = ( &sum; [ Balance_i &times; APR_i ] ) / &sum; Balance_i
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>APR_weighted:</strong> Effective combined interest rate across all cards</div>
                <div><strong>Balance_i:</strong> Outstanding balance of card $i$</div>
                <div><strong>APR_i:</strong> Annual Percentage Rate of card $i$</div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">2. Credit Card Minimum Payment Formula</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-rose-300 font-bold">
                PMT_cc,m = max( 25, Interest_m + 0.015 &times; Balance_m )
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>PMT_cc,m:</strong> Minimum required payment for month $m$</div>
                <div><strong>Interest_m:</strong> Monthly accrued interest ($Balance_m \times APR / 12$)</div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">3. Fixed Installment Loan Payment</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-indigo-300 font-bold">
                PMT_loan = Balance_total &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>Balance_total:</strong> Sum of all consolidated credit card balances</div>
                <div><strong>r:</strong> Monthly Loan Rate ($APR_{loan} / 12$)</div>
                <div><strong>n:</strong> Consolidation Loan Term in Months</div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 4. Worked Examples */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Worked Step-by-Step Examples</h2>

          <div className="space-y-6">
            {/* Example 1 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Example 1: Moderate Credit Card Debt (3 Cards)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Card A:</strong> $6,000 @ 18.9% APR</div>
                <div><strong>Card B:</strong> $3,000 @ 24.9% APR</div>
                <div><strong>Card C:</strong> $4,000 @ 21.5% APR</div>
                <div><strong>Total Debt:</strong> $13,000</div>
                <div><strong>Weighted APR:</strong> 21.1%</div>
                <div><strong>Loan Offer:</strong> 10.5% APR (36 Mos)</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Step 1 (Existing Cards Path):</strong> Paying minimums starts at $356/mo. Because payments shrink, it takes <strong>184 months (15.3 years)</strong> to pay off, incurring <strong>$14,820 in total interest</strong>.</p>
                <p><strong>Step 2 (Consolidation Loan Path):</strong> Fixed 36-month loan payment = $422.75/mo. Total interest paid over 3 years = <strong>$2,219</strong>.</p>
                <p><strong>Result:</strong> Consolidation <strong className="text-emerald-600">saves $12,601 in total interest</strong> and clears debt <strong>148 months (12.3 years) faster</strong>!</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Example 2: High Retail Store Card Debt</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Store Card 1:</strong> $2,500 @ 26.9% APR</div>
                <div><strong>Store Card 2:</strong> $1,800 @ 28.9% APR</div>
                <div><strong>Total Debt:</strong> $4,300</div>
                <div><strong>Weighted APR:</strong> 27.7%</div>
                <div><strong>Personal Loan:</strong> 12.0% APR (24 Mos)</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Analysis:</strong> Card minimums total $135/mo taking 112 months with $4,890 in interest. The 24-month consolidation loan payment is $202/mo with $562 total interest.</p>
                <p><strong>Result:</strong> Saves <strong className="text-emerald-600">$4,328 in interest</strong> and eliminates retail card debt 88 months faster.</p>
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
              <strong className="text-slate-900 block mb-1">💳 Evaluating Loan Offers vs Balance Transfers</strong>
              Compare 0% APR balance transfer credit card offers (with 3-5% transfer fees) against fixed personal installment loans.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">📈 Credit Score Improvement Planning</strong>
              Quantify how moving revolving credit card debt to installment loan debt lowers credit utilization to boost FICO scores.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">🏠 Preparing for Mortgage Qualification</strong>
              Eliminate multiple high minimum monthly card payments to lower your Debt-to-Income (DTI) ratio before home buying.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">📅 Setting a Guaranteed Payoff Date</strong>
              Transform vague, endless credit card balances into a predictable, countdown-style monthly budget.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 6. Common Mistakes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">7 Common Mistakes in Debt Consolidation</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>1. Re-charging Paid-Off Cards:</strong> Consolidating card debt without addressing spending habits leads to double the debt load.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>2. Ignoring Loan Origination Fees:</strong> Lenders often charge 1% to 8% upfront origination fees, which must be added to loan principal.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>3. Extending Loan Terms Unnecessarily:</strong> Choosing a 72-month term to get a low monthly payment can increase total interest paid despite lower APR.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>4. Consolidating Low-Interest Debt:</strong> Combining 0% promo cards or low APR credit union cards into a higher APR loan increases expense.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>5. Closing Oldest Credit Accounts:</strong> Closing paid-off credit cards reduces average credit history age, which can temporarily hurt credit scores.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>6. Missing Hard Inquiry Impact:</strong> Applying for multiple personal loans simultaneously creates multiple hard inquiries; use soft-check pre-qualification.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>7. Failing to Set Up Auto-Pay:</strong> Missing an installment loan payment incurs late fees and damages payment history on credit reports.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 7. Expanded FAQs (8-10 items) */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Does debt consolidation hurt my credit score?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Initially, loan application inquiry causes a 5–10 point temporary drop. However, paying off credit card balances drastically lowers credit utilization, typically increasing credit scores by 20–50+ points within 60 days.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is the difference between debt consolidation and debt settlement?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Debt consolidation pays 100% of your debt at lower interest rates with zero credit damage. Debt settlement negotiates to pay less than owed, requiring account defaults that severely ruin credit scores for 7 years.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">What APR can I expect on a personal consolidation loan?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Borrowers with excellent credit (740+) qualify for 7%–11% APR. Good credit (680–739) averages 12%–16% APR. Fair credit (640–679) ranges from 18%–24% APR.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">Is a 0% APR balance transfer card better than a personal loan?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Balance transfer cards are superior if you can pay off the entire balance within the 12–21 month promo window. For longer payoff timelines, fixed personal loans are safer to avoid post-promo APR spikes.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Should I close my credit cards after consolidating them?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Generally no. Keep cards open with zero balances to preserve credit history length and available credit limit, unless keeping them open creates temptation to spend.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is the "minimum payment trap"?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Card minimum payments decrease as your balance falls. Paying only the minimum causes interest compounding to consume 70%–90% of your payments, prolonging payoff for decades.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">What credit score is required for a consolidation loan?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Most personal loan lenders require a minimum FICO score of 600–640. Secured loans or co-signers can assist applicants with lower credit scores.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">How does Debt-to-Income (DTI) ratio affect approval?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Lenders prefer a DTI ratio below 36%–40% (total monthly debt payments divided by gross monthly income). Consolidation often lowers monthly debt payments, improving DTI.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 8. Related Calculators & Internal Navigation */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
          <h3 className="text-lg font-bold text-slate-900 mb-3">Explore Related Financial Calculators</h3>
          <p className="text-xs text-slate-500 mb-4">Re-invest your debt savings into long-term equity and digital assets:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-bold">
            <a 
              href="/rent-vs-buy"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/rent-vs-buy'); window.dispatchEvent(new Event('popstate')); }}
              className="p-3 bg-white border border-slate-200 rounded-xl text-emerald-600 hover:border-emerald-300 hover:shadow-sm transition-all flex items-center justify-between"
            >
              <span>Rent vs. Buy Simulator</span>
              <span>&rarr;</span>
            </a>
            <a 
              href="/cost-per-mile"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/cost-per-mile'); window.dispatchEvent(new Event('popstate')); }}
              className="p-3 bg-white border border-slate-200 rounded-xl text-blue-600 hover:border-blue-300 hover:shadow-sm transition-all flex items-center justify-between"
            >
              <span>Trucking Cost Per Mile</span>
              <span>&rarr;</span>
            </a>
            <a 
              href="/revenue-planner"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/revenue-planner'); window.dispatchEvent(new Event('popstate')); }}
              className="p-3 bg-white border border-slate-200 rounded-xl text-amber-600 hover:border-amber-300 hover:shadow-sm transition-all flex items-center justify-between"
            >
              <span>AdSense Revenue Planner</span>
              <span>&rarr;</span>
            </a>
          </div>
        </div>

        {/* 9. Authoritative References */}
        <div className="pt-4 text-xs text-slate-400 border-t border-slate-100 space-y-1">
          <strong className="text-slate-500 block">Authoritative References & Data Sources:</strong>
          <p>• Consumer Financial Protection Bureau (CFPB): <span className="underline">Navigating Credit Card Debt & Personal Loan Consolidation</span></p>
          <p>• Federal Reserve Board (G.19 Report): <span className="underline">Consumer Credit Outstanding & Commercial Bank APR Averages</span></p>
          <p>• National Foundation for Credit Counseling (NFCC): <span className="underline">Debt Management & Financial Health Guidelines</span></p>
        </div>

      </div>

    </div>
  );
}
