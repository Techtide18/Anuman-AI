import re

# 1. Update Impact Page
with open('src/app/impact/page.tsx', 'r') as f:
    impact = f.read()

impact = impact.replace('1,248', '120+')
impact = impact.replace('3,800+', '380+')
impact = impact.replace('₹18 Cr+', '₹1.8 Cr+')

with open('src/app/impact/page.tsx', 'w') as f:
    f.write(impact)

# 2. Update About Page
with open('src/app/about/page.tsx', 'r') as f:
    about = f.read()

old_team_section = """      {/* Leadership / Team (Placeholder) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The Team Behind the Data</h2>
          <p className="text-xl text-gray-400">Technologists, data scientists, and legal innovators.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden group">
              <div className="h-64 bg-gray-800 w-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">Headshot Placeholder</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">Founder Name</h3>
                <p className="text-blue-400 text-sm font-medium mb-4">Role / Title</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Brief bio about the founder's background in law, tech, or business, and why they are passionate about solving the legal backlog.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>"""

new_team_section = """      {/* Leadership / Team */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">The Team Behind the Data</h2>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden group max-w-sm w-full">
            <div className="h-80 w-full relative">
              <img src="/assets/founder.jpg" alt="Saatvik Pundeer" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-1">Saatvik Pundeer</h3>
              <p className="text-blue-400 text-sm font-medium mb-4">Founder</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Passionate about bringing transparency, data, and speed to dispute resolution, building the infrastructure to settle disputes before they enter the backlog.
              </p>
              <a href="https://www.linkedin.com/in/saatvik-pundeer-b3a16b436/" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>"""

about = about.replace(old_team_section, new_team_section)

with open('src/app/about/page.tsx', 'w') as f:
    f.write(about)

# 3. Update Home Page (Add Team, Revert badgeImgSrc)
with open('src/app/page.tsx', 'r') as f:
    home = f.read()

home = home.replace('badgeImgSrc="/assets/logo.jpg"', 'badgeImgSrc="https://cdn.21st.dev/assets/mirror/23/23a474e4cceeaf6b98729302d689998195e5534241cbc33ee2c64dfc351c16d6.png"')

# Add Team Section to Home Page above FAQs
team_section_home = """      {/* 9.5 TEAM SECTION */}
      <section className="py-24 px-6 lg:px-8 max-w-7xl mx-auto bg-[#000000]">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Team Behind the Data</h2>
        </div>
        <div className="flex justify-center">
          <div className="bg-[#121212] rounded-2xl border border-white/5 overflow-hidden group max-w-sm w-full">
            <div className="h-80 w-full relative">
              <img src="/assets/founder.jpg" alt="Saatvik Pundeer" className="absolute inset-0 w-full h-full object-cover object-top" />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-1">Saatvik Pundeer</h3>
              <p className="text-blue-400 text-sm font-medium mb-4">Founder</p>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Passionate about bringing transparency, data, and speed to dispute resolution, building the infrastructure to settle disputes before they enter the backlog.
              </p>
              <a href="https://www.linkedin.com/in/saatvik-pundeer-b3a16b436/" target="_blank" rel="noopener noreferrer" className="inline-block text-blue-500 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQs */}"""

home = home.replace('{/* 10. FAQs */}', team_section_home)

with open('src/app/page.tsx', 'w') as f:
    f.write(home)

