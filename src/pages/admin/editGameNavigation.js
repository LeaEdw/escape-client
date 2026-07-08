export const confirmEditGame = (navigate, gameId, title) => {
  const confirmed = window.confirm(`Edit "${title}"?`);
  if (confirmed) {
    navigate(`/edit_game/${gameId}`);
  }
};
