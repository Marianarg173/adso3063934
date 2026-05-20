const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const cors    = require('cors');
const db      = require('./database');
const auth    = require('./authMiddleware');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = 'your_secret';

// --- 1. AUTH ENDPOINTS ---

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users (username, password)
            VALUES(?, ?)`, [username, hashedPassword], (err) => {
                if(err) return res.status(400).json({error: 'User already exists!'});
                res.json({message: 'User Registered!'});
            }    
    );
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
        if(err || !user) return res.status(400).json({error: 'User not found!'});

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(400).json({error: 'Invalid password!'});

        const token = jwt.sign({id: user.id, username: user.username}, SECRET_KEY, {expiresIn: '1h'});
        res.json({token});
    });
});

// Endpoint de Logout
app.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' });
});


// --- 2. LILO & STITCH: CHARACTERS ENDPOINTS ---

// GET: Listar personajes con su tipo (JOIN)
app.get('/characters', auth, (req, res) => {
    const sql = `
        SELECT characters.id, characters.name, kinds.name AS tipo
        FROM characters
        INNER JOIN kinds ON characters.kind_id = kinds.id
    `;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET: Ver un solo personaje
app.get('/characters/:id', auth, (req, res) => {
    const sql = `
        SELECT characters.id, characters.name, kinds.name AS tipo
        FROM characters
        INNER JOIN kinds ON characters.kind_id = kinds.id
        WHERE characters.id = ?
    `;
    db.get(sql, [req.params.id], (err, row) => {
        if(err || !row) return res.status(404).json({error: 'Character not found!'});
        res.json(row);
    });
});

// POST: Agregar un personaje
app.post('/characters', auth, (req, res) => {
    const { name, kind_id } = req.body;
    db.run(`INSERT INTO characters (name, kind_id)
            VALUES(?, ?)`, [name, kind_id], function(err) {
                if(err) return res.status(400).json({error: 'Error creating character!'});
                res.json({message: 'Character Created!', id: this.lastID});
            }
    );
});

// PUT: Actualizar un personaje
app.put('/characters/:id', auth, (req, res) => {
    const { name, kind_id } = req.body;
    db.run(`UPDATE characters SET name = ?, kind_id = ?
            WHERE id = ?`, [name, kind_id, req.params.id], (err) => {
                if(err) return res.status(400).json({error: 'Error updating!'});
                res.json({message: 'Character Updated!'});
            }
    );
});

// DELETE: Borrar un personaje
app.delete('/characters/:id', auth, (req, res) => {
    db.run(`DELETE FROM characters WHERE id = ?`, [req.params.id], (err) => {
        if(err) return res.status(400).json({error: 'Error deleting!'});
        res.json({message: 'Character Deleted!'});
    });
});


// --- 3. LILO & STITCH: KINDS ENDPOINTS ---

// GET: Listar todas las categorías
app.get('/kinds', auth, (req, res) => {
    db.all(`SELECT * FROM kinds`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET: Ver una sola categoría
app.get('/kinds/:id', auth, (req, res) => {
    db.get(`SELECT * FROM kinds WHERE id = ?`, [req.params.id], (err, row) => {
        if(err || !row) return res.status(404).json({error: 'Kind not found!'});
        res.json(row);
    });
});

// POST: Agregar una nueva categoría
app.post('/kinds', auth, (req, res) => {
    const { name } = req.body;
    db.run(`INSERT INTO kinds (name) VALUES(?)`, [name], function(err) {
        if(err) return res.status(400).json({error: 'Error creating kind!'});
        res.json({message: 'Kind Created!', id: this.lastID});
    });
});

// PUT: Editar una categoría
app.put('/kinds/:id', auth, (req, res) => {
    const { name } = req.body;
    db.run(`UPDATE kinds SET name = ? WHERE id = ?`, [name, req.params.id], (err) => {
        if(err) return res.status(400).json({error: 'Error updating kind!'});
        res.json({message: 'Kind Updated!'});
    });
});

// DELETE: Borrar una categoría
app.delete('/kinds/:id', auth, (req, res) => {
    db.run(`DELETE FROM kinds WHERE id = ?`, [req.params.id], (err) => {
        if(err) return res.status(400).json({error: 'Error deleting kind!'});
        res.json({message: 'Kind Deleted!'});
    });
});

// Servidor corriendo
app.listen(3000, () => console.log('Lilo & Stitch API running on http://localhost:3000'));