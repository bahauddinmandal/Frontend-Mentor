let data;
let currentFilter = "all";

function init() {
  updateThemeIcon();
  getdata();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  updateThemeIcon();
}

function updateThemeIcon() {
  const darkTheme = document.body.classList.contains("dark");
  const themeIcon = document.getElementById("theme-icon");
  const logo = document.getElementById("logo");
  if (darkTheme) {
    themeIcon.src = "assets/images/icon-sun.svg";
    logo.src = "./assets/images/logo-dark.svg";
  } else {
    themeIcon.src = "assets/images/icon-moon.svg";
    logo.src = "./assets/images/logo.svg";
  }
}

async function getdata() {
  const response = await fetch("data.json");
  data = await response.json();
  renderCards(data);
}

function renderCards(cardsData) {
  const container = document.querySelector(".card-container");
  container.innerHTML = "";
  cardsData.forEach((item, i) => {
    container.innerHTML += `
      <div class="card">
        <div class="card-header">
          <div class="card-logo">
            <img src="${item.logo}" alt="" />
          </div>
          <div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
          </div>
        </div>
        <div class="card-btns">
          <button class="btn card-btn" onclick="removeCard(this)" data="${
            item.name
          }" >Remove</button>
          <input type="checkbox" onChange='toggleActiv(this)' name="${
            item.name
          }" ${item.isActive ? "checked" : ""} />
        </div>
      </div>
    `;
  });
}

function filterData(type, elm) {
  if (elm) {
    const active = document.querySelector(".active");
    active.classList.remove("active");
    elm.classList.add("active");
  }
  if (type === "all") {
    currentFilter = "all";
    renderCards(data);
  }
  if (type === "active") {
    currentFilter = "active";
    renderCards(data.filter((item) => item.isActive));
  }
  if (type === "inactive") {
    currentFilter = "inactive";
    renderCards(data.filter((item) => !item.isActive));
  }
}

function toggleActiv(elm) {
  const item = data.find((v) => v.name === elm.name);
  item.isActive = !item.isActive;
}

function removeCard(elm) {
  const item = elm.getAttribute("data");
  const index = data.findIndex((value) => value.name === item);
  if (index !== -1) data.splice(index, 1);
  filterData(currentFilter);
}

init();
