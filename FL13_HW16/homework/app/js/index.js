const baseUrl = "http://localhost:3000";
const appContainer = document.getElementById("app-container");

let btn = null;
let formButton = null;

function createForm() {
  const form = document.createElement("form");
  const inpName = document.createElement("input");
  const inpSurname = document.createElement("input");
  const btn = document.createElement("button");
  const changeInputs = () => {
    inpName.classList.remove("invalid");
    inpSurname.classList.remove("invalid");
  };
  form.className = "form";
  inpName.placeholder = "Name";
  inpName.name = "name";
  inpName.required = true;
  inpSurname.placeholder = "Surname";
  inpSurname.name = "surname";
  inpSurname.required = true;
  btn.className = "btn form-button";
  btn.textContent = "Add New User";
  inpName.addEventListener("change", changeInputs);
  inpSurname.addEventListener("change", changeInputs);
  form.append(inpName);
  form.append(inpSurname);
  form.append(btn);
  return form;
}

let createRowOfUser = (obj) => {
  const tr = document.createElement("tr");
  tr.id = obj.id;
  const TD_COUNT = 5;
  for (let i = 0; i < TD_COUNT; i++) {
    const td = document.createElement("td");
    td.contentEditable = "true";
    const btn = document.createElement("button");
    const btn2 = document.createElement("button");
    const TD_1 = 1;
    const TD_2 = 2;
    const TD_3 = 3;
    const TD_4 = 4;
    switch (i) {
      case 0:
        td.textContent = obj.id;
        break;
      case TD_1:
        td.textContent = obj.name;
        break;
      case TD_2:
        td.textContent = obj.username;
        break;
      case TD_3:
        td.contentEditable = false;
        btn.className = "btn update";
        btn.textContent = "Update";
        btn.className = "btn update";
        btn.textContent = "Update";
        td.append(btn);
        break;
      case TD_4:
        td.contentEditable = false;
        btn2.className = "btn delete";
        btn2.textContent = "Delete";
        btn2.className = "btn delete";
        btn2.textContent = "Delete";
        td.append(btn2);
        break;
      default:
        break;
    }
    tr.append(td);
  }
  return tr;
};

function createTableOfUsers(data) {
  if (data) {
    const table = document.createElement("table");
    table.className = "table";
    data.forEach((obj) => {
      table.append(createRowOfUser(obj));
    });
    return table;
  } else {
    return null;
  }
}

let makeRequest = (data, method, id, btn) => {
  const url = id ? baseUrl + "/users/" + id : baseUrl + "/users";
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    let requestOptions = null;
    if (!method) {
      method = "GET";
    }
    xhr.open(method, url);
    if (method === "DELETE") {
      xhr.setRequestHeader("Authorization", "admin");
      requestOptions = "no";
    } else {
      xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
    }
    xhr.upload.onload = () => {
      btn.disabled = true;
      document.querySelector(".loading").classList.add("visible");
    };
    xhr.onreadystatechange = function () {
      const STATUS_OK = 200;
      const STATUS_2 = 400;
      const READY_STATE = 4;
      if (this.readyState === READY_STATE) {
        if (this.status >= STATUS_OK && this.status < STATUS_2) {
          if (this.status === STATUS_OK) {
            resolve(JSON.parse(this.responseText));
          } else {
            resolve();
          }
        } else {
          reject(new Error());
        }
      }
    };
    xhr.onprogress = function () {
      document.querySelector(".loading").classList.remove("visible");
      if (method !== "GET" && btn.classList.contains("form-button")) {
        btn.disabled = false;
      }
    };
    xhr.onload = function () {
      if (method !== "GET" && btn.classList.contains("form-button")) {
        btn.disabled = false;
      }
    };
    xhr.send(JSON.stringify(data), requestOptions);
    xhr.onerror = function () {
      console.log(`Ошибка соединения`);
    };
  });
};

function createApp() {
  appContainer.append(createForm());
  const div = document.createElement("div");
  div.className = "loading";
  div.textContent = "Loading...";
  appContainer.append(div);
  makeRequest().then((data) => appContainer.append(createTableOfUsers(data)));
}

createApp();

appContainer.addEventListener("click", (e) => {
  let data = null;
  let method = null;
  let id = null;
  if (e.target.classList.contains("btn")) {
    if (e.target.classList.contains("form-button")) {
      e.preventDefault();
      let form = document.querySelector(".form");
      let name = form.elements.name;
      let surname = form.elements.surname;
      if (!!name.value && !!surname.value) {
        data = { name: name.value, username: surname.value };
        name.value = "";
        surname.value = "";
        method = "POST";
      } else {
        if (name.value === "") {
          name.classList.add("invalid");
        }
        if (surname.value === "") {
          surname.classList.add("invalid");
        }
        return;
      }
    } else {
      const FIRST_CHILDREN = 1;
      const SECOND_CHILDREN = 2;
      let tr = e.target.parentElement.parentElement;
      id = tr.id;
      let name = tr.children[FIRST_CHILDREN];
      let surname = tr.children[SECOND_CHILDREN];
      data = { name: name.textContent, username: surname.textContent };
      if (e.target.classList.contains("update")) {
        method = "PUT";
      } else if (e.target.classList.contains("delete")) {
        method = "DELETE";
      }
    }
    makeRequest(data, method, id, e.target)
      .then(() => makeRequest())
      .then((data) => {
        document.querySelector(".table").remove();
        appContainer.append(createTableOfUsers(data));
      });
  }
});
