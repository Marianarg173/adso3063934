import BtnBack from "../components/BtnBack";

const cardStyle = {
    border: '4px solid orange',
    padding: '1.4rem',
    borderRadius: '0.3rem',
    background: '#fff0e6',
    width: '360px'
};

function Charmander() {
    return (
        <div style={cardStyle}>
            <h2> 🔥Charmander</h2>
            <p>Type: Fire</p>
            <p>Ability: Blaze</p>
        </div>
    );
}

function Pikachu() {
    return (
        <div style={cardStyle}>
            <h2> 💛Pikachu</h2>
            <p>Type: Electric</p>
            <p>Ability: Static</p>
        </div>
    );
}

function Example1Components() {
    return (
        <div className="container">
            <BtnBack />
            <h2>Example 1: Components</h2>

            <p>Create independent, reusable pieces of UI called components.</p>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '2rem',
                gap: '1rem',
                color: '#000'
            }}>
                <Charmander />
                <Pikachu />
            </div>
        </div>
    );
}

export default Example1Components;