import { useState } from "react";
import BtnBack from "../components/BtnBack";

function Example6CondicionalListas() {

    const [pokemons, setPokemons] = useState([
        { id: 1, name: "Pidgey", type: "Flying", level: 3 },
        { id: 2, name: "Zubat", type: "Flying", level: 4 },
        { id: 3, name: "Squirtle", type: "Water", level: 5 },
        { id: 4, name: "Pikachu", type: "Electric", level: 2 }
    ]);

    const [selectedType, setSelectedType] = useState("All");
    const [levelFilter, setLevelFilter] = useState(false);

    // FILTRO
    const filteredPokemons = pokemons.filter((pokemon) => {
        const typeCondition =
            selectedType === "All" || pokemon.type === selectedType;

        const levelCondition =
            !levelFilter || pokemon.level >= 4;

        return typeCondition && levelCondition;
    });

    // AGREGAR POKÉMON
    const addRandomPokemon = () => {
        const types = ["Water", "Fire", "Electric", "Flying", "Grass"];
        const names = ["Eevee", "Charmander", "Bulbasaur", "Magikarp", "Gastly"];

        const newPokemon = {
            id: Date.now(),
            name: names[Math.floor(Math.random() * names.length)],
            type: types[Math.floor(Math.random() * types.length)],
            level: Math.floor(Math.random() * 6) + 1
        };

        setPokemons(prev => [...prev, newPokemon]);
    };

    // ELIMINAR
    const releasePokemon = (id) => {
        setPokemons(prev => prev.filter(pokemon => pokemon.id !== id));
    };

    // ESTILOS
    const titleH3 = {
        borderBottom: "2px dotted",
        marginBottom: "1rem",
        paddingBottom: "0.5rem"
    };

    const buttonStyle = {
        padding: "10px 20px",
        margin: "10px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#4dabf7",
        color: "white",
        cursor: "pointer",
        fontSize: "16px"
    };

    const cardStyle = {
        border: "2px solid #072544",
        borderRadius: "12px",
        padding: "15px",
        margin: "10px",
        backgroundColor: "#689bcd",
        width: "200px",
        textAlign: "center"
    };

    const selectStyle = {
        padding: "8px",
        margin: "10px",
        borderRadius: "6px"
    };

    const checkboxStyle = {
        marginLeft: "10px",
        cursor: "pointer"
    };

    return (
        <div className="container" style={{ textAlign: "center", padding: "20px" }}>
            <BtnBack />

            <h2>Example 6: Conditional Rendering & Lists</h2>
            <p>Filter and manage Pokémon dynamically</p>

            <div>
                <h3 style={titleH3}>Filters</h3>

                <select
                    style={selectStyle}
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Flying">Flying</option>
                    <option value="Water">Water</option>
                    <option value="Electric">Electric</option>
                    <option value="Fire">Fire</option>
                    <option value="Grass">Grass</option>
                </select>

                <label style={checkboxStyle}>
                    <input
                        type="checkbox"
                        checked={levelFilter}
                        onChange={() => setLevelFilter(!levelFilter)}
                    />
                    Level 4+
                </label>

                <div>
                    <button style={buttonStyle} onClick={addRandomPokemon}>
                        ➕ Add Pokémon
                    </button>
                </div>
            </div>

            <h3 style={{ marginTop: "20px" }}>
                Showing {filteredPokemons.length} of {pokemons.length}
            </h3>

            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                {filteredPokemons.map((pokemon) => (
                    <div key={pokemon.id} style={cardStyle}>
                        <h4>{pokemon.name}</h4>
                        <p>Level: {pokemon.level}</p>
                        <p>Type: {pokemon.type}</p>

                        <button
                            style={{ ...buttonStyle, backgroundColor: "#ff6b6b" }}
                            onClick={() => releasePokemon(pokemon.id)}
                        >
                            ❌ Release
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Example6CondicionalListas;