import re

with open('src/app/api/forecast/route.ts', 'r') as f:
    content = f.read()

bad_block = """      "forecast": { "successProbability": number, "awardMin": number, "awardMax": number, "awardMedian": number },"""
good_block = """      "forecast": { "successProbability": number /* e.g. 68 for 68% */, "awardMin": number, "awardMax": number, "awardMedian": number },"""

content = content.replace(bad_block, good_block)

with open('src/app/api/forecast/route.ts', 'w') as f:
    f.write(content)
