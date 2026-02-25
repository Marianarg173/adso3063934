import './CardPokemon.css';
function CardPokemon({ name, type, power, image, legendary = false }) {

    const typeColors = {
        electric: "#ffd700",
        fire: "#ff4500",
        water: "#1e90ff",
        grass: "#32cd32",
        psychic: "#ff69b4",
        normal: "#a9a9a9",
    }


    return (
        <div
            className='pokemon-card'
            style={{ borderColor: typeColors[type?.toLowerCase()] || "#ccc" }}
        >

            {image && <img src={image} alt={name} className='pokemon-image' />}
            <h3>{name}</h3>
            <p className='pokemon-type'>Type: {type}</p>
            <p className='pokemon-type'>Power: {power}</p>
            {legendary && <span className='legendary-badge'>⭐ Legendary ⭐</span>}

        </div>
    )
}

export default CardPokemon;