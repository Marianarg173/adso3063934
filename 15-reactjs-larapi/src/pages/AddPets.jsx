// ------------------------------
// IMPORTACIONES
// ------------------------------
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function AddPets() {

    const navigate = useNavigate();

    // ------------------------------
    // ESTADO DEL FORMULARIO
    // ------------------------------
    const [formData, setFormData] = useState({
        name: "",
        kind: "",
        weight: "",
        age: "",
        breed: "",
        location: "",
        description: ""
    });

    // ------------------------------
    // CAPTURAR CAMBIOS EN INPUTS
    // ------------------------------
    const handleInputChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    // ------------------------------
    // CREAR NUEVA MASCOTA
    // ------------------------------
    const submitNewPet = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        const weightValue = parseFloat(formData.weight);

        const dataToSend = {

            ...formData,

            weight: !isNaN(weightValue) ? weightValue.toFixed(1) : "0.0",

            age: parseInt(formData.age) || 0

        };

        try {

            const response = await axios.post(

                "http://127.0.0.1:8000/api/pets/store",

                dataToSend,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                }

            );

            if (response.status === 200 || response.status === 201) {

                Swal.fire({
                    icon: "success",
                    title: "Mascota creada",
                    text: response.data?.message || `Se registró a ${formData.name} con éxito`,
                    confirmButtonColor: "#17b4c1"
                }).then(() => {

                    navigate("/dashboard");

                });

            }

        } catch (error) {

            console.error("Error completo:", error.response);

            const validationErrors = error.response?.data?.errors;

            let errorMessage;

            if (validationErrors) {

                errorMessage = Object.values(validationErrors).flat().join(", ");

            } else {

                errorMessage = error.response?.data?.message || "Error del servidor";

            }

            Swal.fire({
                icon: "error",
                title: "Error",
                text: errorMessage
            });

        }

    };

    // ------------------------------
    // INTERFAZ
    // ------------------------------
    return (

        <main id="add" className="animateView">

            <header>

                <button
                    type="button"
                    className="btnBack"
                    onClick={() => navigate("/dashboard")}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <img src="/imgs/btn-back.svg" alt="Back" />
                </button>

                <img src="/imgs/title-add.svg" alt="Add" />

            </header>

            <form onSubmit={submitNewPet}>

                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        required
                    />
                </label>

                <label>
                    Kind
                    <input
                        type="text"
                        name="kind"
                        onChange={handleInputChange}
                        placeholder="Dog, Cat, etc."
                        required
                    />
                </label>

                <label>
                    Weight (Ej: 10.5)
                    <input
                        type="text"
                        name="weight"
                        onChange={handleInputChange}
                        placeholder="0.0"
                    />
                </label>

                <label>
                    Age
                    <input
                        type="number"
                        name="age"
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Breed
                    <input
                        type="text"
                        name="breed"
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Location
                    <input
                        type="text"
                        name="location"
                        onChange={handleInputChange}
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name="description"
                        onChange={handleInputChange}
                    ></textarea>
                </label>

                <div className="actions">

                    <button type="submit">
                        Add
                    </button>

                    <button
                        type="button"
                        className="btnCancel"
                        onClick={() => navigate("/dashboard")}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </main>

    );

}

export default AddPets;