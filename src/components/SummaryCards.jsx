import { FaWallet, FaArrowDown, FaArrowUp, FaListUl } from "react-icons/fa";

function SummaryCards({ totalBalance, totalIncome, totalExpenses, transactionCount }) {
  const cards = [
    {
      label: "Total Balance",
      value: `₹${totalBalance.toLocaleString("en-IN")}`,
      helper: "Income minus expenses",
      icon: <FaWallet />
    },
    {
      label: "Income",
      value: `₹${totalIncome.toLocaleString("en-IN")}`,
      helper: "All incoming money",
      icon: <FaArrowDown />
    },
    {
      label: "Expenses",
      value: `₹${totalExpenses.toLocaleString("en-IN")}`,
      helper: "All outgoing money",
      icon: <FaArrowUp />
    },
    {
      label: "Transactions",
      value: transactionCount,
      helper: "Current records",
      icon: <FaListUl />
    }
  ];

  return (
    <section className="card_grid">
      {cards.map((card, index) => (
        <div className="summary_card animated_card" key={card.label} style={{ animationDelay: `${index * 0.08}s` }}>
          <div className="summary_top">
            <p>{card.label}</p>
            <div className="summary_icon">{card.icon}</div>
          </div>
          <h3>{card.value}</h3>
          <span>{card.helper}</span>
        </div>
      ))}
    </section>
  );
}

export default SummaryCards;
