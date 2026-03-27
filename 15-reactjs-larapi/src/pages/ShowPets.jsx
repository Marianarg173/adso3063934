// -------------------------
// IMPORTACIONES
// -------------------------
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ShowPets() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);

    useEffect(() => {

        const token = localStorage.getItem("token");

        // si no hay token volver al login
        if (!token) {
            navigate("/");
            return;
        }

        // -------------------------
        // CONSULTAR API
        // -------------------------
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

                // si la API responde pero no hay mascota
                if (!data) {

                    Swal.fire({
                        icon: "warning",
                        title: "Advertencia",
                        text: response.data?.message || "Mascota no encontrada"
                    }).then(() => {

                        navigate("/dashboard");

                    });

                    return;

                }

                setPet(data);

            } catch (error) {

                console.error("Error cargando mascota:", error);

                // -------------------------
                // ERROR 404
                // -------------------------
                if (error.response?.status === 404) {

                    Swal.fire({
                        icon: "warning",
                        title: "Advertencia",
                        text: error.response?.data?.message || "Mascota no encontrada"
                    }).then(() => {

                        navigate("/dashboard");

                    });

                }

                // -------------------------
                // TOKEN INVALIDO
                // -------------------------
                else if (error.response?.status === 401) {

                    localStorage.removeItem("token");

                    Swal.fire({
                        icon: "warning",
                        title: "Sesión expirada",
                        text: error.response?.data?.message || "Debes iniciar sesión nuevamente"
                    }).then(() => {

                        navigate("/");

                    });

                }

            }

        };

        fetchPet();

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
                        navigate("/dashboard");
                    }}
                >
                    <img src="/imgs/btn-back.svg" alt="Back" />
                </a>

                <img src="/imgs/title-show.svg" alt="Show" />

            </header>


            <section className="show-pet">

                {/* FOTO */}
                <div className="photo">

                    <img
                        src={
                            pet.image
                                ? `http://localhost:8000/photos/${pet.image}`
                                : "/imgs/pet01.png"
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


                {/* INFO */}
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
                            {pet.description || "Sin descripción disponible"}
                        </p>

                    </div>

                </div>

            </section>

        </main>

    );

}

export default ShowPets;