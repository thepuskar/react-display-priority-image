export const formatUsers = (users) => {
  const priorityRank = [
    "google",
    "linkedin",
    "facebook",
    "twitter",
    "office365",
  ];
  const defaultImage = "https://via.placeholder.com/350x150";
  const formatedUsers = [];
  for (let user of users) {
    const photos = {};
    for (let { source, url } of user.photos) {
      photos[source] = url;
    }

    user.photos = [];
    for (let priority of priorityRank) {
      if (photos.hasOwnProperty(priority)) {
        user.photos.push({
          source: priority,
          url: photos[priority],
        });
      }
    }

    user.currentSrc = 0;
    user.photos.push({ url: defaultImage });
    formatedUsers.push(user);
  }
  return formatedUsers;
};
