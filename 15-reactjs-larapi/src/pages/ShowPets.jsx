// -------------------------
// IMPORTACIONES
// -------------------------
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // alertas bonitas

function ShowPets() {

    const { id } = useParams(); // obtiene el id de la URL
    const navigate = useNavigate(); // permite navegar entre páginas
    const [pet, setPet] = useState(null); // estado donde se guarda la mascota

    useEffect(() => {

        const token = localStorage.getItem("token"); // obtener token guardado

        // si no hay token vuelve al login
        if (!token) {
            navigate("/");
            return;
        }

        // -------------------------
        // FUNCION QUE CONSULTA LA API
        // -------------------------
        const fetchPet = async () => {

            try {

                const response = await axios.get(
                    `http://127.0.0.1:8000/api/pets/show/${id}`, // ruta de la API con el id
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // enviar token
                            Accept: "application/json"
                        }
                    }
                );

                const data =
                    response.data.pet ||
                    (response.data.pets ? response.data.pets[0] : response.data);

                // -------------------------
                // SI NO EXISTE LA MASCOTA
                // -------------------------
                if (!data) {

                    Swal.fire({
                        icon: "warning",
                        title: "Mascota no encontrada",
                        text: `No existe una mascota con ID ${id}`
                    }).then(() => {

                        navigate("/dashboard"); // volver al dashboard

                    });

                    return;

                }

                setPet(data); // guardar mascota en el estado

            } catch (error) {

                console.error("Error cargando mascota:", error);

                // -------------------------
                // ERROR 404 -> ID NO EXISTE
                // -------------------------
                if (error.response?.status === 404) {

                    Swal.fire({
                        icon: "warning",
                        title: "Mascota no encontrada",
                        text: `No existe una mascota con ID ${id}`
                    }).then(() => {

                        navigate("/dashboard");

                    });

                }

                // -------------------------
                // ERROR 401 -> TOKEN INVALIDO
                // -------------------------
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

        fetchPet(); // ejecutar consulta

    }, [id, navigate]);

    // mientras carga
    if (!pet) return <main id="show" className="animateView"></main>;

    return (

        <main id="show" className="animateView">

            <header>

                <a
                    href="#!"
                    className="btnBack"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/dashboard"); // volver al dashboard
                    }}
                >
                    <img src="/imgs/btn-back.svg" alt="Back" />
                </a>

                <img src="/imgs/title-show.svg" alt="Show" />

            </header>

            <section className="show-pet">

                {/* FOTO DE LA MASCOTA */}
                <div className="photo">

                    <img
                        src={
                            pet.image
                                ? `http://localhost:8000/photos/${pet.image}` // imagen desde Laravel
                                : "/imgs/pet01.png" // imagen por defecto
                        }
                        alt={pet.name}
                        style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px"
                        }}
                    />

                </div>

                {/* INFORMACION DE LA MASCOTA */}
                <div className="info">

                    <p><strong>Name:</strong> <span>{pet.name}</span></p>

                    <p><strong>Kind:</strong> <span>{pet.kind}</span></p>

                    <p><strong>Weight:</strong> <span>{pet.weight}</span></p>

                    <p><strong>Age:</strong> <span>{pet.age} años</span></p>

                    <p><strong>Breed:</strong> <span>{pet.breed}</span></p>

                    <p><strong>Location:</strong> <span>{pet.location}</span></p>

                    <div className="description-box">

                        <strong>Description:</strong>

                        <p>
                            {pet.description || "Sin descripción disponible."}
                        </p>

                    </div>

                </div>

            </section>

        </main>

    );

}

export default ShowPets;