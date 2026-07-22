import React from 'react';
import { BookOpen, ArrowLeft, Clock, User, Calendar, Tag, ChevronRight, Calculator, CheckCircle2 } from 'lucide-react';

export const guidesData = [
  {
    id: 'trucking-cost-per-mile-guide',
    slug: 'trucking-cost-per-mile-guide',
    title: 'Complete Guide to Calculating Trucking Cost Per Mile for Owner-Operators (2026)',
    category: 'Logistics & Freight',
    readTime: '8 min read',
    author: 'FinCalc Logistics Team',
    date: 'July 20, 2026',
    excerpt: 'Master the breakdown of fixed vs variable trucking expenses, deadhead mileage formulas, fuel efficiency impacts, and breakeven rate per mile calculations.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          In the commercial transportation industry, operating an independent trucking business or small fleet without knowing your exact Cost Per Mile (CPM) is the fastest path to financial failure. Freight rates fluctuate constantly, and accepting a load that appears high-paying on paper can result in net loss if your operational cost per mile exceeds the gross rate per mile.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. Understanding Fixed vs. Variable Costs in Logistics</h2>
        <p>
          To compute an accurate CPM, your operating expenses must be categorized into two distinct buckets: <strong>Fixed Overhead</strong> and <strong>Variable Operational Expenses</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">📌 Fixed Costs (Month-to-Month)</h3>
            <p className="text-xs text-slate-500 mb-3">Expenses that remain constant regardless of whether your rig drives 1,000 or 10,000 miles in a month:</p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 text-slate-700">
              <li>Truck & Trailer Lease or Loan Payments</li>
              <li>Commercial Auto Physical Damage & Cargo Insurance</li>
              <li>Annual Permits, IFTA Taxes, & Heavy Highway Vehicle Use Tax (Form 2290)</li>
              <li>ELD Software Subscriptions, Accounting Services, & License Renewal</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">⚡ Variable Costs (Mileage-Dependent)</h3>
            <p className="text-xs text-slate-500 mb-3">Expenses that scale directly with the number of miles driven:</p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 text-slate-700">
              <li>Diesel Fuel Costs (Fuel Price ÷ MPG)</li>
              <li>Tires, Oil Changes, & Mechanical Maintenance Reserves</li>
              <li>Driver Wages (Per-Mile Salary Allocation)</li>
              <li>Highway Toll Fees, Scales, & Trailer Washouts</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. The Deadhead Mileage Danger</h2>
        <p>
          "Deadhead" miles refer to driving with an empty trailer between load drop-offs and new pickups. Because empty miles burn fuel and wear out tires without generating freight revenue, they must be included in your monthly total mileage denominator.
        </p>
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-indigo-900 font-semibold text-xs sm:text-sm">
          <strong>True CPM Formula:</strong> <code className="bg-indigo-100 px-2 py-0.5 rounded font-mono">Total Monthly Expenses ÷ (Loaded Miles + Deadhead Miles)</code>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">3. Worked Industry Example</h2>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
          <p><strong>Scenario:</strong> Owner-operator driving 9,500 total miles per month (8,500 loaded + 1,000 deadhead).</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>Fixed Costs: $4,200/month = <strong>$0.44/mile</strong></li>
            <li>Diesel Fuel ($4.10/gal @ 6.5 MPG) = <strong>$0.63/mile</strong></li>
            <li>Maintenance & Tire Reserves = <strong>$0.18/mile</strong></li>
            <li>Target Driver Salary Allocation = <strong>$0.60/mile</strong></li>
            <li><strong>Total Break-Even Cost Per Mile: $1.85</strong></li>
          </ul>
        </div>

        <p className="pt-4 text-xs text-slate-500">
          Want to compute your custom operational cost per mile? Use our interactive <a href="/cost-per-mile" className="text-indigo-600 font-bold hover:underline">Trucking Cost Per Mile Calculator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'rent-vs-buy-housing-analysis',
    slug: 'rent-vs-buy-housing-analysis',
    title: 'Rent vs. Buy Housing Analysis: When Renting Outperforms Owning a Home',
    category: 'Housing Economics',
    readTime: '10 min read',
    author: 'FinCalc Housing Desk',
    date: 'July 18, 2026',
    excerpt: 'Uncover the 5% rule of unrecoverable housing costs, home appreciation trade-offs, opportunity cost of down payments, and stock market compounding.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          The traditional wisdom that "renting is throwing money away" is mathematically incomplete. While buying a home builds equity over long horizons, homeownership carries massive unrecoverable costs that do not build asset value—including mortgage interest, property taxes, home insurance, maintenance, and transaction fees.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. The 5% Rule of Unrecoverable Housing Costs</h2>
        <p>
          Financial experts use the <strong>5% Rule</strong> to estimate the annual unrecoverable cost of owning a home. The 5% is broken down into three components:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Property Tax (~1.5%):</strong> Mandatory municipal taxes based on home assessment.</li>
          <li><strong>Maintenance & Repairs (~1.0%):</strong> Roof replacements, HVAC repairs, plumbing, painting.</li>
          <li><strong>Capital Cost / Interest (~2.5%):</strong> The interest paid on your mortgage plus the opportunity cost of tied-up equity.</li>
        </ul>
        <p className="text-xs sm:text-sm bg-slate-50 p-4 rounded-xl border">
          If renting an equivalent property costs less than 5% of the target home's purchase price annually, renting is mathematically favored over buying.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. Down Payment Opportunity Cost</h2>
        <p>
          When you buy a home, putting down $80,000 for a down payment locks that capital into real estate. If a renter instead places that $80,000 into a broad market index fund (yielding an average of 7–9% per year), the compounding growth of that portfolio over 10–20 years often outpaces home equity appreciation.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">3. Time Horizon & Transaction Fees</h2>
        <p>
          Purchasing a home incurs 2%–4% in closing fees, while selling incurs 5%–6% in realtor commissions and transfer taxes. Because of these high transaction costs, buying a home typically requires a stay of <strong>at least 5 to 7 years</strong> to break even against renting.
        </p>

        <p className="pt-4 text-xs text-slate-500">
          Model your own 10-to-30 year wealth comparison using our interactive <a href="/rent-vs-buy" className="text-indigo-600 font-bold hover:underline">Rent vs. Buy Simulator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'credit-card-debt-payoff-strategies',
    slug: 'credit-card-debt-payoff-strategies',
    title: 'Debt Avalanche vs. Debt Snowball vs. Personal Loan Consolidation',
    category: 'Debt & Credit',
    readTime: '9 min read',
    author: 'FinCalc Credit Advisors',
    date: 'July 15, 2026',
    excerpt: 'Compare mathematical interest minimization against behavioral momentum and fixed-rate installment loans to find your fastest debt-free path.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          Carrying multiple high-interest credit card balances is one of the biggest obstacles to building personal wealth. Because credit card issuers calculate minimum payments to cover mostly interest and very little principal, cardholders can remain trapped in debt for decades.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. The Three Primary Payoff Strategies</h2>
        
        <div className="space-y-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">🏔️ The Debt Avalanche Method (Mathematical Winner)</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pay minimums on all cards, then direct all extra cash toward the account with the <strong>highest interest rate (APR)</strong>. Once paid off, roll the payment into the next highest rate card. This saves the maximum total interest.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">❄️ The Debt Snowball Method (Behavioral Winner)</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pay minimums on all cards, then target the card with the <strong>smallest balance</strong> first regardless of interest rate. Clearing small debts quickly builds psychological momentum and reduces the number of monthly bills.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">💳 Personal Loan Consolidation (Structural Fix)</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Replace multiple 20%+ APR revolving credit card accounts with a single fixed-rate personal installment loan at 8%–12% APR. This guarantees a fixed monthly payment and a concrete debt-free payoff date.
            </p>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. Impact on Credit Scores</h2>
        <p>
          Consolidating credit card debt into a personal loan lowers your <strong>credit utilization ratio</strong> (which accounts for 30% of your FICO score). Moving revolving balances to an installment loan often results in a significant credit score jump within 60 to 90 days.
        </p>

        <p className="pt-4 text-xs text-slate-500">
          Calculate your weighted average APR and consolidation savings with our <a href="/debt-consolidation" className="text-indigo-600 font-bold hover:underline">Debt Consolidation Calculator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'website-adsense-monetization-guide',
    slug: 'website-adsense-monetization-guide',
    title: 'Google AdSense RPM Optimization & Niche Earnings Benchmark Guide',
    category: 'Web Monetization',
    readTime: '7 min read',
    author: 'FinCalc Publisher Team',
    date: 'July 12, 2026',
    excerpt: 'Analyze how niche selection, advertiser bidding competition, click-through rates (CTR), and page view volume dictate monthly website income.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          Monetizing website traffic via Google AdSense requires understanding how content niche, audience geography, and user engagement interact to produce publisher revenue.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. Core Formulas Behind Digital Ad Revenue</h2>
        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <p>• Ad Clicks = Monthly Pageviews × (CTR ÷ 100)</p>
          <p>• Monthly Revenue = Ad Clicks × Average Cost-Per-Click (CPC)</p>
          <p>• Page RPM = (Monthly Revenue ÷ Monthly Pageviews) × 1,000</p>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. Niche CPC Benchmarks</h2>
        <p>
          Advertisers bid aggressively for audiences in high-intent industries, while viral entertainment niches yield far lower rates per click:
        </p>
        <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2">
          <li><strong>Personal Finance & Insurance:</strong> $2.50 – $8.00+ CPC</li>
          <li><strong>B2B Software & Logistics:</strong> $1.80 – $5.00 CPC</li>
          <li><strong>Health & Wellness:</strong> $0.80 – $2.20 CPC</li>
          <li><strong>General Lifestyle & News:</strong> $0.10 – $0.45 CPC</li>
        </ul>

        <p className="pt-4 text-xs text-slate-500">
          Simulate traffic targets for your website with our interactive <a href="/revenue-planner" className="text-indigo-600 font-bold hover:underline">Google AdSense Revenue Planner</a>.
        </p>
      </div>
    )
  }
];

