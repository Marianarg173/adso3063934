// ================= ALL VIEWS =================
const views = document.querySelectorAll("main");

if (localStorage.getItem("currentView") != null) {
  showView();
} else {
  localStorage.setItem("currentView", 0);
  showView();
}

const btnLogout = document.querySelector(".btnLogout");
const btnAdd = document.querySelector(".btnAdd");
const btnBack = document.querySelectorAll(".btnBack");
const btnCancel = document.querySelectorAll(".btnCancel");
const petList = document.querySelector("#petList");

// ================= LOGIN =================
const loginForm = document.querySelector("#loginForm");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://127.0.0.1:8000/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("currentView", 1);
    Swal.fire("Success!", "Login successful", "success");
    showView();
  } else {
    Swal.fire("Error", data.message, "error");
  }
});

// ================= GET PETS =================
async function getPets() {
  const token = localStorage.getItem("authToken");

  const response = await fetch("http://127.0.0.1:8000/api/pets/list", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (response.ok) renderPets(data.pets ?? data);
}

// ================= RENDER PETS =================
function renderPets(pets) {
  petList.innerHTML = "";
  pets.forEach((pet) => {
    petList.innerHTML += `
      <div class="row">
        <img src="http://127.0.0.1:8000/public/phot/${pet.photos}" alt="pet" />
        <div class="data">
          <h3>${pet.name}</h3>
          <h4>${pet.kind}</h4>
        </div>
        <nav class="actions">
          <a href="javascript:;" onclick="showPet(${pet.id})" class="btnShow"></a>
          <a href="javascript:;" onclick="editPet(${pet.id})" class="btnEdit"></a>
          <a href="javascript:;" onclick="deletePet(${pet.id})" class="btnDelete"></a>
        </nav>
      </div>
    `;
  });
}

// ================= SHOW PET =================
async function showPet(id) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  const pet = data.pet ?? data;

  document.querySelector("#show .info").innerHTML = `
    <p><strong>Name:</strong> ${pet.name}</p>
    <p><strong>Kind:</strong> ${pet.kind}</p>
    <p><strong>Weight:</strong> ${pet.weight}</p>
    <p><strong>Age:</strong> ${pet.age}</p>
    <p><strong>Breed:</strong> ${pet.breed}</p>
    <p><strong>Location:</strong> ${pet.location}</p>
    <p><strong>Description:</strong> ${pet.description}</p>
  `;

  localStorage.setItem("currentView", 3);
  showView();
}

// ================= CREATE =================
const addForm = document.querySelector("#addForm");

addForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const token = localStorage.getItem("authToken");

  const formData = {
    name: addForm.name.value,
    kind: addForm.kind.value,
    weight: parseFloat(addForm.weight.value),
    age: parseInt(addForm.age.value),
    breed: addForm.breed.value,
    location: addForm.location.value,
    description: addForm.description.value,
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/api/pets/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Errores del servidor:", errorData.errors || errorData);
      Swal.fire("Error", "Revisa los datos del formulario", "error");
      return;
    }

    await response.json();
    Swal.fire("Success", "Pet created!", "success");
    addForm.reset(); // <-- Limpiar formulario
    localStorage.setItem("currentView", 1);
    showView();
  } catch (error) {
    console.error("Error de conexión:", error);
    Swal.fire("Error", "No se pudo conectar con el servidor", "error");
  }
});

// ================= EDIT =================
async function editPet(id) {
  const token = localStorage.getItem("authToken");
  const response = await fetch(`http://127.0.0.1:8000/api/pets/show/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  const pet = data.pet ?? data;

  const editForm = document.querySelector("#edit form");
  editForm.name.value = pet.name;
  editForm.kind.value = pet.kind;
  editForm.weight.value = pet.weight;
  editForm.age.value = pet.age;
  editForm.breed.value = pet.breed;
  editForm.location.value = pet.location;
  editForm.description.value = pet.description;

  localStorage.setItem("editId", id);
  localStorage.setItem("currentView", 4);
  showView();
}

const editForm = document.querySelector("#edit form");

editForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const id = localStorage.getItem("editId");
  const token = localStorage.getItem("authToken");

  const formData = {
    name: editForm.name.value,
    kind: editForm.kind.value,
    weight: parseFloat(editForm.weight.value),
    age: parseInt(editForm.age.value),
    breed: editForm.breed.value,
    location: editForm.location.value,
    description: editForm.description.value,
  };

  const response = await fetch(`http://127.0.0.1:8000/api/pets/edit/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    Swal.fire("Updated!", "Pet updated!", "success");
    localStorage.setItem("currentView", 1);
    showView();
  }
});

// ================= DELETE =================
async function deletePet(id) {
  const token = localStorage.getItem("authToken");
  if (!confirm("Delete this pet?")) return;

  const response = await fetch(`http://127.0.0.1:8000/api/pets/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log("DELETE RESPONSE:", data);

  if (response.ok) {
    Swal.fire("Deleted!", "Pet removed", "success");
    getPets();
  } else {
    Swal.fire("Error", data.message || "Delete failed", "error");
  }
}

// ================= NAVIGATION =================
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  localStorage.setItem("currentView", 0);
  showView();
});

btnAdd.addEventListener("click", () => {
  addForm.reset(); // <-- limpiar formulario cada vez que entres a Add
  localStorage.setItem("currentView", 2);
  showView();
});

btnBack.forEach((btn) => {
  btn.addEventListener("click", () => {
    localStorage.setItem("currentView", 1);
    showView();
  });
});

btnCancel.forEach((btn) => {
  btn.addEventListener("click", () => {
    addForm.reset(); // <-- limpiar formulario al cancelar
    localStorage.setItem("currentView", 1);
    showView();
  });
});

// ================= SHOW VIEW =================
function showView() {
  views.forEach((view) => (view.style.display = "none"));
  const current = localStorage.getItem("currentView");
  views[current].style.display = "block";

  if (current == 1) getPets();
}
