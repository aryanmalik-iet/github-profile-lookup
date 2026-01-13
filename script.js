const input = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");
const card = document.getElementById("profileCard");
const errorBox = document.getElementById("error");
const themeToggle = document.getElementById("themeToggle");
const avatar = document.getElementById("avatar");
const nameEl = document.getElementById("name");
const bioEl = document.getElementById("bio");
const followersEl = document.getElementById("followers");
const reposEl = document.getElementById("repos");
const profileLink = document.getElementById("profileLink");
const closeBtn = document.getElementById("closeBtn");
const savedTheme = localStorage.getItem("theme");


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


closeBtn.addEventListener("click", resetView);

function resetView() {
  card.classList.add("hidden");
  input.value = "";
  hideError();
}



async function fetchUser(username) {
  hideError();
  card.classList.add("hidden");
  searchBtn.disabled = true;
  searchBtn.textContent = "Loading...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);


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
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function hideError() {
  errorBox.classList.add("hidden");
}
