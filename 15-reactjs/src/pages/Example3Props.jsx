import BtnBack from "../components/BtnBack";
import CaedPokemon from "../components/CardPokemon"

function Example3Props() {

    // Data
    const pokemons = [
        {id: 1, name:'Pikachu', type: 'Electric', power: 'Thunderbold', legendary: false},
        {id: 2, name:'Mewtwo', type: 'Psychic', power: 'Psychic', legendary: true},
        {id: 3, name:'Gyarados', type: 'Water', power: 'Hydro Pump', legendary: false},
    ]
    return(
        <div className="container">
            <h2>Example 3: Props</h2>
            <p>Pass data from parent to children (like function arguments)</p>
        </div>
    )
}

export default Example3Props;