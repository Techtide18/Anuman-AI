import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

old_handle = """  const handleGenerateMock = async () => {
    if (!vertical) {
      alert("Please select a Legal Vertical first to generate context-specific mock data.");
      return;
    }

    setIsGeneratingMock(true);
    try {
      const res = await fetch('/api/mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vertical })
      });

      if (!res.ok) throw new Error("Failed to generate mock data");
      const data = await res.json();

      setDescription(data.description || "");
    } catch (e) {
      console.error(e);
      alert("Error generating mock data.");
    } finally {
      setIsGeneratingMock(false);
    }
  };"""

new_handle = """  const handleGenerateMock = async () => {
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
  };"""

content = content.replace(old_handle, new_handle)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)

