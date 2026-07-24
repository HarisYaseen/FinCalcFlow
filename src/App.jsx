import React, { useState, useEffect, lazy, Suspense } from 'react';
const RentVsBuy = lazy(() => import('./components/RentVsBuy'));
const CostPerMile = lazy(() => import('./components/CostPerMile'));
const DebtConsolidation = lazy(() => import('./components/DebtConsolidation'));
const RevenuePlanner = lazy(() => import('./components/RevenuePlanner'));
const PersonalLoan = lazy(() => import('./components/PersonalLoan'));
const HomeLoan = lazy(() => import('./components/HomeLoan'));
const CarLoan = lazy(() => import('./components/CarLoan'));
const LoanPayoff = lazy(() => import('./components/LoanPayoff'));
const DtiCalculator = lazy(() => import('./components/DtiCalculator'));
const LoanCalculators = lazy(() => import('./components/LoanCalculators'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const About = lazy(() => import('./components/About'));
const Terms = lazy(() => import('./components/Terms'));
const Contact = lazy(() => import('./components/Contact'));
const Guides = lazy(() => import('./components/Guides'));
// Lightweight SVG Icon Components to eliminate heavy lucide-react dependency from critical entry bundle
const IconTrendingUp = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconGlobe = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconMenu = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const IconX = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const IconHome = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconArrowRight = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="5" x2="19" y1="12" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconTruck = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 18V6a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2z" />
    <path d="M14 9h4l4 4v5a2 2 0 0 1-2 2h-6v-11z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconCreditCard = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const IconShieldAlert = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [currencySymbol, setCurrencySymbol] = useState('$');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcsDropdownOpen, setCalcsDropdownOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

  // Handle initial route on mount and popstate events (browser back/forward)
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, ''); // strip leading/trailing slashes
      const validPaths = [
        'rent-vs-buy', 'cost-per-mile', 'debt-consolidation', 'revenue-planner',
        'calculators/personal-loan-calculator', 'personal-loan-calculator',
        'calculators/home-loan-calculator', 'home-loan-calculator',
        'calculators/car-loan-calculator', 'car-loan-calculator',
        'calculators/loan-payoff-calculator', 'loan-payoff-calculator',
        'calculators/debt-to-income-calculator', 'debt-to-income-calculator',
        'calculators/loan-calculators', 'loan-calculators',
        'privacy', 'about', 'terms', 'contact', 'guides'
      ];
      if (validPaths.includes(path) || path.startsWith('guides/')) {
        // Normalize /personal-loan-calculator to /calculators/personal-loan-calculator if needed
        if (path === 'personal-loan-calculator') setActivePage('calculators/personal-loan-calculator');
        else if (path === 'home-loan-calculator') setActivePage('calculators/home-loan-calculator');
        else if (path === 'car-loan-calculator') setActivePage('calculators/car-loan-calculator');
        else if (path === 'loan-payoff-calculator') setActivePage('calculators/loan-payoff-calculator');
        else if (path === 'debt-to-income-calculator') setActivePage('calculators/debt-to-income-calculator');
        else if (path === 'loan-calculators') setActivePage('calculators/loan-calculators');
        else setActivePage(path);
      } else {
        setActivePage('home');
      }
    };

    handleLocationChange(); // Run on initial load
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Sync page state changes back to the browser URL path
  useEffect(() => {
    const currentPath = window.location.pathname.replace(/^\/|\/$/g, '');
    const targetPath = activePage === 'home' ? '' : activePage;
    if (currentPath !== targetPath) {
      window.history.pushState(null, '', '/' + targetPath);
    }
  }, [activePage]);

  // Smooth scroll and update dynamic SEO metadata when active page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let title = "FinCalc Pro Hub | Free Serverless Financial Calculators";
    let desc = "Calculate Rent vs. Buy equity, Trucking Cost Per Mile, and Credit Card Debt Consolidation instantly in your browser. 100% private, serverless financial tools.";
    let schemaObj = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "FinCalc Flow",
      "url": "https://www.fincalcflow.com",
      "description": desc,
      "applicationCategory": "FinancialApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5."
    };

    switch (activePage) {
      case 'home':
        title = "Free Financial Calculators & Planners | FinCalc Flow";
        desc = "Free monthly financial calculators by FinCalc Flow. Estimate rent vs buy home equity, trucking cost per mile, debt consolidation, and revenue planner targets.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "FinCalc Flow",
            "url": "https://www.fincalcflow.com",
            "description": desc,
            "applicationCategory": "FinancialApplication",
            "operatingSystem": "All"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I calculate my trucking cost per mile?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To compute your commercial cost per mile, list all fixed monthly fees (such as lease payments, truck permits, and insurance premiums) and your variable operational expenses (such as diesel fuel, driver wages, toll fees, and maintenance/tire reserves). Sum these expenses together and divide the total by your monthly driven miles."
                }
              },
              {
                "@type": "Question",
                "name": "What parameters dictate a Rent vs. Buy decision?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A Rent vs. Buy simulation models mortgage amortization, upfront down payments, closing costs, and home appreciation rates. It compares this against rent prices, renters insurance, and the opportunity cost of investing your down payment into index funds."
                }
              }
            ]
          }
        ];
        break;
      case 'rent-vs-buy':
        title = "Rent vs. Buy Calculator | House Equity & Rent Comparison Simulator";
        desc = "Compare the long-term wealth impact of renting vs. buying a home. Simulates down payments, appreciation, maintenance costs, and investment returns.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "FinancialCalculator",
            "name": "Rent vs. Buy Simulator",
            "url": "https://www.fincalcflow.com/rent-vs-buy",
            "description": desc,
            "category": "Mortgage & Housing Calculator"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is renting ever the smarter long-term choice?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Renting is often superior when home transaction costs are high, home appreciation rates are low, or stock market investment returns are strong."
                }
              },
              {
                "@type": "Question",
                "name": "What is the 5% Rule?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 5% Rule states that annual unrecoverable costs of homeownership equal roughly 5% of the home's value (1.5% tax, 1% maintenance, 2.5% capital cost). If renting costs less than 5% annually, renting is mathematically favored."
                }
              }
            ]
          }
        ];
        break;
      case 'cost-per-mile':
        title = "Trucking Cost Per Mile Calculator | Freight Expense Estimator";
        desc = "Calculate your commercial trucking cost per mile. Accounts for fixed monthly costs, variable operational expenses, fuel efficiency, and driver wages.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "FinancialCalculator",
            "name": "Trucking Cost Per Mile Calculator",
            "url": "https://www.fincalcflow.com/cost-per-mile",
            "description": desc,
            "category": "Business Expense Calculator"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does deadhead mileage impact my cost per mile?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Deadhead miles burn fuel and wear out tires without generating revenue. To calculate true CPM, divide total monthly expenses by total miles driven (loaded + deadhead)."
                }
              }
            ]
          }
        ];
        break;
      case 'debt-consolidation':
        title = "Debt Consolidation Calculator | Credit Card Payoff Optimizer";
        desc = "Find out how much interest you can save by consolidating multiple credit card balances into a single low-interest personal loan.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "FinancialCalculator",
            "name": "Debt Consolidation Calculator",
            "url": "https://www.fincalcflow.com/debt-consolidation",
            "description": desc,
            "category": "Debt Payoff Calculator"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Does debt consolidation hurt my credit score?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Initially, applying for a loan causes a minor temporary drop. However, moving credit card debt to a personal loan lowers revolving credit utilization, leading to a long-term credit score boost."
                }
              }
            ]
          }
        ];
        break;
      case 'revenue-planner':
        title = "Google AdSense Revenue Calculator | Website Traffic Planner";
        desc = "Estimate your website's daily, monthly, and annual ad earnings based on traffic volume, Click-Through Rate (CTR), and Cost-Per-Click (CPC).";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "FinancialCalculator",
            "name": "AdSense Traffic & Revenue Planner",
            "url": "https://www.fincalcflow.com/revenue-planner",
            "description": desc,
            "category": "Website Monetization Calculator"
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is a realistic Click-Through Rate (CTR) for AdSense?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For informational blogs, CTR ranges between 1% and 2.5%. Utility web tools often achieve 3% to 6% due to high user interaction."
                }
              }
            ]
          }
        ];
        break;
      case 'calculators/personal-loan-calculator':
      case 'personal-loan-calculator':
        title = "Personal Loan Calculator – Monthly Payments & Interest | FinCalc";
        desc = "Calculate personal loan monthly payments, total interest, and early payoff savings with a full interactive amortization schedule.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Personal Loan Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fincalcflow.com/" },
              { "@type": "ListItem", "position": 2, "name": "Loan Calculators", "item": "https://www.fincalcflow.com/calculators/loan-calculators" },
              { "@type": "ListItem", "position": 3, "name": "Personal Loan Calculator", "item": "https://www.fincalcflow.com/calculators/personal-loan-calculator" }
            ]
          }
        ];
        break;
      case 'calculators/home-loan-calculator':
      case 'home-loan-calculator':
        title = "Home Loan Calculator – Compare 2026 Mortgage Outflows | FinCalc";
        desc = "Model home loan monthly payments including principal, interest, property tax escrows, home insurance, and HOA fees.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Home Loan Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fincalcflow.com/" },
              { "@type": "ListItem", "position": 2, "name": "Loan Calculators", "item": "https://www.fincalcflow.com/calculators/loan-calculators" },
              { "@type": "ListItem", "position": 3, "name": "Home Loan Calculator", "item": "https://www.fincalcflow.com/calculators/home-loan-calculator" }
            ]
          }
        ];
        break;
      case 'calculators/car-loan-calculator':
      case 'car-loan-calculator':
        title = "Car Loan Calculator – Auto Financing & Sales Tax | FinCalc";
        desc = "Calculate monthly auto loan payments, trade-in credits, and sales tax for new or used vehicles with interactive amortization schedules.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Car Loan Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fincalcflow.com/" },
              { "@type": "ListItem", "position": 2, "name": "Loan Calculators", "item": "https://www.fincalcflow.com/calculators/loan-calculators" },
              { "@type": "ListItem", "position": 3, "name": "Car Loan Calculator", "item": "https://www.fincalcflow.com/calculators/car-loan-calculator" }
            ]
          }
        ];
        break;
      case 'calculators/loan-payoff-calculator':
      case 'loan-payoff-calculator':
        title = "Loan Payoff Calculator – Calculate Early Payoff Savings | FinCalc";
        desc = "See how extra monthly payments or lump sums shrink loan duration and save thousands in total interest.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Loan Payoff Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fincalcflow.com/" },
              { "@type": "ListItem", "position": 2, "name": "Loan Calculators", "item": "https://www.fincalcflow.com/calculators/loan-calculators" },
              { "@type": "ListItem", "position": 3, "name": "Loan Payoff Calculator", "item": "https://www.fincalcflow.com/calculators/loan-payoff-calculator" }
            ]
          }
        ];
        break;
      case 'calculators/debt-to-income-calculator':
      case 'debt-to-income-calculator':
        title = "Debt-to-Income (DTI) Calculator – Underwriting Risk | FinCalc";
        desc = "Calculate front-end and back-end DTI ratios to evaluate mortgage pre-approval odds and lender borrowing limits.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Debt-to-Income (DTI) Calculator",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "All"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fincalcflow.com/" },
              { "@type": "ListItem", "position": 2, "name": "Loan Calculators", "item": "https://www.fincalcflow.com/calculators/loan-calculators" },
              { "@type": "ListItem", "position": 3, "name": "Debt-to-Income Calculator", "item": "https://www.fincalcflow.com/calculators/debt-to-income-calculator" }
            ]
          }
        ];
        break;
      case 'calculators/loan-calculators':
      case 'loan-calculators':
        title = "Loan Calculators Hub – Free Mortgage, Auto, Personal & DTI Tools";
        desc = "Explore our complete topic cluster of free loan calculators. Model personal loans, home mortgages, car loans, DTI ratios, and payoff acceleration.";
        schemaObj = [
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Loan Calculators Hub",
            "description": desc
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.fincalcflow.com/" },
              { "@type": "ListItem", "position": 2, "name": "Loan Calculators Hub", "item": "https://www.fincalcflow.com/calculators/loan-calculators" }
            ]
          }
        ];
        break;
      case 'privacy':
        title = "Privacy Policy | FinCalc Flow";
        desc = "Learn how we protect your financial privacy. FinCalc Flow is a serverless application; no financial data is ever collected or sent to servers.";
        schemaObj = null;
        break;
      case 'terms':
        title = "Terms of Use & Legal Disclaimer | FinCalc Flow";
        desc = "Terms of use for FinCalc Flow tools, covering our calculator disclaimer, liability limitations, and educational use policy.";
        schemaObj = null;
        break;
      case 'about':
        title = "About Us & Math Methodology | FinCalc Flow";
        desc = "Learn about the mission behind FinCalc Flow, our approach to accuracy, and the mathematical formulas powering our calculators.";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "FinCalc Flow",
          "url": "https://www.fincalcflow.com/about",
          "description": desc,
          "applicationCategory": "FinancialApplication",
          "operatingSystem": "All"
        };
        break;
      case 'contact':
        title = "Contact Us | FinCalc Flow";
        desc = "Reach out to the developers of FinCalc Flow. Send us feedback, calculator requests, or general inquiries.";
        schemaObj = {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact FinCalc Flow",
          "url": "https://www.fincalcflow.com/contact",
          "description": desc
        };
        break;
      default:
        break;
    }

    document.title = title;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }

    // Dynamic Canonical URL
    const canonicalPath = activePage === 'home' ? '' : activePage;
    const canonicalUrl = `https://www.fincalcflow.com/${canonicalPath}`;
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // Dynamic Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', desc);
    }
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', canonicalUrl);
    }

    // Dynamic Schema Injection
    const existingSchema = document.getElementById('dynamic-schema');
    if (existingSchema) {
      if (schemaObj) {
        existingSchema.textContent = JSON.stringify(schemaObj, null, 2);
      } else {
        existingSchema.textContent = "";
      }
    }
  }, [activePage]);

  const currencyOptions = [
    { symbol: '$', label: 'USD / CAD ($)' },
    { symbol: '£', label: 'GBP (£)' },
    { symbol: '€', label: 'EUR (€)' },
    { symbol: '₨', label: 'INR / PKR (₨)' },
    { symbol: 'A$', label: 'AUD (A$)' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Brand Logo */}
            <div 
              onClick={() => setActivePage('home')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
                <IconTrendingUp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  FinCalc <span className="text-emerald-600">Flow</span>
                </span>
                <span className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest -mt-1">100% Free Tools</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-2 lg:gap-4 text-xs lg:text-sm font-bold">
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
                className={`whitespace-nowrap transition-all py-2 px-1 ${
                  activePage === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Home
              </a>

              {/* Loan Calculators Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setCalcsDropdownOpen(true)}
                onMouseLeave={() => setCalcsDropdownOpen(false)}
              >
                <a
                  href="/calculators/loan-calculators"
                  onClick={(e) => { e.preventDefault(); setActivePage('calculators/loan-calculators'); setCalcsDropdownOpen(false); }}
                  className={`whitespace-nowrap transition-all py-1.5 px-2.5 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center gap-1.5 ${
                    activePage.includes('loan') || activePage.includes('debt-to-income') ? 'text-indigo-700 font-extrabold shadow-sm' : 'text-indigo-600 hover:text-indigo-800'
                  }`}
                >
                  <span>Loan Calculators</span>
                  <span className="text-[10px]">▼</span>
                </a>

                {calcsDropdownOpen && (
                  <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <a
                      href="/calculators/loan-calculators"
                      onClick={(e) => { e.preventDefault(); setActivePage('calculators/loan-calculators'); setCalcsDropdownOpen(false); }}
                      className="block px-4 py-2.5 text-xs font-extrabold text-indigo-600 hover:bg-indigo-50/80 border-b border-slate-100"
                    >
                      🗂️ Loan Calculators Hub
                    </a>
                    <a
                      href="/calculators/personal-loan-calculator"
                      onClick={(e) => { e.preventDefault(); setActivePage('calculators/personal-loan-calculator'); setCalcsDropdownOpen(false); }}
                      className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-600"
                    >
                      💳 Personal Loan Calculator
                    </a>
                    <a
                      href="/calculators/home-loan-calculator"
                      onClick={(e) => { e.preventDefault(); setActivePage('calculators/home-loan-calculator'); setCalcsDropdownOpen(false); }}
                      className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-600"
                    >
                      🏡 Home Loan Calculator
                    </a>
                    <a
                      href="/calculators/car-loan-calculator"
                      onClick={(e) => { e.preventDefault(); setActivePage('calculators/car-loan-calculator'); setCalcsDropdownOpen(false); }}
                      className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-600"
                    >
                      🚗 Car Loan Calculator
                    </a>
                    <a
                      href="/calculators/loan-payoff-calculator"
                      onClick={(e) => { e.preventDefault(); setActivePage('calculators/loan-payoff-calculator'); setCalcsDropdownOpen(false); }}
                      className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-600"
                    >
                      ⚡ Loan Payoff Calculator
                    </a>
                    <a
                      href="/calculators/debt-to-income-calculator"
                      onClick={(e) => { e.preventDefault(); setActivePage('calculators/debt-to-income-calculator'); setCalcsDropdownOpen(false); }}
                      className="block px-4 py-2 text-xs font-bold text-slate-700 hover:bg-indigo-50/50 hover:text-indigo-600"
                    >
                      📊 Debt-to-Income (DTI) Calculator
                    </a>
                  </div>
                )}
              </div>

              <a
                href="/rent-vs-buy"
                onClick={(e) => { e.preventDefault(); setActivePage('rent-vs-buy'); }}
                className={`whitespace-nowrap transition-all py-2 px-1 ${
                  activePage === 'rent-vs-buy' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rent vs. Buy
              </a>

              <a
                href="/cost-per-mile"
                onClick={(e) => { e.preventDefault(); setActivePage('cost-per-mile'); }}
                className={`whitespace-nowrap transition-all py-2 px-1 ${
                  activePage === 'cost-per-mile' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cost Per Mile
              </a>

              <a
                href="/debt-consolidation"
                onClick={(e) => { e.preventDefault(); setActivePage('debt-consolidation'); }}
                className={`whitespace-nowrap transition-all py-2 px-1 ${
                  activePage === 'debt-consolidation' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Debt Consolidation
              </a>

              <a
                href="/revenue-planner"
                onClick={(e) => { e.preventDefault(); setActivePage('revenue-planner'); }}
                className={`whitespace-nowrap transition-all py-2 px-1 ${
                  activePage === 'revenue-planner' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Revenue Planner
              </a>

              <a
                href="/guides"
                onClick={(e) => { e.preventDefault(); setActivePage('guides'); }}
                className={`whitespace-nowrap transition-all py-2 px-1 ${
                  activePage === 'guides' || activePage.startsWith('guides/') ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Guides
              </a>

              <a
                href="/about"
                onClick={(e) => { e.preventDefault(); setActivePage('about'); }}
                className={`whitespace-nowrap transition-all py-2 px-1 ${
                  activePage === 'about' ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                About
              </a>
            </nav>

            {/* Currency Selector */}
            <div className="hidden xl:flex items-center gap-4">
              <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-xl">
                <IconGlobe className="w-4 h-4 text-slate-500" />
                <select
                  value={currencySymbol}
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                >
                  {currencyOptions.map((opt) => (
                    <option key={opt.symbol} value={opt.symbol}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile / Tablet Menu Button */}
            <div className="flex xl:hidden items-center gap-2">
              <select
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 px-2 py-1.5 rounded-lg focus:outline-none"
              >
                {currencyOptions.map((opt) => (
                  <option key={opt.symbol} value={opt.symbol}>
                    {opt.symbol}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-50 focus:outline-none"
              >
                {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-inner max-h-[80vh] overflow-y-auto">
            <a
              href="/"
              onClick={(e) => { e.preventDefault(); setActivePage('home'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Dashboard
            </a>
            
            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="px-4 text-[10px] font-black text-indigo-600 uppercase tracking-wider block mb-1">
                Loan Calculators
              </span>
              <a
                href="/calculators/loan-calculators"
                onClick={(e) => { e.preventDefault(); setActivePage('calculators/loan-calculators'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50"
              >
                🗂️ All Loan Calculators Hub
              </a>
              <a
                href="/calculators/personal-loan-calculator"
                onClick={(e) => { e.preventDefault(); setActivePage('calculators/personal-loan-calculator'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                💳 Personal Loan Calculator
              </a>
              <a
                href="/calculators/home-loan-calculator"
                onClick={(e) => { e.preventDefault(); setActivePage('calculators/home-loan-calculator'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                🏡 Home Loan Calculator
              </a>
              <a
                href="/calculators/car-loan-calculator"
                onClick={(e) => { e.preventDefault(); setActivePage('calculators/car-loan-calculator'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                🚗 Car Loan Calculator
              </a>
              <a
                href="/calculators/loan-payoff-calculator"
                onClick={(e) => { e.preventDefault(); setActivePage('calculators/loan-payoff-calculator'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                ⚡ Loan Payoff Calculator
              </a>
              <a
                href="/calculators/debt-to-income-calculator"
                onClick={(e) => { e.preventDefault(); setActivePage('calculators/debt-to-income-calculator'); setMobileMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                📊 Debt-to-Income (DTI) Calculator
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <a
                href="/rent-vs-buy"
                onClick={(e) => { e.preventDefault(); setActivePage('rent-vs-buy'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                  activePage === 'rent-vs-buy' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Rent vs. Buy Simulator
              </a>
              <a
                href="/cost-per-mile"
                onClick={(e) => { e.preventDefault(); setActivePage('cost-per-mile'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                  activePage === 'cost-per-mile' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Trucking Cost Per Mile
              </a>
              <a
                href="/debt-consolidation"
                onClick={(e) => { e.preventDefault(); setActivePage('debt-consolidation'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                  activePage === 'debt-consolidation' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Debt Consolidation Optimizer
              </a>
              <a
                href="/revenue-planner"
                onClick={(e) => { e.preventDefault(); setActivePage('revenue-planner'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                  activePage === 'revenue-planner' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                AdSense Revenue Planner
              </a>
              <a
                href="/about"
                onClick={(e) => { e.preventDefault(); setActivePage('about'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                  activePage === 'about' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                About Us & Math
              </a>
            </div>
            <a
              href="/terms"
              onClick={(e) => { e.preventDefault(); setActivePage('terms'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'terms' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Terms of Use
            </a>
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); setActivePage('contact'); setMobileMenuOpen(false); }}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold ${
                activePage === 'contact' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </a>
          </div>
        )}
      </header>


      {/* 3. Main Content Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <div className="w-full flex flex-col">
            
            {/* 1. Fully Mobile Responsive Hero Banner Section */}
            <div 
              className="w-full relative overflow-hidden select-none bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white py-12 px-4 sm:px-8 lg:px-12 min-h-[260px] sm:min-h-[300px] flex items-center shadow-md"
            >
              {/* Background Decorative Pattern & Gradient */}
              <div className="absolute right-0 top-0 w-full md:w-1/2 h-full opacity-20 md:opacity-30 pointer-events-none">
                <img
                  src="/hero-banner.jpg"
                  alt="FinCalc Flow Tools"
                  className="w-full h-full object-cover object-right"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>

              <div className="max-w-4xl space-y-4 relative z-10 text-left">
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-black tracking-wider uppercase inline-block border border-emerald-400/30">
                  100% Free & Private Serverless Tools
                </span>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                  Powerful Financial Calculators
                </h1>
                <p className="text-blue-100 text-sm sm:text-base max-w-2xl leading-relaxed">
                  Make informed visual decisions. Model home equity, auto financing, trucking CPM, debt consolidation, and revenue milestones.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const target = document.getElementById('our-tools-heading');
                      if (target) target.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-green-900/30 hover:shadow-green-900/40 transition-all cursor-pointer min-h-[44px]"
                    aria-label="Explore All Calculators"
                  >
                    <span>Explore Our Calculators</span>
                    <span className="text-base">↓</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Constrained Main Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
              
              {/* Section Header */}
              <div id="our-tools-heading" className="text-center space-y-2">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Tools</h2>
                <p className="text-slate-500 text-sm">Simple calculators to guide your financial choices.</p>
              </div>

            {/* Tool Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Card 1: Rent vs Buy */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col p-8 space-y-5 text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <IconHome className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest block">Housing Finance</span>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">Rent vs. Buy Simulator</h3>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  Renting isn't throwing money away, and buying isn't always a guaranteed investment. This simulator compares the real costs of renting vs. buying by modeling mortgage payments, home appreciation, property tax, maintenance, and the opportunity cost of investing your down payment in index funds.
                </p>
                <div className="pt-2 border-t border-slate-50">
                  <a
                    href="/rent-vs-buy"
                    onClick={(e) => { e.preventDefault(); setActivePage('rent-vs-buy'); }}
                    className="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Launch Simulator
                    <IconArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Card 2: Cost Per Mile */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col p-8 space-y-5 text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <IconTruck className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block">Business Logistics</span>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">Cost Per Mile Calculator</h3>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  In trucking, guessing your operating costs is a direct route to running at a loss. This calculator helps you break down every fixed monthly overhead payment and variable operational expense to find your exact cost per mile (CPM) threshold, ensuring you always price your freight routes for profitability.
                </p>
                <div className="pt-2 border-t border-slate-50">
                  <a
                    href="/cost-per-mile"
                    onClick={(e) => { e.preventDefault(); setActivePage('cost-per-mile'); }}
                    className="text-blue-600 hover:text-blue-700 font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Calculate Margin
                    <IconArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Card 3: Debt Consolidation */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col p-8 space-y-5 text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <IconCreditCard className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block">Debt & Credit</span>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">Debt Consolidation</h3>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  High-interest credit card debt can feel like quicksand. See exactly how much interest you can save and how many months you can shave off by moving multiple card balances to a single, lower-interest fixed-rate personal loan.
                </p>
                <div className="pt-2 border-t border-slate-50">
                  <a
                    href="/debt-consolidation"
                    onClick={(e) => { e.preventDefault(); setActivePage('debt-consolidation'); }}
                    className="text-emerald-600 hover:text-emerald-700 font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Compare Payoffs
                    <IconArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Card 4: AdSense Revenue Planner */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col p-8 space-y-5 text-left group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <IconTrendingUp className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">Web Monetization</span>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">AdSense Revenue Planner</h3>
                  </div>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  Stop guessing how much your website's traffic is worth. This planner lets you simulate different search traffic volumes, ad click-through rates (CTR), and cost-per-click (CPC) bids to forecast daily, monthly, and yearly income milestones, letting you optimize your niche selection strategy.
                </p>
                <div className="pt-2 border-t border-slate-50">
                  <a
                    href="/revenue-planner"
                    onClick={(e) => { e.preventDefault(); setActivePage('revenue-planner'); }}
                    className="text-amber-600 hover:text-amber-700 font-bold text-sm flex items-center gap-1 group/btn"
                  >
                    Plan Monetization
                    <IconArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>

            {/* 3. Deep-Dive Details Section (Below the grid) */}
            <div className="border-t border-slate-100 pt-16 space-y-12">
              <div className="text-center space-y-3 max-w-2xl mx-auto">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
                  Calculator Reference & Specifications
                </span>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">How Our Calculators Work & Why They Matter</h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Understanding the financial logic, input variables, and formulas behind each tool helps you make better-informed decisions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Detail Block 1: Rent vs Buy */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-md hover:shadow-lg transition-all text-left space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    Rent vs. Buy Simulator Details
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      <strong>Why It Matters:</strong> Homeownership is often considered a guaranteed wealth generator, but buying carries massive upfront costs (down payments, closing fees) and ongoing unrecoverable expenses (property taxes, homeowner insurance, HOA fees, and maintenance). Renting keeps your cash liquid, allowing you to invest it in high-yield assets like index funds. This tool models the opportunity cost of both paths.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs font-semibold">
                      <p className="text-slate-700 font-bold uppercase tracking-wider text-[10px]">Core Inputs & Calculations:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-500">
                        <li><strong className="text-slate-600">Down Payment Opportunity Cost:</strong> The renter starts with a portfolio equal to the buyer's down payment and compounds it at your chosen stock market return rate.</li>
                        <li><strong className="text-slate-600">Appreciation & Maintenance:</strong> Compounds home value at the home appreciation rate while subtracting annual maintenance overhead (typically 1% to 2% of home value).</li>
                        <li><strong className="text-slate-600">Selling Transaction Costs:</strong> Subtracts 6% realtor commission from final home value, giving the true net asset wealth for both paths.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Detail Block 2: Cost Per Mile */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-md hover:shadow-lg transition-all text-left space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Trucking Cost Per Mile Details
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      <strong>Why It Matters:</strong> Trucking is a low-margin business where expenses change daily. Owner-operators fail when they don't know their baseline cost per mile (CPM). If a driver accepts a load paying $2.20 per mile but has an operating CPM of $1.90, they might think they are profiting. However, if they have to drive 200 unpaid "deadhead" miles to get that load, their true profit margin evaporates.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs font-semibold">
                      <p className="text-slate-700 font-bold uppercase tracking-wider text-[10px]">Core Inputs & Calculations:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-500">
                        <li><strong className="text-slate-600">Fixed Cost Overhead:</strong> Flat monthly costs (truck payment, insurance, annual license/IFTA permits) divided by total miles driven.</li>
                        <li><strong className="text-slate-600">Variable Fuel Cost:</strong> Calculated as <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700">Fuel Price ÷ MPG</code>. This represents the immediate cash consumption of moving your truck.</li>
                        <li><strong className="text-slate-600">Maintenance & Tire Reserve:</strong> A per-mile reserve rate (e.g. $0.15/mile) saved for mechanical work, tire replacements, and DOT compliance repairs.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Detail Block 3: Debt Consolidation */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-md hover:shadow-lg transition-all text-left space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Credit Card Debt Consolidation Details
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      <strong>Why It Matters:</strong> Credit card issuers profit by setting minimum monthly payments as a small percentage of your balance. As your balance drops, your payment drops, extending the payoff timeline and maximizing interest charges. By moving revolving debt to a structured, fixed-term personal loan, you secure a lower fixed interest rate and guarantee a fixed date where you will be 100% debt-free.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs font-semibold">
                      <p className="text-slate-700 font-bold uppercase tracking-wider text-[10px]">Core Inputs & Calculations:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-500">
                        <li><strong className="text-slate-600">Weighted Average APR:</strong> Computes the true collective interest rate across all cards: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700">∑(Balance × APR) ÷ Total Balance</code>.</li>
                        <li><strong className="text-slate-600">Minimum Payoff Simulation:</strong> Runs a month-by-month loop modeling credit card minimums (interest + 1.5% principal) to map your current payoff cost.</li>
                        <li><strong className="text-slate-600">Consolidation Loan Amortization:</strong> Calculates monthly loan payments using standard amortization to show exactly how much interest is saved.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Detail Block 4: AdSense Revenue Planner */}
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-md hover:shadow-lg transition-all text-left space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-50 pb-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Google AdSense Revenue Planner Details
                  </h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      <strong>Why It Matters:</strong> Digital monetization is highly dependent on niche selection. High-volume niches (general entertainment/news) have cheap advertiser competition, resulting in low Cost Per Click (CPC). Target utility niches (like B2B, SaaS tools, and finance calculators) attract intense bidding, giving high CPC rates. This planner lets you project traffic requirements to hit your revenue goals.
                    </p>
                    <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-xs font-semibold">
                      <p className="text-slate-700 font-bold uppercase tracking-wider text-[10px]">Core Inputs & Calculations:</p>
                      <ul className="list-disc list-inside space-y-1 text-slate-500">
                        <li><strong className="text-slate-600">Ad Click Volume:</strong> Calculated by applying the Click-Through Rate (CTR) to pageviews: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-700">Pageviews × (CTR ÷ 100)</code>.</li>
                        <li><strong className="text-slate-600">Earnings Forecast:</strong> Multiplies total clicks by the average advertiser CPC to calculate daily, monthly, and yearly payouts.</li>
                        <li><strong className="text-slate-600">Milestone Traffic Goal:</strong> Calculates the exact monthly pageviews required to achieve a target threshold of $100 per day ($3,000/month).</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Premium FAQ and Guide Section (SEO Content Booster) */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-8 sm:p-12 space-y-10 text-left">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Financial Guides & Frequently Asked Questions</h3>
                <p className="text-slate-500 text-sm">Deep-dive insights to help you optimize trucking margins, mortgage alternatives, and debt elimination.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-base">How do I calculate my trucking cost per mile?</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    To compute your commercial cost per mile, list all fixed monthly fees (such as lease payments, truck permits, and insurance premiums) and your variable operational expenses (such as diesel fuel, driver wages, toll fees, and maintenance/tire reserves). Sum these expenses together and divide the total by your monthly driven miles. Our trucking calculator handles this instantly to help owner-operators maintain a healthy profit margin.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-base">What parameters dictate a Rent vs. Buy decision?</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    A Rent vs. Buy simulation models mortgage amortization, upfront down payments, closing costs, and home appreciation rates. It also incorporates hidden homeownership costs such as property tax, homeowners association (HOA) fees, insurance, and annual maintenance overhead. It compares this against rent prices, renters insurance, and the opportunity cost of investing your home down payment into index funds.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-base">How does credit card debt consolidation work?</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Debt consolidation merges multiple high-interest credit card balances into a single personal loan with a lower interest rate (APR). This lowers your monthly interest charges, meaning a larger portion of your monthly payment goes toward paying down the principal balance. Use our debt consolidation tool to calculate exact savings, monthly payment reductions, and your accelerated debt-free milestone.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-base">How can I forecast Google AdSense earnings?</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    AdSense income is modeled using three core variables: daily or monthly pageviews, click-through rate (CTR), and average cost-per-click (CPC). The formula is: pageviews × (CTR / 100) × CPC. For example, a blog with 50,000 monthly pageviews, a 1.5% CTR (750 clicks), and an average CPC of $0.60 yields $450 in monthly revenue. Run simulations with our planner to set traffic and monetization goals.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-base">What is the opportunity cost of buying a home?</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    When you buy a home, the money used for the down payment and closing costs is no longer available to invest elsewhere. Over 15 or 30 years, if that capital had been placed in standard stock market index funds (which historically yield an annual return of 7% to 10% after adjusting for inflation), it would compound significantly. This foregone growth is known as the opportunity cost. Our Rent vs. Buy calculator models this exact trade-off: comparing home equity growth against the potential future value of a renter's invested down payment and monthly savings difference.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-base">Why should trucking fleet operators monitor cost per mile regularly?</h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    Trucking is a low-margin, high-volume industry where operational costs fluctuate constantly. Changes in diesel prices, unexpected tire wear, insurance premium updates, and route tolls directly impact profitability. By calculating cost per mile (CPM) monthly or weekly, owner-operators and fleet managers can identify expense leaks, evaluate truck lease options, and adjust their freight rate per mile (RPM) bids to ensure they are driving profitably rather than at a loss.
                  </p>
                </div>
              </div>

              {/* In-depth Editorial Articles Section */}
              <div className="border-t border-slate-100 pt-10 space-y-8">
                <h3 className="text-xl font-bold text-slate-900">Advanced Financial Simulation & Planning Guide</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-slate-500 leading-relaxed">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-extrabold text-slate-800 mb-1">1. Trucking CPM & Operating Ratios</h5>
                      <p>
                        Maximizing profitability in logistics requires separating fixed expenses from variable operating costs. Fixed costs include truck lease payments, cargo insurance, ELD compliance fees, and annual vehicle registrations. Variable costs include fuel, repair reserves, driver wages, and preventative maintenance. Successful owner-operators aim for an operating ratio below 85%, meaning expenses take up less than 85% of total gross revenue.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 mb-1">2. Asset Wealth Generation (Rent vs. Buy Dynamics)</h5>
                      <p>
                        Deciding between renting and purchasing a home depends heavily on your planned duration of stay. Buying a home incurs high transition costs (closing fees, realtor commissions) that usually require 5 to 7 years of ownership to offset through equity appreciation. Amortization schedules show that early mortgage payments go mostly toward interest, rather than principal. Renting provides flexibility and eliminates home maintenance liabilities, which historically average 1% to 2% of the home's value annually.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h5 className="font-extrabold text-slate-800 mb-1">3. Debt Payoff Acceleration (Snowball vs. Avalanche Method)</h5>
                      <p>
                        When consolidating debt, choosing a payoff method dictates how quickly you achieve financial freedom. The Debt Avalanche method focuses on paying off the highest interest rate balance first, saving the most money in overall interest. The Debt Snowball method focuses on clearing the smallest balance first to build emotional momentum. Personal loan consolidation combines these concepts by replacing multiple accounts with one low-interest rate payment, simplifying cash flow.
                      </p>
                    </div>
                    <div>
                      <h5 className="font-extrabold text-slate-800 mb-1">4. Digital Ad Revenue Maximization (AdSense Strategies)</h5>
                      <p>
                        Online creators build sustainable income by analyzing pageview traffic, click rates (CTR), and cost-per-click (CPC). Niche topics (like finance or technology) attract higher CPCs due to advertiser demand, while general entertainment has lower rates. Improving user engagement, site layout, and core web vitals raises click rates and ad impressions, directly scaling monthly income milestones.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info grid / why client side */}
            <div id="how-it-works-heading" className="bg-[#1e3a8a] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 w-80 h-80 bg-blue-900 rounded-full filter blur-3xl opacity-30 -mr-20 -mb-20"></div>
              <div className="max-w-2xl space-y-4 relative z-10 text-left">
                <h3 className="text-2xl font-black">Private, Lightweight, and Serverless</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  We don't collect, store, or transmit your financial data. All calculations run instantly in your browser's JavaScript engine. This design allows you to bookmark the tool and use it completely offline.
                </p>
                <div className="pt-2 flex gap-4 text-xs font-bold text-blue-200">
                  <span className="flex items-center gap-1.5"><IconShieldAlert className="w-4 h-4 text-blue-300" /> 100% Data Privacy</span>
                  <span className="flex items-center gap-1.5"><IconGlobe className="w-4 h-4 text-blue-300" /> 0% Cloud Dependencies</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

        <Suspense fallback={
          <div className="min-h-[60vh] w-full flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-slate-400 text-sm font-bold animate-pulse">Loading Calculator Engine...</p>
          </div>
        }>
          {activePage === 'rent-vs-buy' && <RentVsBuy currencySymbol={currencySymbol} />}
          {activePage === 'cost-per-mile' && <CostPerMile currencySymbol={currencySymbol} />}
          {activePage === 'debt-consolidation' && <DebtConsolidation currencySymbol={currencySymbol} />}
          {activePage === 'revenue-planner' && <RevenuePlanner />}
          {(activePage === 'calculators/personal-loan-calculator' || activePage === 'personal-loan-calculator') && <PersonalLoan currencySymbol={currencySymbol} />}
          {(activePage === 'calculators/home-loan-calculator' || activePage === 'home-loan-calculator') && <HomeLoan currencySymbol={currencySymbol} />}
          {(activePage === 'calculators/car-loan-calculator' || activePage === 'car-loan-calculator') && <CarLoan currencySymbol={currencySymbol} />}
          {(activePage === 'calculators/loan-payoff-calculator' || activePage === 'loan-payoff-calculator') && <LoanPayoff currencySymbol={currencySymbol} />}
          {(activePage === 'calculators/debt-to-income-calculator' || activePage === 'debt-to-income-calculator') && <DtiCalculator currencySymbol={currencySymbol} />}
          {(activePage === 'calculators/loan-calculators' || activePage === 'loan-calculators') && <LoanCalculators />}
          {activePage === 'privacy' && <PrivacyPolicy />}
          {activePage === 'about' && <About />}
          {activePage === 'terms' && <Terms />}
          {activePage === 'contact' && <Contact />}
          {activePage === 'guides' && <Guides />}
          {activePage.startsWith('guides/') && <Guides currentSlug={activePage.replace('guides/', '')} />}
        </Suspense>
      </main>


      {/* 5. Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            
            {/* Column 1: Brand & Core Promise */}
            <div className="md:col-span-6 space-y-4">
              <div 
                onClick={() => setActivePage('home')}
                className="flex items-center gap-2.5 cursor-pointer select-none group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                  <IconTrendingUp className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-base font-black tracking-tight text-white">
                  FinCalc <span className="text-emerald-400">Flow</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed text-left">
                Advanced serverless financial calculators engineered for clarity, speed, and privacy. 100% of calculations run securely in your web browser.
              </p>
              <div className="flex gap-4 text-xs font-bold text-emerald-400">
                <span className="flex items-center gap-1">✦ Offline Ready</span>
                <span className="flex items-center gap-1">✦ Zero Tracking</span>
                <span className="flex items-center gap-1">✦ Instant Calculations</span>
              </div>

              {/* Social Profile Links for SEO Trust signals */}
              <div className="flex items-center gap-3 pt-2">
                <a href="https://www.facebook.com/fincalcflow" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center" aria-label="Follow us on Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="https://twitter.com/fincalcflow" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center" aria-label="Follow us on Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/fincalcflow" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center" aria-label="Follow us on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://github.com/HarisYaseen/FinCalcFlow" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center" aria-label="Follow us on GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </a>
              </div>
            </div>

            {/* Column 2: Quick Tool Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Financial Tools</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="/"
                    onClick={(e) => { e.preventDefault(); setActivePage('home'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Main Dashboard
                  </a>
                </li>
                <li>
                  <a 
                    href="/calculators/loan-calculators"
                    onClick={(e) => { e.preventDefault(); setActivePage('calculators/loan-calculators'); }}
                    className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors text-left block"
                  >
                    Loan Calculators Hub
                  </a>
                </li>
                <li>
                  <a 
                    href="/rent-vs-buy"
                    onClick={(e) => { e.preventDefault(); setActivePage('rent-vs-buy'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Rent vs. Buy Simulator
                  </a>
                </li>
                <li>
                  <a 
                    href="/cost-per-mile"
                    onClick={(e) => { e.preventDefault(); setActivePage('cost-per-mile'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Trucking Cost Per Mile
                  </a>
                </li>
                <li>
                  <a 
                    href="/debt-consolidation"
                    onClick={(e) => { e.preventDefault(); setActivePage('debt-consolidation'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Debt Consolidation
                  </a>
                </li>
                <li>
                  <a 
                    href="/revenue-planner"
                    onClick={(e) => { e.preventDefault(); setActivePage('revenue-planner'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    AdSense Revenue Planner
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Policy & Info Resources */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="/privacy"
                    onClick={(e) => { e.preventDefault(); setActivePage('privacy'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="/about#methodology"
                    onClick={(e) => { e.preventDefault(); setActivePage('about'); setTimeout(() => { const el = document.getElementById('methodology'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 50); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Math Methodology
                  </a>
                </li>
                <li>
                  <a 
                    href="/about"
                    onClick={(e) => { e.preventDefault(); setActivePage('about'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a 
                    href="/terms"
                    onClick={(e) => { e.preventDefault(); setActivePage('terms'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a 
                    href="/contact"
                    onClick={(e) => { e.preventDefault(); setActivePage('contact'); }}
                    className="hover:text-white transition-colors text-left block"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Legal Disclaimer & Copyright */}
          <div className="border-t border-slate-800 mt-12 pt-8 space-y-4">
            <p className="text-slate-500 text-xs leading-relaxed max-w-5xl">
              <strong>Disclaimer:</strong> This website provides educational and informational tools only. Calculations are estimates based on standard formulaic projections and do not constitute professional financial, tax, or investment advice. Always consult with a licensed professional before making major financial commitments.
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2 border-t border-slate-800/50 text-[11px] text-slate-600">
              <p>&copy; {new Date().getFullYear()} FinCalc Flow. All rights reserved.</p>
              <p className="text-emerald-400/80 font-bold">100% Client-Side Engine</p>
            </div>
          </div>

        </div>
      </footer>



      {/* Contact Us Modal */}
      {contactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-slate-100 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => { setContactOpen(false); setContactFormSubmitted(false); }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-655 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <IconX className="w-5 h-5" />
            </button>
            <div className="space-y-4 text-left">
              <h3 className="text-2xl font-black text-slate-900">Contact Us</h3>
              <p className="text-xs text-slate-500">
                Have questions or feedback? Drop us a line below or reach out directly at <a href="mailto:support@fincalcflow.com" className="text-blue-600 hover:underline">support@fincalcflow.com</a>.
              </p>
              
              {contactFormSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2">
                  <p className="text-sm font-bold text-emerald-800">Message Sent Successfully!</p>
                  <p className="text-xs text-emerald-600">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactFormSubmitted(true);
                  }}
                  className="space-y-3.5"
                >
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                      placeholder="Your name" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                      placeholder="you@example.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Message</label>
                    <textarea 
                      required 
                      rows={3} 
                      className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors" 
                      placeholder="How can we help you?" 
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/10"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
