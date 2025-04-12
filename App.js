
import { useState } from "react";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(517750);
  const [interestRate, setInterestRate] = useState(5.94);
  const [loanTerm, setLoanTerm] = useState(30);
  const [extraRepayment, setExtraRepayment] = useState(0);
  const [growthRate, setGrowthRate] = useState(3);

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTerm * 12;
  const monthlyRepayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  let balance = loanAmount;
  let interestPaid = 0;
  let month = 0;

  while (balance > 0 && month < totalMonths) {
    const interest = balance * monthlyRate;
    const principal = monthlyRepayment - interest + parseFloat(extraRepayment);
    interestPaid += interest;
    balance -= principal;
    month++;
    if (balance < 0) balance = 0;
  }

  const totalPaid = month * (monthlyRepayment + parseFloat(extraRepayment));
  const monthsSaved = totalMonths - month;

  const projectedValue =
    545000 * Math.pow(1 + growthRate / 100, month / 12);
  const equity = projectedValue - balance;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Loan & Property Growth Calculator</h1>

      <div className="grid grid-cols-2 gap-4">
        <label>
          Loan Amount
          <input
            type="number"
            className="input"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Interest Rate (%)
          <input
            type="number"
            step="0.01"
            className="input"
            value={interestRate}
            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Loan Term (Years)
          <input
            type="number"
            className="input"
            value={loanTerm}
            onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Extra Repayment / Month
          <input
            type="number"
            className="input"
            value={extraRepayment}
            onChange={(e) => setExtraRepayment(parseFloat(e.target.value))}
          />
        </label>

        <label>
          Annual Growth Rate (%)
          <input
            type="number"
            step="0.1"
            className="input"
            value={growthRate}
            onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Loan Summary</h2>
        <p><strong>Monthly Repayment:</strong> ${monthlyRepayment.toFixed(2)}</p>
        <p><strong>Actual Term:</strong> {month} months</p>
        <p><strong>Months Saved:</strong> {monthsSaved} months</p>
        <p><strong>Total Interest Paid:</strong> ${interestPaid.toFixed(2)}</p>
        <p><strong>Total Paid:</strong> ${totalPaid.toFixed(2)}</p>
      </div>

      <div className="mt-4 p-4 bg-green-100 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Property Growth & Equity</h2>
        <p><strong>Projected Property Value:</strong> ${projectedValue.toFixed(2)}</p>
        <p><strong>Equity Gained:</strong> ${equity.toFixed(2)}</p>
      </div>
    </div>
  );
}
