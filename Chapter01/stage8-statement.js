import json from "./JsonData.js";
import createStatementData from "./stage8-createStatementData.js";

// 코드 나누기
function htmlStatement(invoice, plays) {
  return rederHtml(createStatementData(invoice, plays));
}

function rederHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += `<table>\n`;
  result += `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>\n`;
  for (let perf of data.performances) {
    result += ` <tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td><td>${usd(perf.amount)}</td></tr>\n`;
  }
  result += `</table>\n`;

  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}점</em></p>\n`;
  return result;

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}

console.log(htmlStatement(json.invoice, json.plays));
/* 
청구 내역 (고객명: BigCo)
 Hamlet: $650.00 (55석)
 As You Like It: $490.00 (35석)
 Othello: $500.00 (40석)
총액: $1,640.00
적립 포인트: 47점
*/
