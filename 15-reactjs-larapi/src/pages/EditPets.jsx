// ---------------------------
// IMPORTACIONES
// ---------------------------
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditPet() {

    const navigate = useNavigate(); // navegación entre páginas
    const { id } = useParams(); // obtener id desde la URL

    // ---------------------------
    // ESTADO DE LA MASCOTA
    // ---------------------------
    const [pet, setPet] = useState({
        name: "",
        kind: "",
        weight: "",
        age: "",
        breed: "",
        location: "",
        description: ""
    });

    // ---------------------------
    // CARGAR MASCOTA DESDE API
    // ---------------------------
    useEffect(() => {

        const token = localStorage.getItem("token");

        // si no hay token vuelve al login
        if (!token) {
            navigate("/");
            return;
        }

        const fetchPet = async () => {

            try {

                const response = await axios.get(
                    `http://127.0.0.1:8000/api/pets/show/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json"
                        }
                    }
                );

                const data =
                    response.data.pet ||
                    (response.data.pets ? response.data.pets[0] : response.data);

                // si el id no existe
                if (!data) {

                    Swal.fire({
                        icon: "warning",
                        title: "Mascota no encontrada",
                        text: `No existe una mascota con ID ${id}`
                    }).then(() => {
                        navigate("/dashboard");
                    });

                    return;

                }

                setPet(data);

            } catch (error) {

                console.error(error);

                // error 404
                if (error.response?.status === 404) {

                    Swal.fire({
                        icon: "warning",
                        title: "Mascota no encontrada",
                        text: `No existe una mascota con ID ${id}`
                    }).then(() => {
                        navigate("/dashboard");
                    });

                }

                // token inválido
                else if (error.response?.status === 401) {

                    localStorage.removeItem("token");

                    Swal.fire({
                        icon: "warning",
                        title: "Sesión expirada",
                        text: "Debes iniciar sesión nuevamente"
                    }).then(() => {
                        navigate("/");
                    });

                }

            }

        };

        fetchPet();

    }, [id, navigate]);



    // ---------------------------
    // CAPTURAR INPUTS DEL FORMULARIO
    // ---------------------------
    const handleChange = (e) => {

        setPet({
            ...pet,
            [e.target.name]: e.target.value
        });

    };



    // ---------------------------
    // EDITAR MASCOTAS
    // ---------------------------
    const updatePet = async (e) => {

        e.preventDefault();

        const token = localStorage.getItem("token");

        try {

            await axios.put(
                `http://127.0.0.1:8000/api/pets/edit/${id}`,
                pet,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json"
                    }
                }
            );

            Swal.fire({
                icon: "success",
                title: "Mascota Editada correctamente"
            }).then(() => {

                navigate("/dashboard");

            });

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo actualizar la mascota"
            });

        }

    };



    // ---------------------------
    // VISTA
    // ---------------------------
    return (

        <main id="edit" className="animateView">

            <header>

                <button
                    className="btnBack"
                    onClick={() => navigate("/dashboard")}
                >
                    <img src="/imgs/btn-back.svg" alt="Back" />
                </button>

                <img src="/imgs/title-edit.svg" alt="Edit" />

            </header>


            <form onSubmit={updatePet}>

                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={pet.name}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Kind
                    <input
                        type="text"
                        name="kind"
                        value={pet.kind}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Weight
                    <input
                        type="text"
                        name="weight"
                        value={pet.weight}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Age
                    <input
                        type="text"
                        name="age"
                        value={pet.age}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Breed
                    <input
                        type="text"
                        name="breed"
                        value={pet.breed}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Location
                    <input
                        type="text"
                        name="location"
                        value={pet.location}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Description
                    <textarea
                        name="description"
                        value={pet.description}
                        onChange={handleChange}
                    ></textarea>
                </label>


                <div className="actions">

                    <button type="submit">
                        Edit
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

export default EditPet;