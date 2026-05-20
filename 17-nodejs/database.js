const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mangasdb.sqlite');

db.serialize(() => {
    // 1. Tabla de Usuarios (la dejamos igual para que el login sirva)
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )`);

    // 2. Tabla de Tipos (Kinds)
    db.run(`CREATE TABLE IF NOT EXISTS kinds (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
    )`);

    // 3. Tabla de Personajes (Characters) con Relación
    db.run(`CREATE TABLE IF NOT EXISTS characters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        kind_id INTEGER,
        FOREIGN KEY (kind_id) REFERENCES kinds(id)
    )`);
});

module.exports = db;