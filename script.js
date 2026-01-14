// ELEMENT REFERENCES

const input = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const card = document.getElementById("profileCard");
const errorBox = document.getElementById("error");

const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const bioEl = document.getElementById("bio");
const followersEl = document.getElementById("followers");
const reposEl = document.getElementById("repos");
const profileLink = document.getElementById("profileLink");

const closeBtn = document.getElementById("closeBtn");
const themeToggle = document.getElementById("themeToggle");


// THEME HANDLING

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});


// EVENT LISTENERS

searchBtn.addEventListener("click", () => {
  const username = input.value.trim();

  if (!username) {
    showError("Please enter a GitHub username.");
    return;
  }

  fetchUser(username);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

closeBtn.addEventListener("click", resetView);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("recent-item")) {
    const username = e.target.textContent;
    input.value = username;
    fetchUser(username);
  }
});



// CORE FUNCTIONS

async function fetchUser(username) {
  hideError();
  card.classList.add("hidden");

  searchBtn.disabled = true;
  searchBtn.textContent = "Loading...";

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    renderUser(data);

  } catch (err) {
    showError("User not found. Please check the username.");

  } finally {
    searchBtn.disabled = false;
    searchBtn.textContent = "Search";
  }
}

function renderUser(user) {
  avatar.src = user.avatar_url;
  nameEl.textContent = user.name || "No name provided";
  bioEl.textContent = user.bio || "No bio available";
  followersEl.textContent = user.followers;
  reposEl.textContent = user.public_repos;
  profileLink.href = user.html_url;
  card.classList.remove("hidden");
  saveRecentSearch(user.login);

}

function resetView() {
  card.classList.add("hidden");
  input.value = "";
  hideError();
}


// ERROR HANDLING

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox.classList.add("hidden");
}

// RECENT SEARCHES


function getRecentSearches() {
  return JSON.parse(localStorage.getItem("recentSearches")) || [];
}

function saveRecentSearch(username) {
  let searches = getRecentSearches();

  // remove duplicate if exists
  searches = searches.filter(u => u !== username);

  // add to top
  searches.unshift(username);

  // keep only last 5
  if (searches.length > 5) {
    searches = searches.slice(0, 5);
  }

  localStorage.setItem("recentSearches", JSON.stringify(searches));
  renderRecentSearches();
}

function renderRecentSearches() {
  const container = document.getElementById("recentSearches");
  const searches = getRecentSearches();

  if (!searches.length) {
    container.classList.add("hidden");
    return;
  }

  container.innerHTML = searches
    .map(username => `<button class="recent-item">${username}</button>`)
    .join("");

  container.classList.remove("hidden");
}

renderRecentSearches();

