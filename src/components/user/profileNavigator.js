export const confirmVisitProfile = (navigate, userId, username) => {
  const confirmed = window.confirm(`Visit ${username}'s profile?`);
  if (confirmed) {
    navigate(`/users/${userId}`);
  }
};
