const signUpForm = document.querySelector("#signUpForm")
const signInForm = document.querySelector("#signInForm")

const ins = document.querySelectorAll("#ins")

ins.forEach(element => {
    element.addEventListener("click", () => {
        signUpForm.classList.toggle("show")
        signInForm.classList.toggle("show")
    })
})


signUpForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const username = event.target[0].value
    const password = event.target[1].value

    fetch("https://todo-for-n92.cyclic.app/user/register", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            username,
            password,
        })

    }).then(data => data.json()).then(data => {
        console.log(data);
        localStorage.setItem("token", data.token)
        alert(data.message)
        if (data.token) {
            window.location.replace("./index.html")

        }
    }).catch(err => {
        console.log(err);
    })
})

signInForm.addEventListener("submit", async (event) => {
    event.preventDefault()

    const username = event.target[0].value
    const password = event.target[1].value

    try {
        const response = await fetch("https://todo-for-n92.cyclic.app/user/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                username,
                password,
            })
        })
        const data = await response.json()
        localStorage.setItem("token", data.token)
        alert(data.message)
        if (data.token) {
            window.location.replace("./index.html")

        }
    } catch (error) {
        console.log(error);
    }
})
