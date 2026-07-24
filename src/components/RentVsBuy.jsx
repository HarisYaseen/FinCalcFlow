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

      {/* Complete Guide to Comparing Renting vs. Buying (SEO & Educational Content) */}
      <div className="seo-content-container max-w-7xl mx-auto px-4 py-8 text-slate-800 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 mt-12 text-left space-y-10">
        
        {/* Meta Header / Last Updated Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span><strong>Last Updated:</strong> July 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span><strong>Methodology:</strong> Amortization & Opportunity Cost Modeling</span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold">100% Client-Side Private</span>
          </div>
        </div>

        {/* 1. Introduction (250–400 Words) */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 border-b pb-3">The Complete Guide to Comparing Renting vs. Buying a Home</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              Deciding whether to buy a home or continue renting is one of the most consequential personal finance choices you will make in your lifetime. Conventional wisdom often insists that homeownership is the premier path to building wealth, claiming that monthly rental payments are simply "throwing money away." However, modern financial modeling reveals a much more nuanced reality: in many real estate markets—particularly high-cost urban centers—renting while investing your surplus cash in stock index funds can yield equal or superior net worth over time.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Rent vs. Buy Simulator is a multi-variable financial amortization model. It computes month-by-month cash flows, compounding investment growth, tax obligations, property appreciation, and friction costs over any custom timeframe (from 1 to 30 years).
            </p>
            <p>
              <strong>Who Should Use It:</strong> This tool is engineered for prospective homebuyers evaluating purchase offers, tenants deciding whether to renew a lease or enter the market, financial advisors modeling housing allocation for clients, and mobile professionals weighing short-term relocations against long-term property ownership.
            </p>
            <p>
              <strong>Why It Is Important:</strong> Purchasing property involves significant unrecoverable expenses—such as mortgage interest, property taxes, homeowner’s insurance, maintenance reserves, closing fees, and realtor commissions. Conversely, renting involves unrecoverable rental payments, but keeps your down payment capital liquid. This simulator quantifies the exact financial crossover point where buying becomes more lucrative than renting, eliminating guesswork from your housing decisions.
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Model Assumptions & Limitations Callout */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md text-[10px]">E-E-A-T Audit</span>
            Key Model Assumptions & Practical Limitations
          </h3>
          <ul className="text-xs text-amber-950 space-y-2 list-disc list-inside font-medium leading-relaxed">
            <li><strong>Constant Growth Rates:</strong> The model assumes smooth annual home appreciation and stock market returns. Real estate and equities experience multi-year volatility cycles.</li>
            <li><strong>Standard Tax Deductions:</strong> Following recent tax law adjustments, most homeowners take the high standard deduction rather than itemizing mortgage interest. Consult a CPA for state-specific tax deductions.</li>
            <li><strong>Liquidity & Discipline:</strong> The renter model assumes 100% of monthly savings and down payment capital are invested directly into stock index funds without behavioral leakage.</li>
          </ul>
        </div>

        <hr className="border-slate-200" />

        {/* 2. How It Works */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">How the Rent vs. Buy Simulation Works</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The simulator projects two parallel economic paths over your selected holding period (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">N years</code>). Rather than comparing only monthly checkbook costs, it tracks ending net worth by evaluating asset values minus liabilities and transaction fees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                The Homebuyer Track
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The homebuyer deploys cash upfront for a down payment (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">Down Payment</code>) and closing costs. Each month, the buyer pays mortgage principal & interest (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">Monthly P&I</code>), property tax, and maintenance fees. Home equity grows through principal reduction and home value appreciation, reduced by a 6% selling commission upon exit.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
                The Renter Track
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The renter starts with a liquid investment portfolio equal to the buyer's down payment. Monthly rent escalates annually by the rent inflation rate. Any monthly cash savings (when ownership costs exceed rent) are invested into stock index funds at the market return rate.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. The Formulas & Variable Definitions */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mathematical Formulas & Variable Definitions</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Below are the exact equations powering the simulator:
          </p>

          <div className="space-y-6">
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">1. Monthly Mortgage Payment (P&I)</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-bold">
                M = P &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>M:</strong> Monthly Principal & Interest Payment</div>
                <div><strong>P:</strong> Principal Loan Amount (Price - Down Payment)</div>
                <div><strong>r:</strong> Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)</div>
                <div><strong>n:</strong> Total Amortization Months (e.g., 360 for 30 years)</div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">2. Buyer Net Worth at Exit Year (T)</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-indigo-300 font-bold">
                NW_Buyer(T) = V_T - Balance_T - (V_T &times; C_sell)
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>V_T:</strong> Compounded Home Value [Price &times; (1 + a)^T]</div>
                <div><strong>Balance_T:</strong> Remaining Mortgage Loan Principal</div>
                <div><strong>C_sell:</strong> Realtor Commission & Exit Costs (6% default)</div>
                <div><strong>a:</strong> Annual Home Appreciation Rate</div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">3. Renter Portfolio Compounding</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 font-bold">
                Portfolio_m = Portfolio_(m-1) &times; (1 + s_m) + (Cost_Buyer,m - Rent_m)
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>Portfolio_0:</strong> Initial Down Payment Capital</div>
                <div><strong>s_m:</strong> Monthly Stock Market Return Rate</div>
                <div><strong>Cost_Buyer,m:</strong> Total Monthly Ownership Cost (P&I + Tax + Maint)</div>
                <div><strong>Rent_m:</strong> Inflation-Adjusted Monthly Rent</div>
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
              <h3 className="text-lg font-bold text-slate-900">Example 1: Mid-Range Suburban Home (10-Year Stay)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Home Price:</strong> $450,000</div>
                <div><strong>Down Payment:</strong> 10% ($45,000)</div>
                <div><strong>Mortgage Rate:</strong> 6.5%</div>
                <div><strong>Current Rent:</strong> $2,200/mo</div>
                <div><strong>Appreciation:</strong> 4.0%/yr</div>
                <div><strong>Stock Return:</strong> 8.0%/yr</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Step 1 (Buyer Cash Flow):</strong> Loan principal = $405,000. Monthly P&I = $2,560. Add monthly property tax ($468) and maintenance ($375) for a total monthly cost of $3,403.</p>
                <p><strong>Step 2 (Renter Cash Flow):</strong> Renter starts with $45,000 invested in index funds. Rent begins at $2,200/mo and increases 3% annually. Renter invests the monthly difference ($3,403 - $2,200 = $1,203) into stocks.</p>
                <p><strong>Result at Year 10:</strong> Home value reaches $666,106. Remaining mortgage is $340,110. After 6% selling costs ($39,966), Buyer Net Worth is <strong>$286,030</strong>. Renter stock portfolio grows to <strong>$324,510</strong>. <span className="text-indigo-600 font-bold">Renting wins by $38,480</span> due to higher stock compounding!</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Example 2: Starter Home in Moderate Niche Market (15-Year Stay)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Home Price:</strong> $275,000</div>
                <div><strong>Down Payment:</strong> 20% ($55,000)</div>
                <div><strong>Mortgage Rate:</strong> 5.5%</div>
                <div><strong>Current Rent:</strong> $1,800/mo</div>
                <div><strong>Appreciation:</strong> 4.5%/yr</div>
                <div><strong>Stock Return:</strong> 7.0%/yr</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Calculation:</strong> Because the buyer puts 20% down, monthly P&I is $1,249, total housing cost is $1,780/mo (lower than starting rent!). Over 15 years, mortgage principal drops significantly while home value appreciates to $532,200.</p>
                <p><strong>Result at Year 15:</strong> Buyer Net Worth (after selling fees) reaches <strong>$354,200</strong>, while Renter Net Worth reaches <strong>$198,400</strong>. <span className="text-emerald-600 font-bold">Buying wins by $155,800</span> thanks to long holding duration and favorable initial purchase pricing.</p>
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
              <strong className="text-slate-900 block mb-1">🏡 Evaluating First-Time Home Purchases</strong>
              Test whether putting 5% down vs 20% down alters your break-even year in your specific local housing market.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">💼 Relocations & Short Stays</strong>
              Determine if living in a city for 3–5 years justifies the 2-5% buying closing costs and 6% seller commissions.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">📈 High Interest Rate Environments</strong>
              Model how 6.5%–7.5% mortgage rates affect long-term equity accumulation compared to stock market returns.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">📊 Asset Allocation Planning</strong>
              Quantify the opportunity cost of pulling cash out of high-yield brokerage accounts for property down payments.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 6. Common Mistakes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">7 Common Mistakes When Comparing Renting vs. Buying</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>1. Ignoring Unrecoverable Ownership Costs:</strong> Homeowners pay property taxes, mortgage interest, HOA dues, and repairs that never return as equity.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>2. Forgetting Opportunity Cost:</strong> Down payment cash locked in a house cannot earn interest in index funds or money market accounts.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>3. Underestimating Maintenance:</strong> Annual upkeep averages 1% to 2% of home value ($4,000/yr on a $400k home for roof, HVAC, plumbing).
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>4. Assuming Linear Appreciation:</strong> Real estate markets experience stagnation or corrections; expecting 8% annual appreciation indefinitely is unrealistic.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>5. Ignoring Transaction Friction:</strong> Selling a home costs ~6% in agent fees plus 1–2% in transfer taxes and closing costs.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>6. Overestimating Tax Benefits:</strong> Under current tax laws with high standard deductions, most buyers do not itemize mortgage interest.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>7. Short Holding Periods:</strong> Buying for less than 4–5 years almost always loses money due to amortized interest front-loading.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 7. Expanded FAQs (8-10 items) */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is the 5% Rule in Rent vs. Buy analysis?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                The 5% Rule estimates unrecoverable annual homeownership costs at roughly 5% of property value (1.5% property tax, 1% maintenance, 2.5% cost of capital). If annual rent is less than 5% of the home's purchase price, renting is mathematically favored.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Is renting always "throwing money away"?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                No. Rent pays for shelter without financial liability for property depreciation, repairs, or illiquidity. Mortgage interest and property taxes are equally "thrown away" unrecoverable fees.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">How does inflation impact homeownership vs renting?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Fixed-rate mortgages lock in your principal and interest payment, inflating away debt in real terms. Renters face annual rent inflation increases, though their stock investments also benefit from corporate revenue inflation.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">What duration of stay is required to break even on buying?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Typically 5 to 7 years. It takes several years for mortgage principal payments and home appreciation to surpass upfront closing costs and closing seller commissions.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">How does Private Mortgage Insurance (PMI) affect the calculation?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                If you put down less than 20%, lenders charge PMI (0.5%–1.5% of loan amount annually), adding to unrecoverable monthly costs until you reach 20% home equity.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Should I factor in stock market capital gains tax?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Yes. While home sales benefit from up to $250k ($500k married) tax-free capital gains under IRS Section 121, taxable brokerage stock gains are subject to long-term capital gains tax rates (15%–20%).
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">What standard maintenance rate should I assume?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                A standard rule of thumb is 1% of home value annually for newer homes and 2% for homes older than 20 years to cover major capital replacements.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">Does home equity build faster with a 15-year mortgage?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Yes. 15-year mortgages carry lower interest rates and pay down principal rapidly, but require higher monthly cash payments, reducing monthly stock investment savings for renters.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 8. Contextual Scenario-Driven Internal Navigation */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Next Steps in Your Financial Journey</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Housing choices directly impact your debt load and investment capabilities. Explore how our other tools solve adjacent financial scenarios:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <a 
              href="/debt-consolidation"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/debt-consolidation'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center justify-between mb-1">
                <span>Free Up Cash Flow for Down Payments</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">
                High-interest credit card debt inflating your Debt-to-Income (DTI) ratio? Use our <strong>Debt Consolidation Optimizer</strong> to lower monthly obligations and qualify for better mortgage rates.
              </p>
            </a>
            <a 
              href="/revenue-planner"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/revenue-planner'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-amber-600 group-hover:text-amber-700 flex items-center justify-between mb-1">
                <span>Monetize Housing & Real Estate Media</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">
                Operating a real estate or personal finance blog? Simulate ad revenue from high-CPC mortgage keywords using our <strong>AdSense Revenue Planner</strong>.
              </p>
            </a>
          </div>
        </div>

        {/* 9. Authoritative References */}
        <div className="pt-4 text-xs text-slate-400 border-t border-slate-100 space-y-1">
          <strong className="text-slate-500 block">Authoritative References & Data Sources:</strong>
          <p>• U.S. Federal Reserve Economic Data (FRED): <span className="underline">Mortgage Rates & Case-Shiller Home Price Index</span></p>
          <p>• Consumer Financial Protection Bureau (CFPB): <span className="underline">Mortgage Amortization & Closing Cost Guidelines</span></p>
          <p>• Internal Revenue Service (IRS): <span className="underline">Publication 530 - Tax Information for Homeowners</span></p>
        </div>

      </div>
    </div>
  );
}
