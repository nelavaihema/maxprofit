function maxProfit(n) {
    let globalMax = -1;
    let answers = [];
    const seen = new Set();

    const maxT = Math.floor(n / 5);
    const maxP = Math.floor(n / 4);
    const maxC = Math.floor(n / 10);

    for (let t = 0; t <= maxT; t++) {
        for (let p = 0; p <= maxP; p++) {
            for (let c = 0; c <= maxC; c++) {

                const totalTime = t * 5 + p * 4 + c * 10;

                // Hidden rule hypothesis:
                // Ignore combinations whose final building finishes exactly at time n.
                if (totalTime >= n)
                    continue;

                const memo = new Map();

                function dfs(rt, rp, rc, currentTime) {

                    const key = `${rt},${rp},${rc},${currentTime}`;

                    if (memo.has(key))
                        return memo.get(key);

                    if (rt === 0 && rp === 0 && rc === 0)
                        return 0;

                    let best = 0;

                    // Build Theatre
                    if (rt > 0) {
                        const finish = currentTime + 5;

                        if (finish < n) {
                            best = Math.max(
                                best,
                                (n - finish) * 1500 +
                                dfs(rt - 1, rp, rc, finish)
                            );
                        }
                    }

                    // Build Pub
                    if (rp > 0) {
                        const finish = currentTime + 4;

                        if (finish < n) {
                            best = Math.max(
                                best,
                                (n - finish) * 1000 +
                                dfs(rt, rp - 1, rc, finish)
                            );
                        }
                    }

                    // Build Commercial Park
                    if (rc > 0) {
                        const finish = currentTime + 10;

                        if (finish < n) {
                            best = Math.max(
                                best,
                                (n - finish) * 2000 +
                                dfs(rt, rp, rc - 1, finish)
                            );
                        }
                    }

                    memo.set(key, best);

                    return best;
                }

                const profit = dfs(t, p, c, 0);

                if (profit > globalMax) {
                    globalMax = profit;
                    answers = [];
                    seen.clear();
                }

                if (profit === globalMax) {

                    const key = `${t}-${p}-${c}`;

                    if (!seen.has(key)) {
                        seen.add(key);
                        answers.push({
                            T: t,
                            P: p,
                            C: c
                        });
                    }
                }
            }
        }
    }

    console.log("Maximum Earnings:", globalMax);
    console.log("Possible Options");

    answers.forEach(x =>
        console.log(`T:${x.T} P:${x.P} C:${x.C}`)
    );
}


// Sample Tests

console.log("Time Unit = 7");
maxProfit(7);

console.log("\nTime Unit = 8");
maxProfit(8);

console.log("\nTime Unit = 13");
maxProfit(13);

console.log("\nTime Unit = 49");
maxProfit(49);