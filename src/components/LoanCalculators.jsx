import React from 'react';
import { Calculator, Home, Truck, Sparkles, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

export default function LoanCalculators() {
  const loanTools = [
    {
      id: 'personal-loan-calculator',
      path: '/calculators/personal-loan-calculator',
      title: 'Personal Loan Calculator',
      description: 'Calculate monthly payments, total interest, and early payoff savings for fixed installment personal loans with full amortization schedules.',
      icon: Calculator,
      badge: 'Fixed Installment',
      color: 'indigo'
    },
    {
      id: 'home-loan-calculator',
      path: '/calculators/home-loan-calculator',
      title: 'Home Loan Calculator',
      description: 'Model your complete monthly mortgage obligation including principal, interest, property taxes, home insurance, and HOA dues.',
      icon: Home,
      badge: 'Mortgage & Housing',
      color: 'blue'
    },
    {
      id: 'car-loan-calculator',
      path: '/calculators/car-loan-calculator',
      title: 'Car Loan Calculator',
      description: 'Calculate auto loan payments for new or used vehicles factoring in trade-in allowances, cash down payments, and state sales taxes.',
      icon: Truck,
      badge: 'Auto Financing',
      color: 'cyan'
    },
    {
      id: 'loan-payoff-calculator',
      path: '/calculators/loan-payoff-calculator',
      title: 'Loan Payoff Calculator',
      description: 'Discover how adding extra monthly payments or one-time lump-sum contributions accelerates debt freedom and saves interest.',
      icon: Sparkles,
      badge: 'Debt Acceleration',
      color: 'emerald'
    },
    {
      id: 'debt-to-income-calculator',
      path: '/calculators/debt-to-income-calculator',
      title: 'Debt-to-Income (DTI) Calculator',
      description: 'Calculate front-end and back-end DTI ratios to evaluate mortgage pre-approval odds and lender underwriting risk categories.',
      icon: ShieldCheck,
      badge: 'Underwriting Risk',
      color: 'amber'
    },
    {
      id: 'debt-consolidation',
      path: '/debt-consolidation',
      title: 'Debt Consolidation Optimizer',
      description: 'Evaluate moving multiple high-interest credit card balances into a single lower-interest fixed-rate personal installment loan.',
      icon: Layers,
      badge: 'Credit Card Payoff',
      color: 'purple'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 text-slate-800">
      
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
        <span className="text-slate-900 font-bold">Loan Calculators Hub</span>
      </nav>

      {/* Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black tracking-wider uppercase inline-block border border-indigo-100">
          Loans & Borrowing Topic Cluster
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Free Serverless Loan Calculators
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Model installment payments, analyze mortgage trade-offs, estimate auto financing taxes, and calculate payoff acceleration schedules with 100% client-side privacy.
        </p>
      </div>

      {/* Topic Cluster Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanTools.map((tool) => {
          const IconComp = tool.icon;
          return (
            <a
              key={tool.id}
              href={tool.path}
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState(null, '', tool.path);
                window.dispatchEvent(new Event('popstate'));
              }}
              className="group bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3.5 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {tool.badge}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {tool.title}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between font-bold text-xs text-indigo-600 group-hover:text-indigo-700">
                <span>Launch Calculator</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          );
        })}
      </div>

      {/* Category Hub Guide (500–800 Words) */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-10 space-y-10 text-left">
        
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
            <span><strong>Last Updated:</strong> July 2026</span>
          </div>
          <div>
            <span><strong>Cluster Guide:</strong> Consumer & Real Estate Debt Underwriting</span>
          </div>
        </div>

        {/* 1. Cluster Introduction (500–800 Words) */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 border-b pb-3">
            Navigating Consumer Borrowing & Loan Structures
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
            <p>
              Loans are fundamental building blocks of modern personal finance, empowering individuals to achieve homeownership, acquire vehicles, fund higher education, or consolidate high-interest debt. However, borrowing comes at a cost—interest accrued over time. Understanding how different loan structures operate is essential for protecting your long-term net worth.
            </p>
            <p>
              Consumer loans generally fall into two primary structural categories: <strong>Secured Installment Loans</strong> and <strong>Unsecured Installment Loans</strong>. Secured loans (such as mortgages and auto loans) are backed by physical collateral (your home or vehicle). Because the lender holds a legal lien on the underlying asset, secured loans carry lower interest rates (typically 4% to 8% APR). Unsecured loans (such as personal loans and debt consolidation loans) require no collateral, relying instead on your credit history and income stability. Consequently, unsecured loan rates are higher (ranging from 8% to 24% APR).
            </p>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 2. Decision Tree / Matrix */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Which Calculator Should You Choose?</h2>
          <p className="text-slate-600 text-sm mb-6">
            Select the tool matched to your specific financial objective:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <strong className="text-indigo-600 font-extrabold text-base block">🏡 Purchasing or Refinancing Property?</strong>
              <p className="text-slate-600 text-xs leading-relaxed">
                Use the <a href="/calculators/home-loan-calculator" className="font-bold underline text-indigo-600">Home Loan Calculator</a> to factor in down payments, 30-year fixed amortization, property tax escrows, homeowners insurance, and HOA fees.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <strong className="text-indigo-600 font-extrabold text-base block">🚗 Buying a New or Used Car?</strong>
              <p className="text-slate-600 text-xs leading-relaxed">
                Use the <a href="/calculators/car-loan-calculator" className="font-bold underline text-indigo-600">Car Loan Calculator</a> to model 24–84 month financing terms, state sales taxes, cash down payments, and trade-in vehicle credits.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <strong className="text-indigo-600 font-extrabold text-base block">💳 Borrowing a Lump Sum or Fixing Debt?</strong>
              <p className="text-slate-600 text-xs leading-relaxed">
                Use the <a href="/calculators/personal-loan-calculator" className="font-bold underline text-indigo-600">Personal Loan Calculator</a> for fixed monthly payment schedules, or the <a href="/debt-consolidation" className="font-bold underline text-indigo-600">Debt Consolidation Optimizer</a> to eliminate high-interest card debt.
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <strong className="text-indigo-600 font-extrabold text-base block">⚡ Accelerating Existing Debt Payoff?</strong>
              <p className="text-slate-600 text-xs leading-relaxed">
                Use the <a href="/calculators/loan-payoff-calculator" className="font-bold underline text-indigo-600">Loan Payoff Calculator</a> to see how adding extra monthly payments or lump sums shrinks interest costs and speeds up debt freedom.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* 3. Category FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl border-l-4 border-l-indigo-500">
              <h3 className="font-extrabold text-slate-900 text-base">What is loan amortization?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Amortization is the process of spreading a loan out into a series of equal payments over time. Each payment pays down both interest and principal.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl border-l-4 border-l-emerald-500">
              <h3 className="font-extrabold text-slate-900 text-base">How does loan interest compound?</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Most installment loans use simple monthly interest computed on the remaining principal balance, meaning interest charges decline as principal is repaid.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
