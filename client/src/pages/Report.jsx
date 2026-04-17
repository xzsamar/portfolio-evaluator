import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import RadarChart from "../components/RadarChart";
import RepoList from "../components/RepoList";

function Report() {
  const { username } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/profile/${username}`
        );
        setData(res.data);
      } catch {
        alert("User not found");
      }
    };

    fetchData();
  }, [username]);

  if (!data) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Report for {username}</h1>

      <h2>{data.user.name}</h2>
      <img src={data.user.avatar_url} width="100" />

      <h3>Score: {data.scores.overall}/100</h3>

      <RadarChart scores={data.scores} />
      <RepoList repos={data.repos} />
    </div>
  );
}

export default Report;