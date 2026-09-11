import re

with open('src/app/api/forecast/route.ts', 'r') as f:
    content = f.read()

bad_block = """      RULES:
      1. Use Boolean operators ANDD, ORR. (e.g. "Section 138" ANDD "dishonour" ORR "bounce").
      2. DO NOT use parentheses () to group conditions! The API does not support them.
      3. Include the State (e.g., ANDD "Delhi").
      4. DO NOT over-restrict the search using too many ANDD clauses for specific facts. Use broad synonyms!
      5. CRITICAL: If category is cheque_bounce, ALWAYS include "Section 138". If category is commercial, ALWAYS include "Section 12A" ANDD "Commercial Courts Act".
      6. EXTRACT UNIQUE FACTS: Read the user's Description carefully. Extract 1 or 2 unique factual nouns (e.g., the specific product sold, industry, or relationship like "textiles", "software", "brother-in-law") and include them as an ORR condition to find highly context-specific precedents!"""

good_block = """      RULES:
      1. ONLY use Boolean operators ANDD and ORR. You MUST heavily favor ANDD to ensure strict matching. Rarely use ORR unless absolutely necessary for a direct synonym.
      2. DO NOT use parentheses () to group conditions! The API does not support them.
      3. Include the State (e.g., ANDD "Delhi").
      4. Use ANDD for the 'Nature of Dispute' or equivalent fields to strictly mandate that the exact legal issue is present in the case.
      5. CRITICAL: If category is cheque_bounce, ALWAYS include "Section 138". If category is commercial, ALWAYS include "Section 12A" ANDD "Commercial Courts Act".
      6. EXTRACT UNIQUE FACTS: Read the user's Description carefully. Extract 1 unique factual noun (e.g., the specific product sold, industry, or relationship like "textiles", "software", "brother-in-law") and include it with an ANDD condition to find highly context-specific precedents!"""

content = content.replace(bad_block, good_block)

with open('src/app/api/forecast/route.ts', 'w') as f:
    f.write(content)
