import json from "./JsonData.js";

/* 
함수 추출하기
- 별도 함수로 빼냈을 때 유효범위를 벗어나는 변수, 즉 새 함수에서는 곧바로 사용할 수 없는 변수가 있는지 확인한다.

이번 예에서는 perf, play, thisAmount가 여기 속한다.
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
    const play = playFor(perf);
    let thisAmount = amountFor(perf, play);

    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);

    // comedy 관객 5명마다 추가 포인트를 제공
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역 출력
    result += ` ${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;

  // 값이 바뀌지 않는 변수는 매개변수로 전달
  function amountFor(aPerformance, play) {
    let result = 0; // 변수를 초기화하는 코드
    // 함수의 반환 값에 result라는 이름을 쓰면 그 변수의 역할을 쉽게 알 수 있다.

    switch (play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 1000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }

    return result; // 함수 안에서 값이 바뀌는 변수 반환
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
}

console.log(statement(json.invoice, json.plays));
/* 
청구 내역 (고객명: BigCo)
 Hamlet: $650.00 (55석)
 As You Like It: $490.00 (35석)
 Othello: $500.00 (40석)
총액: $1,640.00
적립 포인트: 47점
*/
