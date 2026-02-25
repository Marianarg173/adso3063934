import { useState, useEffect, useRef } from "react";
import BtnBack from "../components/BtnBack";

function Example4StateHooks() {

    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const hasLoaded = useRef(false);

    const typeColors = {
        fire: "#ff6b6b",
        water: "#4dabf7",
        grass: "#69db7c",
        electric: "#ffd43b",
        psychic: "#f783ac",
        ice: "#74c0fc",
        dragon: "#9775fa",
        dark: "#495057",
        fairy: "#faa2c1",
        normal: "#ced4da",
        fighting: "#ffa94d",
        poison: "#da77f2",
        ground: "#e67700",
        flying: "#a5d8ff",
        bug: "#94d82d",
        rock: "#868e96",
        ghost: "#845ef7",
        steel: "#adb5bd"
    };

    const getRandomPokemon = async () => {
        setLoading(true);

        const randomId = Math.floor(Math.random() * 151) + 1;

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );

        const data = await response.json();

        await new Promise(resolve => setTimeout(resolve, 1500));

        setPokemons(prev => [...prev, data]);

        setLoading(false);
    };

    const clearPokemons = () => {
        setPokemons([]);
    };

    useEffect(() => {
        if (hasLoaded.current) return;
        hasLoaded.current = true;
        getRandomPokemon();
    }, []);

    return (
        <div className="container">
            <BtnBack />

            <h2>Example 4: State & Hooks</h2>
            <h3>(useState, useEffect)</h3>
            <p>Random Pokémon with dynamic styles.</p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    margin: "20px 0"
                }}
            >
                <button
                    onClick={getRandomPokemon}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#4dabf7",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                >
                    🎲 Random Pokémon
                </button>

                <button
                    onClick={clearPokemons}
                    style={{
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "none",
                        backgroundColor: "#ff6b6b",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                >
                    🗑 Clear
                </button>

            </div>
            {loading && <h3>⏳ Capturing Pokémon...</h3>}


            <p>
                You have captured {pokemons.length} Pokémon
            </p>




            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                    marginTop: "20px"
                }}
            >
                {pokemons.map((pokemon) => {

                    const bgColor =
                        typeColors[pokemon.types[0].type.name] || "#f1f3f5";

                    return (
                        <div
                            key={pokemon.id}
                            style={{
                                width: "220px",
                                padding: "12px",
                                borderRadius: "12px",
                                backgroundColor: bgColor,
                                color: "#fff",
                                textAlign: "center",
                                fontSize: "14px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
                            }}
                        >
                            <h3 style={{ margin: "5px 0" }}>
                                {pokemon.name.toUpperCase()}
                            </h3>

                            <img
                                src={
                                    pokemon.sprites.other["official-artwork"]
                                        .front_default
                                }
                                alt={pokemon.name}
                                style={{ width: "120px" }}
                            />

                            <p style={{ margin: "5px 0" }}>
                                <strong>Type:</strong>{" "}
                                {pokemon.types
                                    .map(type => type.type.name)
                                    .join(", ")}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Example4StateHooks;