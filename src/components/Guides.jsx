import React from 'react';
import { BookOpen, ArrowLeft, Clock, User, Calendar, ChevronRight, Lightbulb, CheckCircle2, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';

export const guidesData = [
  {
    id: 'trucking-cost-per-mile-guide',
    slug: 'trucking-cost-per-mile-guide',
    title: 'How to Calculate Trucking Cost Per Mile: An Owner-Operator\'s Complete Guide (2026)',
    category: 'Logistics & Freight',
    readTime: '11 min read',
    author: 'Haris Yaseen',
    date: 'July 20, 2026',
    excerpt: 'A practical, step-by-step breakdown of fixed overhead, fuel price fluctuations, deadhead mileage formulas, driver salary allocations, and operational breakeven calculations.',
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          If there’s one number that dictates whether an owner-operator stays in business or files for bankruptcy, it’s <strong>Cost Per Mile (CPM)</strong>. Freight markets move quickly, and accepting a spot market load that pays $2.30 a mile might seem profitable at first glance. However, if your truck costs $2.05 per mile to operate and you have to drive 150 unpaid "deadhead" miles just to pick up the load, that trip will net you a loss.
        </p>

        <p>
          In this guide, I'll walk you through how to calculate your true operational cost per mile step-by-step. We'll cover how to separate fixed overhead from variable driving expenses, how to factor in empty deadhead miles, and how to set freight rates that ensure your business stays profitable.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. Categorizing Your Expenses: Fixed vs. Variable Costs</h2>
        <p>
          To calculate an accurate cost per mile, you must divide your monthly expenses into two primary categories: <strong>Fixed Costs</strong> and <strong>Variable Costs</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">📌 Fixed Costs (Monthly Overhead)</h3>
            <p className="text-xs text-slate-500 mb-3">These are expenses you must pay every month, whether your rig drives 500 miles or 12,000 miles:</p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2 text-slate-700">
              <li><strong>Truck & Trailer Payments:</strong> Monthly lease or commercial loan installments.</li>
              <li><strong>Commercial Insurance:</strong> Primary liability, physical damage, and cargo insurance.</li>
              <li><strong>Permits & Licenses:</strong> Heavy Highway Vehicle Use Tax (Form 2290), IFTA registration, and state permits.</li>
              <li><strong>Technology & Administrative Overhead:</strong> Electronic Logging Device (ELD) subscriptions, dispatch fees, accounting software, and legal services.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">⚡ Variable Costs (Mileage-Dependent)</h3>
            <p className="text-xs text-slate-500 mb-3">These expenses scale directly with every single mile registered on your odometer:</p>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2 text-slate-700">
              <li><strong>Diesel Fuel:</strong> The largest single variable expense (calculated as Fuel Price ÷ Truck MPG).</li>
              <li><strong>Preventative Maintenance & Repairs:</strong> Oil changes, tire wear reserve, filter replacements, and mechanical reserves.</li>
              <li><strong>Driver Compensation:</strong> Your targeted personal driver salary allocation per mile.</li>
              <li><strong>Tolls & Road Fees:</strong> Highway tolls, scale weigh-in fees, and trailer washout costs.</li>
            </ul>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
            <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0" />
            Haris's Advice: Always Pay Yourself First
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            A common mistake made by new independent drivers is treating whatever cash remains in the bank account at month-end as their "salary." Instead, treat your targeted driver wage (such as $0.60 per mile) as a mandatory variable expense in your calculation. That way, your breakeven CPM guarantees your personal household expenses are met before your truck turns a wheel.
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. The Danger of Ignoring Deadhead Miles</h2>
        <p>
          "Deadhead" miles refer to driving an empty trailer between load drop-offs and new pickups. Your semi-truck burns fuel and wears out tires during these stretches just like it does under load, but no shipper pays you directly for deadhead distance.
        </p>
        <p>
          When computing your cost per mile, always divide your total monthly expenses by your <strong>total miles driven (loaded miles + deadhead miles)</strong>. If you only divide by revenue-generating loaded miles, your cost per mile will look artificially low, leading to underpriced load acceptance.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">3. Worked Numeric Breakdown Example</h2>
        <p>
          Let's review a realistic monthly scenario for a single owner-operator driving 9,500 total miles (8,500 loaded miles + 1,000 deadhead miles):
        </p>

        <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl space-y-4 font-mono text-xs sm:text-sm shadow-xl">
          <div className="border-b border-slate-800 pb-3 font-bold text-blue-400">Monthly Expense Summary (9,500 Total Miles):</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
            <div>• Truck Payment: $1,600</div>
            <div>• Insurance & Permits: $1,050</div>
            <div>• ELD & Software: $200</div>
            <div>• Diesel Fuel ($4.10/gal @ 6.5 MPG): $5,992</div>
            <div>• Maintenance Reserve ($0.15/mi): $1,425</div>
            <div>• Driver Salary Target ($0.60/mi): $5,700</div>
          </div>
          <div className="border-t border-slate-800 pt-3 text-emerald-400 font-bold">
            Total Monthly Outflow: $15,967 ÷ 9,500 Miles = $1.68 / Mile Breakeven CPM
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">4. Strategies to Lower Your Cost Per Mile</h2>
        <ul className="list-disc pl-5 space-y-3 text-xs sm:text-sm">
          <li><strong>Optimize Fuel Efficiency:</strong> Improving truck aerodynamics and lowering cruise speed from 70 MPH to 63 MPH can boost fuel economy from 6.0 MPG to 7.0 MPG, cutting annual diesel costs by over $4,000.</li>
          <li><strong>Minimize Deadhead Trips:</strong> Use freight load boards and broker relationships to schedule backhaul trips before departing on your outbound leg.</li>
          <li><strong>Maintain Maintenance Buffers:</strong> Setting aside $0.15 to $0.20 per mile in a dedicated repair account prevents emergency roadside repairs from forcing you into high-interest credit card debt.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">5. Operational Benchmarks Summary</h2>
        <p>
          According to industry guidelines published by the American Transportation Research Institute (ATRI), total commercial truck operational costs typically range between $1.60 and $2.15 per mile depending on fleet size, fuel market conditions, and equipment financing terms.
        </p>

        <p className="pt-4 text-xs text-slate-500">
          Ready to model your own rig's exact operational expenses? Calculate your numbers with our free <a href="/cost-per-mile" className="text-indigo-600 font-bold hover:underline">Trucking Cost Per Mile Calculator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'rent-vs-buy-housing-analysis',
    slug: 'rent-vs-buy-housing-analysis',
    title: 'Renting vs. Buying a Home: Why Renting Isn\'t "Throwing Money Away"',
    category: 'Housing Economics',
    readTime: '12 min read',
    author: 'Haris Yaseen',
    date: 'July 18, 2026',
    excerpt: 'An honest financial breakdown of unrecoverable housing expenses, property maintenance liabilities, down payment opportunity costs, and stock market compounding.',
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          We’ve all heard the old real estate saying: <em>"Renting is just paying your landlord's mortgage—you're throwing your money away."</em> But if you analyze housing economics with detailed financial modeling, that claim is often mathematically inaccurate. While purchasing a home can build substantial equity over a 15 to 30 year period, homeownership carries massive unrecoverable costs that do not build a single dollar of asset value.
        </p>

        <p>
          Whether buying or renting makes more sense for your financial situation depends on comparing the <strong>unrecoverable costs</strong> of both choices in your local housing market.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. Understanding Unrecoverable Housing Costs</h2>
        <p>
          For renters, the unrecoverable cost is straightforward: monthly rent payments. Once paid, that capital is gone. For homeowners, however, unrecoverable costs are spread across several categories:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">🏠 Unrecoverable Homeowner Costs</h3>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2 text-slate-700">
              <li><strong>Mortgage Interest:</strong> Bank interest fees (making up the vast majority of early monthly mortgage payments).</li>
              <li><strong>Property Taxes:</strong> Municipal taxes assessed on property value that never end.</li>
              <li><strong>Maintenance & Upkeep:</strong> Roof replacements, plumbing, HVAC maintenance (commonly estimated as an industry guideline of 1% to 2% of home value annually).</li>
              <li><strong>HOA & Insurance Fees:</strong> Homeowner association dues and property insurance premiums.</li>
              <li><strong>Selling Friction:</strong> Paying 5% to 6% in realtor commissions and transfer fees when selling.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">🏢 Unrecoverable Renter Costs</h3>
            <ul className="list-disc pl-5 text-xs sm:text-sm space-y-2 text-slate-700">
              <li><strong>Monthly Rent Payments:</strong> Your monthly cost of shelter (which increases with annual rent inflation).</li>
              <li><strong>Renter's Insurance:</strong> Low-cost personal property insurance policy.</li>
              <li><strong>Opportunity Cost Benefit:</strong> Down payment cash remains in your hands, allowing you to invest it in liquid growth assets like stock index funds.</li>
            </ul>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl text-indigo-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-indigo-800">
            <Lightbulb className="w-5 h-5 text-indigo-600 flex-shrink-0" />
            The 5% Rule Benchmark
          </div>
          <p className="text-xs sm:text-sm text-indigo-900/90 leading-relaxed">
            Financial planners often reference a commonly cited rule of thumb called the <strong>5% Rule</strong>. This rule estimates annual unrecoverable costs of homeownership at roughly 5% of the home's value (1.5% property tax + 1% maintenance + 2.5% cost of equity capital). If you can rent an equivalent home for less than 5% of its purchase price per year, renting is mathematically favored.
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. Down Payment Opportunity Cost & Index Fund Compounding</h2>
        <p>
          When you buy a home, locking up $70,000 or $100,000 in a down payment ties that cash into real estate equity. If a renter instead places that same $100,000 into stock index funds (which have historically achieved commonly cited average annual returns of 7% to 10% before inflation), that compounding stock portfolio can grow faster than single-property appreciation.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">3. Length of Stay dictates Breakeven</h2>
        <p>
          Because purchasing a home involves closing costs (2% to 4% upfront) and selling fees (5% to 6% on sale), buying rarely makes sense if you plan to relocate within 3 to 5 years. It typically takes 5 to 7 years of home price growth just to break even on transaction costs.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">4. Numeric 10-Year Case Study Comparison</h2>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs sm:text-sm leading-relaxed">
          <p><strong>Scenario:</strong> $400,000 home purchase (10% down = $40,000) vs. Renting an equivalent property for $1,800/month over 10 years.</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Buyer Net Worth (Year 10):</strong> Assuming 3.5% annual home appreciation and 6% realtor selling fee, net home equity reaches ~$245,000.</li>
            <li><strong>Renter Net Worth (Year 10):</strong> Investing the $40,000 down payment and monthly cost savings in an index fund returning 8% yields ~$310,000.</li>
            <li><strong>Outcome:</strong> Renting yields $65,000 more net wealth under these parameters due to opportunity cost growth.</li>
          </ul>
        </div>

        <p className="pt-4 text-xs text-slate-500">
          Want to test your own local mortgage rates and rent prices? Model your scenario on our <a href="/rent-vs-buy" className="text-indigo-600 font-bold hover:underline">Rent vs. Buy Simulator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'credit-card-debt-payoff-strategies',
    slug: 'credit-card-debt-payoff-strategies',
    title: 'How to Eliminate Credit Card Debt: Avalanche vs. Snowball vs. Consolidation',
    category: 'Debt & Credit',
    readTime: '10 min read',
    author: 'Haris Yaseen',
    date: 'July 15, 2026',
    excerpt: 'A comprehensive guide to crushing credit card balances, saving thousands in interest, and evaluating fixed personal loan consolidation.',
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          Revolving credit card debt is one of the most expensive financial traps consumer credit companies create. Credit card issuers structure minimum monthly payments as a tiny percentage of your overall balance—just enough to cover daily compounding interest charges and a minimal amount of principal. If you pay only minimums on a $15,000 card balance at 22% APR, it can take over 20 years to pay off and cost over $22,000 in interest fees alone!
        </p>

        <p>
          Fortunately, adopting a structured payoff strategy allows you to eliminate high-interest balances much faster. Here is a full breakdown of the three primary payoff strategies.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. Comparing Payoff Strategies</h2>
        
        <div className="space-y-4">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">🏔️ Strategy 1: The Debt Avalanche (Mathematical Interest Minimizer)</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pay minimum payments on all accounts, then allocate every extra dollar toward the credit card with the <strong>highest annual percentage rate (APR)</strong>. Once that card reaches zero, roll that entire payment into the card with the next highest interest rate. This method mathematically minimizes lifetime interest charges.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">❄️ Strategy 2: The Debt Snowball (Behavioral Momentum Winner)</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Pay minimum payments on all cards, but focus extra funds on the card with the <strong>smallest total balance</strong> first regardless of interest rate. Clearing small debt accounts quickly creates psychological wins and reduces the number of monthly bills you maintain.
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base">💳 Strategy 3: Personal Loan Debt Consolidation</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Consolidate multiple high-interest revolving credit card accounts into a single, fixed-rate personal installment loan (e.g. 9.5% APR). You replace multiple chaotic monthly payments with one lower monthly installment and a guaranteed payoff milestone date.
            </p>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl text-emerald-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
            <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            Credit Score Impact: Lowering Credit Utilization
          </div>
          <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
            Consolidating credit card debt into a personal loan drops your revolving credit card utilization to 0%. Because credit utilization accounts for 30% of your FICO credit score, shifting revolving balances to an installment loan often provides a substantial credit score increase within 30 to 60 days.
          </p>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. Real-World Interest Savings Example</h2>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm leading-relaxed">
          <p><strong>Scenario:</strong> $20,000 credit card debt across 3 cards at a weighted average 22.5% APR.</p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li><strong>Credit Card Minimums:</strong> $530/month starting payment. Takes <strong>21 years to pay off</strong>, costing <strong>$23,500 in total interest</strong>.</li>
            <li><strong>Consolidation Loan (5-Year @ 9.5% APR):</strong> Fixed <strong>$420/month payment</strong>. Paid off in <strong>5 years</strong>, costing <strong>$5,200 in total interest</strong>.</li>
            <li><strong>Total Savings: $18,300 interest saved + 16 years off your debt timeline!</strong></li>
          </ul>
        </div>

        <p className="pt-4 text-xs text-slate-500">
          Want to calculate your exact interest savings and debt-free date? Run your numbers on our <a href="/debt-consolidation" className="text-indigo-600 font-bold hover:underline">Debt Consolidation Calculator</a>.
        </p>
      </div>
    )
  },
  {
    id: 'website-adsense-monetization-guide',
    slug: 'website-adsense-monetization-guide',
    title: 'Google AdSense Monetization & RPM Optimization Guide for Webmasters',
    category: 'Web Monetization',
    readTime: '9 min read',
    author: 'Haris Yaseen',
    date: 'July 12, 2026',
    excerpt: 'Understand how website traffic volume, click-through rates (CTR), advertiser cost-per-click (CPC) bids, and content niche selection dictate publisher income.',
    content: (
      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <p className="text-lg font-medium text-slate-800 leading-relaxed">
          When launching a blog or web utility, many webmasters believe that traffic volume is the only variable determining ad earnings. In reality, two websites receiving the exact same 50,000 monthly pageviews can produce dramatically different incomes—one site might earn $120 per month while the other generates over $2,500!
        </p>

        <p>
          In this guide, I'll break down the mathematical formulas behind ad monetization and explain how selecting the right content niche dictates your ad revenue.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">1. The Core Formulas Behind Digital Ad Income</h2>
        <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm space-y-2 shadow-xl">
          <p>• Total Ad Clicks = Monthly Pageviews × (CTR % ÷ 100)</p>
          <p>• Monthly Earnings = Total Ad Clicks × Average Cost-Per-Click (CPC)</p>
          <p>• Page RPM (Revenue per 1,000 views) = (Monthly Revenue ÷ Monthly Pageviews) × 1,000</p>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">2. How Topic Niche Dictates Cost-Per-Click (CPC) Bids</h2>
        <p>
          Google AdSense operates an automated advertiser bidding auction. Advertisers bid aggressively for ad placements in high-intent industries where customer lifetime value is high (such as personal loans, insurance, or enterprise software), driving CPC bids to several dollars per click. General entertainment topics attract lower commercial bidding competition.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs sm:text-sm">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">High-CPC Niches ($1.50 – $6.00+ / click)</span>
            <ul className="list-disc pl-4 text-slate-600 space-y-1">
              <li>Personal Finance, Mortgages & Insurance</li>
              <li>B2B Logistics & SaaS Software</li>
              <li>Legal Services & Real Estate</li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-900 block mb-1">Lower-CPC Niches ($0.10 – $0.45 / click)</span>
            <ul className="list-disc pl-4 text-slate-600 space-y-1">
              <li>General News & Viral Entertainment</li>
              <li>Social Media Gossip & Gaming Memes</li>
              <li>Casual Cooking Recipes</li>
            </ul>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">3. Practical Monetization Simulation</h2>
        <p>
          To generate $3,000 per month in ad income, a finance tool site averaging $2.20 CPC at 1.5% CTR needs approximately <strong>90,000 monthly pageviews</strong>. A viral entertainment blog averaging $0.15 CPC at 1.2% CTR needs over <strong>1,600,000 monthly pageviews</strong> to hit the exact same revenue.
        </p>

        <p className="pt-4 text-xs text-slate-500">
          Want to project your website's earnings targets? Simulate traffic requirements on our free <a href="/revenue-planner" className="text-indigo-600 font-bold hover:underline">Google AdSense Revenue Planner</a>.
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
