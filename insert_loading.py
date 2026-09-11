import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

# 1. We need to add useState and useEffect to the imports if they aren't there.
# It uses React hooks already: const [isSubmitting, setIsSubmitting] = useState(false);
# Let's see if useEffect is imported.
import_match = re.search(r"import\s+.*?useState.*?\s+from\s+['\"]react['\"]", content)
if not import_match:
    # Let's just find the React import line
    if "import React" in content or "import { useState" in content:
        content = content.replace("useState,", "useState, useEffect,")
        content = content.replace("useState }", "useState, useEffect }")
        # In case it's just import { useState } from 'react'
    else:
        pass # It might be there

# 2. Add the cycling text logic inside WelcomePage component
# Let's insert it right after the states.
loading_states = """
  // Loading Text Cycler
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingSteps = [
    "Scanning 4+ Crore Indian Court Judgments...",
    "Extracting factual matrices & jurisdictional bounds...",
    "Identifying matching precedent outcomes...",
    "Calculating realistic litigation timelines...",
    "Estimating total legal expenditures...",
    "Drafting ANUMAN AI Intelligence Brief..."
  ];

  useEffect(() => {
    let interval;
    if (isSubmitting) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 4000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isSubmitting]);
"""

content = content.replace('  const [showResults, setShowResults] = useState(false);', '  const [showResults, setShowResults] = useState(false);\n' + loading_states)

# 3. Create the beautiful overlay to render when isSubmitting is true.
# I will put it right before the <main> block, but fixed so it overlays everything, or maybe absolute. Fixed is better.
loading_overlay = """
      {/* BEAUTIFUL FULLSCREEN LOADING OVERLAY */}
      {isSubmitting && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#000000]/90 backdrop-blur-md animate-in fade-in duration-500">
          
          <div className="relative flex items-center justify-center mb-12">
            {/* Outer spinning ring */}
            <div className="absolute w-40 h-40 border-t-2 border-l-2 border-blue-500 rounded-full animate-spin"></div>
            {/* Inner spinning ring */}
            <div className="absolute w-32 h-32 border-b-2 border-r-2 border-purple-500 rounded-full animate-[spin_2s_reverse_infinite]"></div>
            {/* Center Logo */}
            <img src="/assets/logo.jpg" alt="ANUMAN AI Logo" className="h-20 w-20 rounded-full object-cover border-2 border-white/20 animate-pulse" />
          </div>

          <h2 className="text-3xl font-extrabold text-white mb-6">Analyzing Your Dispute</h2>
          
          <div className="h-12 flex items-center justify-center">
            <p className="text-xl text-blue-400 font-medium animate-pulse text-center px-4">
              {loadingSteps[loadingStep]}
            </p>
          </div>

          <div className="w-64 h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">This usually takes about 60 seconds.</p>
        </div>
      )}
"""

content = content.replace('<main', loading_overlay + '\n      <main')

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)

