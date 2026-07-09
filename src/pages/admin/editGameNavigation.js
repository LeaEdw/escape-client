export const confirmEditGame = (navigate, gameId, gameTitle, isUnsaved) => {
  if (isUnsaved) {
    const confirmed = window.confirm(
      `You have unsaved changes. Leaving now will lose them. Continue to "${gameTitle}"?`,
    );
    if (!confirmed) return;
  }
  navigate(`/edit_game/${gameId}`);
};