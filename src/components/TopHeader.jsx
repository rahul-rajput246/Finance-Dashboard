import { FaBell, FaSearch, FaMoon } from "react-icons/fa";

function TopHeader({ darkMode, setDarkMode }) {
  return (
    <div className="top_header">
      <div className="top_left">
        <h2>Finance Dashboard</h2>
        <p>Track your money with clarity</p>
      </div>

      <div className="top_right">
        <div className="search_box">
          <FaSearch />
          <input type="text" placeholder="Search..." />
        </div>

        <button className="icon_btn">
          <FaBell />
        </button>

        <button className="icon_btn" onClick={() => setDarkMode(!darkMode)}>
          <FaMoon />
        </button>

        <div className="profile_box">
          <div className="profile_circle">R</div>
          <div>
            <h4>Rahul Rajput</h4>
            <p>Frontend Intern</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;