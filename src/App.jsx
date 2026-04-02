import { useEffect, useMemo, useState } from "react";
import TopHeader from "./components/TopHeader";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import LineChartCard from "./components/LineChartCard";
import CategoryChartCard from "./components/CategoryChartCard";
import InsightsSection from "./components/InsightsSection";
import TransactionsSection from "./components/TransactionsSection";
import TransactionForm from "./components/TransactionForm";
import { categoryOptions, initialTransactions } from "./data/mockData";
import "./App.css";

function App() {
  const [role, setRole] = useState("viewer");
  const [darkMode, setDarkMode] = useState(false);

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("finance_transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "All",
    sortBy: "date-desc"
  });

  useEffect(() => {
    localStorage.setItem("finance_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark_mode");
    } else {
      document.body.classList.remove("dark_mode");
    }
  }, [darkMode]);

  const handleAddTransaction = (newTransaction) => {
    const transactionToSave = {
      id: Date.now(),
      ...newTransaction
    };

    setTransactions([transactionToSave, ...transactions]);
  };

  const handleDeleteTransaction = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (!confirmDelete) return;

    const updatedTransactions = transactions.filter((item) => item.id !== id);
    setTransactions(updatedTransactions);
  };

  const filteredTransactions = useMemo(() => {
    let updatedList = [...transactions];

    if (filters.search.trim()) {
      updatedList = updatedList.filter((item) => {
        const searchText = filters.search.toLowerCase();

        return (
          item.title.toLowerCase().includes(searchText) ||
          item.category.toLowerCase().includes(searchText)
        );
      });
    }

    if (filters.type !== "all") {
      updatedList = updatedList.filter((item) => item.type === filters.type);
    }

    if (filters.category !== "All") {
      updatedList = updatedList.filter((item) => item.category === filters.category);
    }

    if (filters.sortBy === "date-desc") {
      updatedList.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (filters.sortBy === "date-asc") {
      updatedList.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (filters.sortBy === "amount-desc") {
      updatedList.sort((a, b) => b.amount - a.amount);
    }

    if (filters.sortBy === "amount-asc") {
      updatedList.sort((a, b) => a.amount - b.amount);
    }

    return updatedList;
  }, [transactions, filters]);

  const totalIncome = useMemo(() => {
    return transactions
      .filter((item) => item.type === "income")
      .reduce((total, item) => total + item.amount, 0);
  }, [transactions]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((item) => item.type === "expense")
      .reduce((total, item) => total + item.amount, 0);
  }, [transactions]);

  const totalBalance = totalIncome - totalExpenses;

  const monthlyTrendData = useMemo(() => {
    const monthMap = {};

    transactions.forEach((item) => {
      const date = new Date(item.date);
      const monthKey = date.toLocaleString("en-US", { month: "short" });

      if (!monthMap[monthKey]) {
        monthMap[monthKey] = {
          income: 0,
          expenses: 0
        };
      }

      if (item.type === "income") {
        monthMap[monthKey].income += item.amount;
      } else {
        monthMap[monthKey].expenses += item.amount;
      }
    });

    return Object.keys(monthMap).map((month) => ({
      month,
      balance: monthMap[month].income - monthMap[month].expenses
    }));
  }, [transactions]);

  const categoryChartData = useMemo(() => {
    const categoryTotals = {};

    transactions
      .filter((item) => item.type === "expense")
      .forEach((item) => {
        if (!categoryTotals[item.category]) {
          categoryTotals[item.category] = 0;
        }

        categoryTotals[item.category] += item.amount;
      });

    return Object.keys(categoryTotals)
      .map((category) => ({
        category,
        amount: categoryTotals[category]
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const insights = useMemo(() => {
    const topCategory = categoryChartData[0];
    const latestMonth = monthlyTrendData[monthlyTrendData.length - 1];
    const previousMonth = monthlyTrendData[monthlyTrendData.length - 2];

    let monthlyMessage = "Not enough month data for comparison.";

    if (latestMonth && previousMonth) {
      const difference = latestMonth.balance - previousMonth.balance;

      monthlyMessage =
        difference >= 0
          ? `Balance is up by ₹${difference.toLocaleString("en-IN")} compared to last month.`
          : `Balance is down by ₹${Math.abs(difference).toLocaleString("en-IN")} compared to last month.`;
    }

    return [
      {
        title: "Highest Spending Category",
        value: topCategory ? topCategory.category : "No data",
        note: topCategory
          ? `You spent ₹${topCategory.amount.toLocaleString("en-IN")} in this category.`
          : "Add some expense data to see this."
      },
      {
        title: "Monthly Comparison",
        value: latestMonth ? latestMonth.month : "No month data",
        note: monthlyMessage
      },
      {
        title: "Useful Observation",
        value: totalExpenses > totalIncome ? "Overspending Alert" : "Healthy Balance",
        note:
          totalExpenses > totalIncome
            ? "Your expenses are higher than income. You may need to control spending."
            : "Your income is currently covering your expenses."
      }
    ];
  }, [categoryChartData, monthlyTrendData, totalExpenses, totalIncome]);

  
 return (
  <div className="layout_shell">
    <Sidebar role={role} />

    <main className="main_content">
      <TopHeader darkMode={darkMode} setDarkMode={setDarkMode} />

      <section id="overview">
        <Header
          role={role}
          setRole={setRole}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </section>

      <section id="summary">
        <SummaryCards
          totalBalance={totalBalance}
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          transactionCount={transactions.length}
        />
      </section>

      <section id="charts" className="charts_grid">
        <LineChartCard data={monthlyTrendData} />
        <CategoryChartCard data={categoryChartData} />
      </section>

      <section id="insights" className="section_block">
        <div className="section_heading">
          <div>
            <h2>Insights</h2>
            <p>Simple observations from the finance data</p>
          </div>
          <div className="panel_badge">Auto Calculated</div>
        </div>
        <InsightsSection insights={insights} />
      </section>

      <section id="transactions">
        {role === "admin" ? (
          <TransactionForm
            onAddTransaction={handleAddTransaction}
            categoryOptions={categoryOptions}
          />
        ) : (
          <div className="panel_card role_note better_role_note animated_card">
            <div className="section_top">
              <div>
                <h2>Viewer Mode Active</h2>
                <p>You can explore the dashboard but cannot change the transaction data.</p>
              </div>
              <div className="panel_badge">Read Only</div>
            </div>
          </div>
        )}

        <TransactionsSection
          transactions={filteredTransactions}
          filters={filters}
          setFilters={setFilters}
          onDeleteTransaction={handleDeleteTransaction}
          role={role}
        />
      </section>

      <footer className="footer_box">
        <p>Made by Rahul Rajput • React + JavaScript + CSS</p>
      </footer>
    </main>
  </div>
);
}

export default App;
