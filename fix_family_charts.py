with open('src/app/forecast/page.tsx', 'r') as f:
    content = f.read()

old_family = """              {vertical === 'family' && (
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
                          <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#ec4899'}} formatter={(value) => `\\u20b9${formatINR(value)}`} />
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
                       <div className="text-4xl font-bold text-yellow-500 mb-2">\\u20b9{formatINR(results.settlement.recommendedMax)}</div>
                       <p className="text-sm text-yellow-300">Expected One-Time Settlement</p>
                       <div className="w-full mt-8 bg-gray-800 h-2 rounded-full relative">
                         <div className="absolute top-0 h-2 bg-yellow-500/50 rounded-full" style={{left: '20%', right: '20%'}}></div>
                         <div className="absolute -top-6 left-[20%] text-xs text-gray-400">Min</div>
                         <div className="absolute -top-6 right-[20%] text-xs text-gray-400">Max</div>
                       </div>
                    </div>
                  </div>
                </>
              )}"""

new_family = """              {vertical === 'family' && (
                <>
                  <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Activity className="h-5 w-5 text-pink-500" />
                      <h2 className="text-lg font-semibold text-white">Precedent Outcome Breakdown</h2>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={(() => {
                              const won = results.similarCases.filter((c: any) => c.outcomeType === 'won').length;
                              const lost = results.similarCases.filter((c: any) => c.outcomeType === 'lost').length;
                              const settled = results.similarCases.filter((c: any) => c.outcomeType === 'settled').length;
                              return [
                                { name: 'Won', value: won, fill: '#22c55e' },
                                { name: 'Lost', value: lost, fill: '#ef4444' },
                                { name: 'Settled', value: settled, fill: '#eab308' }
                              ].filter(d => d.value > 0);
                            })()}
                            cx="50%" cy="50%" innerRadius={50} outerRadius={80}
                            paddingAngle={3} dataKey="value"
                            label={({ name, value }) => `${name}: ${value}`}
                          >
                          </Pie>
                          <Tooltip contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} />
                          <Legend wrapperStyle={{color: '#ccc', fontSize: 12}} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-[#121212] rounded-xl shadow-sm border border-white/10 p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <TrendingUp className="h-5 w-5 text-yellow-500" />
                      <h2 className="text-lg font-semibold text-white">Award Amounts Across Precedents</h2>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={results.similarCases.filter((c: any) => c.awardAmount > 0).map((c: any, i: number) => ({ name: `Case ${i + 1}`, amount: c.awardAmount, year: c.year }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                          <XAxis dataKey="name" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                          <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => formatChartAxis(val, true)} width={65} />
                          <Tooltip cursor={{fill: '#222'}} contentStyle={{backgroundColor: '#111', borderColor: '#333', color: '#fff'}} itemStyle={{color: '#eab308'}} formatter={(value: any, name: any, props: any) => [`\\u20b9${formatINR(value)}`, `Award (${props.payload.year})`]} />
                          <Bar dataKey="amount" fill="#eab308" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}"""

content = content.replace(old_family, new_family)

with open('src/app/forecast/page.tsx', 'w') as f:
    f.write(content)
