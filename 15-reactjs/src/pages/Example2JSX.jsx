import BtnBack from "../components/BtnBack";

function Example2JSX() {

    //JS Variables
    const pkName = 'Bulbasaur';
    const pkType = 'Grass/Poison';
    const pkLevel = 5;
    const pkAbility = ['Overgrow', 'Chlorophyll'];
    const pkImg = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png";

    //Style object
    const styles = {
        container: {
            background: '#e8f5e8',
            color: '#143656',
            padding: '1.2rem',
            marginTop: '1rem',
            borderRadius: '10px',
        },
        tittle: {
            color: '#143656',
            fontSize: '2rem',
            textAlign: 'center',
        },
        img: {
            display: 'flex',
            margin: '1rem auto',
            width: '150px',
        },
        ul: {
            paddingLeft: '2rem',
            fontSize: '0.8rem',
        }
    }

    return (
        <div className="container">
            <BtnBack />
            <h2>Example 2: JSX</h2>
            <p>Writing HTML-like code whitin JavaScript using curly braces { } for JS expresions</p>
            <div style={styles.container}>
                <h3 style={styles.tittle}>{pkName} (Lv{pkLevel})</h3>
                <img
                    src={pkImg}
                    alt={pkName}
                    style={styles.img} />
                <p>Type: {pkType}</p>
                <p>Uppercase: {pkName.toUpperCase()}</p>
                <p>Abilities:</p>
                <ul style={styles.ul}>
                    {pkAbility.map((ability, index) => (
                        <li key={index}>{ability}</li>
                    ))}
                </ul>
                <p>Is it a starter? {pkLevel === 5 ? '✅Yes' : '❌No'}</p>
            </div>
        </div>
    )
}

export default Example2JSX;