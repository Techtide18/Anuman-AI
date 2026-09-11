import re

with open('src/app/api/forecast/route.ts', 'r') as f:
    content = f.read()

content = content.replace("data.defenceRaised.join(', ')", "data.defenceRaised")
content = content.replace("data.natureOfDispute.join(', ')", "data.natureOfDispute")
content = content.replace("data.natureOfRelief.join(', ')", "data.natureOfRelief")

with open('src/app/api/forecast/route.ts', 'w') as f:
    f.write(content)
