import React, { useState, useMemo } from 'react';
import { LineChart } from './Charts';
import { Home, TrendingUp, Coins, Settings, ChevronDown, ChevronUp, AlertCircle, HelpCircle } from 'lucide-react';

export default function RentVsBuy({ currencySymbol }) {
  // Primary States
  const [homePrice, setHomePrice] = useState(400000);
  const [currentRent, setCurrentRent] = useState(1800);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [plannedStay, setPlannedStay] = useState(10);

  // Advanced States
  const [interestRate, setInterestRate] = useState(6.5);
  const [propertyTaxPct, setPropertyTaxPct] = useState(1.25);
  const [appreciationPct, setAppreciationPct] = useState(4.0);
  const [stockReturnPct, setStockReturnPct] = useState(8.0);
  const [rentInflationPct, setRentInflationPct] = useState(3.0);
  const [maintenancePct, setMaintenancePct] = useState(1.0); // 1% of home value annually

  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calculate year-by-year simulation
  const simulationData = useMemo(() => {
    const data = [];
    const downPayment = homePrice * (downPaymentPct / 100);
    const initialMortgage = homePrice - downPayment;
    
    // Monthly mortgage payment P&I (30-year fixed)
    const monthlyRate = (interestRate / 100) / 12;
    const totalMonths = 360;
    let monthlyMortgagePayment = 0;
    if (initialMortgage > 0) {
      if (monthlyRate > 0) {
        monthlyMortgagePayment = initialMortgage * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      } else {
        monthlyMortgagePayment = initialMortgage / totalMonths;
      }
    }

    let renterStocks = downPayment; // Renter starts with down payment in stocks
    let renterNetWorth = renterStocks;
    let buyerNetWorth = homePrice - initialMortgage; // Starts with down payment value (home value - mortgage)

    // Year 0
    data.push({
      year: 0,
      buyerNetWorth: Math.round(buyerNetWorth),
      renterNetWorth: Math.round(renterNetWorth),
      homeValue: homePrice,
      remainingMortgage: initialMortgage
    });

    const monthlyStockReturn = Math.pow(1 + stockReturnPct / 100, 1/12) - 1;
    const monthlyRentInflation = Math.pow(1 + rentInflationPct / 100, 1/12) - 1;
    const monthlyAppreciation = Math.pow(1 + appreciationPct / 100, 1/12) - 1;

    let currentHomeValue = homePrice;
    let remainingMortgage = initialMortgage;
    let monthlyRent = currentRent;

    for (let year = 1; year <= plannedStay; year++) {
      for (let month = 1; month <= 12; month++) {
        const elapsedMonths = (year - 1) * 12 + month;

        // 1. Home value appreciation
        currentHomeValue = currentHomeValue * (1 + monthlyAppreciation);

        // 2. Remaining Mortgage Principal
        if (remainingMortgage > 0 && initialMortgage > 0) {
          if (monthlyRate > 0) {
            // Remaining principal formula
            remainingMortgage = initialMortgage * (Math.pow(1 + monthlyRate, totalMonths) - Math.pow(1 + monthlyRate, elapsedMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
          } else {
            remainingMortgage = Math.max(0, initialMortgage - (monthlyMortgagePayment * elapsedMonths));
          }
          if (remainingMortgage < 0) remainingMortgage = 0;
        } else {
          remainingMortgage = 0;
        }

        // 3. Buyer Monthly Costs
        const monthlyPropertyTax = (currentHomeValue * (propertyTaxPct / 100)) / 12;
        const monthlyMaintenance = (currentHomeValue * (maintenancePct / 100)) / 12;
        const buyerCost = monthlyMortgagePayment + monthlyPropertyTax + monthlyMaintenance;

        // 4. Renter Monthly Costs
        monthlyRent = monthlyRent * (1 + monthlyRentInflation);

        // 5. Monthly Difference (Renter savings or Buyer savings)
        const difference = buyerCost - monthlyRent;

        // 6. Renter stock growth
        renterStocks = renterStocks * (1 + monthlyStockReturn);
        if (difference > 0) {
          // Buying is more expensive, renter invests the extra cash
          renterStocks += difference;
        } else {
          // Renting is more expensive, renter withdraws from stock market to pay rent difference
          renterStocks += difference; // difference is negative, so this subtracts
        }
      }

      // Selling cost (assume 6% of home value at selling time)
      const sellingCosts = currentHomeValue * 0.06;
      buyerNetWorth = currentHomeValue - remainingMortgage - sellingCosts;
      renterNetWorth = Math.max(0, renterStocks);

      data.push({
        year,
        buyerNetWorth: Math.round(buyerNetWorth),
        renterNetWorth: Math.round(renterNetWorth),
        homeValue: Math.round(currentHomeValue),
        remainingMortgage: Math.round(remainingMortgage)
      });
    }

    return data;
  }, [homePrice, currentRent, downPaymentPct, plannedStay, interestRate, propertyTaxPct, appreciationPct, stockReturnPct, rentInflationPct, maintenancePct]);

  // Final Results
  const finalYearData = simulationData[simulationData.length - 1];
  const buyerFinalNW = finalYearData.buyerNetWorth;
  const renterFinalNW = finalYearData.renterNetWorth;
  const netDifference = Math.abs(buyerFinalNW - renterFinalNW);
  const buyerWins = buyerFinalNW > renterFinalNW;

  const formattedDifference = new Intl.NumberFormat().format(netDifference);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl dark:bg-indigo-950 dark:text-indigo-400">
            <Home className="w-8 h-8" />
          </span>
          Rent vs. Buy Simulator
        </h1>
        <p className="text-slate-500 mt-2 text-base max-w-2xl">
          Compare the long-term wealth impact of buying a home versus renting and investing the difference.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Coins className="w-5 h-5 text-indigo-500" />
            Primary Parameters
          </h2>

          {/* Quick Presets */}
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100/80 space-y-1.5 mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Quick Presets</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setHomePrice(250000);
                  setCurrentRent(1300);
                  setDownPaymentPct(5);
                  setPlannedStay(7);
                }}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-xs font-bold rounded-lg text-slate-600 hover:text-indigo-600 transition-colors shadow-sm"
              >
                Starter Home
              </button>
              <button
                type="button"
                onClick={() => {
                  setHomePrice(450000);
                  setCurrentRent(2200);
                  setDownPaymentPct(10);
                  setPlannedStay(10);
                }}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-xs font-bold rounded-lg text-slate-600 hover:text-indigo-600 transition-colors shadow-sm"
              >
                Mid-Range Suburb
              </button>
              <button
                type="button"
                onClick={() => {
                  setHomePrice(850000);
                  setCurrentRent(3800);
                  setDownPaymentPct(20);
                  setPlannedStay(5);
                }}
                className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-xs font-bold rounded-lg text-slate-600 hover:text-indigo-600 transition-colors shadow-sm"
              >
                Urban Condo
              </button>
            </div>
          </div>

          {/* Target Home Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                Target Home Price
                <span className="group relative inline-flex items-center">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                    The purchase price of the home you want to model.
                  </span>
                </span>
              </label>
              <div className="flex items-center">
                <span className="text-slate-400 font-bold mr-1">{currencySymbol}</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="10000"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>{currencySymbol}50k</span>
              <span>{currencySymbol}1M</span>
              <span>{currencySymbol}2M</span>
            </div>
          </div>

          {/* Current Rent */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                Monthly Rent
                <span className="group relative inline-flex items-center">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                    The monthly rent cost for an equivalent rental unit.
                  </span>
                </span>
              </label>
              <div className="flex items-center">
                <span className="text-slate-400 font-bold mr-1">{currencySymbol}</span>
                <input
                  type="number"
                  value={currentRent}
                  onChange={(e) => setCurrentRent(Math.max(0, Number(e.target.value)))}
                  className="w-28 text-right font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <input
              type="range"
              min="300"
              max="10000"
              step="50"
              value={currentRent}
              onChange={(e) => setCurrentRent(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>{currencySymbol}300</span>
              <span>{currencySymbol}5k</span>
              <span>{currencySymbol}10k</span>
            </div>
          </div>

          {/* Down Payment % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                Down Payment
                <span className="group relative inline-flex items-center">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                    The cash percentage you pay upfront. A higher downpayment lowers your monthly mortgage.
                  </span>
                </span>
              </label>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={downPaymentPct}
                  min="0"
                  max="100"
                  onChange={(e) => setDownPaymentPct(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="w-16 text-right font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-slate-500 font-semibold text-sm">%</span>
                <span className="text-xs text-slate-400 font-semibold ml-1">
                  ({currencySymbol}{new Intl.NumberFormat().format(Math.round(homePrice * (downPaymentPct / 100)))})
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={downPaymentPct}
              onChange={(e) => setDownPaymentPct(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>0%</span>
              <span>20%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Planned Stay */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                Planned Stay
                <span className="group relative inline-flex items-center">
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                    How many years you plan to live in the home before selling.
                  </span>
                </span>
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={plannedStay}
                  onChange={(e) => setPlannedStay(Math.max(1, Math.min(30, Number(e.target.value))))}
                  className="w-16 text-right font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-slate-500 font-semibold text-sm ml-1">Years</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="1"
              value={plannedStay}
              onChange={(e) => setPlannedStay(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          {/* Advanced Settings Accordion */}
          <div className="border-t border-slate-100 pt-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex justify-between items-center w-full py-2 text-left font-bold text-slate-700 hover:text-indigo-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-indigo-500" />
                Advanced Market Parameters
              </span>
              {showAdvanced ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {showAdvanced && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 animate-fadeIn">
                {/* Interest Rate */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Mortgage Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                    className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Stock Market Return */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Stock Market Return (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={stockReturnPct}
                    onChange={(e) => setStockReturnPct(Math.max(0, Number(e.target.value)))}
                    className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Home Appreciation */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Home Appreciation Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={appreciationPct}
                    onChange={(e) => setAppreciationPct(Math.max(0, Number(e.target.value)))}
                    className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Property Tax Rate */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Annual Property Tax (%)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={propertyTaxPct}
                    onChange={(e) => setPropertyTaxPct(Math.max(0, Number(e.target.value)))}
                    className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Rent Inflation */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Rent Inflation Rate (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={rentInflationPct}
                    onChange={(e) => setRentInflationPct(Math.max(0, Number(e.target.value)))}
                    className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Maintenance & Insurance */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Annual Maintenance & Ins. (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={maintenancePct}
                    onChange={(e) => setMaintenancePct(Math.max(0, Number(e.target.value)))}
                    className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="space-y-6">
          {/* Winner Banner */}
          <div className={`p-6 rounded-3xl border flex items-start gap-4 shadow-xl ${
            buyerWins 
              ? 'bg-emerald-50/70 border-emerald-100 text-emerald-950' 
              : 'bg-indigo-50/70 border-indigo-100 text-indigo-950'
          }`}>
            <span className={`p-3 rounded-2xl ${buyerWins ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'}`}>
              <TrendingUp className="w-6 h-6" />
            </span>
            <div>
              <h3 className="text-lg font-black uppercase tracking-wider">
                {buyerWins ? 'Buying is cheaper!' : 'Renting is cheaper!'}
              </h3>
              <p className="text-2xl font-black mt-1">
                Saves you {currencySymbol}{formattedDifference} over {plannedStay} years
              </p>
              <p className={`text-sm mt-2 opacity-80 font-medium`}>
                Assuming a home appreciation rate of {appreciationPct}%/year and stock returns of {stockReturnPct}%/year.
              </p>
            </div>
          </div>

          {/* Plain English Summary Card */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-5 text-sm text-slate-700 leading-relaxed space-y-2">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">Plain-English Breakdown</h4>
            <p>
              Over a <strong>{plannedStay}-year</strong> period, {buyerWins ? 'buying a home' : 'renting a home'} accumulates more net worth. 
              {buyerWins ? (
                <span> By purchasing the home for <strong>{currencySymbol}{new Intl.NumberFormat().format(homePrice)}</strong> with a <strong>{downPaymentPct}%</strong> down payment, your home value is projected to reach <strong>{currencySymbol}{new Intl.NumberFormat().format(Math.round(finalYearData.homeValue))}</strong> while you pay off your mortgage debt.</span>
              ) : (
                <span> By renting for <strong>{currencySymbol}{currentRent}/month</strong>, you can invest your <strong>{currencySymbol}{new Intl.NumberFormat().format(Math.round(homePrice * (downPaymentPct / 100)))}</strong> down payment in the stock market, compounding to <strong>{currencySymbol}{new Intl.NumberFormat().format(Math.round(renterFinalNW))}</strong>.</span>
              )}
            </p>
          </div>

          {/* Interactive Line Chart */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-500 flex items-center gap-1.5 ml-2">
              Net Worth Projection (Year-by-Year)
              <span className="group relative">
                <HelpCircle className="w-3.5 h-3.5 cursor-pointer text-slate-400 hover:text-slate-600" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-xs rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  Buyer net worth is home value minus mortgage principal & selling fees. Renter net worth is down payment & rent savings compounded in stocks.
                </span>
              </span>
            </h3>
            <LineChart
              data={simulationData}
              currencySymbol={currencySymbol}
              xKey="year"
              yKeys={['buyerNetWorth', 'renterNetWorth']}
              labels={['Buyer Net Worth', 'Renter Net Worth']}
              colors={['#10b981', '#6366f1']}
            />
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Buyer Net Worth ({plannedStay} yrs)</span>
              <span className="block text-xl font-extrabold text-slate-900 mt-1">
                {currencySymbol}{new Intl.NumberFormat().format(buyerFinalNW)}
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-1">
                Home Value: {currencySymbol}{new Intl.NumberFormat().format(finalYearData.homeValue)}
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Renter Net Worth ({plannedStay} yrs)</span>
              <span className="block text-xl font-extrabold text-slate-900 mt-1">
                {currencySymbol}{new Intl.NumberFormat().format(renterFinalNW)}
              </span>
              <span className="text-[10px] text-indigo-600 font-bold block mt-1">
                Ending Stocks: {currencySymbol}{new Intl.NumberFormat().format(renterFinalNW)}
              </span>
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 flex gap-3 text-amber-800">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
            <p className="text-xs leading-relaxed font-medium">
              <strong>Note on selling costs:</strong> Buyer net worth accounts for a 6% selling commission at year {plannedStay}. If you hold the home forever, your actual buyer net worth will be higher.
            </p>
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="mt-12 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-8">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </span>
            How the Rent vs. Buy Simulator Works
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-1">
            Understanding the underlying mathematical models and formulas behind the simulation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Buyer Card */}
          <div className="bg-emerald-50/20 border border-emerald-100/70 rounded-2xl p-6 space-y-4">
            <h4 className="font-black text-emerald-800 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              1. Buyer Wealth Accumulation
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Buying accumulates wealth by converting monthly housing expenses into property equity and benefiting from home value appreciation.
            </p>
            <div className="space-y-3.5 pt-2">
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Mortgage Formula</span>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                  Monthly Principal & Interest is calculated using standard loan amortization:
                </p>
                <div className="py-2.5 px-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-center text-xs font-bold shadow-inner border border-slate-800">
                  M = P &times; [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                </div>
                <span className="text-[9px] text-slate-400 mt-1.5 block leading-normal">
                  Where <strong>P</strong> = Loan Principal, <strong>r</strong> = Monthly Interest Rate (APR/12), and <strong>n</strong> = 360 payments (30-year fixed).
                </span>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Variables Modeled</span>
                <ul className="text-xs space-y-1 text-slate-500 list-inside list-disc">
                  <li><strong>Appreciation:</strong> Home value increases by {appreciationPct}% annually, compounded monthly.</li>
                  <li><strong>Maintenance:</strong> Annual maintenance is simulated at {maintenancePct}% of the home value.</li>
                  <li><strong>Net Worth:</strong> Ending Home Value minus Mortgage Balance and 6% Selling Costs.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Renter Card */}
          <div className="bg-indigo-50/20 border border-indigo-100/70 rounded-2xl p-6 space-y-4">
            <h4 className="font-black text-indigo-800 uppercase tracking-wider text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              2. Renter Wealth Accumulation
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Renting accumulates wealth by investing down payment cash (which isn't tied up in the home) and recurring monthly savings.
            </p>
            <div className="space-y-3.5 pt-2">
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Opportunity Cost Principle</span>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-1.5">
                  The renter starts with a portfolio equal to the buyer's down payment and closing costs:
                </p>
                <div className="py-2 px-4 bg-slate-900 text-slate-100 rounded-lg font-mono text-center text-xs font-bold shadow-inner border border-slate-800">
                  Portfolio₀ = Down Payment + Closing Costs
                </div>
              </div>
              <div className="bg-white border border-slate-100 rounded-xl p-3.5 shadow-sm space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Investment Dynamics</span>
                <ul className="text-xs space-y-1 text-slate-500 list-inside list-disc">
                  <li><strong>Monthly Rent:</strong> Escalates annually by the rent inflation rate ({rentInflationPct}%/year).</li>
                  <li><strong>Difference Investing:</strong> Each month, we compare total cost of owning vs renting. If owning is more expensive, the renter buys stocks with the difference. Otherwise, the renter withdraws from stocks.</li>
                  <li><strong>Portfolio Return:</strong> Compounds monthly at the stock return rate ({stockReturnPct}%/year).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO FAQ Section */}
      <div className="mt-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <HelpCircle className="w-5 h-5" />
            </span>
            Renting vs. Buying: Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-emerald-500">
            <h4 className="font-extrabold text-slate-800 text-sm">Is it better to rent or buy a home?</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              There is no single answer. Buying allows you to build equity and benefit from property appreciation, but it comes with high upfront costs (down payment, closing costs) and recurring maintenance expenses. Renting offers flexibility, zero maintenance liability, and allows you to invest your down payment cash into liquid assets like stocks.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-indigo-500">
            <h4 className="font-extrabold text-slate-800 text-sm">What is the "opportunity cost" in the Rent vs. Buy debate?</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              When you buy a home, your down payment is locked up in home equity. The opportunity cost is the investment return you could have earned if you invested that same down payment cash in the stock market (e.g., an S&P 500 index fund) instead of using it to buy a house.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-emerald-500">
            <h4 className="font-extrabold text-slate-800 text-sm">What hidden costs should homeowners expect?</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Beyond the monthly mortgage principal and interest, homeowners pay property taxes, homeowner's insurance, and annual maintenance (estimated at 1% to 2% of the home's value annually for repairs, roofing, HVAC, etc.).
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-indigo-500">
            <h4 className="font-extrabold text-slate-800 text-sm">How long do I need to live in a house to break even?</h4>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Typically, it takes 4 to 7 years to offset the buying transaction costs (closing fees, lender fees) and selling costs (usually a 6% agent commission). If you plan to move in under 3 years, renting is almost always more financially advantageous.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
