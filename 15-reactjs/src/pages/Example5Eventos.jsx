import { useState } from "react";
import BtnBack from "../components/BtnBack";

function Example5Eventos() {

    const [chosenPokemon, setChosenPokemon] = useState(null);
    const [hoveredPokemon, setHoveredPokemon] = useState(null);
    const [inputRange, setInputRange] = useState(180);

    // CLICK
    const handleChoice = (name) => {
        setChosenPokemon(name);
    };

    // HOVER
    const handleMouseEnter = (name) => {
        setHoveredPokemon(name);
    };

    const handleMouseLeave = () => {
        setHoveredPokemon(null);
    };

    // INPUT RANGE
    const handleInput = (e) => {
        setInputRange(Number(e.target.value));
    };

    const pokemonImages = {
        Bulbasaur: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        Charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        Squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        Pikachu: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        Eevee: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png"
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

    const titleH3 = {
        borderBottom: "2px dotted",
        marginBottom: "1rem",
        paddingBottom: "0.5rem"
    };

    const hoverStyle = {
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "15px",
        margin: "10px",
        border: "2px solid #dee2e6",
        backgroundColor: "#00bfff",
        cursor: "pointer",
        transition: "all 0.3s ease"
    };

    const rangeStyle = {
        accentColor: "#00bfff",
        width: "300px",
        height: "8px",
        cursor: "pointer",
        marginTop: "15px"
    };

    const outputStyle = {
        marginTop: "10px",
        fontSize: "18px",
        fontWeight: "bold"
    };

    return (
        <div className="container" style={{ textAlign: "center", padding: "20px" }}>
            <BtnBack />

            <h2>Example 5: Event Handling</h2>
            <p>Respond to user interactions (click, hover, input)</p>

            {/* CLICK SECTION */}
            <div>
                <h3 style={titleH3}>Click Event</h3>

                <button onClick={() => handleChoice("Bulbasaur")} style={buttonStyle}>
                    🍃 Bulbasaur
                </button>

                <button onClick={() => handleChoice("Charmander")} style={buttonStyle}>
                    🔥 Charmander
                </button>

                <button onClick={() => handleChoice("Squirtle")} style={buttonStyle}>
                    💧 Squirtle
                </button>

                {chosenPokemon ? (
                    <div style={{ marginTop: "20px" }}>
                        <h3>You chose {chosenPokemon}!</h3>
                        <img
                            src={pokemonImages[chosenPokemon]}
                            alt={chosenPokemon}
                            style={{
                                width: `${inputRange}px`,
                                marginTop: "10px",
                                transition: "0.3s ease"
                            }}
                        />
                    </div>
                ) : (
                    <div>Please choose a Pokemon</div>
                )}
            </div>

            {/* HOVER SECTION */}
            <div style={{ marginTop: "40px" }}>
                <h3 style={titleH3}>MouseEnter / MouseLeave Event</h3>

                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                    <div
                        onMouseEnter={() => handleMouseEnter("Pikachu")}
                        onMouseLeave={handleMouseLeave}
                        style={hoverStyle}
                    >
                        ⚡ Hover Pikachu
                    </div>

                    <div
                        onMouseEnter={() => handleMouseEnter("Eevee")}
                        onMouseLeave={handleMouseLeave}
                        style={hoverStyle}
                    >
                        🌟 Hover Eevee
                    </div>
                </div>

                {hoveredPokemon && (
                    <div style={{ marginTop: "20px" }}>
                        <h3>{hoveredPokemon} is here!</h3>
                        <img
                            src={pokemonImages[hoveredPokemon]}
                            alt={hoveredPokemon}
                            style={{ width: "160px", marginTop: "10px" }}
                        />
                    </div>
                )}
            </div>

            {/* INPUT RANGE */}
            <div style={{ marginTop: "40px" }}>
                <h3 style={titleH3}>Pokemon Power 💪</h3>

                <input
                    style={rangeStyle}
                    type="range"
                    min="0"
                    max="100"
                    value={inputRange}
                    onChange={handleInput}
                />

                <div style={outputStyle}>
                    🔥 Power: {inputRange}
                </div>
            </div>
        </div>
    );
}

export default Example5Eventos;