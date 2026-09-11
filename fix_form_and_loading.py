import re

with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

# 1. Inject reset function
reset_func = """
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
"""
# Insert right after setError
content = content.replace('  const [error, setError] = useState<string>("");', '  const [error, setError] = useState<string>("");\n' + reset_func)


# 2. Update the onChange handler for the vertical select
old_vertical_select = """                    onChange={(e) => {
                      if (showResults) {
                        if (window.confirm("Changing the case category will clear your current forecast results. Are you sure you want to proceed?")) {
                          setShowResults(false);
                          setVertical(e.target.value);
                        }
                      } else {
                        setVertical(e.target.value);
                      }
                    }}"""

new_vertical_select = """                    onChange={(e) => {
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
                    }}"""
content = content.replace(old_vertical_select, new_vertical_select)


# 3. Make ALL fields required. Most inputs/selects are probably missing it.
# We will do a generic regex replace for <input and <select inside the form.
# Actually, wait, some are checkboxes, which shouldn't necessarily be required to be checked, just required to exist (but checkboxes shouldn't be 'required' otherwise you can't submit if it's false).
# So we only add `required` to <input type="number">, <input type="text">, and <select> that do not already have it.

inputs_to_fix = [
    '<input type="number" value={chequeAmount}',
    '<select value={dishonourReason}',
    '<select value={defenceRaised}',
    '<input type="number" value={claimAmount}',
    '<select value={contractType}',
    '<select value={natureOfDispute}',
    '<input type="number" value={petitionerIncome}',
    '<input type="number" value={respondentIncome}',
    '<input type="number" value={yearsOfMarriage}',
    '<input type="number" value={numChildren}',
    '<select value={typeOfProceeding}',
    '<select value={natureOfRelief}',
    '<select value={currentStage}'
]

for field in inputs_to_fix:
    new_field = field.replace('<input ', '<input required ').replace('<select ', '<select required ')
    content = content.replace(field, new_field)


# 4. Fix Loading Text Alignment
old_loading_text = """          <div className="w-full max-w-2xl flex items-center justify-center min-h-[3rem]">
            <p className="text-xl text-blue-400 font-medium animate-pulse text-center px-4 w-full">
              {loadingSteps[loadingStep]}
            </p>
          </div>"""

new_loading_text = """          <div className="min-h-[3rem] w-full flex justify-center items-center px-4">
            <p className="text-xl text-blue-400 font-medium animate-pulse text-center w-full block">
              {loadingSteps[loadingStep]}
            </p>
          </div>"""

content = content.replace(old_loading_text, new_loading_text)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)

