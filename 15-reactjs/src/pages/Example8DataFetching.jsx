import { useState, useEffect } from 'react'
import BtnBack from '../components/BtnBack'

const styles = {
    container: {
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Verdana",
        backgroundImage: "url('https://wallpaperaccess.com/full/1794017.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white"
    },
    overlay: {
        background: "rgba(0,0,0,0.7)",
        minHeight: "100vh",
        padding: "20px",
        borderRadius: "15px"
    },
    title: {
        fontSize: "36px",
        marginBottom: "20px",
        color: "#ffea00",
        textAlign: "center"
    },
    content: {
        display: "flex",
        gap: "20px",
        alignItems: "flex-start"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "15px",
        flex: 1
    },
    pokemonCard: {
        background: "rgba(255,255,255,0.1)",
        padding: "15px",
        borderRadius: "15px",
        cursor: "pointer",
        transition: "0.3s",
        border: "1px solid rgba(255,255,255,0.2)",
        textAlign: "center"
    },
    pokemonImage: {
        width: "100px",
        marginTop: "10px"
    },
    detailCard: {
        background: "rgba(255,255,255,0.15)",
        padding: "20px",
        borderRadius: "20px",
        minWidth: "300px",
        maxWidth: "350px",
        textAlign: "center",
        flexShrink: 0
    },
    pagination: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "10px"
    },
    button: {
        padding: "8px 15px",
        borderRadius: "10px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold"
    }
}

function Example8DataFetching() {
    const [pokemon, setPokemon] = useState([])
    const [page, setPage] = useState(0)
    const [totalPokemon, setTotalPokemon] = useState(0)
    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [loading, setLoading] = useState(true)

    const limit = 30

    useEffect(() => {
        fetchPokemon()
    }, [page])

    const fetchPokemon = async () => {
        setLoading(true)
        try {
            const offset = page * limit
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            const data = await response.json()
            setPokemon(data.results)
            setTotalPokemon(data.count)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const fetchPokemonDetails = async (url) => {
        try {
            const res = await fetch(url)
            const data = await res.json()
            setSelectedPokemon(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.overlay}>
                <BtnBack />
                <h1 style={styles.title}>Pokédex API</h1>
                <p>Total Pokémon: {totalPokemon}</p>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div style={styles.content}>
                            <div style={styles.grid}>
                                {pokemon.map((p, idx) => (
                                    <div
                                        key={idx}
                                        style={styles.pokemonCard}
                                        onClick={() => fetchPokemonDetails(p.url)}
                                    >
                                        <h4>{p.name.toUpperCase()}</h4>
                                    </div>
                                ))}
                            </div>

                            {selectedPokemon && (
                                <div style={styles.detailCard}>
                                    <h2>{selectedPokemon.name.toUpperCase()}</h2>
                                    <img
                                        src={selectedPokemon.sprites.front_default}
                                        alt={selectedPokemon.name}
                                        style={{ width: "150px" }}
                                    />
                                    <p>Height: {selectedPokemon.height}</p>
                                    <p>Weight: {selectedPokemon.weight}</p>
                                    <p>Types: {selectedPokemon.types.map(t => t.type.name).join(", ")}</p>
                                </div>
                            )}
                        </div>

                        <div style={styles.pagination}>
                            <button
                                style={styles.button}
                                onClick={() => setPage(prev => Math.max(prev - 1, 0))}
                                disabled={page === 0}
                            >
                                Previous
                            </button>
                            <button
                                style={styles.button}
                                onClick={() => setPage(prev => prev + 1)}
                                disabled={(page + 1) * limit >= totalPokemon}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Example8DataFetching