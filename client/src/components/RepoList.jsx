function RepoList({ repos }) {
  // ✅ Sort repos by stars (descending)
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div>
      <h3>🔥 Top Repositories</h3>

      {topRepos.map((repo) => (
        <div
          key={repo.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h4>{repo.name}</h4>
          <p>{repo.description}</p>

          <p>
            ⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count}
          </p>

          <p>🧠 Language: {repo.language}</p>

          <a href={repo.html_url} target="_blank">
            View Repo
          </a>
        </div>
      ))}
    </div>
  );
}

export default RepoList;