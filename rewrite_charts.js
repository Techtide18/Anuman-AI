const fs = require('fs');

const path = 'src/app/forecast/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const originalCharts = `
            {/* 4. Data & Analytics Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Backlog Chart */}
              <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
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
                      <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#a855f7'}} formatter={(value) => formatINR(value)} />
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
                            <Cell key={\`cell-\${index}\`} fill={courtLevel.includes(entry.name.replace(' H.', ' House')) ? '#a855f7' : '#333'} />
                          ))
                        }
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Cost of Delay Line Chart */}
              <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
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
                      { year: \`Year \${results.settlement.delayYears}\`, cost: results.settlement.costOfDelay }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="year" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, true)} width={65} />
                      <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#ef4444'}} formatter={(value) => \`₹\${formatINR(value)}\`} />
                      <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={3} dot={{fill: '#ef4444', r: 4}} activeDot={{r: 6, fill: '#ef4444', stroke: '#fff'}} name="Cumulative Cost" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
`;

// wait, how to write the new charts cleanly?
const newCharts = \`
            {/* 4. Data & Analytics Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {vertical === 'cheque_bounce' && (
                <>
                  <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
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
                          <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#a855f7'}} formatter={(value) => formatINR(value)} />
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
                                <Cell key={\`cell-\${index}\`} fill={courtLevel.includes(entry.name.replace(' H.', ' House')) ? '#a855f7' : '#333'} />
                              ))
                            }
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
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
                          { year: \`Year \${results.settlement.delayYears}\`, cost: results.settlement.costOfDelay }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="year" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, true)} width={65} />
                          <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#ef4444'}} formatter={(value) => \`₹\${formatINR(value)}\`} />
                          <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={3} dot={{fill: '#ef4444', r: 4}} activeDot={{r: 6, fill: '#ef4444', stroke: '#fff'}} name="Cumulative Cost" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}

              {vertical === 'commercial' && (
                <>
                  <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
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
                          <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#3b82f6'}} formatter={(value) => \`₹\${formatINR(value)}\`} />
                          <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <h2 className="text-lg font-semibold text-white">Arbitration Cost Trajectory</h2>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { stage: 'Notice', cost: results.settlement.costOfDelay * 0.1 },
                          { stage: 'Mediation', cost: results.settlement.costOfDelay * 0.2 },
                          { stage: 'Tribunal', cost: results.settlement.costOfDelay * 0.6 },
                          { stage: 'Final Award', cost: results.settlement.costOfDelay }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="stage" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, true)} width={65} />
                          <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#10b981'}} formatter={(value) => \`₹\${formatINR(value)}\`} />
                          <Line type="monotone" dataKey="cost" stroke="#10b981" strokeWidth={3} dot={{fill: '#10b981', r: 4}} name="Cost" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}

              {vertical === 'family' && (
                <>
                  <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
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
                          <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#ec4899'}} formatter={(value) => \`₹\${formatINR(value)}\`} />
                          <Bar dataKey="amount" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={60} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="h-5 w-5 text-yellow-500" />
                      <h2 className="text-lg font-semibold text-white">Lump Sum Settlement Range</h2>
                    </div>
                    <div className="h-64 w-full flex flex-col justify-center items-center">
                       <p className="text-sm text-gray-400 mb-4 text-center">Based on typical capitalized value of maintenance</p>
                       <div className="text-4xl font-bold text-yellow-500 mb-2">₹{formatINR(results.settlement.recommendedMedian || results.forecast.awardMedian * 60)}</div>
                       <p className="text-sm text-yellow-300">Expected One-Time Settlement</p>
                       <div className="w-full mt-8 bg-gray-800 h-2 rounded-full relative">
                         <div className="absolute top-0 h-2 bg-yellow-500/50 rounded-full" style={{left: '20%', right: '20%'}}></div>
                         <div className="absolute -top-6 left-[20%] text-xs text-gray-400">Min</div>
                         <div className="absolute -top-6 right-[20%] text-xs text-gray-400">Max</div>
                       </div>
                    </div>
                  </div>
                </>
              )}

            </div>
\`

content = content.replace(originalCharts, newCharts);
fs.writeFileSync(path, content, 'utf8');
