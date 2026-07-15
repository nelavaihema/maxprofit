function maximizeProfit(n) {
  const projects = [
    { name: 'T', duration: 5, earningPerUnit: 1500 },
    { name: 'P', duration: 4, earningPerUnit: 1000 },
    { name: 'C', duration: 10, earningPerUnit: 2000 },
  ];

  const dp = Array(n + 2).fill(0);
  const choice = Array(n + 2).fill(null);

  for (let time = n; time >= 1; time--) {
    let bestProfit = 0;
    let bestChoice = null;

    for (const project of projects) {
      const remainingUnits = n - time - project.duration + 1;
      const profitIfBuilt = remainingUnits > 0 ? remainingUnits * project.earningPerUnit : 0;
      const totalProfit = profitIfBuilt + dp[time + project.duration];

      if (totalProfit > bestProfit) {
        bestProfit = totalProfit;
        bestChoice = project.name;
      }
    }

    dp[time] = bestProfit;
    choice[time] = bestChoice;
  }

  const counts = { T: 0, P: 0, C: 0 };
  let currentTime = 1;

  while (currentTime <= n) {
    const selected = choice[currentTime];
    if (!selected) break;

    const project = projects.find((item) => item.name === selected);
    counts[selected] += 1;
    currentTime += project.duration;
  }

  return {
    earnings: dp[1],
    solution: `T: ${counts.T} P: ${counts.P} C: ${counts.C}`,
  };
}

const samples = [7, 8, 13];
for (const n of samples) {
  const result = maximizeProfit(n);
  console.log(`Input Time Unit: ${n}`);
  console.log(`Output Earnings: $${result.earnings}`);
  console.log(`Solutions`);
  console.log(`1. ${result.solution}`);
  console.log();
}
