import { data } from "./MOCK_DATA.js";
let list = data;
const tbody = document.querySelector("tbody");
list = list.map(transformingData);
list.forEach(addToTable);

const searchInput = document.querySelector("#search");
const form = document.querySelector("form");

searchInput.addEventListener("input", filterBySearch);
form.addEventListener("submit", filterBySearch);

function filterBySearch(event) {
  event.preventDefault();
  let value = searchInput.value.trim().toLowerCase();
  if (value.length) {
    let filtered = list.filter(
      (list) =>
      list.name.toLowerCase().includes(value) || list.email.toLowerCase().includes(value)
    );
    if (filtered.length) {
      filtered.forEach(addToTable);
    } else {
      tbody.innerText = "";
    }
  } else {
    list.forEach(addToTable);
  }
}

const sortButtons = document.querySelectorAll(".sort-container > *");
for (let button of sortButtons) {
  button.addEventListener("click", sortData);
}
function sortData(event) {
  let previouslyClicked = document.querySelector(".active");
  if (previouslyClicked) {
    previouslyClicked.classList.toggle("active");
  }
  event.target.classList.toggle("active");
  let id = event.target.id;

  if (id == "ascending") {
    list.sort((a, b) => a.name.localeCompare(b.name));
    list.forEach(addToTable);
  } else if (id == "descending") {
    list.sort((a, b) => b.name.localeCompare(a.name));
    list.forEach(addToTable);
  } else if (id == "marks") {
    list.sort((a, b) => a.marks - b.marks);
    list.forEach(addToTable);
  } else if (id == "pass") {
    let passingStudents = list.filter(
      (list) => list.passing == "Passing"
    );
    passingStudents.forEach(addToTable);
  } else if (id == "classNo") {
    list.sort((a, b) => a.classNo - b.classNo);
    list.forEach(addToTable);
  } else if (id == "gndr") {
    list.sort((a, b) => a.gender.localeCompare(b.gender));
    list.forEach(addToTable);
  }
}
function transformingData(list) {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    marks,
    img_src,
    class: classNo,
    passing,
  } = list;

  return {
    id,
    imgSrc: img_src,
    name: first_name + " " + last_name,
    gender,
    classNo,
    marks,
    passing: passing ? "Passing" : "Failed",
    email,
  };
}
function addToTable(list, i) {
  if (i == 0) {
    tbody.innerText = "";
  }
  const tr = document.createElement("tr");

  const data = Object.values(list);

  for (let i = 0; i < data.length; i++) {
    if (i == 2) continue;
    if (i == 1) {
      const nameTd = document.createElement("td");
      nameTd.innerHTML = `<img src=${list.imgSrc} alt="photo"/> <span>${list.name}</span>`;
      tr.append(nameTd);
    } else {
      const newTd = document.createElement("td");
      newTd.textContent = data[i];
      tr.append(newTd);
    }
  }

  tbody.append(tr);
}
