
async function getSignal() {
  const pair = document.getElementById("pair").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Loading...";

  const apiKey = "KOM9PMO8FDBJBUYN";
  const url = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${pair.slice(0, 3)}&to_symbol=${pair.slice(3)}&interval=5min&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const timeSeries = data["Time Series FX (5min)"];
    const times = Object.keys(timeSeries);
    const latest = timeSeries[times[0]];
    const previous = timeSeries[times[1]];

    const latestClose = parseFloat(latest["4. close"]);
    const previousClose = parseFloat(previous["4. close"]);

    const signal = latestClose > previousClose ? "BUY" : "SELL";
    resultDiv.innerHTML = `Signal: <span style="color:${signal === 'BUY' ? 'green' : 'red'}">${signal}</span>`;
  } catch (err) {
    resultDiv.innerHTML = "Error fetching signal.";
  }
}
