export function filterComment(comment) {
  // Simple filter to remove banned words
  const bannedWords = process.env.bannedWords
    ? process.env.bannedWords.split(",")
    : [];
  let filteredContent = comment;
  bannedWords.forEach((word) => {
    const regex = new RegExp(`\\b${word.trim()}\\b`, "gi");
    filteredContent = filteredContent.replace(regex, "****");
  });
  return filteredContent;
}

export function filterUsername(username) {
  // Simple filter to remove banned words
  const bannedWords = process.env.bannedWords
    ? process.env.bannedWords.split(",")
    : [];
  let filteredUsername = username;
  let filtered = false;
  bannedWords.forEach((word) => {
    if (filteredUsername.toLowerCase().includes(word.trim().toLowerCase())) {
      filteredUsername = "Anon";
      filtered = true;
    }
  });
  return { filteredUsername, filtered };
}
