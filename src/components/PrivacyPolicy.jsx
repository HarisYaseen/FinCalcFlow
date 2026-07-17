import React from 'react';
import { Shield, Lock, Cpu, Eye, FileText, Mail, Info } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
          Data Privacy & Policy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
            <Shield className="w-8 h-8" />
          </span>
          Privacy Policy
        </h1>
        <p className="text-slate-500 text-sm">
          Last updated: July 17, 2026
        </p>
      </div>

      {/* Policy Details */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 space-y-8 text-left">
        
        {/* 1. Client-Side Operations */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-500" />
            1. Client-Side Processing & Privacy
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            FinCalc Flow is built as a serverless application. All financial estimations, inputs, slider modifications, and values calculated on this site are processed <strong>exclusively in your web browser</strong> using client-side JavaScript. 
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            We do not maintain backend databases, web portal logins, or cloud APIs that collect, capture, or store your personal financial data.
          </p>
        </section>

        {/* 2. Data Retention Policy */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lock className="w-5 h-5 text-indigo-500" />
            2. Data Retention Policy
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Because all calculation variables run entirely in local application memory, your session data is automatically cleared the moment you refresh the page or close your browser tab. We retain zero history of your calculations or inputs.
          </p>
        </section>

        {/* 3. Google AdSense & Cookies */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-500" />
            3. Google AdSense & Cookie Usage
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We display advertisements using Google AdSense to fund our development operations. Google, as a third-party advertising vendor, uses tracking cookies to serve relevant ads on our website based on your visits to this site and other websites on the internet.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            You can choose to disable or customize personalized advertising settings by visiting Google's official <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-bold">Google Ads Settings</a> page. Alternatively, you can opt out of third-party cookie networks by visiting the Consumer Opt-Out page on <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">aboutads.info</a>.
          </p>
        </section>

        {/* 4. Children's Privacy (COPPA Compliance) */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500" />
            4. Children's Privacy (COPPA)
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            FinCalc Flow provides general-purpose educational calculators and is not directed at or marketed to children. In compliance with the Children's Online Privacy Protection Act (COPPA), we do not knowingly track or collect any personal information from children under the age of 13.
          </p>
        </section>

        {/* 5. Policy Updates */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            5. Changes to This Privacy Policy
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            We may update our Privacy Policy periodically. Any changes will be reflected directly on this page along with an updated <strong>"Last updated"</strong> date at the very top of the policy statement.
          </p>
        </section>

        {/* 6. Contact Information */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-5 h-5 text-indigo-500" />
            6. Privacy Contact Information
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            If you have any questions or inquiries regarding our privacy standards, cookies usage, or how our client-side software executes computations, please contact us at: <span className="font-mono text-indigo-600 font-bold">privacy@fincalcflow.com</span>.
          </p>
        </section>

      </div>
    </div>
  );
}
