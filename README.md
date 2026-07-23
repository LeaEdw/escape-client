# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

To Do: 

- Add Comment Deletion Capability for Users
- Add Comment (soft) deletion capability for Administrators. Comments will be deleted from the view of non-author users, but the comment's author will be able to see that the comment was deleted. It will be replaced with "Comment removed by administrator for breaching community guidelines".
- Display the Age recommendations and player count for each game.
- Rearrange the page layout to be more intuitive for users. 
- Make it so that clicking on the title and/or image of the game links to the page with the game's summary.
- Add more images for each game
- Add the ability for Users to change their profile image on their profiles
- Display all the images for each game on the edit game page for the admin / make the uploaded files editable.
- Add background themes / page styling for users to pick from. 
- Add ability for administrator to be promoted or demoted. 