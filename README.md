# GitHub Repositories Portfolio

This project is a web application built with Vite, React, Radix UI primitives, Tailwind CSS, and the GitHub Octokit library. It is designed to fetch and display a user's GitHub repositories, with features like pagination, search, filtering, and detailed repository information. The application is hosted on Vercel.

## Features

1. **Repository Listing**
  - Displays a list of all repositories associated with the authenticated GitHub user - in this case, me(onikhalid).
  - Implements pagination to navigate through the repositories in batches.
      - users can search the name, description, language, and visibility of the repositories they want to see
      - user can also set how many repositories they want to see per page
  - Provides search and filter functionality to find specific repositories.

2. **Repository Details**
  - Clicking on a repository from the list opens a dedicated page with detailed information about that repository.
  - Nested routing is used to display repository details while maintaining the overall application layout structure.

3. **Error Boundary**
  - Implements an Error Boundary component to catch and handle errors gracefully.
  - A dedicated route/page is included in the navbar to test and showcase the Error Boundary functionality.

4. **404 Page**
  - Includes a custom 404 page to handle routes that don't exist within the application.
  - A dedicated route/page is included in the navbar to test and showcase the 404 page.

5. **Layout, UI, and Accessibility**
  - Utilizes a clean and responsive layout with a visually appealing user interface and a light and dark theme.
  - Follows some of the accessibility best practices taught in the first semester to ensure an inclusive experience - proper use of "main", "article", "section" tags among others.

  Bonus:
  - Provides a modal to create a new repository directly from the application.
  - New Repositories are only stored in local storage in a bid to prevent external abuse (Allowing anybody with the app link to create a repo on my behalf is not something I'd like). These repositories are tagged as "FAKE".
  - Allows updating specific details of a created repository i.e. the name and description of the repo.
  - Implements functionality to delete newly created repositories.

## Technologies Used

- Vite: A modern build tool for React applications.
- ReactJS: A JavaScript library for building user interfaces.
- Radix UI Primitives: A low-level UI library for building accessible design systems.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- GitHub Octokit: A library for interacting with the GitHub API.
- React Router DOM:

## Getting Started

1. Clone the repository: `git clone https://github.com/onikhalid/altschool-semester2-exam.git`
2. Navigate to the project directory: `cd repo-name`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit: `http://localhost:5173`

## Deployment

The application is hosted on Vercel and can be accessed at: [https://altschool-semester2-soeexam.vercel.app](https://altschool-semester2-soeexam.vercel.app)

