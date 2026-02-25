import { useState } from "react";
import BtnBack from "../components/BtnBack";

function Example5Eventos() {

    const [chosenPokemon, setChosenPokemon] = useState(null);

    const handleChoice = (name, event) => {
        console.log(event);
        setChosenPokemon(name);
    };

    const pokemonImages = {
        Bulbasaur: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        Charmander: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        Squirtle: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
    };

    const buttonStyle = {
        color: "red",
        padding: "10px 20px",
        margin: "10px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#4dabf7",
        color: "white",
        cursor: "pointer"
    };

    return (
        <div className='container' style={{ textAlign: "center" }}>
            <BtnBack />
            <h2>Example 5: Event Handling</h2>
            <p>Respond to user interactions (click, hover, input, submit)</p>

            <div>
                <h3>Click Event</h3>

                <button
                    onClick={(e) => handleChoice("Bulbasaur", e)}
                    style={buttonStyle}
                >
                    Bulbasaur
                </button>

                <button
                    onClick={(e) => handleChoice("Charmander", e)}
                    style={buttonStyle}
                >
                    Charmander
                </button>

                <button
                    onClick={(e) => handleChoice("Squirtle", e)}
                    style={buttonStyle}
                >
                    Squirtle
                </button>

                {chosenPokemon ? (
                    <div style={{ marginTop: "20px" }}>
                        <h3>You chose {chosenPokemon}!</h3>

                        <img
                            src={pokemonImages[chosenPokemon]}
                            alt={chosenPokemon}
                            style={{ width: "180px", marginTop: "10px" }}
                        />
                    </div>
                ) : (
                    <div>Please choose a Pokemon</div>
                )}
            </div>
        </div>
    );
}

export default Example5Eventos;