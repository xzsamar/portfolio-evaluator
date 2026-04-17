const calculateScores = (user, repos) => {
  let activity = 0;
  let codeQuality = 0;
  let diversity = 0;
  let community = 0;
  let hiringReady = 0;

  // Activity
  activity = Math.min(repos.length * 2, 25);

  // Code Quality
  repos.forEach(repo => {
    if (repo.description) codeQuality += 1;
    if (repo.license) codeQuality += 1;
    if (repo.topics && repo.topics.length > 0) codeQuality += 1;
  });
  codeQuality = Math.min(codeQuality, 20);

  // Diversity
  const languages = new Set(repos.map(r => r.language).filter(Boolean));
  diversity = Math.min(languages.size * 2, 20);

  // Community
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  community = Math.min(
    (totalStars + totalForks + user.followers) / 10,
    20
  );

  // Hiring readiness
  if (user.bio) hiringReady += 5;
  if (user.blog) hiringReady += 5;
  if (user.email) hiringReady += 5;
  if (repos.length > 5) hiringReady += 5;

  hiringReady = Math.min(hiringReady, 15);

  const overall =
    activity +
    codeQuality +
    diversity +
    community +
    hiringReady;

  return {
    activity,
    codeQuality,
    diversity,
    community,
    hiringReady,
    overall: Math.round(overall)
  };
};

module.exports = { calculateScores };