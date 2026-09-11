"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Scale, ArrowLeft, BarChart3, Clock,
  FileText, Shield, Info, ExternalLink, Activity, TrendingUp, Gavel
} from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Cell, Legend, PieChart, Pie } from 'recharts';

const STATES = ["Delhi"];

const COURT_LEVELS = [
  "Tis Hazari Court",
  "Patiala House Court",
  "Karkardooma Court",
  "Rohini Court",
  "Dwarka Court",
  "Saket Court"
];
const CURRENT_STAGES = ["Pre-litigation", "Filed-pending", "At trial", "In appeal"];
const VERTICALS = [
  { id: "cheque_bounce", name: "Cheque Bounce (S.138 NI Act)" },
  { id: "commercial", name: "Commercial Dispute (S.12A)" },
  { id: "family", name: "Family Law (Financial Settlement)" }
];

const LOADING_STEPS = [
  "Scanning 4+ Crore Indian Court Judgments...",
  "Parsing case facts & extracting legal issues...",
  "Matching jurisdictional precedents...",
  "Fetching full-text judgments from Indian Kanoon...",
  "Extracting factual matrices & arguments...",
  "Identifying matching precedent outcomes...",
  "Analyzing award amounts & penalty structures...",
  "Calculating realistic litigation timelines...",
  "Estimating total legal expenditures...",
  "Computing settlement parameters & ZOPA...",
  "Running risk-adjusted probability models...",
  "Drafting ANUMAN AI Intelligence Brief..."
];

function LoadingSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < LOADING_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="w-full max-w-md space-y-3 text-left">
      {LOADING_STEPS.map((step, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-3 transition-all duration-500 ${idx > currentStep ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
        >
          {idx < currentStep ? (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</span>
          ) : idx === currentStep ? (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 animate-pulse"></span>
          ) : (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10"></span>
          )}
          <span className={`text-sm ${idx < currentStep ? 'text-green-400' : idx === currentStep ? 'text-blue-400 font-medium' : 'text-gray-600'}`}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ForecastPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Warn before leaving if results are showing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showResults) {
        e.preventDefault();
        e.returnValue = ''; // Standard way to trigger browser's "Leave site?" prompt
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showResults]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (showResults) {
      if (!window.confirm("You have a generated forecast. Are you sure you want to leave this page?")) {
        e.preventDefault();
      }
    }
  };



  // Common Fields
  const [vertical, setVertical] = useState("");
  const [description, setDescription] = useState("");
  const [stateUT, setStateUT] = useState("");
  const [courtLevel, setCourtLevel] = useState("");
  const [currentStage, setCurrentStage] = useState("");
  const [chequeAmount, setChequeAmount] = useState("");
  const [dishonourReason, setDishonourReason] = useState("Insufficient funds");
  const [noticeServed, setNoticeServed] = useState(false);
  const [defenceRaised, setDefenceRaised] = useState("");

  // Commercial Fields
  const [claimAmount, setClaimAmount] = useState("");
  const [contractType, setContractType] = useState("Supply/Sale");
  const [writtenContract, setWrittenContract] = useState(false);
  const [mediationAttempted, setMediationAttempted] = useState(false);
  const [counterclaimExpected, setCounterclaimExpected] = useState(false);
  const [natureOfDispute, setNatureOfDispute] = useState("");

  // Family Fields
  const [petitionerIncome, setPetitionerIncome] = useState("");
  const [respondentIncome, setRespondentIncome] = useState("");
  const [yearsOfMarriage, setYearsOfMarriage] = useState("");
  const [numChildren, setNumChildren] = useState("");
  const [typeOfProceeding, setTypeOfProceeding] = useState("Mutual consent divorce");
  const [natureOfRelief, setNatureOfRelief] = useState("");

  const [isGeneratingMock, setIsGeneratingMock] = useState(false);

  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const resetFormFields = () => {
    setDescription("");
    setStateUT("");
    setCourtLevel("");
    setCurrentStage("");
    setChequeAmount("");
    setDishonourReason("Insufficient funds");
    setNoticeServed(false);
    setDefenceRaised("");
    setClaimAmount("");
    setContractType("Supply/Sale");
    setWrittenContract(false);
    setMediationAttempted(false);
    setCounterclaimExpected(false);
    setNatureOfDispute("");
    setPetitionerIncome("");
    setRespondentIncome("");
    setYearsOfMarriage("");
    setNumChildren("");
    setTypeOfProceeding("Mutual consent divorce");
    setNatureOfRelief("");
  };


  // Hover logic
  const [activePreview, setActivePreview] = useState<any>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const cardWidth = 350
    const cardHeight = 100
    const offsetY = 20
    let x = e.clientX - cardWidth / 2
    let y = e.clientY - cardHeight - offsetY
    if (x + cardWidth > window.innerWidth - 20) x = window.innerWidth - cardWidth - 20
    if (x < 20) x = 20
    if (y < 20) y = e.clientY + offsetY
    setPosition({ x, y })
  }, [])

  const handleHoverStart = useCallback((caseData: any, e: React.MouseEvent) => {
    setActivePreview(caseData)
    setIsVisible(true)
    updatePosition(e)
  }, [updatePosition])

  const handleHoverMove = useCallback((e: React.MouseEvent) => {
    if (isVisible) updatePosition(e)
  }, [isVisible, updatePosition])

  const handleHoverEnd = useCallback(() => setIsVisible(false), [])

  const formatINR = (val: any) => {
    if (val === undefined || val === null) return '';
    const num = Number(String(val).replace(/,/g, ''));
    return isNaN(num) ? val : num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  };

  const formatChartAxis = (val: number, isCurrency: boolean = false) => {
    if (val === 0) return isCurrency ? '₹0' : '0';
    if (val < 100000) {
      return isCurrency ? `₹${Math.round(val / 1000)}k` : `${Math.round(val / 1000)}k`;
    }
    return isCurrency ? `₹${formatINR(val)}` : formatINR(val);
  };

  const getPendingCases = () => {
    if (vertical === 'commercial') {
      switch (courtLevel) {
        case "Rohini Court": return "23,884";
        case "Dwarka Court": return "10,742";
        case "Saket Court": return "18,046";
        case "Karkardooma Court": return "15,853";
        case "Patiala House Court": return "9,169";
        case "Tis Hazari Court": return "20,263";
        default: return "15,000";
      }
    } else if (vertical === 'family') {
      switch (courtLevel) {
        case "Rohini Court": return "4,653";
        case "Tis Hazari Court": return "4,503";
        case "Patiala House Court": return "1,142";
        case "Karkardooma Court": return "4,454";
        case "Dwarka Court": return "3,722";
        case "Saket Court": return "3,179";
        default: return "3,500";
      }
    } else {
      switch (courtLevel) {
        case "Rohini Court": return "43,720";
        case "Tis Hazari Court": return "69,944";
        case "Karkardooma Court": return "38,386";
        case "Patiala House Court": return "93,880";
        case "Saket Court": return "48,768";
        case "Dwarka Court": return "35,874";
        default: return "45,000";
      }
    }
  };

  const generateBrief = () => {
    if (!results) return;

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>Settlement & Mediation Brief</title>
        <style>
          body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
          h1 { text-align: center; font-size: 16pt; font-weight: bold; text-transform: uppercase; margin-bottom: 20px; }
          h2 { font-size: 14pt; font-weight: bold; border-bottom: 1px solid #000; padding-bottom: 5px; margin-top: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          .bold { font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>CONFIDENTIAL SETTLEMENT & MEDIATION BRIEF</h1>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Jurisdiction:</strong> ${stateUT} - ${courtLevel}</p>
        
        <h2>1. CASE OVERVIEW</h2>
        <p><strong>Dispute Type:</strong> ${vertical.replace('_', ' ').toUpperCase()}</p>
        <p><strong>Principal Amount Disputed:</strong> Rs. ${formatINR(chequeAmount)}</p>
        <p><strong>Reason for Dishonour:</strong> ${dishonourReason}</p>
        <p><strong>Notice Served:</strong> ${noticeServed ? 'Yes' : 'No'}</p>
        <p><strong>Defences Raised:</strong> ${defenceRaised.length > 0 ? defenceRaised : 'None'}</p>
        <p><strong>Factual Matrix:</strong> ${description}</p>
        
        <h2>2. LITIGATION FORECAST & RISK ANALYSIS</h2>
        <p>Based on the analysis of recent precedents from Indian Kanoon (post-2024), the forecasted litigation metrics are as follows:</p>
        <ul>
          <li><strong>Probability of Favorable Outcome:</strong> ${results.successProbability}%</li>
          <li><strong>Estimated Statutory Award (if fully litigated):</strong> Rs. ${formatINR(results.awardMin)} to Rs. ${formatINR(results.awardMax)}</li>
          <li><strong>Estimated Timeline to Disposal:</strong> ~${results.backlog?.disposalTimeMonths || 30} months</li>
          <li><strong>Systemic Backlog Risk:</strong> ${getPendingCases()} similar cases remain pending today in this jurisdiction.</li>
        </ul>

        <h2>3. SETTLEMENT PARAMETERS</h2>
        <p>Taking into account the time-value of money, standard litigation costs, and the statutory penalty frameworks under Section 138 of the Negotiable Instruments Act, the recommended settlement parameters are structured as follows:</p>
        <ul>
          <li><strong>Claimant Floor:</strong> Rs. ${formatINR(results.settlement?.claimantFloor)} (Minimum acceptable to claimant)</li>
          <li><strong>Respondent Ceiling:</strong> Rs. ${formatINR(results.settlement?.respondentCeiling)} (Maximum viable for respondent)</li>
          <li><strong>Recommended Mediation Zone:</strong> Rs. ${formatINR(results.settlement?.recommendedMin)} - Rs. ${formatINR(results.settlement?.recommendedMax)}</li>
        </ul>
        <p><em>Note: The &quot;Cost of Delay&quot; (estimated at Rs. ${formatINR(results.settlement?.costOfDelay)} over ${results.settlement?.delayYears} years) has been factored into these ceilings to incentivize early mediation.</em></p>

        <h2>4. SUMMARY OF CONTROLLING PRECEDENTS</h2>
        <p>The following recent cases from the requested jurisdiction dictate the parameters above:</p>
        <table>
          <tr>
            <th>Case Title</th>
            <th>Year</th>
            <th>Outcome Summary</th>
          </tr>
          ${results.similarCases?.map((c: any) => `
            <tr>
              <td>${c.title}</td>
              <td>${c.year}</td>
              <td>${c.outcome}</td>
            </tr>
          `).join('') || ''}
        </table>
        
        <br/><br/>
        <p style="text-align:center; font-size: 10pt; color: #555;">Generated by ANUMAN AI Legal AI</p>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 250);
    }
  };

  const handleGenerateMock = async () => {
    if (!vertical) {
      alert("Please select a Legal Vertical first to generate context-specific mock data.");
      return;
    }

    setIsGeneratingMock(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    let mockDesc = "";
    if (vertical === "cheque_bounce") {
      mockDesc = "On 14th March 2026, M/s Karol Bagh Electronics issued a cheque of ₹8,50,000 drawn on HDFC Bank, Connaught Place branch, to Sri Ram Enterprises towards settlement for a bulk supply of LED televisions. Upon presentation at State Bank of India, Chandni Chowk on 18th March 2026, the cheque was returned unpaid with the memo citing 'Funds Insufficient'. Despite receiving a statutory legal notice dated 2nd April 2026, the accused failed to make the payment within the mandatory 15-day period. In response, the accused claims that the cheque was provided merely as a security instrument for a contingent delivery of goods that arrived defective, denying any legally enforceable debt.";
    } else if (vertical === "commercial") {
      mockDesc = "A dispute arose between the seller which is a logistic company  and a buyer over non-payment for a bulk supply of commercial packaging materials delivered between October 2025 and January 2026 in New Delhi. Despite multiple demand notices and completion of pre-institution mediation under Section 12A of the Commercial Courts Act, the defendant failed to clear the outstanding dues. The plaintiff seeks recovery of the principal amount along with accrued interest for breach of the written supply agreement.";
    } else if (vertical === "family") {
      mockDesc = "Married in November 2018 in New Delhi, the petitioner (wife), currently residing in Rohini, filed a maintenance petition under Section 125 of the Code of Criminal Procedure against her husband after four years of marriage. The petitioner alleges persistent mental cruelty, financial deprivation, and ultimate desertion by the respondent, which compelled her to vacate her matrimonial home in South Extension in December 2022. She is seeking a monthly maintenance allowance of ₹85,000, citing that she is currently unemployed while the respondent earns a monthly salary of over ₹3.5 Lakhs as a Senior IT Manager in Gurugram. The case is presently pending before the Saket Family Court, Delhi, where the court is reviewing the affidavits of assets and liabilities from both parties.";
    }

    setDescription(mockDesc);
    setIsGeneratingMock(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vertical, description, stateUT, courtLevel, currentStage,
          chequeAmount: chequeAmount.replace(/,/g, ''),
          dishonourReason, noticeServed, defenceRaised,
          claimAmount: claimAmount.replace(/,/g, ''),
          contractType, writtenContract, mediationAttempted, counterclaimExpected, natureOfDispute,
          petitionerIncome: petitionerIncome.replace(/,/g, ''),
          respondentIncome: respondentIncome.replace(/,/g, ''),
          yearsOfMarriage, numChildren, typeOfProceeding, natureOfRelief
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch forecast');
      }

      setResults(data);
      setShowResults(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col">

      <nav className="w-full border-b border-white/5 bg-[#000000]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex justify-between items-center">
          <Link href="/" onClick={handleNavClick} className="flex items-center gap-4">
            <img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-16 md:h-20 w-16 md:w-20 rounded-full object-cover border border-white/20" />
            <span className="text-2xl md:text-3xl font-bold text-white tracking-wide">ANUMAN AI</span>
          </Link>
          <div className="space-x-6 text-sm font-medium text-gray-300 hidden md:flex items-center">
            <Link href="/" onClick={handleNavClick} className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" onClick={handleNavClick} className="hover:text-white transition-colors">About Us</Link>
            <Link href="/impact" onClick={handleNavClick} className="hover:text-white transition-colors">Our Impact</Link>
            <Link href="/forecast" onClick={handleNavClick} className="text-blue-400 font-semibold">Run Forecast</Link>
          </div>
        </div>
      </nav>


      {/* Page Header */}
      {!showResults && (
        <div className="w-full text-center pt-16 pb-4 px-6 animate-fade-in">

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Run Your Data-Backed Forecast</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Describe your dispute below. We will instantly benchmark your facts against thousands of Indian court judgments to calculate realistic timelines, legal costs, and a fair settlement range.
          </p>
        </div>
      )}


      {/* BEAUTIFUL FULLSCREEN LOADING OVERLAY */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#000000]/95 backdrop-blur-md animate-in fade-in duration-500">
          <div className="w-full max-w-lg flex flex-col items-center">
            <div className="relative flex items-center justify-center mb-10 h-32 w-32">
              <div className="absolute w-32 h-32 border-t-2 border-l-2 border-blue-500 rounded-full animate-spin"></div>
              <div className="absolute w-24 h-24 border-b-2 border-r-2 border-purple-500 rounded-full animate-[spin_2s_reverse_infinite]"></div>
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-8 text-center">Analyzing Your Dispute</h2>

            <LoadingSteps />

            <p className="text-sm text-gray-500 mt-6 text-center">This usually takes a couple of minutes.</p>
          </div>
        </div>
      )}

      <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Input Form Column */}
        <div className={`${showResults ? 'lg:col-span-5' : 'lg:col-span-8 lg:col-start-3'} space-y-6 transition-all duration-500`}>
          <div className="bg-[#121212]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_0_50px_rgba(59,130,246,0.05)] border border-white/10 overflow-hidden relative">
            {/* Subtle top glow */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 opacity-50"></div>

            <div className="px-8 py-8 border-b border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent">
              <h2 className="text-2xl font-bold text-white tracking-tight">Case Details</h2>
              <p className="text-gray-400 mt-2">The more detail you provide, the higher the confidence score of your forecast.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Case Category</label>
                  <select
                    required
                    value={vertical}
                    onChange={(e) => {
                      if (showResults) {
                        if (window.confirm("Changing the case category will clear your current forecast results. Are you sure you want to proceed?")) {
                          setShowResults(false);
                          setVertical(e.target.value);
                          resetFormFields();
                        }
                      } else {
                        setVertical(e.target.value);
                        resetFormFields();
                      }
                    }}
                    className="w-full rounded-lg border-white/20 border p-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a category...</option>
                    {VERTICALS.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-300">
                      Case Description
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateMock}
                      disabled={isGeneratingMock}
                      className="text-xs bg-white/10 hover:bg-white/20 text-blue-400 px-2 py-1 rounded transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {isGeneratingMock ? "Generating..." : "✨ Auto-Fill Mock Data"}
                    </button>
                  </div>
                  <textarea
                    required
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the facts of your case in as much legal detail as possible..."
                    className="w-full min-h-[160px] resize-y overflow-y-auto bg-black/20 rounded-lg border-white/20 border p-4 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 leading-relaxed custom-scrollbar"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">State/UT</label>
                    <select required value={stateUT} onChange={e => setStateUT(e.target.value)} className="w-full rounded-lg border-white/20 border p-2.5 text-white">
                      <option value="">Select...</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Court Level</label>
                    <select required value={courtLevel} onChange={e => setCourtLevel(e.target.value)} className="w-full rounded-lg border-white/20 border p-2.5 text-white">
                      <option value="">Select...</option>
                      {COURT_LEVELS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Current Stage</label>
                  <select required value={currentStage} onChange={e => setCurrentStage(e.target.value)} className="w-full rounded-lg border-white/20 border p-2.5 text-white">
                    <option value="">Select...</option>
                    {CURRENT_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Vertical Specific Fields */}
              {vertical === 'cheque_bounce' && (
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <h3 className="font-medium text-white">Cheque Bounce Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Cheque Amount (₹)</label>
                      <input
                        type="text"
                        required
                        value={chequeAmount}
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, '');
                          if (!rawValue) { setChequeAmount(''); return; }
                          setChequeAmount(Number(rawValue).toLocaleString('en-IN'));
                        }}
                        className="w-full rounded-lg border-white/20 border p-2.5"
                        placeholder="e.g. 5,00,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Dishonour Date</label>
                      <input type="date" required className="w-full rounded-lg border-white/20 border p-2.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Reason for Dishonour</label>
                    <select required value={dishonourReason} onChange={(e) => setDishonourReason(e.target.value)} className="w-full rounded-lg border-white/20 border p-2.5">
                      <option>Insufficient funds</option>
                      <option>Signature mismatch</option>
                      <option>Account closed</option>
                      <option>Stop payment</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4">
                    <input type="checkbox" id="notice" checked={noticeServed} onChange={(e) => setNoticeServed(e.target.checked)} className="rounded text-blue-400 focus:ring-blue-500" />
                    <label htmlFor="notice" className="text-sm text-gray-300">Was legal notice served?</label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Defence Being Raised</label>
                    <select required value={defenceRaised} onChange={(e) => setDefenceRaised(e.target.value)} className="w-full rounded-lg bg-[#0a0a0a] border-white/20 border p-2.5 text-white">
                      <option value="">Select a defence</option>
                      <option value="Security cheque">Security cheque</option>
                      <option value="Debt not legally enforceable">Debt not legally enforceable</option>
                      <option value="No notice received">No notice received</option>
                      <option value="Blank cheque misused">Blank cheque misused</option>
                    </select>
                  </div>
                </div>
              )}

              {vertical === 'commercial' && (
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <h3 className="font-medium text-white">Commercial Dispute Details</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Claim Amount (₹)</label>
                    <input type="text" required value={claimAmount} onChange={e => setClaimAmount(formatINR(e.target.value))} className="w-full rounded-lg border-white/20 border p-2.5 text-white" placeholder="e.g. 15,00,000" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Contract Type</label>
                    <select required value={contractType} onChange={e => setContractType(e.target.value)} className="w-full rounded-lg border-white/20 border p-2.5 text-white">
                      <option>Supply/Sale</option><option>Service</option><option>Construction</option>
                      <option>Loan/Financial</option><option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" id="written" checked={writtenContract} onChange={e => setWrittenContract(e.target.checked)} className="rounded text-blue-400" />
                      <label htmlFor="written" className="text-sm text-gray-300">Written contract with interest clause?</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="checkbox" id="mediation" checked={mediationAttempted} onChange={e => setMediationAttempted(e.target.checked)} className="rounded text-blue-400" />
                      <label htmlFor="mediation" className="text-sm text-gray-300">Has pre-institution mediation (S.12A) been attempted?</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="checkbox" id="counterclaim" checked={counterclaimExpected} onChange={e => setCounterclaimExpected(e.target.checked)} className="rounded text-blue-400" />
                      <label htmlFor="counterclaim" className="text-sm text-gray-300">Counterclaim expected?</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Nature of dispute</label>
                    <select required value={natureOfDispute} onChange={e => setNatureOfDispute(e.target.value)} className="w-full rounded-lg bg-[#0a0a0a] border-white/20 border p-2.5 text-white">
                      <option value="">Select nature of dispute</option>
                      <option>Non-payment of invoice</option>
                      <option>Breach of contract terms</option>
                      <option>Delay in delivery/performance</option>
                      <option>Quality dispute</option>
                    </select>
                  </div>
                </div>
              )}

              {vertical === 'family' && (
                <div className="pt-4 border-t border-white/5 space-y-4">
                  <h3 className="font-medium text-white">Family Law (Financial Settlement)</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Petitioner Income/mo (₹)</label>
                      <input type="text" required value={petitionerIncome} onChange={e => setPetitionerIncome(formatINR(e.target.value))} className="w-full rounded-lg border-white/20 border p-2.5 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Respondent Income/mo (₹)</label>
                      <input type="text" required value={respondentIncome} onChange={e => setRespondentIncome(formatINR(e.target.value))} className="w-full rounded-lg border-white/20 border p-2.5 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Years of Marriage</label>
                      <input type="number" required value={yearsOfMarriage} onChange={e => setYearsOfMarriage(e.target.value)} className="w-full rounded-lg border-white/20 border p-2.5 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Number of Children</label>
                      <input type="number" required value={numChildren} onChange={e => setNumChildren(e.target.value)} className="w-full rounded-lg border-white/20 border p-2.5 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Type of proceeding</label>
                    <select required value={typeOfProceeding} onChange={e => setTypeOfProceeding(e.target.value)} className="w-full rounded-lg border-white/20 border p-2.5 text-white">
                      <option>Mutual consent divorce</option>
                      <option>Contested divorce</option>
                      <option>Maintenance application only</option>
                      <option>Judicial separation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Nature of relief sought</label>
                    <select required value={natureOfRelief} onChange={e => setNatureOfRelief(e.target.value)} className="w-full rounded-lg bg-[#0a0a0a] border-white/20 border p-2.5 text-white">
                      <option value="">Select nature of relief</option>
                      <option>Interim maintenance</option>
                      <option>Permanent alimony</option>
                      <option>Lump sum settlement</option>
                      <option>Child support</option>
                    </select>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-900/20 border border-red-500/50 text-red-400 p-4 rounded-lg mb-8 flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-red-500 mb-1">Error Generating Forecast</h3>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting || !vertical}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:bg-blue-300 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Activity className="h-5 w-5 animate-spin" />
                    Analyzing Precedents...
                  </>
                ) : (
                  'Generate Forecast'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Results Column */}
        {showResults && results && (
          <div className="lg:col-span-7 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. Forecast */}
            <div className="bg-[#121212]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_0_50px_rgba(59,130,246,0.05)] border border-white/10 overflow-hidden relative">
              <div className="px-6 py-4 border-b border-white/5 bg-blue-900/20 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  <h2 className="text-lg font-semibold text-white">Litigation Forecast</h2>
                </div>
                <span className="text-xs font-medium bg-blue-900/40 text-blue-300 px-2 py-1 rounded-full">Confidence: High</span>
              </div>
              <div className="p-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Success Probability</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold text-white">{results.forecast.successProbability}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className={`bg-green-500 h-2 rounded-full`} style={{ width: `${results.forecast.successProbability}%` }}></div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Likely Award</p>
                  <p className="text-2xl font-bold text-white">₹{formatINR(results.forecast.awardMin)} – ₹{formatINR(results.forecast.awardMax)}</p>
                </div>
              </div>
            </div>

            {/* 2. Court Backlog */}
            <div className="bg-[#121212]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_0_50px_rgba(59,130,246,0.05)] border border-white/10 overflow-hidden relative">
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-white">Court Backlog & Disposal Time</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="font-medium text-white">{stateUT || 'Delhi'} {courtLevel || 'District'} Courts — {VERTICALS.find(v => v.id === vertical)?.name.split(' ')[0]} Cases</p>
                  <div className="mt-2 p-3 bg-yellow-900/20 border border-yellow-900/40 rounded-lg">
                    <p className="text-sm text-yellow-300 flex items-start gap-1 font-medium">
                      <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span><strong>Illustrative NJDG-pattern based data.</strong> Verify live pendency below:</span>
                    </p>
                    <div className="flex flex-col gap-1 mt-2 pl-5 text-sm">
                      <a href="https://njdg.ecourts.gov.in/njdg_v3/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                        National Judicial Data Grid (NJDG) <ExternalLink className="h-3 w-3" />
                      </a>
                      <a href="https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index&app_token=45105b66d4b4389572b69a607b626f2843f10b05dc7732c7c4737b3f827f9f37" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                        eCourts Services - Case Status <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 bg-orange-900/20 rounded-lg p-4 border border-orange-100">
                  <div>
                    <p className="text-sm text-orange-300">Avg. Disposal Time</p>
                    <p className="text-xl font-bold text-orange-400">~{results.backlog.disposalTimeMonths} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-orange-300">Pending in {courtLevel.replace(' Court', '')}</p>
                    <p className="text-xl font-bold text-orange-400">{getPendingCases()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Settlement Zone */}
            <div className="bg-[#121212]/80 backdrop-blur-xl rounded-[2rem] shadow-[0_0_50px_rgba(59,130,246,0.05)] border border-white/10 overflow-hidden relative">
              <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
                <Scale className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-semibold text-white">Settlement & Mediation Zone</h2>
              </div>
              <div className="p-6">

                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Litigating this case will take an estimated <strong className="text-white">{results.settlement.delayYears} years</strong> and incur a &quot;Cost of Delay&quot; (legal fees, inflation, interest) of approximately <strong className="text-white">₹{formatINR(results.settlement.costOfDelay)}</strong>.
                  Mathematically, it is cheaper for the Respondent to settle today for up to the <strong className="text-white">Ceiling</strong>, and better for the Claimant to accept down to the <strong className="text-white">Floor</strong>, rather than losing money to time.
                </p>

                <div className="relative pt-2 pb-4">
                  {/* Gradient Bar */}
                  <div className="h-3 bg-gray-800 rounded-full flex overflow-hidden">
                    <div className="bg-red-500/30 w-1/4"></div>
                    <div className="bg-gradient-to-r from-red-500/30 via-green-500 to-blue-500/30 w-2/4"></div>
                    <div className="bg-blue-500/30 w-1/4"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-3 font-medium">
                    <span>Minimum Floor<br />(₹{(results.settlement.claimantFloor / 100000).toFixed(1)} Lakhs)</span>
                    <span className="text-green-500 font-bold text-center">Fair Midpoint<br />(Mediation Zone)</span>
                    <span className="text-right">Maximum Ceiling<br />(₹{(results.settlement.respondentCeiling / 100000).toFixed(1)} Lakhs)</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex flex-col py-3 border-b border-white/5">
                    <span className="text-sm text-gray-500 mb-1">Recommended settlement</span>
                    <span className="text-2xl font-bold text-green-400">₹{formatINR(results.settlement.recommendedMin)} – ₹{formatINR(results.settlement.recommendedMax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-red-400">
                    <span className="flex items-center gap-1">
                      <Info className="h-4 w-4" /> Cost of delay if litigated:
                    </span>
                    <span className="font-bold">₹{formatINR(results.settlement.costOfDelay)} + {results.settlement.delayYears} years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Data & Analytics Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

              {vertical === 'cheque_bounce' && (
                <>
                  <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Activity className="h-5 w-5 text-purple-500" />
                      <h2 className="text-lg font-semibold text-white">Jurisdiction Backlog</h2>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Rohini', cases: 43720 },
                          { name: 'Tis Hazari', cases: 69944 },
                          { name: 'Karkardooma', cases: 38386 },
                          { name: 'Patiala H.', cases: 93880 },
                          { name: 'Saket', cases: 48768 },
                          { name: 'Dwarka', cases: 35874 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="name" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, false)} width={50} />
                          <Tooltip cursor={{ fill: '#222' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#a855f7' }} formatter={(value) => formatINR(value)} />
                          <Bar dataKey="cases" radius={[4, 4, 0, 0]}>
                            {
                              [
                                { name: 'Rohini' },
                                { name: 'Tis Hazari' },
                                { name: 'Karkardooma' },
                                { name: 'Patiala H.' },
                                { name: 'Saket' },
                                { name: 'Dwarka' }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={courtLevel.includes(entry.name.replace(' H.', ' House')) ? '#a855f7' : '#333'} />
                              ))
                            }
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="h-5 w-5 text-red-500" />
                      <h2 className="text-lg font-semibold text-white">Cost of Delay vs. Time</h2>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { year: 'Now', cost: 0 },
                          { year: 'Year 1', cost: results.settlement.costOfDelay * 0.3 },
                          { year: 'Year 2', cost: results.settlement.costOfDelay * 0.6 },
                          { year: 'Year 3', cost: results.settlement.costOfDelay * 0.85 },
                          { year: `Year ${results.settlement.delayYears}`, cost: results.settlement.costOfDelay }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="year" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, true)} width={65} />
                          <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#ef4444' }} formatter={(value) => `₹${formatINR(value)}`} />
                          <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} activeDot={{ r: 6, fill: '#ef4444', stroke: '#fff' }} name="Cumulative Cost" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}

              {vertical === 'commercial' && (
                <>
                  <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Activity className="h-5 w-5 text-blue-500" />
                      <h2 className="text-lg font-semibold text-white">Claim vs Expected Recovery</h2>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Original Claim', amount: parseInt(claimAmount.replace(/,/g, '') || '0') },
                          { name: 'Expected Recovery', amount: results.forecast.awardMedian }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, true)} width={65} />
                          <Tooltip cursor={{ fill: '#222' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#3b82f6' }} formatter={(value) => `₹${formatINR(value)}`} />
                          <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <h2 className="text-lg font-semibold text-white">Arbitration Cost Trajectory</h2>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { stage: 'Notice', cost: results.settlement.costOfDelay * 0.1 },
                          { stage: 'Mediation', cost: results.settlement.costOfDelay * 0.2 },
                          { stage: 'Court', cost: results.settlement.costOfDelay * 0.6 },
                          { stage: 'Final Award', cost: results.settlement.costOfDelay }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="stage" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, true)} width={65} />
                          <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#10b981' }} formatter={(value) => `₹${formatINR(value)}`} />
                          <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} name="Cost" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}

              {vertical === 'family' && (
                <>
                  <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Activity className="h-5 w-5 text-pink-500" />
                      <h2 className="text-lg font-semibold text-white">Maintenance Distribution</h2>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Minimum', amount: results.forecast.awardMin },
                          { name: 'Median', amount: results.forecast.awardMedian },
                          { name: 'Maximum', amount: results.forecast.awardMax },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, true)} width={65} />
                          <Tooltip cursor={{ fill: '#222' }} contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }} itemStyle={{ color: '#ec4899' }} formatter={(value) => `₹${formatINR(value)}`} />
                          <Bar dataKey="amount" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={60} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="h-5 w-5 text-yellow-500" />
                      <h2 className="text-lg font-semibold text-white">Lump Sum Settlement Range</h2>
                    </div>
                    <div className="h-64 w-full flex flex-col justify-center items-center">
                      <p className="text-sm text-gray-400 mb-4 text-center">Based on typical capitalized value of maintenance</p>
                      <div className="text-4xl font-bold text-yellow-500 mb-2">₹{formatINR(results.settlement.recommendedMax)}</div>
                      <p className="text-sm text-yellow-300">Expected One-Time Settlement</p>
                      <div className="w-full mt-8 bg-gray-800 h-2 rounded-full relative">
                        <div className="absolute top-0 h-2 bg-yellow-500/50 rounded-full" style={{ left: '20%', right: '20%' }}></div>
                        <div className="absolute -top-6 left-[20%] text-xs text-gray-400">Min</div>
                        <div className="absolute -top-6 right-[20%] text-xs text-gray-400">Max</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>


            {/* 5. Precedents & Legal Strategy */}
            <div className="bg-[#0a0a0a] rounded-xl shadow-sm border border-white/10 overflow-hidden mt-6">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-blue-900/10">
                <div className="flex items-center gap-4">
                  <Gavel className="h-5 w-5 text-blue-400" />
                  <h2 className="text-lg font-semibold text-white">Precedents & Strategy</h2>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="font-semibold text-white mb-1">Strongest Argument Found:</h3>
                  <p className="text-gray-300 text-sm">{results.arguments.title}</p>
                </div>

                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Similar Precedents ({results.arguments.sampleSize})
                </h3>

                <div className="space-y-4">
                  {results.similarCases.map((c: any, i: number) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 transition-colors">
                      <div className="w-16 flex-shrink-0 text-center">
                        <div className="text-sm font-bold text-gray-300">{c.year}</div>
                        <div className="text-xs text-blue-400 mt-1">{c.sim} Match</div>
                      </div>
                      <div className="flex-1">
                        <a href={c.link} target="_blank" rel="noreferrer" className="text-blue-400 font-medium hover:underline text-sm block mb-1">
                          {c.title}
                        </a>
                        <div className="mt-1">
                          <span className={`inline-block px-3 py-1.5 rounded-md text-xs leading-relaxed ${c.outcome.includes('Convicted') || c.outcome.includes('Plaintiff') || c.outcome.includes('Granted') ? 'bg-green-900/40 text-green-300 border border-green-700/50' : c.outcome.includes('Settled') ? 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50' : 'bg-red-900/40 text-red-300 border border-red-700/50'}`}>
                            {c.outcome}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Brief Button */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <button
                onClick={generateBrief}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-3"
              >
                <FileText className="w-5 h-5" />
                Generate Settlement &amp; Mediation Brief
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">Downloads a printable PDF summary of your entire forecast analysis.</p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
