const token = localStorage.getItem("token")
const logOut = document.querySelector("#logOut")
const addProjectForm = document.querySelector("#addProjectForm")

if (!token) {
    window.location.replace("./register.html")
}

getProducts()


//! Log Out 
logOut.addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.reload()
});


//! Add todos
addProjectForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const task = event.target[0].value


    try {
        const response = await fetch("https://todo-for-n92.cyclic.app/todos/add", {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            method: "POST",
            body: JSON.stringify({
                task,
            }),
        })

        const products = await response.json()
        alert(products.message)
        getProducts()
    } catch (error) {
        console.log(error.message);
    }
    this.reset()

})


//! get todos

async function getProducts() {
    try {
        const res = await fetch("https://todo-for-n92.cyclic.app/todos/all", {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
        })
        const todos = await res.json();
        console.log(todos);
        console.log(todos.allTodos);
        renderTodos(todos.allTodos)
    } catch (error) {
        console.log(error);
    }
}


//! render todos
function renderTodos(todos) {
    const productListEl = document.querySelector("#productListItem")
    productListEl.innerHTML = "";
    todos.forEach(todo => {
        const template =
            `
      <h2>Task: ${todo.task}</h2>
      <h4>Id: ${todo._id}</h4>
      <h4>UserId: ${todo.userId}</h4>
      <h4>CreatedAt: ${todo.createdAt}</h4>
     <div class="btns">
     <button class="btn btn-delete" onclick="deleteTodo('${todo._id}')">Delete</button>
     <button class="btn btn-edit" onclick="editTodo('${todo._id}')">Edit</button>
     </div>

      </br>
      `

        productListEl.innerHTML += template
    });
}

//! Delete Todo 
async function deleteTodo(id) {
    const res = await fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
        headers: {
            "x-access-token": token,
        },
        method: "DELETE",
    })
    const todo = await res.json()
    alert(todo.message)
    getProducts()
}

//! Edit Todo 
async function editTodo(id) {

    task = prompt("Enter new task")

    try {
        const response = await fetch(`https://todo-for-n92.cyclic.app/todos/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            method: "PUT",
            body: JSON.stringify({
                task,
            }),
        })

        const todos = await response.json()
        alert(todos.message)
        getProducts()
    } catch (error) {
        console.log(error.message);
    }

}
