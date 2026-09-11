import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

bad_block = """      setDescription(data.description || "");
      setStateUT("Delhi");
      setCourtLevel("Tis Hazari Court");
      setCurrentStage("Filed-pending");
      
      if (vertical === 'cheque_bounce') {
        setChequeAmount(data.chequeAmount || "");
        setDishonourReason(data.dishonourReason || "Insufficient funds");
        setNoticeServed(data.noticeServed || false);
        setDefenceRaised(data.defenceRaised || []);
      } else if (vertical === 'commercial') {
        setClaimAmount(data.claimAmount || "");
        setContractType(data.contractType || "Supply/Sale");
        setWrittenContract(data.writtenContract || false);
        setMediationAttempted(data.mediationAttempted || false);
        setCounterclaimExpected(data.counterclaimExpected || false);
        setNatureOfDispute(data.natureOfDispute || []);
      } else if (vertical === 'family') {
        setPetitionerIncome(data.petitionerIncome || "");
        setRespondentIncome(data.respondentIncome || "");
        setYearsOfMarriage(data.yearsOfMarriage || "");
        setNumChildren(data.numChildren || "");
        setTypeOfProceeding(data.typeOfProceeding || "Mutual consent divorce");
        setNatureOfRelief(data.natureOfRelief || []);
      }"""

good_block = """      setDescription(data.description || "");"""

content = content.replace(bad_block, good_block)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)
