Markdown

# Hang-Man: A Modern Web Game

A classic word-guessing game rebuilt from the ground up with a modern, full-stack technology set. This project was a deep dive into building a complete, feature-rich web application from authentication to deployment.

**[Live Demo Link](https://vercel.com/zaids-projects-3654809a/hangman-react-project/8oFgSAa83sCKCEnRtF785BV9j73C)**

![Hang-Man Game Screenshot](https://i.imgur.com/KLSKkjj.png) ## About This Project

I wanted to go beyond a simple front-end project and challenge myself to build something real. This Hang-Man game is the result. It's a complete web application where users can create an account, play the game with words fetched from a live API, and have their scores saved to a database. It was an incredible learning experience in connecting a front-end React application to a back-end service and handling all the challenges that come with it.

## Features

* **Full User Authentication:** Secure sign-up and login system for players using **Supabase Auth**.
* **Live Word API:** Never play the same game twice! Words are fetched from the Datamuse API.
* **Database-Backed Scores:** Player stats (wins/losses) are saved to a **Supabase** PostgreSQL database.
* **Fluid Animations:** The entire UI is brought to life with smooth, responsive animations using **Framer Motion**.
* **Modern UI/UX:** Includes a sleek settings modal, a dark/light theme switcher, and toast notifications for a polished user experience.
* **Responsive Design:** Looks and works great on both desktop and mobile devices.

## Tech Stack

This project was built using a modern, professional tech stack:

* **Front-End:** React, TypeScript, Vite
* **Styling:** CSS Modules & CSS Variables
* **Animation:** Framer Motion
* **Back-End & Database:** Supabase (Auth & PostgreSQL)
* **Deployment:** Vercel

## What I Learned

One of the biggest challenges was debugging a series of tricky TypeScript and build configuration issues during deployment. Working through `tsconfig.json` settings, Git repository structure, and Vercel build errors taught me a ton about how modern web projects are bundled and deployed. I also learned how to structure a full-stack application by separating concerns, like creating a global Toast notification system using React Context to prevent unnecessary re-renders in other components.

## How to Run Locally

1.  Clone the repository.
2.  Navigate to the `hangman_vite` directory: `cd hangman_vite`
3.  Install dependencies: `npm install`
4.  Create a `.env.local` file with your Supabase keys.
5.  Run the development server: `npm run dev`