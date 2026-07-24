import React, { useState, useMemo } from 'react';
import { PieChart } from './Charts';
import { Truck, Calculator, Settings, Info, CheckCircle, AlertTriangle } from 'lucide-react';

export default function CostPerMile({ currencySymbol }) {
  // Fixed Costs States
  const [truckPayment, setTruckPayment] = useState(1500);
  const [insurance, setInsurance] = useState(800);
  const [annualPermits, setAnnualPermits] = useState(1200);

  // Variable Costs States
  const [fuelPrice, setFuelPrice] = useState(3.89);
  const [efficiency, setEfficiency] = useState(6.5); // mpg
  const [maintenanceCost, setMaintenanceCost] = useState(0.15); // per mile

  // Operations States
  const [milesPerMonth, setMilesPerMonth] = useState(10000);

  const stats = useMemo(() => {
    // 1. Fixed costs per month
    const monthlyPermits = annualPermits / 12;
    const totalFixedCosts = truckPayment + insurance + monthlyPermits;

    // 2. Variable costs per month
    // If miles or efficiency is 0, fuel cost is 0
    const monthlyFuelCost = efficiency > 0 && milesPerMonth > 0 
      ? (milesPerMonth / efficiency) * fuelPrice 
      : 0;

    const monthlyMaintenanceCost = milesPerMonth * maintenanceCost;
    const totalVariableCosts = monthlyFuelCost + monthlyMaintenanceCost;

    // 3. Totals
    const totalMonthlyCost = totalFixedCosts + totalVariableCosts;
    const costPerMile = milesPerMonth > 0 ? totalMonthlyCost / milesPerMonth : 0;

    return {
      totalFixedCosts,
      monthlyFuelCost,
      monthlyMaintenanceCost,
      totalVariableCosts,
      totalMonthlyCost,
      costPerMile
    };
  }, [truckPayment, insurance, annualPermits, fuelPrice, efficiency, maintenanceCost, milesPerMonth]);

  // Chart data formatting
  const chartData = useMemo(() => {
    return [
      { name: 'Fixed Costs', value: Math.round(stats.totalFixedCosts), color: '#3b82f6' }, // Blue
      { name: 'Fuel Costs', value: Math.round(stats.monthlyFuelCost), color: '#f59e0b' }, // Amber
      { name: 'Maintenance', value: Math.round(stats.monthlyMaintenanceCost), color: '#ef4444' } // Red
    ];
  }, [stats]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <span className="p-2 bg-blue-50 text-blue-600 rounded-xl dark:bg-blue-950 dark:text-blue-400">
            <Truck className="w-8 h-8" />
          </span>
          Trucking Cost Per Mile Calculator
        </h1>
        <p className="text-slate-500 mt-2 text-base max-w-2xl text-left">
          Calculate your exact fixed, variable, and total operating cost per mile to optimize your load pricing and business margins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs (7 columns on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Operations Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-100/50">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2 text-left">
              <Calculator className="w-5 h-5 text-blue-500" />
              Monthly Operations
            </h2>

            {/* Quick Presets */}
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100/80 space-y-1.5 mb-4 text-left">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Quick Presets</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMilesPerMonth(4000);
                    setTruckPayment(1100);
                    setInsurance(600);
                    setAnnualPermits(1200);
                    setFuelPrice(3.89);
                    setEfficiency(8.5);
                    setMaintenanceCost(0.10);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-xs font-bold rounded-lg text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
                >
                  Short-Haul / Local
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMilesPerMonth(8000);
                    setTruckPayment(1500);
                    setInsurance(800);
                    setAnnualPermits(1200);
                    setFuelPrice(3.89);
                    setEfficiency(7.0);
                    setMaintenanceCost(0.15);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-xs font-bold rounded-lg text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
                >
                  Regional Carrier
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMilesPerMonth(12500);
                    setTruckPayment(2200);
                    setInsurance(1100);
                    setAnnualPermits(1200);
                    setFuelPrice(3.89);
                    setEfficiency(6.2);
                    setMaintenanceCost(0.20);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-xs font-bold rounded-lg text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
                >
                  Long-Haul OTR
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-1.5">
                  Estimated Miles / Month
                  <span className="group relative inline-flex items-center">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      The total number of miles you expect to drive this truck per month.
                    </span>
                  </span>
                </label>
                <input
                  type="number"
                  value={milesPerMonth}
                  onChange={(e) => setMilesPerMonth(Math.max(0, Number(e.target.value)))}
                  className="w-32 font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 text-right"
                />
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={milesPerMonth}
                onChange={(e) => setMilesPerMonth(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>1,000 mi</span>
                <span>12,000 mi</span>
                <span>25,000 mi</span>
              </div>
            </div>
          </div>

          {/* Fixed Costs Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-2 text-left">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              Fixed Monthly Costs
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  Truck Payment
                  <span className="group relative inline-flex items-center">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      Your monthly lease or loan payment for this truck.
                    </span>
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                  <input
                    type="number"
                    value={truckPayment}
                    onChange={(e) => setTruckPayment(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  Insurance (Monthly)
                  <span className="group relative inline-flex items-center">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      Your commercial auto liability & physical damage insurance premium.
                    </span>
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                  <input
                    type="number"
                    value={insurance}
                    onChange={(e) => setInsurance(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  Registration / Permits
                  <span className="group relative inline-flex items-center">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      Annual costs for license plates, IRP, IFTA registration, and state permits.
                    </span>
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                  <input
                    type="number"
                    value={annualPermits}
                    onChange={(e) => setAnnualPermits(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Variable Costs Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-2 text-left">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              Variable Operating Costs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  Fuel Price (per gallon)
                  <span className="group relative inline-flex items-center">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      The average price per gallon of diesel fuel.
                    </span>
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                  <input
                    type="number"
                    step="0.01"
                    value={fuelPrice}
                    onChange={(e) => setFuelPrice(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  Fuel Efficiency (MPG)
                  <span className="group relative inline-flex items-center">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      Your truck's average miles per gallon (MPG) under load.
                    </span>
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={efficiency}
                    onChange={(e) => setEfficiency(Math.max(0.1, Number(e.target.value)))}
                    className="w-full font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500 text-right pr-12"
                  />
                  <span className="absolute right-3 top-2.5 text-slate-400 font-semibold text-xs">MPG</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  Maintenance / mi
                  <span className="group relative inline-flex items-center">
                    <Info className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-help" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 w-48 bg-slate-800 text-white text-[10px] rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-15 leading-normal">
                      Estimated savings rate per mile for tires, maintenance, and major breakdowns.
                    </span>
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                  <input
                    type="number"
                    step="0.01"
                    value={maintenanceCost}
                    onChange={(e) => setMaintenanceCost(Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 font-bold text-slate-950 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Results (5 columns on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Stats Callouts */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-6 relative overflow-hidden text-left">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full filter blur-2xl opacity-20 -mr-6 -mt-6"></div>
            
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Operating Efficiency Indicator</span>
              <div className="text-4xl font-black mt-2 flex items-baseline gap-1">
                {currencySymbol}{stats.costPerMile.toFixed(2)}
                <span className="text-sm font-semibold text-slate-400">/ mile</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                This is your absolute cost threshold. Any load paying less than this will result in a net loss!
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Total Monthly Cost</span>
              <div className="text-2xl font-black text-white mt-1">
                {currencySymbol}{new Intl.NumberFormat().format(Math.round(stats.totalMonthlyCost))}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Fixed:</span>
                  <span className="font-bold text-blue-400">{currencySymbol}{new Intl.NumberFormat().format(Math.round(stats.totalFixedCosts))} / mo</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Variable:</span>
                  <span className="font-bold text-amber-400">{currencySymbol}{new Intl.NumberFormat().format(Math.round(stats.totalVariableCosts))} / mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plain English Summary Card */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-5 text-sm text-slate-700 leading-relaxed space-y-2 text-left">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-500">Plain-English Breakdown</h4>
            <p>
              By driving <strong>{new Intl.NumberFormat().format(milesPerMonth)} miles</strong> this month, your truck costs <strong>{currencySymbol}{stats.costPerMile.toFixed(2)}</strong> for every single mile you travel. 
              This means you pay <strong>{currencySymbol}{new Intl.NumberFormat().format(Math.round(stats.totalFixedCosts))}</strong> in monthly overhead fees (truck payment, insurance, permits) plus <strong>{currencySymbol}{milesPerMonth > 0 ? (stats.totalVariableCosts / milesPerMonth).toFixed(2) : '0.00'} per mile</strong> for fuel and maintenance.
            </p>
          </div>

          {/* Pie Chart of cost breakdown */}
          <div className="space-y-2 text-left">
            <h3 className="text-sm font-bold text-slate-500 flex items-center gap-1.5 ml-2">
              Monthly Cost Allocation
              <span className="group relative">
                <Info className="w-3.5 h-3.5 cursor-pointer text-slate-400 hover:text-slate-600" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-800 text-white text-xs rounded-lg p-2 font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  Shows how your expenses are divided between fixed cost overheads, fuel consumption, and maintenance savings.
                </span>
              </span>
            </h3>
            <PieChart data={chartData} currencySymbol={currencySymbol} />
          </div>

          {/* Warning / Profit Info */}
          {milesPerMonth < 4000 ? (
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3 text-amber-800 text-left">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-600" />
              <p className="text-xs leading-relaxed font-semibold">
                Your monthly mileage is low. Fixed costs (payment & insurance) make up a disproportionately large part of your cost-per-mile. Increasing mileage will lower your per-mile fixed cost burden.
              </p>
            </div>
          ) : (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex gap-3 text-emerald-800 text-left">
              <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-600" />
              <p className="text-xs leading-relaxed font-semibold">
                Your mileage level leverages fixed overhead costs efficiently. Your business model is optimized to absorb variable costs like fuel prices.
              </p>
            </div>
          )}

        </div>
      </div>

      {/* Complete Guide to Calculating Trucking Cost Per Mile (SEO & Educational Content) */}
      <div className="seo-content-container max-w-7xl mx-auto px-4 py-8 text-slate-800 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 mt-12 text-left space-y-10">
        
        {/* Meta Header / Last Updated Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <span><strong>Last Updated:</strong> July 2026</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span><strong>Methodology:</strong> Two-Stage Fixed/Variable Operating Cost Engine</span>
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full font-bold">100% Client-Side Private</span>
          </div>
        </div>

        {/* 1. Introduction (250–400 Words) */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-slate-900 border-b pb-3">The Complete Guide to Calculating Trucking Cost Per Mile</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              In commercial trucking and logistics, knowing your exact <strong>Cost Per Mile (CPM)</strong> is the fundamental threshold between managing a thriving transportation business and falling into financial insolvency. Operating a Class 8 semi-truck, box truck, or hotshot rig involves complex expense structures where fuel prices fluctuate daily, insurance premiums increase, and vehicle depreciation accumulates with every turn of the odometer. Without a rigorous understanding of your per-mile operating expenses, accepting freight loads from brokers or spot boards becomes a gamble.
            </p>
            <p>
              <strong>What This Calculator Is:</strong> Our serverless Trucking Cost Per Mile Calculator is an operational expense engine designed specifically for commercial freight carriers. It categorizes your monthly fixed overhead commitments (leases, insurance, permits) alongside your variable operational costs (diesel fuel, maintenance reserves, tire wear) to determine your exact minimum cost floor per mile.
            </p>
            <p>
              <strong>Who Should Use It:</strong> This tool is essential for independent owner-operators, fleet managers overseeing multi-truck carriers, freight dispatchers evaluating load profitability, and commercial logistics consultants auditing carrier operations.
            </p>
            <p>
              <strong>Why It Is Important:</strong> Freight rates on load boards fluctuate based on market demand and regional lane imbalances. If a broker offers a rate of $2.20 per mile, that offer might sound attractive. However, if your true operating CPM is $1.95 and you have to drive 200 uncompensated "deadhead" (empty) miles to reach the shipper, your net profit evaporates completely. Calculating true CPM protects your cash flow and ensures every mile driven contributes to net profitability.
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Model Assumptions & Limitations Callout */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-6 space-y-3">
          <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md text-[10px]">E-E-A-T Audit</span>
            Key Operating Assumptions & Operational Limitations
          </h3>
          <ul className="text-xs text-amber-950 space-y-2 list-disc list-inside font-medium leading-relaxed">
            <li><strong>Diesel Volatility:</strong> The model assumes average diesel fuel price over your calculation window. Regional fuel spikes and state IFTA fuel tax surcharges vary across state lines.</li>
            <li><strong>Linear Maintenance Wear:</strong> Maintenance reserves assume steady wear. Major catastrophic component failures (e.g. transmission overhauls) require emergency capital reserves beyond standard per-mile allocations.</li>
            <li><strong>Driver Compensation:</strong> Owner-operators must treat driver wages as a separate expense line item to prevent confusing business profit with personal compensation.</li>
          </ul>
        </div>

        <hr className="border-slate-200" />

        {/* 2. How It Works */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">How the Cost Per Mile Calculation Works</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The calculator processes your financial inputs through a two-stage expense aggregation model, dividing total monthly expenditures by the total odometer distance traveled.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Fixed Monthly Overhead
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fixed costs are recurring monthly obligations that remain constant regardless of truck usage. These include monthly truck lease/loan payments, physical damage & liability insurance, ELD subscriptions, annual IFTA/IRP permits (amortized monthly), and Heavy Highway Vehicle Use Tax (Form 2290).
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                Variable Mileage Expenses
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Variable costs increase in direct proportion to mileage. Diesel fuel is calculated dynamically based on price per gallon divided by truck MPG (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">Fuel Price ÷ MPG</code>). Maintenance and tire reserves are saved on a per-mile basis for repairs, oil changes, and DOT inspections.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. Formulas & Variable Definitions */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">Mathematical Formulas & Variable Definitions</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            The core operating equations used by the calculator are defined as follows:
          </p>

          <div className="space-y-6">
            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">1. Total Cost Per Mile (CPM)</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-blue-300 font-bold">
                CPM = ( FC_total + VC_total ) / M_total
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>CPM:</strong> Total Operating Cost Per Mile</div>
                <div><strong>FC_total:</strong> Total Monthly Fixed Expenses (Truck + Insurance + Permits)</div>
                <div><strong>VC_total:</strong> Total Monthly Variable Expenses (Fuel + Maintenance)</div>
                <div><strong>M_total:</strong> Total Miles Driven (Loaded Miles + Deadhead Miles)</div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">2. Variable Fuel Cost Per Mile</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-amber-300 font-bold">
                CPM_fuel = P_diesel / MPG
              </div>
              <div className="text-xs text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                <div><strong>CPM_fuel:</strong> Fuel Expense Per Odometer Mile</div>
                <div><strong>P_diesel:</strong> Average Price of Diesel Per Gallon</div>
                <div><strong>MPG:</strong> Average Fuel Efficiency Miles Per Gallon</div>
              </div>
            </div>

            <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">3. Fixed Cost Dilution Rate</h3>
              <div className="font-mono text-center text-sm md:text-base py-3 bg-slate-950 rounded-xl border border-slate-800 text-emerald-300 font-bold">
                CPM_fixed = FC_total / M_total
              </div>
              <div className="text-xs text-slate-300 pt-2">
                <strong>Insight:</strong> As total monthly driven miles increase, the fixed cost burden per mile decreases, significantly improving profit margin efficiency.
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
              <h3 className="text-lg font-bold text-slate-900">Example 1: Regional Over-The-Road (OTR) Owner-Operator</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Miles / Month:</strong> 10,000 mi</div>
                <div><strong>Truck Payment:</strong> $1,500/mo</div>
                <div><strong>Insurance:</strong> $800/mo</div>
                <div><strong>Annual Permits:</strong> $1,200 ($100/mo)</div>
                <div><strong>Diesel Price:</strong> $3.89/gal</div>
                <div><strong>Truck MPG:</strong> 6.5 MPG</div>
                <div><strong>Maintenance Reserve:</strong> $0.15/mi</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Step 1 (Fixed Costs):</strong> $1,500 + $800 + $100 = <strong>$2,400 monthly fixed overhead</strong>.</p>
                <p><strong>Step 2 (Variable Costs):</strong> Fuel per mile = $3.89 / 6.5 = $0.60/mi. Monthly fuel (10,000 mi &times; $0.60) = $6,000. Maintenance reserve (10,000 mi &times; $0.15) = $1,500. Total variable = <strong>$7,500</strong>.</p>
                <p><strong>Step 3 (Total CPM):</strong> Total monthly expense = $2,400 + $7,500 = $9,900. Divide by 10,000 miles = <strong className="text-blue-600">$0.99 per mile CPM</strong> (excluding driver salary).</p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Example 2: Low-Mileage Short-Haul Fleet Operator</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                <div><strong>Miles / Month:</strong> 4,000 mi</div>
                <div><strong>Truck Lease:</strong> $1,800/mo</div>
                <div><strong>Insurance:</strong> $900/mo</div>
                <div><strong>Annual Permits:</strong> $1,200 ($100/mo)</div>
                <div><strong>Diesel Price:</strong> $4.10/gal</div>
                <div><strong>Truck MPG:</strong> 5.5 MPG</div>
                <div><strong>Maintenance Reserve:</strong> $0.12/mi</div>
              </div>
              <div className="text-sm text-slate-600 space-y-2">
                <p><strong>Analysis:</strong> Fixed costs total $2,800/mo. Because mileage is low (4,000 mi), fixed cost per mile alone is $2,800 / 4,000 = $0.70/mi. Fuel cost per mile = $4.10 / 5.5 = $0.75/mi. Add $0.12 maintenance reserve.</p>
                <p><strong>Result:</strong> Total CPM is <strong className="text-amber-600">$1.57 per mile CPM</strong>. Demonstrates how lower monthly mileage increases per-mile fixed cost burden.</p>
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
              <strong className="text-slate-900 block mb-1">📦 Load Board Pricing & Negotiations</strong>
              Verify whether spot market freight quotes cover your minimum operating cost plus driver wage requirements.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">🚛 Equipment Purchase & Lease Analysis</strong>
              Compare how higher monthly payments on newer trucks (with better MPG) contrast against older trucks with higher repair costs.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">⛽ Fuel Surcharge Strategy</strong>
              Model how diesel price surges affect your per-mile threshold so you can negotiate adequate fuel surcharges.
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70">
              <strong className="text-slate-900 block mb-1">🛣️ Deadhead Mileage Audits</strong>
              Evaluate maximum allowable unpaid repositioning miles before a backhaul load becomes unviable.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 6. Common Mistakes */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-900">7 Common Mistakes When Calculating Cost Per Mile</h2>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>1. Omitting Deadhead (Empty) Miles:</strong> Dividing expenses by paid loaded miles instead of total odometer miles drastically understates true CPM.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>2. Confusing Take-Home Pay with Business Profit:</strong> Owner-operators must list driver wages as an expense; remaining cash belongs to business capital reserves.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>3. Underestimating Maintenance Reserves:</strong> Setting aside less than $0.10–$0.15/mi leads to emergency credit debt when tires or turbos fail.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>4. Forgetting Amortized Permits & Taxes:</strong> Annual registration, IFTA taxes, and Form 2290 must be broken down into monthly costs.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>5. Ignoring Seasonal Fuel Efficiency Drops:</strong> Winter idling, auxiliary heating, and heavy loads reduce MPG, increasing variable fuel costs.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>6. Pricing Based on Competitors:</strong> Accepting market rates blindly without knowing your unique cost floor risks running at an unrecoverable loss.
            </div>
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl">
              <strong>7. Failing to Re-calculate Quarterly:</strong> Fixed expenses and diesel prices change; CPM must be re-evaluated every 90 days.
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 7. Expanded FAQs (8-10 items) */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Frequently Asked Questions (FAQs)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-blue-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is the national average cost per mile for Class 8 trucks?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                According to ATRI industry reports, average operating costs for Class 8 commercial trucks range between <strong>$1.70 and $2.25 per mile</strong>, including driver wages and benefits.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-amber-500">
              <h3 className="font-extrabold text-slate-900 text-base">How do deadhead miles impact my overall CPM?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Deadhead miles consume fuel and wear tires without generating revenue. Driving 200 deadhead miles on a 800-mile load expands your total mileage to 1,000, increasing required rate per loaded mile.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-blue-500">
              <h3 className="font-extrabold text-slate-900 text-base">How should owner-operators account for driver wages?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                You should budget a competitive market wage rate (e.g. $0.55–$0.70 per mile) as a variable operating cost. True business profit is cash left over after paying driver wages.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-amber-500">
              <h3 className="font-extrabold text-slate-900 text-base">What maintenance rate per mile is recommended?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                New trucks under manufacturer warranty require $0.08–$0.12 per mile. Older trucks out of warranty should reserve $0.15–$0.22 per mile for engine overhauls and tires.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-blue-500">
              <h3 className="font-extrabold text-slate-900 text-base">How do I calculate fuel surcharge (FSC)?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                FSC is calculated as: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">(Current Diesel Price - Base Diesel Price) ÷ Benchmark MPG</code>. It reimburses drivers when fuel exceeds baseline contracts.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-amber-500">
              <h3 className="font-extrabold text-slate-900 text-base">What are fixed costs vs variable costs in trucking?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Fixed costs (leases, insurance, permits) remain constant regardless of driving distance. Variable costs (fuel, tires, toll fees) scale directly with miles traveled.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-blue-500">
              <h3 className="font-extrabold text-slate-900 text-base">How does truck aerodynamic profiling affect CPM?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Aerodynamic skirts, fairings, and low-rolling-resistance tires can improve fuel economy by 0.5 to 1.0 MPG, cutting per-mile fuel costs by $0.06 to $0.12/mi.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl text-left border-l-4 border-l-amber-500">
              <h3 className="font-extrabold text-slate-900 text-base">How often should carrier CPM be recalculated?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                We recommend reviewing CPM monthly. Fuel price swings, insurance renewal updates, and seasonal mileage variations change your minimum breakeven rate.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 8. Contextual Scenario-Driven Internal Navigation */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Next Steps for Fleet Managers & Operators</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Managing commercial transport costs connects directly to equipment financing and digital publishing revenue streams:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <a 
              href="/debt-consolidation"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/debt-consolidation'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-indigo-600 group-hover:text-indigo-700 flex items-center justify-between mb-1">
                <span>Refinance Rig & Equipment Loans</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">
                High monthly truck lease or credit line payments driving up your fixed overhead? Model lower interest consolidation loans using our <strong>Debt Consolidation Optimizer</strong>.
              </p>
            </a>
            <a 
              href="/revenue-planner"
              onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/revenue-planner'); window.dispatchEvent(new Event('popstate')); }}
              className="p-4 bg-white border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm transition-all text-left block group"
            >
              <div className="font-bold text-amber-600 group-hover:text-amber-700 flex items-center justify-between mb-1">
                <span>Monetize Trucking & Logistics Content</span>
                <span>&rarr;</span>
              </div>
              <p className="text-xs text-slate-500">
                Publishing freight market guides, YouTube driver logs, or logistics blogs? Calculate high-CPC digital ad payouts with our <strong>AdSense Revenue Planner</strong>.
              </p>
            </a>
          </div>
        </div>

        {/* 9. Authoritative References */}
        <div className="pt-4 text-xs text-slate-400 border-t border-slate-100 space-y-1">
          <strong className="text-slate-500 block">Authoritative References & Data Sources:</strong>
          <p>• American Transportation Research Institute (ATRI): <span className="underline">An Analysis of the Operational Costs of Trucking</span></p>
          <p>• Federal Motor Carrier Safety Administration (FMCSA): <span className="underline">Carrier Registration & Regulatory Guidelines</span></p>
          <p>• U.S. Energy Information Administration (EIA): <span className="underline">Weekly Retail On-Highway Diesel Prices</span></p>
        </div>

      </div>

    </div>
  );
}
