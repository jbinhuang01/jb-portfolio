const config = window.PORTFOLIO_CONFIG || {};
const results = window.PORTFOLIO_RESULTS || {};

document.querySelectorAll("[data-contact-link]").forEach((link) => {
  link.href = `mailto:${config.email}`;
});

document.querySelectorAll("[data-linkedin]").forEach((link) => {
  link.href = config.linkedin;
});

document.querySelectorAll("[data-github-profile]").forEach((link) => {
  link.href = config.githubProfile;
});

document.querySelectorAll("[data-repo-path]").forEach((link) => {
  const path = link.dataset.repoPath;
  link.href = `${config.repository}/tree/main/${path}`;
});

document.querySelectorAll("[data-result]").forEach((element) => {
  const value = element.dataset.result
    .split(".")
    .reduce((current, key) => current?.[key], results);
  if (value === undefined || value === null) return;
  element.textContent =
    element.dataset.result === "lake.validRate" ? `${value}%` : String(value);
});

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    cards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      card.hidden = selected !== "all" && !categories.includes(selected);
    });
  });
});
