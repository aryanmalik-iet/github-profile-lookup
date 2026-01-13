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


async function fetchUser(username) {
  hideError();
  card.classList.add("hidden");

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    renderUser(data);
  } catch (err) {
    showError("User not found. Please check the username.");
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
