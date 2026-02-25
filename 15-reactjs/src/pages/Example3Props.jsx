import BtnBack from "../components/BtnBack";
import CardPokemon from "../components/CardPokemon";

function Example3Props() {
  // data
  const pokemon = [
    {
      id: 1,
      name: "Charmander",
      type: "fire",
      power: "fire",
      legendary: true,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    },
    {
      id: 2,
      name: "Squirtle",
      type: "water",
      power: "Torrent",
      legendary: false,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    },
    {
      id: 3,
      name: "Bulbasaur",
      type: "grass/poison",
      power: "Overgrow",
      legendary: false,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    },

    {
      id: 4,
      name: "Rayquaza",
      type: "dragon/flying",
      power: "Air Lock",
      legendary: true,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png",

    },
    {
      id: 5,
      name: "Gyarados",
      type: "water/flying",
      power: "Intimidate",
      legendary: false,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
    },
    {
      id: 6,
      name: "Mewtwo",
      type: "psychic",
      power: "Pressure",
      legendary: true,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    },
    {
      id: 7,
      name: "Pikachu",
      type: "electric",
      power: "Static",
      legendary: false,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    },
    {
      id: 8,
      name: "Gengar",
      type: "ghost/poison",
      power: "Cursed Body",
      legendary: false,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    },
    {
      id: 9,
      name: "Dragonite",
      type: "dragon/flying",
      power: "Inner Focus",
      legendary: false,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    },
    {
      id: 10,
      name: "Arceus",
      type: "normal",
      power: "Multitype",
      legendary: true,
      image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png",

    }
  ];

  // styles
  const style = {
    cards: {
      display: "flex",
      flexWrap: "wrap",
      justyfyContent: "center",
    },
  };

  return (
    <div className="container">
      <BtnBack />
      <h2>Example 3: Props</h2>
      <p>Pass data from parent to children (like function arguments)</p>
      <div style={style.cards}>
        {/* We pass different props to each card */}

        {
          pokemon.map((pokemon) => (
            <CardPokemon
              image={pokemon.image}
              key={pokemon.id}
              name={pokemon.name}
              type={pokemon.type}
              power={pokemon.power}
              legendary={pokemon.legendary} />
          ))
        }

      </div>
    </div>
  );
}

export default Example3Props;