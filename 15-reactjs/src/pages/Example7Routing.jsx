import { Routes, Route, Link, useSearchParams } from 'react-router-dom'
import BtnBack from '../components/BtnBack'

const styles = {
    container: {
        minHeight: "100vh",
        padding: "40px",
        textAlign: "center",
        fontFamily: "Verdana",
        backgroundImage: "url('https://wallpaperaccess.com/full/1794017.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    overlay: {
        background: "linear-gradient(135deg, rgba(227,85,205,0.9), rgba(103,132,227,0.9))",
        minHeight: "100vh",
        padding: "40px",
        color: "white"
    },
    title: {
        color: "white",
        fontSize: "36px",
        marginBottom: "20px",
        letterSpacing: "1px"
    },
    nav: {
        marginBottom: "40px"
    },
    link: {
        margin: "8px",
        padding: "10px 18px",
        textDecoration: "none",
        background: "linear-gradient(135deg, rgba(168, 62, 152, 0.9), rgba(15, 39, 115, 0.9))",
        color: "#333",
        borderRadius: "15px",
        fontWeight: "bold"
    },
    card: {
        background: "rgba(255,255,255,0.1)",
        padding: "30px",
        borderRadius: "20px",
        maxWidth: "900px",
        margin: "auto"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginTop: "30px"
    },
    pokemonCard: {
        background: "rgba(255,255,255,0.15)",
        padding: "15px",
        borderRadius: "15px"
    },
    image: {
        width: "110px",
        marginTop: "10px"
    }
}

// Datos locales (sin API)
const pokemonListData = [
    {
        name: "Bulbasaur",
        description: "Grass type Pokémon.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    },
    {
        name: "Charmander",
        description: "Fire type Pokémon.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
    },
    {
        name: "Squirtle",
        description: "Water type Pokémon.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"
    },
    {
        name: "Pikachu",
        description: "Electric type Pokémon.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    },
    {
        name: "Eevee",
        description: "Normal type Pokémon.",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png"
    }
]

function GeneralInfo() {
    return (
        <div style={styles.card}>
            <h2>Welcome to the Pokédex</h2>
            <p>
                This application allows you to explore a list of Pokémon
                and view detailed information about each one.
            </p>
        </div>
    )
}

function PokemonList() {
    return (
        <div style={styles.card}>
            <h2>Pokémon List</h2>

            <div style={styles.grid}>
                {pokemonListData.map((pokemon, index) => (
                    <div key={index} style={styles.pokemonCard}>
                        <h4>{pokemon.name}</h4>
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            style={styles.image}
                        />
                        <p>{pokemon.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function PokemonDetails() {
    const [searchParams] = useSearchParams()
    const name = searchParams.get("name")
    const pokemon = pokemonListData.find(p => p.name === name)

    return (
        <div style={styles.card}>
            {pokemon ? (
                <>
                    <h2>{pokemon.name}</h2>
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={{ width: "200px", marginTop: "20px" }}
                    />
                    <p style={{ marginTop: "20px" }}>
                        {pokemon.description}
                    </p>
                </>
            ) : (
                <p>Pokémon not found.</p>
            )}
        </div>
    )
}

function InternalNavigation() {
    return (
        <nav style={styles.nav}>
            <Link style={styles.link} to="/example7">Home</Link>
            <Link style={styles.link} to="/example7/list">List</Link>
            <Link style={styles.link} to="/example7/details?name=Pikachu">Pikachu</Link>
            <Link style={styles.link} to="/example7/details?name=Charmander">Charmander</Link>
        </nav>
    )
}

function Example7Routing() {
    return (
        <div style={styles.container}>
            <div style={styles.overlay}>
                <BtnBack />
                <h1 style={styles.title}>Pokédex Application</h1>

                <InternalNavigation />

                <Routes>
                    <Route path="/" element={<GeneralInfo />} />
                    <Route path="/list" element={<PokemonList />} />
                    <Route path="/details" element={<PokemonDetails />} />
                </Routes>
            </div>
        </div>
    )
}

export default Example7Routing