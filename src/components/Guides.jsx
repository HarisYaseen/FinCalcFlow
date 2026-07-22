import React from 'react';
import { BookOpen, ArrowLeft, Clock, User, Calendar, ChevronRight, Lightbulb } from 'lucide-react';

export const guidesData = [
  {
    id: 'trucking-cost-per-mile-guide',
    slug: 'trucking-cost-per-mile-guide',
    title: 'How I Calculate Trucking Cost Per Mile: An Owner-Operator\'s Real-World Guide (2026)',
    category: 'Logistics & Freight',
    readTime: '8 min read',
    author: 'Haris Yaseen',
    date: 'July 20, 2026',
    excerpt: 'A practical, no-nonsense breakdown of fixed overhead, fuel spikes, empty deadhead miles, and how to know your exact breakeven rate before taking a load.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          If there’s one thing I’ve learned talking to owner-operators and fleet drivers, it’s this: accepting freight without knowing your exact Cost Per Mile (CPM) is a fast track to losing money. A load paying $2.30 a mile might look great at first glance, but if your rig costs $2.10 a mile to run and you have to drive 150 empty miles to pick it up, you’re basically working for free.
        </p>

        <p>
          In this guide, I’ll walk you through how to calculate your true cost per mile so you can bid confidently, catch hidden expense leaks, and protect your hard-earned profit margins.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. Splitting Your Expenses: Fixed vs. Variable Costs</h2>
        <p>
          To get an accurate CPM, you have to separate the bills you pay no matter what from the costs that go up as you roll down the highway.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">📌 Fixed Overhead (Paid Every Month)</h3>
            <p className="text-xs text-slate-500 mb-3">Whether your truck runs 500 miles or 10,000 miles this month, these bills don't change:</p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 text-slate-700">
              <li>Truck & trailer lease or loan payments</li>
              <li>Physical damage and cargo insurance premiums</li>
              <li>Annual highway use taxes (Form 2290), state permits, & IFTA</li>
              <li>ELD software, accounting tools, and dispatch subscriptions</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">⚡ Variable Costs (Scales With Mileage)</h3>
            <p className="text-xs text-slate-500 mb-3">Every mile you drive adds directly to these expenses:</p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-1.5 text-slate-700">
              <li>Diesel fuel (the single biggest ongoing expense)</li>
              <li>Tires, oil changes, DEF fluid, and maintenance reserves</li>
              <li>Driver salary allocation (yes, you MUST pay yourself!)</li>
              <li>Highway tolls, scale fees, and trailer washouts</li>
            </ul>
          </div>
        </div>

        {/* Pro Tip Box */}
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0" />
            Haris's Real-World Advice: Always Pay Yourself First
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            A common mistake new owner-operators make is treating whatever cash is left in the bank at the end of the month as their "paycheck." Instead, list a targeted driver wage (for example, 60¢ per mile) directly as an operational expense. That way, your breakeven CPM guarantees your living expenses are covered before you take a trip.
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. Watch Out for Empty "Deadhead" Miles</h2>
        <p>
          Deadhead miles are the empty miles you drive to grab your next trailer. Your engine is still burning diesel and your tires are still wearing down, but nobody is paying you for those miles.
        </p>
        <p>
          Always divide your total monthly expenses by your <strong>total miles driven (loaded + deadhead)</strong>. If you only divide by loaded miles, your calculated cost per mile will look artificially low, and you'll end up underbidding freight.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">3. Real-World Numbers: A Worked Example</h2>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
          <p className="font-bold text-slate-800">Let's look at a typical monthly scenario for a single rig driving 9,000 miles (8,000 loaded + 1,000 deadhead):</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Fixed Overhead:</strong> $4,050 total ÷ 9,000 miles = <strong>$0.45 / mile</strong></li>
            <li><strong>Diesel Fuel:</strong> $4.10/gal at 6.5 MPG = <strong>$0.63 / mile</strong></li>
            <li><strong>Maintenance Reserve:</strong> Tires + oil + wear buffer = <strong>$0.18 / mile</strong></li>
            <li><strong>Driver Pay Target:</strong> <strong>$0.60 / mile</strong></li>
            <li><strong className="text-slate-900">Total True Breakeven CPM = $1.86 / mile</strong></li>
          </ul>
        </div>

        <p className="pt-4 text-xs text-slate-500">
          Want to plug in your own truck's numbers? Try our free <a href="/cost-per-mile" className="text-indigo-600 font-bold hover:underline">Trucking Cost Per Mile Calculator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'rent-vs-buy-housing-analysis',
    slug: 'rent-vs-buy-housing-analysis',
    title: 'Renting vs. Buying a Home: Why Renting Isn\'t "Throwing Money Away"',
    category: 'Housing Economics',
    readTime: '10 min read',
    author: 'Haris Yaseen',
    date: 'July 18, 2026',
    excerpt: 'A honest breakdown of unrecoverable housing expenses, maintenance liabilities, down payment opportunity costs, and when renting actually builds more wealth.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          We’ve all heard the old saying: <em>"Renting is just paying your landlord's mortgage—you're throwing money away."</em> But if you run the actual financial math, that statement is often far from true. While buying a home can be a fantastic way to build wealth over 15 to 30 years, it comes with heavy unrecoverable costs that never build a single dollar of home equity.
        </p>

        <p>
          Whether renting or buying makes sense for you comes down to comparing the <strong>unrecoverable costs</strong> of both options in your local market.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. The "Unrecoverable Costs" of Owning a Home</h2>
        <p>
          When you rent, your unrecoverable cost is simple: your monthly rent check. Once you pay it, that money is gone. But homeowners also pay massive unrecoverable costs every single month:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Mortgage Interest:</strong> During the first 10 years of a 30-year loan, the majority of your monthly payment goes directly to bank interest, not principal.</li>
          <li><strong>Property Taxes:</strong> Local levies that increase over time and never go away.</li>
          <li><strong>Home Maintenance & Repairs:</strong> Replacing a roof, fixing an HVAC system, or repairing foundation issues (historically averaging 1% to 2% of the home's value per year).</li>
          <li><strong>HOA Fees & Insurance:</strong> Monthly dues and hazard insurance premiums.</li>
          <li><strong>Closing & Selling Costs:</strong> Paying 2% to 4% upfront when buying, and 5% to 6% in realtor commissions when selling.</li>
        </ul>

        {/* Pro Tip Box */}
        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl text-indigo-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-indigo-800">
            <Lightbulb className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            The 5% Rule of Thumb
          </div>
          <p className="text-xs sm:text-sm text-indigo-900/90 leading-relaxed">
            Financial planners often use the <strong>5% Rule</strong>: total annual unrecoverable homeownership costs equal roughly 5% of the home's value (1.5% tax + 1% maintenance + 2.5% cost of capital). If you can rent an equivalent home for less than 5% of its purchase price per year, renting is mathematically favored.
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. The Hidden Superpower of Renters: Investing the Difference</h2>
        <p>
          When you buy a home, you might lock up $60,000 or $100,000 in a cash down payment. As a renter, that cash stays in your hands. If you take that down payment and invest it into broad index funds (which have historically returned 7% to 10% annually), that compounding stock portfolio can grow faster than a single house appreciates in value.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">3. How Long Do You Plan to Stay?</h2>
        <p>
          Because buying and selling a home carries high transaction fees, buying rarely makes sense if you plan to move in under 5 years. It usually takes 5 to 7 years of property appreciation just to break even on loan closing costs and agent commissions.
        </p>

        <p className="pt-4 text-xs text-slate-500">
          Want to see how your local rent and home prices stack up over 10 or 20 years? Run the numbers on our free <a href="/rent-vs-buy" className="text-indigo-600 font-bold hover:underline">Rent vs. Buy Simulator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'credit-card-debt-payoff-strategies',
    slug: 'credit-card-debt-payoff-strategies',
    title: 'How to Pay Off High-Interest Credit Card Debt (Snowball vs. Avalanche vs. Consolidation)',
    category: 'Debt & Credit',
    readTime: '9 min read',
    author: 'Haris Yaseen',
    date: 'July 15, 2026',
    excerpt: 'An honest guide to crushing credit card balances, saving thousands in interest, and choosing between payoff methods or fixed personal loan consolidation.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          High-interest credit card debt is designed to keep you trapped. Card issuers intentionally set minimum monthly payments as low as possible—just enough to cover daily compounding interest and a tiny sliver of your balance. If you only pay the minimums on a $15,000 card balance, it can take over 20 years to pay off and cost you tens of thousands in extra interest!
        </p>

        <p>
          The good news is that with a clear strategy, you can break free much faster. Here’s a breakdown of the three proven methods to eliminate credit card debt.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. Comparing the Top 3 Payoff Strategies</h2>
        
        <div className="space-y-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">🏔️ Strategy 1: The Debt Avalanche (Saves the Most Money)</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pay minimums on all your cards, then throw every extra dollar at the card with the <strong>highest interest rate (APR)</strong>. Once that card hits zero, move on to the next highest interest rate card. This saves you the maximum amount of cash in interest charges.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">❄️ Strategy 2: The Debt Snowball (Best for Quick Wins)</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pay minimums on all cards, but focus your extra payments on the card with the <strong>smallest dollar balance</strong> first. Knocking out small balances quickly gives you psychological wins and eliminates extra monthly bills faster.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">💳 Strategy 3: Personal Loan Debt Consolidation</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              If your credit score is decent, you can take out a single, lower-interest fixed personal loan (e.g. 9% APR) to pay off multiple credit cards (e.g. 22% APR). You replace multiple chaotic monthly bills with one lower monthly payment and a guaranteed payoff date.
            </p>
          </div>
        </div>

        {/* Pro Tip Box */}
        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-emerald-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
            <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            Bonus Benefit: Boosting Your Credit Score
          </div>
          <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
            When you consolidate credit card debt into a personal loan, your credit card utilization drops to zero. Since credit utilization makes up 30% of your FICO score, moving revolving debt into an installment loan often leads to a quick jump in your credit score!
          </p>
        </div>

        <p className="pt-4 text-xs text-slate-500">
          Want to calculate your exact interest savings and debt-free date? Use our free <a href="/debt-consolidation" className="text-indigo-600 font-bold hover:underline">Debt Consolidation Calculator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'website-adsense-monetization-guide',
    slug: 'website-adsense-monetization-guide',
    title: 'How Google AdSense Earnings Actually Work: A Website Publisher\'s Guide',
    category: 'Web Monetization',
    readTime: '7 min read',
    author: 'Haris Yaseen',
    date: 'July 12, 2026',
    excerpt: 'Understand how website traffic, click-through rates (CTR), advertiser cost-per-click (CPC) bids, and niche selection combine to determine ad income.',
    content: (
      <div className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          When starting a blog or web tool, many creators think traffic volume is the only thing that matters for ad revenue. But in reality, two websites with the exact same 50,000 monthly pageviews can earn wildly different incomes—one might make $100 a month while the other makes $2,500!
        </p>

        <p>
          In this guide, I’ll explain how ad earnings are calculated and how choosing the right topic impacts your income goals.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. The Core Formulas</h2>
        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm space-y-2">
          <p>• Total Ad Clicks = Monthly Pageviews × (CTR % ÷ 100)</p>
          <p>• Monthly Earnings = Total Ad Clicks × Average Cost-Per-Click (CPC)</p>
          <p>• Page RPM (Revenue per 1,000 views) = (Earnings ÷ Pageviews) × 1,000</p>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. Why Topic Niche Changes Everything</h2>
        <p>
          Advertisers bid in auction pools for ad space. If your website covers topics where companies sell high-ticket services (like mortgages, commercial insurance, or software), advertisers are willing to pay several dollars for a single click. On celebrity gossip or memes, ads might pay only pennies per click.
        </p>
        <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2">
          <li><strong>Finance, Mortgages & Insurance:</strong> $2.00 – $6.00+ per click</li>
          <li><strong>Business Software & Logistics:</strong> $1.50 – $4.00 per click</li>
          <li><strong>Health, Tech & Fitness:</strong> $0.60 – $1.80 per click</li>
          <li><strong>General Entertainment & News:</strong> $0.10 – $0.40 per click</li>
        </ul>

        <p className="pt-4 text-xs text-slate-500">
          Want to simulate traffic goals for your website? Try our free <a href="/revenue-planner" className="text-indigo-600 font-bold hover:underline">Google AdSense Revenue Planner</a>.
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
            <User className="w-4 h-4 text-indigo-500" /> Written by <span className="text-slate-800 font-bold">{guide.author}</span>
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
          Practical Financial Guides & Articles
        </h1>
        <p className="text-slate-500 text-sm sm:text-base">
          Plain-English financial breakdowns, trucking math formulas, housing economics, and website monetization tutorials written to help you make smarter decisions.
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
