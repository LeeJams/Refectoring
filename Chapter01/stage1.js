import json from "./JsonData.js";

/* 
연극을 외주로 받아서 공연하는 극단.
공연 요청이 들어오면 연극의 장르와 관객 규모를 기준으로 비용을 책정한다.

현재 비극과 희극만 공연하고 공연료와 별개로 포인트를 지급해 다음 의뢰 시 공연료를 할인 받을 수 있다.

현재 코드는 장르를 추가하는 등 새로운 요구사항이 생길 시 문제를 야기한다.
연극 장르와 공연료 정책이 달라질 때마다 statement() 함수를 수정해야 한다.
*/

function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 1000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);

    // comedy 관객 5명마다 추가 포인트를 제공
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역 출력
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

console.log(statement(json.invoice, json.plays));
