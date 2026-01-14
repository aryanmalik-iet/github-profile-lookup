# GitHub User Card

This is a simple task-based web project created as part of **Phase-2 (Execution Round)** for **Google Community – IET Lucknow**.

The goal of this task was to demonstrate **basic coding logic, Git usage, and clarity**, not to build a large or complex application.

---

## Task Description

**Web Development – GitHub User Card**

Create a simple web page that:
- Takes a GitHub username as input
- Fetches user data from the GitHub API  
  `https://api.github.com/users/{username}`
- Displays a profile card with:
  - Profile picture (avatar)
  - Name and bio
  - Followers count
  - Public repositories count
  - Link to the GitHub profile
- Handles error cases (e.g. user not found)

---

## What I implemented

- Input box to enter GitHub username
- Fetching real data using GitHub’s public API
- Profile card showing required user details
- Proper error handling for:
  - Empty input
  - Invalid username
  - API rate limit
- Light and dark mode toggle
- Recent successful searches (stored locally)
- Clean and responsive UI

---

## Tech Stack

- HTML  
- CSS  
- Vanilla JavaScript  
- GitHub Public API  

No frameworks or libraries were used.

---

## Notes

- This project uses GitHub’s **unauthenticated public API**, which has a limit of **60 requests per hour per IP**
- The project is frontend-only and focuses on correctness and clarity

---

## Project Structure

├── index.html

├── style.css

├── script.js

└── README.md


---

Built by **Aryan Malik**  
For **Google Community – IET Lucknow**
