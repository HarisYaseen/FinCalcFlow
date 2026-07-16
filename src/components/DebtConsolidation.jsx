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

      {/* Complete Guide to Credit Card Debt Consolidation (SEO Content) */}
      <div className="seo-content-container max-w-7xl mx-auto px-4 py-8 text-slate-800 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 mt-12 text-left">
        
        <h2 className="text-3xl font-bold mb-4 text-slate-900 border-b pb-2">The Complete Guide to Credit Card Debt Consolidation</h2>
        <p className="mb-6 text-lg leading-relaxed text-slate-600">
          Carrying multiple high-interest credit card balances can feel like running on a financial treadmill. Because credit card companies calculate monthly payments based on a percentage of your outstanding balance, your payments decrease as your balance shrinks. This extension of the repayment timeline is known as the <strong>minimum payment trap</strong>, and it often results in paying thousands of dollars in interest over several decades.
        </p>
        <p className="mb-6 leading-relaxed">
          Our serverless Debt Consolidation calculator is built to run entirely in your browser, helping you analyze the interest savings and timeline reduction of combining your debts into a single personal loan. Below, we break down the operational differences, math formulas, and strategies that determine if consolidation is right for you.
        </p>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">Understanding Debt Consolidation: Loans vs. Revolving Credit</h2>
        <p className="mb-4 leading-relaxed">
          Debt consolidation works by replacing high-interest revolving credit lines with a fixed-term, lower-interest installment loan. This restructures your payments and ensures a guaranteed debt-free target date.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <h3 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-2">
              🔒 Credit Card Minimum Trap
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">The properties of revolving credit cards that delay payoff and maximize interest expense:</p>
            <ul className="list-disc list-inside text-sm space-y-2 text-slate-700 font-semibold">
              <li><strong>Variable Payments:</strong> Payments drop as the balance drops, prolonging the loan.</li>
              <li><strong>High Interest (APR):</strong> Standard credit card rates typically average 18% to 28%+.</li>
              <li><strong>Compounding Interest:</strong> Interest accrues daily based on your average daily balance.</li>
              <li><strong>Credit Utilization:</strong> High card balances hurt your credit score (credit utilization ratio).</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <h3 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-2">
              ⚡ Consolidated Personal Loan
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">The characteristics of structured installment loans that save money and accelerate freedom:</p>
            <ul className="list-disc list-inside text-sm space-y-2 text-slate-700 font-semibold">
              <li><strong>Fixed Term:</strong> Guaranteed payoff timeline (typically 12 to 60 months).</li>
              <li><strong>Lower APR:</strong> Personal loans for creditworthy borrowers average 8% to 15%.</li>
              <li><strong>Simple Payments:</strong> Single predictable monthly draft replaces multiple card bills.</li>
              <li><strong>FICO Boost:</strong> Moving revolving card balances to an installment loan lowers credit utilization.</li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">How the Debt Consolidation Optimizer Works</h2>
        <p className="mb-4 leading-relaxed">
          The simulator runs a mathematical payoff comparison between your existing credit cards (revolving minimum payments) and a structured consolidation loan (fixed-rate installment amortization).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6">
          <div className="bg-rose-50/20 border border-rose-100/70 rounded-2xl p-6 space-y-4">
            <h4 className="font-black text-rose-800 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              1. Credit Card Payoff Simulation
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Revolving credit card accounts calculate monthly minimum payments as a decreasing function of outstanding balance.
            </p>
            <div className="space-y-3 pt-2">
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Minimum Payment Formula</span>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                  Typical card minimum monthly payment is interest plus a small percentage of principal:
                </p>
                <div className="py-2.5 px-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-center text-[11px] font-bold shadow-inner border border-slate-800">
                  Min Payment = Interest Accrued + 1.5% of Principal
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50/20 border border-emerald-100/70 rounded-2xl p-6 space-y-4">
            <h4 className="font-black text-emerald-800 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              2. Fixed Loan Amortization
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidation uses a fixed term installment loan to guarantee a zero-balance payoff date.
            </p>
            <div className="space-y-3 pt-2">
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Fixed Loan Payment Formula</span>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                  Calculated monthly using standard annuity amortization:
                </p>
                <div className="py-2.5 px-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-center text-xs font-bold shadow-inner border border-slate-800">
                  Payment = Balance * [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">Credit Card Debt Consolidation: Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-rose-500">
            <h3 className="text-base font-extrabold text-slate-800">What is credit card debt consolidation?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Debt consolidation is the process of taking out a single personal loan to pay off multiple credit card balances. This combines several monthly bills into one payment, ideally at a lower interest rate.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-emerald-500">
            <h3 className="text-base font-extrabold text-slate-800">How does consolidation save me money on interest?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Consolidation saves money when the annual percentage rate (APR) of the personal installment loan is lower than the weighted average APR of the cards you are paying off.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-rose-500">
            <h3 className="text-base font-extrabold text-slate-800">Will consolidations harm my credit score?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Applying for a consolidation loan causes a minor, temporary dip due to a hard inquiry. However, paying off credit cards lowers your credit card utilization, which typically boosts your credit score significantly.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-emerald-500">
            <h3 className="text-base font-extrabold text-slate-800">What is the "minimum payment trap"?</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Credit card companies design minimum payments to be 1% to 2% of the total balance plus interest. As your balance falls, the minimum payment amount falls. This makes it take decades to pay off the card if you only pay the minimum.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
