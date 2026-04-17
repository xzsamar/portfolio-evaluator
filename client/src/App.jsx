import { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import RadarChart from "./components/RadarChart";
import RepoList from "./components/RepoList";
import Report from "./pages/Report";

function Home() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  const searchUser = async () => {
    if (!username) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/profile/${username}`
      );
      setData(res.data);
    } catch {
      alert("User not found");
      setData(null);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 GitHub Portfolio Evaluator</h1>

      {/* 🔍 Search */}
      <div style={styles.searchBox}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          style={styles.input}
        />
        <button onClick={searchUser} style={styles.button}>
          Search
        </button>
      </div>

      {data && (
        <div style={styles.grid}>
          {/* 👤 Profile */}
          <div style={styles.card}>
            <img
              src={data.user.avatar_url}
              alt="avatar"
              style={styles.avatar}
            />
            <h2>{data.user.name || data.user.login}</h2>
            <p>{data.user.bio}</p>
            <p>👥 {data.user.followers} followers</p>
            <p>📦 {data.user.public_repos} repos</p>

            {/* 🔗 Report Button */}
            <a href={`/report/${username}`}>
              <button style={{ ...styles.button, marginTop: "10px" }}>
                View Full Report
              </button>
            </a>
          </div>

          {/* 📊 Scores */}
          <div style={styles.card}>
            <h3>📊 Scores</h3>
            <p>Activity: {data.scores.activity}</p>
            <p>Code Quality: {data.scores.codeQuality}</p>
            <p>Diversity: {data.scores.diversity}</p>
            <p>Community: {data.scores.community}</p>
            <p>Hiring Ready: {data.scores.hiringReady}</p>
            <h2>🏆 {data.scores.overall}/100</h2>
          </div>

          {/* 📈 Chart */}
          <div style={styles.card}>
            <RadarChart scores={data.scores} />
          </div>

          {/* ⭐ Repos */}
          <div style={{ ...styles.card, gridColumn: "span 2" }}>
            <RepoList repos={data.repos} />
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report/:username" element={<Report />} />
    </Routes>
  );
}

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#520e0e",
    minHeight: "100vh"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  searchBox: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "30px"
  },
  input: {
    padding: "12px",
    width: "250px",
    borderRadius: "8px",
    border: "1px solid #f6f4f4",
    marginRight: "10px"
  },
  button: {
    padding: "12px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(172, 18, 18, 0.1)"
  },
  avatar: {
    width: "100px",
    borderRadius: "50%",
    marginBottom: "10px"
  }
};

export default App;