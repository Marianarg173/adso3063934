// ===============================
// ALL VIEWS
// ===============================

const views = document.querySelectorAll('main')

// ===============================
// INITIAL VIEW
// ===============================

if (localStorage.getItem('currentView') !== null) {
    showView()
} else {
    localStorage.setItem('currentView', 0)
    showView()
}

// ===============================
// BUTTONS & ELEMENTS
// ===============================

const btnLogout = document.querySelector('.btnLogout')
const btnAdd = document.querySelector('.btnAdd')
const btnBacks = document.querySelectorAll('.btnBack')
const btnCancels = document.querySelectorAll('.btnCancel')
const LoginForm = document.querySelector('#loginForm')

// ===============================
// CHANGE VIEW FUNCTION
// ===============================

function changeView(index) {
    localStorage.setItem('currentView', index)
    showView()
}

// ===============================
// LOGIN FORM
// ===============================

if (LoginForm) {
    LoginForm.addEventListener('submit', async function (e) {
        e.preventDefault()

        try {

            const email = document.getElementById('email').value
            const password = document.getElementById('password').value

            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok) {

                Swal.fire({
                    title: "Success!",
                    text: data.message,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                })

                localStorage.setItem('authToken', data.token)
                changeView(1)

            } else {

                Swal.fire({
                    title: "Error!",
                    text: "Invalid credentials",
                    icon: "error"
                })

            }

        } catch (error) {
            console.error(error)
        }
    })
}

// ===============================
// BUTTON EVENTS
// ===============================

if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('authToken')
        changeView(0)
    })
}

if (btnAdd) {
    btnAdd.addEventListener('click', () => changeView(2))
}

btnBacks.forEach(btn => {
    btn.addEventListener('click', () => changeView(1))
})

btnCancels.forEach(btn => {
    btn.addEventListener('click', () => changeView(1))
})

// ===============================
// SHOW VIEW FUNCTION
// ===============================

function showView() {

    views.forEach(view => {
        view.classList.remove('animateView')
        view.style.display = 'none'
    })

    const index = parseInt(localStorage.getItem('currentView'))

    // 🔐 Protección si no hay token
    if (!localStorage.getItem('authToken') && index !== 0) {
        localStorage.setItem('currentView', 0)
        views[0].style.display = 'block'
        return
    }

    if (views[index]) {
        views[index].classList.add('animateView')
        views[index].style.display = 'block'

        // 🔥 Cuando entra al dashboard
        if (index === 1) {
            loadPets()
        }
    }
}

// ===============================
// LOAD PETS FROM API
// ===============================

async function loadPets() {

    try {

        const token = localStorage.getItem('authToken')

        const response = await fetch('http://127.0.0.1:8000/api/pets', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const pets = await response.json()

        if (response.ok) {

            const petList = document.getElementById('petList')
            petList.innerHTML = ''

            pets.forEach(pet => {

                petList.innerHTML += `
                    <div class="row">
                        <img src="http://127.0.0.1:8000/storage/${pet.image ?? ''}" alt="${pet.name}">

                        <div class="data">
                            <h3>${pet.name}</h3>
                            <h4>${pet.kind}: ${pet.breed}</h4>
                        </div>

                        <nav class="actions">
                            <a href="javascript:;" class="btnShow"></a>
                            <a href="javascript:;" class="btnEdit"></a>
                            <a href="javascript:;" class="btnDelete"></a>
                        </nav>
                    </div>
                `
            })

        } else {
            console.log("Error loading pets")
        }

    } catch (error) {
        console.error(error)
    }
}

// Ensure correct view on load
showView()
