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

      {/* Complete Guide to Calculating Trucking Cost Per Mile (SEO Content) */}
      <div className="seo-content-container max-w-7xl mx-auto px-4 py-8 text-slate-800 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 mt-12 text-left">

        <h2 className="text-3xl font-bold mb-4 text-slate-900 border-b pb-2">The Complete Guide to Calculating Trucking Cost Per Mile</h2>
        <p className="mb-6 text-lg leading-relaxed text-slate-600">
          For independent owner-operators and fleet managers in the United States, knowing your exact <strong>Cost Per Mile (CPM)</strong> is the thin line between running a highly profitable logistics business and filing for bankruptcy. With fluctuating diesel prices, rising commercial insurance premiums, and strict Federal Motor Carrier Safety Administration (FMCSA) regulations, guessing your expenses is no longer an option.
        </p>
        <p className="mb-6 leading-relaxed">
          Our serverless Cost Per Mile calculator is designed to run completely in your browser to help you analyze your margins instantly. Below, we break down the exact mathematical formulas, industry definitions, and expense categories you must track to accurately price your freight loads.
        </p>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">Understanding Fixed Costs vs. Variable Costs in Trucking</h2>
        <p className="mb-4 leading-relaxed">
          To figure out how much it costs to run your rig, your operating expenses must be split into two distinct categories: <strong>Fixed Costs</strong> (expenses that stay the same regardless of how many miles you drive) and <strong>Variable Costs</strong> (expenses that change dynamically based on your driving distance).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <h3 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-2">
              🔒 What Are Fixed Costs?
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">These are your monthly overhead commitments. Whether your truck moves 1 mile or 12,000 miles this month, you must pay these bills.</p>
            <ul className="list-disc list-inside text-sm space-y-2 text-slate-700 font-semibold">
              <li>Truck/Equipment Loan Payments</li>
              <li>Commercial Auto Liability Insurance</li>
              <li>ELD (Electronic Logging Device) Subscriptions</li>
              <li>Annual Permits, IFTA Registration, and Heavy Highway Vehicle Use Tax (Form 2290)</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
            <h3 className="text-xl font-bold mb-3 text-slate-900 flex items-center gap-2">
              ⚡ What Are Variable Costs?
            </h3>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">These costs scale directly with your odometer. The more freight routes you haul, the higher these expenses climb.</p>
            <ul className="list-disc list-inside text-sm space-y-2 text-slate-700 font-semibold">
              <li>Diesel Fuel costs</li>
              <li>Tires, oil changes, and PM (Preventative Maintenance)</li>
              <li>Over-the-road toll fees</li>
              <li>Driver wages or your personal take-home pay requirements</li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">The Mathematical Cost Per Mile Formula</h2>
        <p className="mb-4 leading-relaxed">
          To compute your true cost per mile manually, the formula requires dividing your combined operating expenses by the total number of miles traveled during a specific operational period (usually calculated monthly or quarterly):
        </p>
        
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono my-6 text-center text-sm md:text-base border border-slate-800 shadow-inner">
          Cost Per Mile (CPM) = (Total Fixed Costs + Total Variable Costs) ÷ Total Miles Driven
        </div>

        <p className="mb-6 leading-relaxed">
          <strong>Important note on "Deadhead Miles":</strong> When running your numbers, make sure to divide by your <em>total odometer miles</em>, not just your loaded paid miles. If you drive 500 deadhead (empty) miles to pick up a load that pays for 1,000 miles, your expenses must be divided across all 1,500 total miles. Ignoring empty miles is the number one reason new owner-operators fail.
        </p>

        <hr className="my-8 border-slate-200" />

        <h2 className="text-2xl font-bold mb-4 text-slate-900">Frequently Asked Questions (FAQs)</h2>
        
        <div className="space-y-6">
          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
            <h3 className="text-base font-extrabold text-slate-900">What is the average cost per mile for an owner-operator in the US?</h3>
            <p className="text-slate-600 mt-2 text-xs leading-relaxed">
              While costs vary depending on regional fuel prices and equipment age, the average cost to operate a commercial Class 8 truck in the United States typically ranges between <strong>$1.50 and $2.10 per mile</strong>. Fuel usually accounts for 30% to 40% of this total cost.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-amber-500">
            <h3 className="text-base font-extrabold text-slate-900">How do I calculate fuel cost per mile?</h3>
            <p className="text-slate-600 mt-2 text-xs leading-relaxed">
              Divide the average cost of a gallon of diesel by your truck’s average fuel efficiency (MPG). For example, if diesel costs $3.80 per gallon and your semi-truck averages 6.5 miles per gallon, your fuel cost per mile is: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">$3.80 ÷ 6.5 = $0.58 per mile</code>.
            </p>
          </div>

          <div className="bg-slate-50/50 border border-slate-150 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
            <h3 className="text-base font-extrabold text-slate-900">Should I include my own salary in the cost per mile?</h3>
            <p className="text-slate-600 mt-2 text-xs leading-relaxed">
              Yes. Many independent drivers mistake "truck profit" for personal income. You should factor in a fair driver wage per mile as a variable cost. Whatever profit is left over after paying yourself a wage belongs to your business entity for future equipment upgrades and emergency repairs.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500">
          Operating a logistics enterprise requires sharp financial modeling across multiple platforms. If you run content channels or digital resources supporting the transport industry and want to evaluate your digital earning potential, try our <a href="/revenue-planner" onClick={(e) => { e.preventDefault(); window.history.pushState(null, '', '/revenue-planner'); window.dispatchEvent(new Event('popstate')); }} className="text-indigo-600 font-bold hover:underline">Google AdSense Revenue Planner</a>.
        </div>

      </div>

    </div>
  );
}
