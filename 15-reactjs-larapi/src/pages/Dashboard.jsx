// -----------------------------
// IMPORTACIONES
// -----------------------------
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Dashboard() {

    // -----------------------------
    // NAVEGACION ENTRE PAGINAS
    // -----------------------------
    const navigate = useNavigate();

    // -----------------------------
    // ESTADO DONDE SE GUARDAN LAS MASCOTAS
    // -----------------------------
    const [pets, setPets] = useState([]);

    // -----------------------------
    // FUNCION PARA CERRAR SESION
    // -----------------------------
    const logoutUser = () => {

        Swal.fire({
            title: "Sesión cerrada",
            text: "La sesión se cerró correctamente",
            icon: "success"
        }).then(() => {

            // eliminar token
            localStorage.removeItem("token");

            // volver al login
            navigate("/");

        });

    };

    // -----------------------------
    // FUNCION PARA ELIMINAR MASCOTA
    // -----------------------------
    const deletePet = async (petId, petName) => {

        const token = localStorage.getItem("token");

        Swal.fire({
            title: `¿Eliminar a ${petName}?`,
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {

            if (result.isConfirmed) {

                try {

                    await axios.delete(
                        `http://localhost:8000/api/pets/delete/${petId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: "application/json"
                            }
                        }
                    );

                    Swal.fire({
                        title: `${petName} ha sido eliminada`,
                        icon: "success"
                    });

                    // actualizar lista
                    setPets(pets.filter(pet => pet.id !== petId));

                } catch (error) {

                    // SI EL TOKEN ES INVALIDO
                    if (error.response?.status === 401) {

                        localStorage.removeItem("token");

                        Swal.fire({
                            icon: "warning",
                            title: "Sesión expirada",
                            text: "Debes iniciar sesión nuevamente"
                        });

                        navigate("/");

                    }

                    else {

                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "No se pudo eliminar la mascota"
                        });

                    }

                }

            }

        });

    };

    // -----------------------------
    // CARGAR MASCOTAS DESDE LA API
    // -----------------------------
    useEffect(() => {

        const token = localStorage.getItem("token");

        // si no hay token vuelve al login
        if (!token) {

            navigate("/");
            return;

        }

        const fetchPets = async () => {

            try {

                const response = await axios.get(
                    "http://localhost:8000/api/pets/list",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json"
                        }
                    }
                );

                if (response.data && response.data.pets) {

                    setPets(response.data.pets);

                }

            } catch (error) {

                console.error(error);

                // SI EL TOKEN ES INVALIDO
                if (error.response?.status === 401) {

                    localStorage.removeItem("token");

                    Swal.fire({
                        icon: "warning",
                        title: "Sesión expirada",
                        text: "Debes iniciar sesión nuevamente"
                    });

                    navigate("/");

                }

            }

        };

        fetchPets();

    }, [navigate]);

    // -----------------------------
    // INTERFAZ DEL DASHBOARD
    // -----------------------------
    return (

        <main id="dashboard" className="animateView">

            <header>
                <img src="/imgs/title-dashboard.png" alt="Dashboard" />
            </header>

            <nav className="top-actions">

                {/* BOTON AGREGAR */}
                <a
                    href="#!"
                    className="btnAdd"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/add");
                    }}
                >
                    <img src="/imgs/btn-add.png" alt="Add" />
                </a>

                {/* BOTON LOGOUT */}
                <a
                    href="#!"
                    className="btnLogout"
                    onClick={(e) => {
                        e.preventDefault();
                        logoutUser();
                    }}
                >
                    <img src="/imgs/btn-logout.png" alt="Logout" />
                </a>

            </nav>

            <h2>Pet List</h2>

            <section className="list">

                {pets.map((pet) => (

                    <div className="row" key={pet.id}>

                        {/* IMAGEN DE LA MASCOTA */}
                        <img
                            src={
                                pet.image
                                    ? `http://localhost:8000/photos/${pet.image}`
                                    : "/imgs/pet01.png"
                            }
                            alt={pet.name}
                        />

                        {/* INFORMACION */}
                        <div className="data">

                            <h3>{pet.name}</h3>
                            <h4>{pet.kind}</h4>

                        </div>

                        {/* BOTONES */}
                        <nav className="actions">

                            {/* VER */}
                            <a
                                href="#!"
                                className="btnShow"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/show/${pet.id}`);
                                }}
                            ></a>

                            {/* EDITAR */}
                            <a
                                href="#!"
                                className="btnEdit"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate(`/edit/${pet.id}`);
                                }}
                            ></a>

                            {/* ELIMINAR */}
                            <a
                                href="#!"
                                className="btnDelete"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deletePet(pet.id, pet.name);
                                }}
                            ></a>

                        </nav>

                    </div>

                ))}

            </section>

        </main>

    );

}

export default Dashboard;