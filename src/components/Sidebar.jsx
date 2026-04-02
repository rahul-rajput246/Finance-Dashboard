import {
  FaChartPie,
  FaWallet,
  FaExchangeAlt,
  FaLightbulb,
  FaUserShield
} from "react-icons/fa";

function Sidebar({ role }) {
 const navItems = [
  { id: 1, label: "Overview", target: "#overview" },
  { id: 2, label: "Charts", target: "#charts" },
  { id: 3, label: "Insights", target: "#insights" },
  { id: 4, label: "Transactions", target: "#transactions" }
];

  return (
    <aside className="sidebar">
      <div className="sidebar_brand">
        <div className="brand_logo">₹</div>
        <div>
          <h2>FinTrack</h2>
          <p>Dashboard UI</p>
        </div>
      </div>

      <nav className="sidebar_nav">
        {navItems.map((item) => (
          <a href={item.target} className="sidebar_link" key={item.id}>
            <span className="sidebar_icon">{item.icon}</span>
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar_role_box">
        <div className="role_icon_circle">
          <FaUserShield />
        </div>
        <p className="sidebar_role_title">Frontend Role Demo</p>
        <h3>{role === "admin" ? "Admin Access" : "Viewer Access"}</h3>
        <span>
          {role === "admin"
            ? "You can add and delete transactions."
            : "You can only view dashboard data."}
        </span>
      </div>
    </aside>
  );
}

export default Sidebar;