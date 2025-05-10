let addBtn = document.querySelector('.add-btn');
let deleteBtn = document.querySelector('.delete-btn');
let choresDiv = document.querySelector('.chores');
let input = document.querySelector('.input');
let body = document.querySelector("body")

addBtn.addEventListener("click", () => {
    let inputValue = input.value.trim().toLowerCase();
    if (inputValue === "") {
        alert("Please enter a valid chore");
        return;
    }

    else if (JSON.parse(localStorage.getItem("chores"))?.includes(inputValue)) {
        alert("Already have this chore");
        input.value = "";
        return
    }

    let chores = JSON.parse(localStorage.getItem("chores")) || [];
    chores.push(inputValue);
    localStorage.setItem("chores", JSON.stringify(chores));
    addToUI();
    input.value = "";
});

deleteBtn.addEventListener('click',
    () => {
        localStorage.clear()
        choresDiv.innerHTML = "";
    }
)


function addToUI() {
    let chores = JSON.parse(localStorage.getItem("chores")) || [];
    choresDiv.innerHTML = ""; // Clear existing UI to avoid duplicates
    chores.forEach((item) => {
        let newEl = document.createElement("div");
        newEl.classList.add('chore');
        let chore = document.createElement('p');
        chore.textContent = item;
        newEl.appendChild(chore);
        choresDiv.appendChild(newEl);
        removeFromUI(newEl, chore)
    });
}

function removeFromUI(el, chore) {
    el.addEventListener("click", () => {
        let chores = JSON.parse(localStorage.getItem("chores")) || [];
        chores = chores.filter(item => item !== chore.textContent);
        localStorage.setItem("chores", JSON.stringify(chores));
        el.remove();
    });
}

// Call addToUI on page load to populate the UI with stored chores
addToUI();