export default function Guides({ currentSlug }) {
  // If viewing a specific article
  if (currentSlug) {
    const guide = guidesData.find(g => g.slug === currentSlug);
    if (!guide) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Guide Not Found</h1>
          <a href="/guides" className="text-indigo-600 font-bold hover:underline">Return to Guides Directory</a>
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-left">
        {/* Navigation back */}
        <a href="/guides" className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Financial Guides
        </a>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-400">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-wider">{guide.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {guide.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {guide.date}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {guide.title}
          </h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-2 border-b pb-6">
            <User className="w-4 h-4 text-indigo-500" /> Published by <span className="text-slate-800 font-bold">{guide.author}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl space-y-6">
          {guide.content}
        </div>
      </div>
    );
  }

  // Directory View (/guides)
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 text-left">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
          Knowledge Base & Insights
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          Financial Guides & Industry Articles
        </h1>
        <p className="text-slate-500 text-sm sm:text-base">
          In-depth financial analysis, mathematical formulas, logistics economics, and web monetization tutorials written by our editorial team.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guidesData.map((article) => (
          <div key={article.id} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full uppercase tracking-wider">{article.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                <a href={`/guides/${article.slug}`}>{article.title}</a>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{article.date}</span>
              <a 
                href={`/guides/${article.slug}`}
                className="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Read Article <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
