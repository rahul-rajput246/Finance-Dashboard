function Header({ role, setRole, darkMode, setDarkMode }) {
  return (
    <header className="hero_header">
      <div className="hero_left">
        <div className="hero_badge">Finance Dashboard Assignment</div>
        <h1>Rahul Finance Dashboard</h1>
        <p className="hero_text">
          Clean and interactive finance dashboard built with React, normal JavaScript,
          and normal CSS. It shows summary, charts, transactions, role based UI,
          and simple insights from mock data.
        </p>

        <div className="hero_tags">
          <span>Responsive</span>
          <span>Dark Mode</span>
          <span>localStorage</span>
          <span>RBAC Demo</span>
        </div>
      </div>

      <div className="hero_right">
        <div className="role_card">
          <p className="small_title">Current Role</p>

          <div className="role_switch">
            <button
              className={role === "viewer" ? "role_btn active_role" : "role_btn"}
              onClick={() => setRole("viewer")}
            >
              Viewer
            </button>

            <button
              className={role === "admin" ? "role_btn active_role" : "role_btn"}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
          </div>

          <p className="role_help">
            Viewer can only see data. Admin can add or delete transactions for demo.
          </p>
        </div>

        <button className="theme_btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Theme" : "Dark Theme"}
        </button>
      </div>
    </header>
  );
}

export default Header;
