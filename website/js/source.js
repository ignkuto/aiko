function fetchLeaderboard(serverID, count=10) {
  return new Promise(async (resolve, reject) => {
    const users = await fetch(``)
      .then(res => res.json());

    if (users.error) {
      reject(console.error(`REST API Error: ${data.error}`));
    }

    resolve(users.data);
  });
}
