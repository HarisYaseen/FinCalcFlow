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
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-2 border-b pb-2">Why Cost Per Mile Is the Most Important Number in Trucking</h2>
        <p>
          For owner-operators and small fleet managers, cost per mile (CPM) is the single most important metric for understanding whether a load, a lane, or an entire operation is actually profitable. Revenue per mile tells you what you're being paid; cost per mile tells you what it actually costs to deliver that mile. The gap between the two — your operating margin — is the only number that determines whether you're building a sustainable business or slowly losing money on every load you haul.
        </p>
        <p>
          Many new owner-operators focus heavily on rate per mile when evaluating loads, without a clear, current picture of their own cost per mile. This leads to a common and costly mistake: accepting loads that look profitable on paper (high rate per mile) but are actually break-even or loss-making once true operating costs are factored in.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">The Two Categories of Trucking Costs</h2>
        <p>
          Trucking costs break down into two fundamentally different categories, and understanding the difference matters for how you think about profitability.
        </p>
        <p>
          <strong>Fixed costs</strong> don't change based on how many miles you drive. These include truck payments, insurance premiums, permits and licensing, and often a portion of maintenance reserves. Fixed costs accrue whether your truck is loaded and moving or sitting idle — which is exactly why idle time is so damaging to an owner-operator's margins.
        </p>
        <p>
          <strong>Variable costs</strong> scale directly with miles driven. Fuel is the largest variable cost for most operations, followed by tires, routine maintenance tied to mileage (oil changes, brake wear), and driver pay if you're not the one driving.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">The Core Cost Per Mile Formula</h2>
        <div className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-center font-bold text-indigo-700 text-sm sm:text-base">
          Cost Per Mile = (Total Fixed Costs + Total Variable Costs) ÷ Total Miles Driven
        </div>
        <p>
          The critical detail here is the time period and mileage you use for this calculation. Calculating CPM over a single week with unusually low miles will produce an inflated, unrepresentative cost per mile, since fixed costs get spread across fewer miles. Most experienced operators calculate CPM on a monthly or quarterly basis to smooth out these fluctuations.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">A Detailed Fixed Cost Breakdown</h2>
        <p>For a typical owner-operator running a Class 8 truck, monthly fixed costs commonly include:</p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <th className="p-3 border-r border-slate-200">Fixed Cost Category</th>
                <th className="p-3">Typical Monthly Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">Truck payment</td>
                <td class="p-3">$1,800 – $2,800</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">Primary liability + cargo insurance</td>
                <td class="p-3">$800 – $1,500</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">Permits, licensing, IFTA/IRP fees</td>
                <td class="p-3">$150 – $300</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">ELD/tech subscriptions</td>
                <td class="p-3">$30 – $80</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">Maintenance reserve (proactive saving)</td>
                <td class="p-3">$400 – $700</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 italic">*Ranges vary significantly by equipment age, driving record, freight type, and operating region.</p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">A Detailed Variable Cost Breakdown</h2>
        
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                <th className="p-3 border-r border-slate-200">Variable Cost Category</th>
                <th className="p-3">Typical Cost Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">Fuel</td>
                <td class="p-3">Largest variable expense; depends heavily on MPG (typically 5.5–7.5 for a loaded Class 8 truck) and regional diesel prices</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">Tires</td>
                <td class="p-3">Amortized cost per mile based on tread life and replacement cost</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">Routine maintenance (oil, filters, brakes)</td>
                <td class="p-3">Scales directly with mileage driven</td>
              </tr>
              <tr>
                <td class="p-3 font-semibold border-r border-slate-200">Tolls</td>
                <td class="p-3">Route-dependent, highly variable</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">Worked Numeric Example</h2>
        <p>Consider an owner-operator with the following monthly figures, having driven <strong>9,500 miles</strong> in the month:</p>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 my-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Fixed costs:</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Truck payment: $2,200</li>
              <li>Insurance: $1,100</li>
              <li>Permits/licensing: $200</li>
              <li>ELD subscription: $50</li>
              <li>Maintenance reserve: $550</li>
              <li><strong>Total fixed costs: $4,100</strong></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Variable costs:</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
              <li>Fuel (9,500 miles ÷ 6.2 MPG × $3.85/gallon): ≈ $5,900</li>
              <li>Tires (amortized): $475</li>
              <li>Routine maintenance: $380</li>
              <li>Tolls: $145</li>
              <li><strong>Total variable costs: $6,900</strong></li>
            </ul>
          </div>

          <div className="pt-2 border-t border-slate-200 text-slate-900 font-mono font-bold text-sm">
            Total costs: $4,100 + $6,900 = $11,000<br />
            <span className="text-indigo-700">Cost Per Mile = $11,000 ÷ 9,500 miles = $1.16/mile</span>
          </div>
        </div>

        <p>
          This means any load paying less than roughly $1.16/mile in revenue is a loss for this operator before accounting for driver pay (if applicable) or profit margin. If this operator is targeting a $0.30/mile profit margin on top of covering costs, they need to be securing freight at a minimum of <strong>$1.46/mile</strong> to hit that target.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">How Fuel Efficiency Changes Your Break-Even Point</h2>
        <p>
          Fuel is typically the single largest lever an operator can influence. Using the example above, if fuel efficiency improved from 6.2 MPG to 6.8 MPG through better driving habits, aerodynamic upgrades, or reduced idling:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>New fuel cost: 9,500 ÷ 6.8 × $3.85 ≈ <strong>$5,378</strong> (a savings of ≈ $522/month)</li>
          <li>New total costs: $11,000 − $522 = <strong>$10,478</strong></li>
          <li>New cost per mile: $10,478 ÷ 9,500 = <strong>$1.10/mile</strong></li>
        </ul>
        <p>
          A 0.6 MPG improvement — achievable through driving behavior alone in many cases — lowered this operator's break-even cost per mile by 6 cents, which compounds significantly across tens of thousands of annual miles.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">Why Idle Time Is a Silent Profit Killer</h2>
        <p>
          Because fixed costs accrue regardless of miles driven, any month with lower-than-typical mileage inflates your effective cost per mile. An operator with $4,100 in monthly fixed costs who only drives 6,000 miles instead of 9,500 sees their fixed cost per mile jump from about $0.43/mile to $0.68/mile — a 58% increase — even though nothing about their actual operating costs changed. This is why minimizing deadhead miles and downtime between loads is just as important to profitability as negotiating better rates.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">How to Use This Alongside Our Calculator</h2>
        <p>
          This guide covers the concepts and cost categories behind trucking profitability. Our <a href="/cost-per-mile" className="text-indigo-600 font-bold hover:underline">Trucking Cost Per Mile Calculator</a> lets you enter your actual fixed and variable costs and mileage to calculate your real, current cost per mile — the number you should be using to evaluate every load offer.
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
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-2 border-b pb-2">Why This Decision Is More Complicated Than It Looks</h2>
        <p>
          "Should I rent or buy?" is one of the most consequential financial questions most people ever face, yet it's frequently reduced to a single, misleading comparison: monthly rent versus monthly mortgage payment. That comparison ignores almost everything that actually determines which option makes better financial sense — appreciation, opportunity cost, maintenance, transaction costs, and how long you actually plan to stay in the home.
        </p>
        <p>
          This guide walks through the full framework for thinking about rent versus buy decisions, independent of any single calculator, so you understand not just what the numbers say but why they say it.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">The Real Cost of Renting</h2>
        <p>
          Renting is often framed as "throwing money away," but that framing misses an important detail: renting also frees up capital. If buying requires a $60,000 down payment plus $10,000 in closing costs, a renter keeps that $70,000 invested rather than tied up in home equity. Over a 10-year holding period, $70,000 invested at a conservative 6% average annual return grows to roughly $125,000 — money a homeowner doesn't have access to, because it's locked into their down payment instead.
        </p>
        <p>
          Renting also means predictable costs. Rent may rise annually, but renters don't bear the risk of a failed HVAC system, a roof replacement, or a spike in property taxes. That predictability has real value, especially for people with tight monthly budgets or uncertain job situations.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">The Real Cost of Buying</h2>
        <p>
          Homeownership builds equity through two mechanisms: principal paydown (the portion of your mortgage payment that reduces your loan balance) and appreciation (increases in the home's market value over time). Over a typical 30-year mortgage, principal paydown alone transforms a portion of every monthly payment into an asset rather than an expense — something renting never does.
        </p>
        <p>
          But buying carries costs that are easy to underestimate. Closing costs typically run 2–5% of the purchase price. Ongoing maintenance is commonly estimated at 1% of home value annually. Property taxes and homeowners insurance add to the monthly burden beyond principal and interest. And when you eventually sell, agent commissions (historically around 5–6% combined) and other selling costs eat directly into your equity gain.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">The Break-Even Timeline</h2>
        <p>
          The single most important variable in any rent vs. buy analysis is <strong>how long you plan to stay in the home</strong>. Because buying carries high upfront and back-end transaction costs, it typically takes several years of principal paydown and appreciation just to "break even" against the cost of those transactions plus what you would have earned investing the difference as a renter.
        </p>
        <p>As a general pattern (though this varies significantly by local market conditions, interest rates, and home price appreciation):</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Staying 1–3 years:</strong> Renting usually wins financially, since transaction costs on a home purchase rarely get recovered in such a short window.</li>
          <li><strong>Staying 4–7 years:</strong> The decision becomes highly dependent on local rent-to-price ratios, mortgage rates, and expected appreciation.</li>
          <li><strong>Staying 8+ years:</strong> Buying often wins financially, as equity buildup and appreciation compound over a longer horizon, increasingly outweighing the upfront transaction costs.</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">The Price-to-Rent Ratio</h2>
        <p>
          One useful shortcut for gauging whether a specific market favors renting or buying is the price-to-rent ratio: the home's purchase price divided by its annual rent.
        </p>
        <div className="my-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-center font-bold text-indigo-700 text-sm sm:text-base">
          Price-to-Rent Ratio = Home Price ÷ (Monthly Rent × 12)
        </div>
        <p>As a rough (not universal) guideline:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Below 15:</strong> Buying is often favorable</li>
          <li><strong>15–20:</strong> Market is roughly balanced; other factors should decide</li>
          <li><strong>Above 20:</strong> Renting is often more favorable, since home prices are elevated relative to rental costs in that market</li>
        </ul>
        <p>This ratio varies enormously by city and neighborhood, and should be treated as a starting signal rather than a definitive answer.</p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">Worked Comparison Scenario</h2>
        <p>
          Consider a household deciding between renting a <strong>$2,200/month apartment</strong> or buying a <strong>$400,000 home</strong> with a <strong>15% down payment ($60,000)</strong> at <strong>6.5% interest</strong> over 30 years, planning to stay <strong>7 years</strong>.
        </p>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 my-4">
          <h3 className="font-bold text-slate-900 text-base">Buying Scenario (7-year hold):</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
            <li>Monthly P&I payment: ≈ $2,150</li>
            <li>Adding estimated property tax + insurance: ≈ $2,650/month total housing cost</li>
            <li>Estimated equity built after 7 years (principal paydown + 3%/year appreciation): ≈ $145,000</li>
            <li>Estimated selling costs at year 7 (6% of appreciated value): ≈ $29,700</li>
            <li><strong>Net equity position after selling costs: ≈ $115,300</strong></li>
          </ul>
        </div>

        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 my-4">
          <h3 className="font-bold text-slate-900 text-base">Renting Scenario (7-year hold):</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
            <li>Monthly rent (assume 3% annual increases): averages ≈ $2,410/month over the period</li>
            <li>The $60,000 down payment + closing costs instead invested at 6% average annual return: grows to ≈ $90,200</li>
            <li><strong>Net investment position after 7 years: ≈ $90,200</strong></li>
          </ul>
        </div>

        <p>
          In this scenario, buying comes out roughly $25,000 ahead after 7 years — but that advantage depends heavily on the assumed 3% home appreciation rate and 6% investment return; changing either assumption meaningfully shifts the outcome. This is exactly why running your own numbers with your specific local rent, price, and rate assumptions — rather than relying on generic rules of thumb — matters so much.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">Non-Financial Factors Worth Weighing</h2>
        <p>
          Not every consideration in this decision is financial. Homeownership offers stability, the freedom to renovate, and freedom from a landlord's decisions — but it also reduces flexibility to relocate quickly for a job opportunity or life change. Renting offers mobility and simplicity, but no equity building and less control over your living space. A financially "optimal" answer isn't always the right answer for your specific life circumstances, career trajectory, or family plans.
        </p>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-b pb-2">How to Use This Alongside Our Calculator</h2>
        <p>
          This guide is meant to build the conceptual framework behind the decision. Our <a href="/rent-vs-buy" className="text-indigo-600 font-bold hover:underline">Rent vs. Buy Simulator</a> lets you plug in your specific numbers — your local rent, target home price, expected down payment, mortgage rate, and planned length of stay — to generate a personalized break-even analysis rather than relying on generic market averages like the ones used in this guide.
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
