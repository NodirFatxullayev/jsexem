let time = document.querySelector(".time");
let form = document.querySelector("form");
let inp = document.querySelector("input");
let ul = document.querySelector("ul");

// Check localStorage
let todos = JSON.parse(localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : [];
if (todos.length) {
    getValue()
}

// Header Time
function tim() {
    let t = new Date();
    let h = t.getHours() < 10 ? '0' + t.getHours() : t.getHours();
    let m = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
    let s = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds();
    return `${h}:${m}:${s}`;
}
setInterval(() => {
    time.textContent = tim();
}, 1000);


// check form value
function checkInp() {
    inp.classList.add("redborder");
    setTimeout(() => {
        inp.classList.remove("redborder");
    }, 2500);
}

// set JSON to localStorage
function setValue() {
    localStorage.setItem("list", JSON.stringify(todos));
}

// get JSON to localStorage
function getValue() {
    ul.innerHTML = '';
    let todo = JSON.parse(localStorage.getItem("list"));
    todo.forEach((item, id) => {
        ul.innerHTML += `
      <li>
      ${id + 1}.
      ${item.text} 
      <span class="data">${item.time}</span> 
      <span class="ed">
          <img src="./img/edit.png"alt="" onclick="editLocal(${id})">
          <img src="./img/delete.png" alt="" onclick="deleteLocal(${id})">
      </span>
  </li>
      `
    })
}

// get Form value
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoText = form["text"].value.trim();
    form.reset();
    if (todoText.length) {
        todos.push({ text: todoText, time: tim() });
        setValue();
        getValue();
    } else {
        checkInp();
    }
});

// Delete value in LocalStorage
function deleteLocal(id) {
    const deleteTodos = todos.filter((item, i) => {
        return i !== id;
    });
    todos = deleteTodos;
    setValue();
    getValue();
}


// Edit value in LocalStorage
function editLocal(id) {
    let newText = prompt("Plase writi new name");
    todos.forEach((item,i) => {
        if(id === i) {
            item.text = newText;
        }
    })
    setValue();
    getValue();
}