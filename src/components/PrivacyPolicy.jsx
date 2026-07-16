import React from 'react';
import { Shield, Lock, Cpu, Landmark, Truck, CreditCard } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Shield className="w-8 h-8" />
          </span>
          Privacy Policy & Methodology
        </h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          Learn about our strict data privacy policies and the exact financial math behind each calculator.
        </p>
      </div>

      {/* Part 1: Privacy Policies */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6 text-left">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5">
          <Lock className="w-5 h-5 text-indigo-500" />
          Data Privacy & Security
        </h2>

        <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
          <p>
            <strong>1. Serverless Operations:</strong> FinCalc Flow runs 100% in your web browser. All calculations, slider inputs, and variables are processed locally on your machine using client-side JavaScript. <strong>We do not run backend servers, databases, or API tracking calls that collect or store your financial inputs.</strong>
          </p>
          <p>
            <strong>2. Local Storage & Memory:</strong> Any variables you edit are held in temporary state memory. Once you refresh or close the page, the numbers are cleared from memory.
          </p>
          <p>
            <strong>3. Google AdSense & Cookies:</strong> We partner with Google AdSense to serve advertisements on our website.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-500 text-xs">
            <li>Google, as a third-party vendor, uses cookies to serve ads on our site.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting the Google <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Ads Settings</a> page, or by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">aboutads.info</a> to opt out of a third-party vendor's use of cookies for personalized advertising.</li>
          </ul>
        </div>
      </div>

      {/* Part 2: Calculator Methodologies */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2.5 px-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          Methodology & Calculator Formulas
        </h2>

        <div className="grid grid-cols-1 gap-6">
          
          {/* Tool 1: Rent vs Buy */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Landmark className="w-4 h-4" /></span>
              Rent vs. Buy Simulator Math
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                The simulator projects asset value and opportunity costs year-by-year. Here is the step-by-step logic:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Buyer Mortgage Amortization:</strong> The monthly Principal & Interest (P&I) payment is calculated using:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] overflow-x-auto text-center">
                    M = P * [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                  </div>
                  Where <code>P</code> is the mortgage amount (Home Price minus Down Payment), <code>r</code> is monthly interest (Annual Rate / 12), and <code>n</code> is 360 (30-year fixed term).
                </li>
                <li>
                  <strong>Property Tax and Maintenance:</strong> Calculated annually based on the appreciated home value:
                  <code className="block mt-1">Property Tax = (Home Price * Tax Rate %) / 12</code>
                  <code className="block">Maintenance & Ins. = (Home Price * Maint Rate %) / 12</code>
                </li>
                <li>
                  <strong>Appreciation:</strong> Home Value compounds monthly: 
                  <code className="block mt-1">Value_new = Value_old * (1 + Annual Appreciation % / 12)</code>
                </li>
                <li>
                  <strong>Renter Stock Opportunities:</strong> The renter starts with a portfolio equal to the buyer's down payment. Every month, the difference between the buyer's monthly outgoings (P&I + taxes + maintenance) and the renter's monthly rent is calculated. If buying is more expensive, the renter invests the difference. If renting is more expensive, the difference is deducted. The renter's stock portfolio grows monthly at the stock market return rate.
                </li>
                <li>
                  <strong>Net Worth at stay end:</strong> 
                  <code className="block mt-1">Buyer Net Worth = Current Home Value - Remaining Mortgage Principal - 6% Selling Fee</code>
                  <code className="block">Renter Net Worth = Renter Stock Value</code>
                </li>
              </ul>
            </div>
          </div>

          {/* Tool 2: Cost Per Mile */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><Truck className="w-4 h-4" /></span>
              Trucking Cost Per Mile Math
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                Designed for logistics operators, this tool calculates the operational break-even rate per mile:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Monthly Fixed Overhead:</strong> Aggregates costs that do not change based on driving distance:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Fixed Costs = Truck Payment + Insurance + (Annual Permits / 12)
                  </div>
                </li>
                <li>
                  <strong>Monthly Fuel Costs:</strong> Calculated based on expected distance and efficiency parameters:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Fuel Cost = (Miles Driven / Fuel Efficiency MPG) * Fuel Price Per Gallon
                  </div>
                </li>
                <li>
                  <strong>Monthly Maintenance Costs:</strong> Direct per-mile variable allocations:
                  <code className="block mt-1">Maintenance Cost = Miles Driven * Maint Rate Per Mile</code>
                </li>
                <li>
                  <strong>Total Cost Per Mile:</strong>
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Cost Per Mile = [Fixed Costs + Fuel Costs + Maintenance Costs] / Miles Driven
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Tool 3: Debt Consolidation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><CreditCard className="w-4 h-4" /></span>
              Debt Consolidation Optimizer Math
            </h3>
            <div className="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <p>
                Compares paying off multiple individual revolving cards versus one installment consolidation loan:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Weighted Interest Rate (APR):</strong> The average interest rate representing all cards:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Weighted APR = Sum(Card Balance * Card APR) / Total Balance
                  </div>
                </li>
                <li>
                  <strong>Credit Card Payoff Simulation:</strong> Revolving credit card minimum payments decrease as the balance drops. The simulation calculates payments month-by-month:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Monthly Payment = Max(25, Interest Accrued + 1.5% of Current Balance)
                  </div>
                  Interest Accrued is calculated as <code>Current Balance * (Card APR / 12)</code>. The simulation stops when the balance reaches zero or at 360 months (30 years).
                </li>
                <li>
                  <strong>Loan Offer Amortization:</strong> Fixed installment payments:
                  <div className="my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-[11px] text-center">
                    Loan Payment = Total Balance * [r(1+r)ⁿ] / [(1+r)ⁿ - 1]
                  </div>
                  Where <code>r</code> is Monthly Loan APR / 12, and <code>n</code> is Loan Term in months.
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
