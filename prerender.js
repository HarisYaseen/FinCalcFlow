import fs from 'fs';
import path from 'path';

// Helper to ensure target directories exist
function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const DIST_DIR = path.resolve('dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Error: dist/index.html not found. Run "npm run build" first.');
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Define SEO metadata and static body HTML content for all routes
const routes = [
  {
    path: 'rent-vs-buy',
    title: 'Rent vs Buy Calculator 2026 – Compare Home Equity & Costs | FinCalc Flow',
    description: 'Free rent vs buy calculator. Model mortgage amortization, home appreciation, HOA fees, and opportunity cost side-by-side to see which builds more wealth over 5, 15, or 30 years.',
    canonical: 'https://www.fincalcflow.com/rent-vs-buy',
    schema: {
      "@context": "https://schema.org",
      "@type": "FinancialCalculator",
      "name": "Rent vs. Buy Simulator",
      "url": "https://www.fincalcflow.com/rent-vs-buy",
      "description": "Compare renting vs buying a home. Runs amortization schedules, compounding stock market opportunity costs, property taxes, and maintenance fees.",
      "category": "Mortgage & Housing Calculator"
    },
    body: `
      <div class="max-w-4xl mx-auto px-4 py-12 space-y-12 text-left">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
            Housing Economics
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Rent vs. Buy Calculator: Model Home Equity & Opportunity Cost
          </h1>
          <p class="text-slate-500 text-base max-w-xl mx-auto">
            Compare the long-term wealth impact of renting versus purchasing a home. Run year-by-year simulations factoring in down payments, appreciation, maintenance overhead, and stock returns.
          </p>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center space-y-4">
          <h2 class="text-lg font-bold text-slate-900 text-center">Interactive Calculator Engine</h2>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            Our client-side calculator compares mortgage interest, property tax, homeowner association fees, and maintenance against renting and compounding your down payment in index funds.
          </p>
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl max-w-sm mx-auto">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">JavaScript Required</span>
            <p class="text-[11px] text-slate-400">Please enable JavaScript in your browser settings to run this interactive simulation.</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          <h2 class="text-xl font-bold text-slate-900">Renting vs. Buying: A Complete Financial Analysis</h2>
          <p class="text-slate-655 text-sm leading-relaxed">
            Homeownership is a classic wealth generator, but buying a house carries high upfront transaction costs (closing fees, appraisal fees) and persistent, unrecoverable monthly costs (property taxes, homeowner insurance, and HOA fees). Renting keeps your cash liquid, letting you invest your down payment in standard market indexes.
          </p>

          <h3 class="text-base font-bold text-slate-900">Worked Numeric Example (10-Year Timeline)</h3>
          <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-3 leading-relaxed">
            <p><strong>Scenario:</strong> Purchase of a $400,000 home vs renting an identical property for $1,800/month over a 10-year period.</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>The Buyer:</strong> Puts 20% down ($80,000) and pays 3% closing fees ($12,000), making $92,000 upfront. A 30-year fixed mortgage at 6.5% interest leads to $2,022/month. Including tax (1.2% or $400), insurance ($100), and maintenance (1.5% or $500), the buyer's starting outgoing is $3,022/month.</li>
              <li><strong>The Renter:</strong> Pays $1,800/month in rent, which grows by 3% annually. Renter's insurance is $20/month.</li>
              <li><strong>The Opportunity Cost:</strong> The renter starts with the buyer's $92,000 down payment and invests it in index funds yielding 8% average return. Additionally, because the buyer's monthly outgoing ($3,022) is $1,202 more than the renter's rent ($1,820), the renter invests this monthly savings difference.</li>
              <li><strong>10-Year Assets:</strong> The home appreciates at 3.5% annually to $564,240. The remaining mortgage balance is $268,000. Subtracting 6% realtor commission upon sale ($33,854), the buyer's net home equity builds to $262,386. However, the renter's invested portfolio compounds to $382,500. Renting yields $120,114 more net worth in this scenario.</li>
            </ul>
          </div>

          <h3 class="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">Is renting ever the smarter long-term choice?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Yes. Renting is often superior when transaction costs are high, home appreciation rates are low, or stock market investment returns are strong. It also offers flexibility, avoids maintenance costs (which average 1% to 2% of the home value annually), and keeps your down payment capital liquid and compounding.
              </p>
            </div>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">How does PMI (Private Mortgage Insurance) affect the numbers?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                If your down payment is less than 20% of the home value, lenders require PMI. This fee (ranging from 0.3% to 1.5% of the loan amount annually) is an unrecoverable expense that increases your monthly mortgage outflow without building equity, tipping the scale in favor of renting.
              </p>
            </div>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">What is the "5% Rule"?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Coined by financial experts, the 5% Rule states that the annual unrecoverable cost of homeownership is roughly 5% of the home's value (1.5% property tax, 1% maintenance, and 2.5% cost of equity capital). If renting a similar home costs less than 5% of the purchase price annually, renting is mathematically favored.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: 'cost-per-mile',
    title: 'Trucking Cost Per Mile Calculator | Owner-Operator Expense Planner',
    description: 'Calculate your commercial trucking cost per mile (CPM). Model fixed monthly overhead, fuel efficiency, preventative maintenance, and driver break-even margins.',
    canonical: 'https://www.fincalcflow.com/cost-per-mile',
    schema: {
      "@context": "https://schema.org",
      "@type": "FinancialCalculator",
      "name": "Trucking Cost Per Mile Calculator",
      "url": "https://www.fincalcflow.com/cost-per-mile",
      "description": "Calculate commercial trucking cost per mile (CPM). Computes fixed overhead, variable operational fuel costs, driver wages, and maintenance reserves.",
      "category": "Business Expense Calculator"
    },
    body: `
      <div class="max-w-4xl mx-auto px-4 py-12 space-y-12 text-left">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
            Logistics & Freight
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trucking Cost Per Mile Calculator: Determine Operational Margins
          </h1>
          <p class="text-slate-500 text-base max-w-xl mx-auto">
            Calculate your trucking operational cost per mile (CPM). Balance fixed overhead, variable fuel consumption, driver salary allocations, and preventative reserves.
          </p>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center space-y-4">
          <h2 class="text-lg font-bold text-slate-900 text-center">Interactive Cost Per Mile Engine</h2>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            Adjust monthly mileage, lease payments, fuel prices, driver wages, and maintenance buffers to calculate your exact breakeven rate per mile.
          </p>
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl max-w-sm mx-auto">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">JavaScript Required</span>
            <p class="text-[11px] text-slate-400">Please enable JavaScript in your browser settings to run this interactive calculation.</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          <h2 class="text-xl font-bold text-slate-900">How to Calculate Commercial Cost Per Mile</h2>
          <p class="text-slate-655 text-sm leading-relaxed">
            In the logistics industry, knowing your Cost Per Mile (CPM) is the difference between operating a profitable carrier and filing for bankruptcy. A driver accepting freight paying $2.20 per mile may lose money if their CPM is $1.90 and they have to drive 200 unpaid "deadhead" miles to secure the load.
          </p>

          <h3 class="text-base font-bold text-slate-900">Worked Numeric Example</h3>
          <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-3 leading-relaxed">
            <p><strong>Scenario:</strong> Owner-operator driving 9,000 operational miles per month.</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>Fixed Monthly Costs:</strong> Lease Payment ($3,200) + Physical & Cargo Insurance ($850) + ELD & Permit Fees ($150) = $4,200. Divvying by 9,000 miles yields a Fixed CPM of <strong>$0.47 per mile</strong>.</li>
              <li><strong>Variable Fuel Costs:</strong> Diesel priced at $4.20 per gallon. The truck achieves 6.5 Miles Per Gallon (MPG). Fuel Cost = $4.20 ÷ 6.5 = Fuel CPM of <strong>$0.65 per mile</strong>.</li>
              <li><strong>Maintenance & Reserves:</strong> Direct per-mile allocations: tires ($0.05), mechanical maintenance reserve ($0.12), toll fees ($0.03) = Variable CPM of <strong>$0.20 per mile</strong>.</li>
              <li><strong>Driver Salary:</strong> Owner-operator targets a wage of <strong>$0.60 per mile</strong> ($5,400 monthly wage).</li>
              <li><strong>Total Cost Per Mile:</strong> Fixed ($0.47) + Fuel ($0.65) + Maintenance ($0.20) + Wage ($0.60) = <strong>$1.92 per mile</strong>. This is your true break-even freight rate.</li>
            </ul>
          </div>

          <h3 class="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">How does deadhead mileage impact my cost per mile?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Deadhead miles are miles driven with an empty trailer, generating zero revenue. They burn fuel and wear out tires just like loaded miles. To calculate your true CPM, you must divide your total monthly expenses by the total miles driven (loaded + deadhead), not just the revenue-generating loaded miles.
              </p>
            </div>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">Should I pay myself a salary in my CPM calculation?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Yes. Many owner-operators fail because they count whatever profit is left over as their wage. By treating your targeted personal salary as an expense in your CPM, you ensure that the freight rates you accept cover both operational overhead and your hard work.
              </p>
            </div>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">How often should I recalculate my CPM?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                We recommend reviewing and adjusting your trucking CPM monthly. Fuel price volatility, unexpected maintenance bills, and shifts in seasonal driving volume can rapidly alter operational margins.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: 'debt-consolidation',
    title: 'Debt Consolidation Calculator | Credit Card Payoff Tracker & Optimizer',
    description: 'Find out how much interest you can save by consolidating multiple credit card balances into a single structured low-interest personal loan.',
    canonical: 'https://www.fincalcflow.com/debt-consolidation',
    schema: {
      "@context": "https://schema.org",
      "@type": "FinancialCalculator",
      "name": "Debt Consolidation Calculator",
      "url": "https://www.fincalcflow.com/debt-consolidation",
      "description": "Evaluate debt consolidation loan options. Computes weighted average credit card APR and models interest savings compared to credit card minimum payments.",
      "category": "Debt Payoff Calculator"
    },
    body: `
      <div class="max-w-4xl mx-auto px-4 py-12 space-y-12 text-left">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
            Debt & Credit
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Debt Consolidation Calculator: Optimize Credit Card Payoffs
          </h1>
          <p class="text-slate-500 text-base max-w-xl mx-auto">
            Evaluate moving multiple credit card balances to a single, lower-interest fixed-rate personal loan. See interest savings and calculate your exact debt-free date.
          </p>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center space-y-4">
          <h2 class="text-lg font-bold text-slate-900 text-center">Interactive Payoff Optimizer</h2>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            Add your current credit card balances, APRs, and monthly payments, then compare them against a consolidated personal loan offer.
          </p>
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl max-w-sm mx-auto">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">JavaScript Required</span>
            <p class="text-[11px] text-slate-400">Please enable JavaScript in your browser settings to run this debt optimization simulation.</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          <h2 class="text-xl font-bold text-slate-900">The Power of Revolving Debt Consolidation</h2>
          <p class="text-slate-655 text-sm leading-relaxed">
            Credit card companies calculate monthly minimum payments as a tiny percentage of your outstanding balance. This makes payoffs take decades and maximizes interest charges. Consolidating into an installment loan replaces variable, high-interest balances with a structured fixed rate and a guaranteed debt-free date.
          </p>

          <h3 class="text-base font-bold text-slate-900">Worked Numeric Example</h3>
          <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-3 leading-relaxed">
            <p><strong>Scenario:</strong> Consolidating $20,000 in credit card debt across three accounts.</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>Current Accounts:</strong> Card A ($8,000 at 24% APR), Card B ($7,000 at 22% APR), Card C ($5,000 at 19% APR). The true Weighted Average APR across all three cards is <strong>22.05%</strong>.</li>
              <li><strong>The Minimum Payment Trap:</strong> Paying the required credit card minimums (typically interest + 1.5% principal) results in a starting monthly payment of about $520. It will take <strong>21 years (252 months)</strong> to pay off the debt, costing <strong>$23,200 in total interest</strong>.</li>
              <li><strong>The Consolidation Option:</strong> You qualify for a 5-year (60-month) personal consolidation loan of $20,000 at a fixed <strong>9.5% APR</strong>.</li>
              <li><strong>The Comparison:</strong> The new loan payment is a fixed <strong>$420 per month</strong> (saving you $100/month in starting cash flow). You pay off the debt in <strong>5 years instead of 21 years</strong>, and pay <strong>$5,200 in total interest</strong>. This represents a savings of <strong>$18,000 in interest</strong>.</li>
            </ul>
          </div>

          <h3 class="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">Does debt consolidation hurt my credit score?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Initially, applying for a personal loan triggers a hard credit inquiry, which may cause a minor temporary drop of 5–10 points. However, in the long term, moving credit card debt to a personal loan lowers your credit utilization ratio (which counts for 30% of your score), which can lead to a significant credit score boost.
              </p>
            </div>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">What is the difference between debt consolidation and debt settlement?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Debt consolidation is a new loan that pays off existing creditors in full, keeping your accounts in good standing. Debt settlement involves stopping payments, falling into delinquency, and negotiating to pay less than you owe. Settlement severely damages your credit history and carries tax liabilities.
              </p>
            </div>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">How is the weighted average APR calculated?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                It aggregates cards based on size, using the formula: <code class="bg-slate-100 px-1 py-0.5 rounded">∑(Card Balance × Card APR) ÷ Total Balance</code>. This ensures that larger balance credit cards weigh more heavily on your combined average interest rate.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: 'revenue-planner',
    title: 'Google AdSense Revenue Calculator | Website Traffic & CPM Planner',
    description: 'Estimate your website monetization potential. Calculate daily and monthly earnings based on search traffic, Click-Through Rate (CTR), and Cost-Per-Click (CPC) variables.',
    canonical: 'https://www.fincalcflow.com/revenue-planner',
    schema: {
      "@context": "https://schema.org",
      "@type": "FinancialCalculator",
      "name": "AdSense Traffic & Revenue Planner",
      "url": "https://www.fincalcflow.com/revenue-planner",
      "description": "Calculate projected Google AdSense ad revenue. Estimates earnings based on monthly pageviews, click-through rates (CTR), and average CPC bids.",
      "category": "Website Monetization Calculator"
    },
    body: `
      <div class="max-w-4xl mx-auto px-4 py-12 space-y-12 text-left">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
            Web Monetization
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Google AdSense Revenue Planner: Model Website Ad Income
          </h1>
          <p class="text-slate-500 text-base max-w-xl mx-auto">
            Simulate ad revenues based on website traffic volume, click-through rates (CTR), and Cost-Per-Click (CPC). Project daily, monthly, and yearly traffic requirements to hit income milestones.
          </p>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center space-y-4">
          <h2 class="text-lg font-bold text-slate-900 text-center">Interactive AdSense Revenue Simulator</h2>
          <p class="text-sm text-slate-500 max-w-md mx-auto">
            Adjust monthly traffic sliders, click ratios, and CPC bids to map monetization opportunities and set traffic acquisition targets.
          </p>
          <div class="p-6 bg-slate-50 border border-slate-100 rounded-2xl max-w-sm mx-auto">
            <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest block mb-2">JavaScript Required</span>
            <p class="text-[11px] text-slate-400">Please enable JavaScript in your browser settings to use the interactive revenue simulator.</p>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          <h2 class="text-xl font-bold text-slate-900">How to Forecast Website Ad Revenue</h2>
          <p class="text-slate-655 text-sm leading-relaxed">
            Many website creators believe that traffic volume is the only variable that matters. However, website monetization is highly dependent on your content niche. High-value CPC niches (like finance, business insurance, and enterprise software) attract heavy advertiser bidding, while general news and entertainment niches generate very low ad yields.
          </p>

          <h3 class="text-base font-bold text-slate-900">Niche Comparison Example (Targeting $100/Day or $3,000/Month)</h3>
          <div class="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 space-y-3 leading-relaxed">
            <p>To generate $3,000 a month in Google AdSense income, let's compare two different niche websites:</p>
            <ul class="list-disc pl-5 space-y-2">
              <li><strong>Niche A: Personal Finance & Mortgages</strong>
                <br>Average CPC: <strong>$2.20</strong>. Average CTR: <strong>1.5%</strong>. 
                <br>Formula: $3,000 ÷ $2.20 = 1,363 clicks needed. At 1.5% CTR, the site needs <strong>90,866 monthly pageviews</strong> (approx. 3,000 per day) to hit the goal.
              </li>
              <li><strong>Niche B: General Entertainment & Celebrity Gossip</strong>
                <br>Average CPC: <strong>$0.15</strong>. Average CTR: <strong>1.2%</strong>. 
                <br>Formula: $3,000 ÷ $0.15 = 20,000 clicks needed. At 1.2% CTR, the site needs <strong>1,666,666 monthly pageviews</strong> (approx. 55,000 per day) to hit the exact same revenue.
              </li>
            </ul>
          </div>

          <h3 class="text-base font-bold text-slate-900">Frequently Asked Questions</h3>
          <div class="space-y-4">
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">What is a realistic Click-Through Rate (CTR) for AdSense?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                For most informational blogs, CTR ranges between 1% and 2.5%. Utility web tools and calculator pages often achieve higher CTRs (3% to 6%) because user engagement is higher and ads are positioned in high-interaction areas.
              </p>
            </div>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">How does Cost Per Click (CPC) vary by country?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                CPC is heavily influenced by user purchasing power. Traffic from Tier 1 countries (US, UK, Canada, Australia) yields significantly higher CPC bids than Tier 2 or Tier 3 countries, as advertiser competition in those regions is intense.
              </p>
            </div>
            <div>
              <h4 class="font-extrabold text-slate-800 text-sm">How can I increase my website's ad RPM?</h4>
              <p class="text-slate-550 text-xs sm:text-sm leading-relaxed">
                Revenue Per Mille (RPM) can be increased by producing longer, high-quality content to keep users on-page, optimizing ad placements above the fold, and targeting search queries with transactional advertiser intent.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: 'about',
    title: 'About Us & Math Methodology | FinCalc Flow',
    description: 'Learn about the mission behind FinCalc Flow, our commitment to serverless financial privacy, and the mathematical formulas powering our calculators.',
    canonical: 'https://www.fincalcflow.com/about',
    schema: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About FinCalc Flow",
      "url": "https://www.fincalcflow.com/about",
      "description": "Learn about the mission, values, privacy commitment, and math formulas behind FinCalc Flow tools."
    },
    body: `
      <div class="max-w-4xl mx-auto px-4 py-12 space-y-12 text-left">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
            About Our Hub
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About FinCalc Flow & Calculator Math
          </h1>
          <p class="text-slate-500 text-base max-w-xl mx-auto">
            Learn about our mission, our commitment to serverless data privacy, and the mathematical formulas powering our calculators.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-4">
            <h2 class="text-lg font-bold text-slate-900">Our Mission & Story</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              FinCalc Flow was created out of frustration with existing online financial tools. Most calculators today are cluttered with heavy ads, pushy popup tracking consent forms, and slow backend servers that track your inputs. We built a completely free, professional-grade financial calculator hub that operates 100% on the client side.
            </p>
          </div>
          <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-4">
            <h2 class="text-lg font-bold text-slate-900">Who We Are</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              FinCalc Flow is built and maintained by an independent developer dedicated to financial literacy and software excellence. Our focus is to provide standard-compliant mathematical models that require zero sign-ups or user profiles.
            </p>
          </div>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          <h2 class="text-xl font-bold text-slate-900">Mathematical Formulas & Methodologies</h2>
          <div class="space-y-6">
            <div>
              <h3 class="font-bold text-slate-900 text-sm">1. Rent vs. Buy Mortgage Amortization</h3>
              <p class="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                The monthly Principal & Interest (P&I) payment is calculated using:
                <br><code class="block my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-center">M = P * [r(1+r)ⁿ] / [(1+r)ⁿ - 1]</code>
                Where <code>P</code> is the mortgage principal, <code>r</code> is monthly interest, and <code>n</code> is total months.
              </p>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm">2. Trucking Cost Per Mile (CPM)</h3>
              <p class="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                Our trucking calculator aggregates monthly operating costs and divides by mileage driven:
                <br><code class="block my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-center">Cost Per Mile = [Fixed Costs + Fuel Costs + Maintenance Costs] / Miles Driven</code>
              </p>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm">3. Debt Consolidation Loan Amortization</h3>
              <p class="text-slate-655 text-xs sm:text-sm mt-1 leading-relaxed">
                Compares revolving card minimum payoff schedules month-by-month against structured installment payments:
                <br><code class="block my-2 p-2 bg-slate-50 border border-slate-200 rounded font-mono text-center">Monthly Loan Payment = Balance * [r(1+r)ⁿ] / [(1+r)ⁿ - 1]</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    path: 'privacy',
    title: 'Privacy Policy | FinCalc Flow',
    description: 'Learn how we protect your financial privacy. FinCalc Flow is a serverless application; no financial data is ever collected or sent to servers.',
    canonical: 'https://www.fincalcflow.com/privacy',
    schema: null,
    body: `
      <div class="max-w-4xl mx-auto px-4 py-12 space-y-12 text-left">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
            Data Privacy & Policy
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p class="text-slate-500 text-sm">
            Last updated: July 20, 2026
          </p>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          <section class="space-y-2">
            <h2 class="text-lg font-bold text-slate-900">1. Client-Side Processing & Privacy</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              FinCalc Flow is built as a serverless application. All financial estimations, inputs, slider modifications, and values calculated on this site are processed <strong>exclusively in your web browser</strong> using client-side JavaScript. We do not maintain backend databases, web portal logins, or cloud APIs that collect, capture, or store your personal financial data.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-lg font-bold text-slate-900">2. Data Retention Policy</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              Because all calculation variables run entirely in local application memory, your session data is automatically cleared the moment you refresh the page or close your browser tab. We retain zero history of your calculations or inputs.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-lg font-bold text-slate-900">3. Google AdSense & Cookie Usage</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              We display advertisements using Google AdSense to fund our development operations. Google, as a third-party advertising vendor, uses tracking cookies to serve relevant ads on our website based on your visits to this site and other websites on the internet. You can choose to disable or customize personalized advertising settings by visiting Google's official Ads Settings page.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-lg font-bold text-slate-900">4. Contact Information</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              If you have any questions or inquiries regarding our privacy standards, cookies usage, or how our client-side software executes computations, please contact us at: <span class="font-mono text-indigo-600 font-bold">privacy@fincalcflow.com</span>.
            </p>
          </section>
        </div>
      </div>
    `
  },
  {
    path: 'terms',
    title: 'Terms of Use & Legal Disclaimer | FinCalc Flow',
    description: 'Terms of use for FinCalc Flow tools, covering our calculator disclaimer, liability limitations, and educational use policy.',
    canonical: 'https://www.fincalcflow.com/terms',
    schema: null,
    body: `
      <div class="max-w-4xl mx-auto px-4 py-12 space-y-12 text-left">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
            Legal & Disclaimers
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Terms of Use
          </h1>
          <p class="text-slate-500 text-sm">
            Last updated: July 20, 2026
          </p>
        </div>

        <div class="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-6">
          <section class="space-y-2">
            <h2 class="text-lg font-bold text-slate-900">1. Educational & Informational Purpose Only</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              All calculations, projections, charts, and values provided by the tools on FinCalc Flow are intended solely for educational and general informational purposes. The results generated by these tools are estimations based on standard formulaic models and user-input parameters. They do not constitute professional financial, tax, legal, investment, or corporate advice.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-lg font-bold text-slate-900">2. No Professional Advice</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              You should not make major financial or business commitments solely in reliance on the calculators hosted on this site. Before buying a home, signing a vehicle lease, consolidating personal debt, or investing in digital marketing ventures, you are highly encouraged to consult with a licensed Certified Public Accountant (CPA), certified financial planner, or professional legal advisor.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-lg font-bold text-slate-900">3. Limitation of Liability</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              In no event will FinCalc Flow, its operators, developers, or affiliates be held liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
          </section>

          <section class="space-y-2">
            <h2 class="text-lg font-bold text-slate-900">4. Contact & Inquiries</h2>
            <p class="text-slate-655 text-sm leading-relaxed">
              If you have questions about this disclaimer, our liability limits, or the terms of using our serverless mathematical simulators, please reach out to us at: <span class="font-mono text-indigo-600 font-bold">terms@fincalcflow.com</span>.
            </p>
          </section>
        </div>
      </div>
    `
  },
  {
    path: 'contact',
    title: 'Contact Us | FinCalc Flow',
    description: 'Reach out to the developers of FinCalc Flow. Send us feedback, calculator requests, or general inquiries.',
    canonical: 'https://www.fincalcflow.com/contact',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact FinCalc Flow",
      "url": "https://www.fincalcflow.com/contact",
      "description": "Get in touch with FinCalc Flow support for general inquiries, legal issues, or calculator feedback."
    },
    body: `
      <div class="max-w-4xl mx-auto px-4 py-12 space-y-12 text-left">
        <div class="text-center space-y-4">
          <span class="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
            Support & Feedback
          </span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact FinCalc Flow
          </h1>
          <p class="text-slate-500 text-base max-w-xl mx-auto">
            Have a feature suggestion, feedback, or a customized calculator request? Send us a message and we'll get back to you as soon as possible.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div class="md:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl flex flex-col justify-between space-y-6">
            <div class="space-y-6">
              <div>
                <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">General Inquiries</h3>
                <a href="mailto:contact@fincalcflow.com" class="text-indigo-600 text-sm font-bold block mt-1 hover:underline">
                  contact@fincalcflow.com
                </a>
              </div>
              <div>
                <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Legal & Privacy</h3>
                <a href="mailto:privacy@fincalcflow.com" class="text-indigo-600 text-sm font-bold block mt-1 hover:underline">
                  privacy@fincalcflow.com
                </a>
              </div>
            </div>
          </div>

          <div class="md:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
            <form onsubmit="event.preventDefault(); alert('Message sent successfully!');" class="space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-700 uppercase tracking-wider block">Your Name</label>
                  <input type="text" required placeholder="Enter your name" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold" />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold text-slate-700 uppercase tracking-wider block">Your Email</label>
                  <input type="email" required placeholder="Enter your email" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold" />
                </div>
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold text-slate-700 uppercase tracking-wider block">Message</label>
                <textarea required rows="5" placeholder="Tell us what you need..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition-all font-semibold"></textarea>
              </div>
              <button type="submit" class="w-full py-4 bg-indigo-600 hover:bg-indigo-750 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/10">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    `
  }
];

// Clean HTML template to split header and footer
const mainTagStart = '<main class="flex-1">';
const mainTagEnd = '</main>';

const startIdx = template.indexOf(mainTagStart);
const endIdx = template.indexOf(mainTagEnd);

if (startIdx === -1 || endIdx === -1) {
  console.error('Error: Could not find <main class="flex-1"> tag structure in template.');
  process.exit(1);
}

const headerPart = template.substring(0, startIdx + mainTagStart.length);
const footerPart = template.substring(endIdx);

console.log('Generating pre-rendered SEO pages...');

routes.forEach((page) => {
  let customizedHeader = headerPart;

  // 1. Replace Title
  customizedHeader = customizedHeader.replace(
    /<title>[^<]*<\/title>/gi,
    `<title>${page.title}</title>`
  );

  // 2. Replace Description
  customizedHeader = customizedHeader.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/gi,
    `<meta name="description" content="${page.description}" />`
  );

  // 3. Replace Canonical Link
  customizedHeader = customizedHeader.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/gi,
    `<link rel="canonical" href="${page.canonical}" />`
  );

  // 4. Replace og:url
  customizedHeader = customizedHeader.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/gi,
    `<meta property="og:url" content="${page.canonical}" />`
  );

  // 5. Replace og:title
  customizedHeader = customizedHeader.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/gi,
    `<meta property="og:title" content="${page.title}" />`
  );

  // 6. Replace og:description
  customizedHeader = customizedHeader.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/gi,
    `<meta property="og:description" content="${page.description}" />`
  );

  // 7. Replace dynamic-schema
  const schemaScript = page.schema
    ? `<script id="dynamic-schema" type="application/ld+json">\n${JSON.stringify(page.schema, null, 2)}\n</script>`
    : `<script id="dynamic-schema" type="application/ld+json">{}</script>`;

  customizedHeader = customizedHeader.replace(
    /<script\s+id="dynamic-schema"\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
    schemaScript
  );

  // 8. Assemble full page HTML with injected body content
  const pageHtml = `${customizedHeader}\n${page.body}\n${footerPart}`;

  // 9. Write to directory index.html
  const outputDir = path.join(DIST_DIR, page.path);
  const outputPath = path.join(outputDir, 'index.html');

  ensureDirectoryExistence(outputPath);
  fs.writeFileSync(outputPath, pageHtml, 'utf8');
  console.log(`✓ Pre-rendered page generated: ${page.path}/index.html`);
});

console.log('Pre-rendering complete! Static crawler pages generated successfully.');
