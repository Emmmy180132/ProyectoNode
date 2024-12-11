import express from "express";
import { getAll, getById, insert } from "./model.users.js";

const app = express();
const mydb = "project.db";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Convierte un conjunto de registros en formato HTML (tabla).
 * @param {Array} data - Lista de registros.
 * @param {string} tableName - Nombre de la tabla.
 * @returns {string} - Tabla HTML.
 */
function convertToHTMLTable(data, tableName) {
    if (data.length === 0) {
        return `<h3>No hay registros en la tabla <strong>${tableName}</strong></h3>`;
    }

    // Obtener encabezados de la tabla
    const headers = Object.keys(data[0]);

    // Generar HTML
    const tableHeaders = headers.map((header) => `<th>${header}</th>`).join("");
    const tableRows = data
        .map(
            (row) =>
                `<tr>${headers.map((key) => `<td>${row[key]}</td>`).join("")}</tr>`
        )
        .join("");

    return `
        <h3>Tabla: ${tableName}</h3>
        <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
                <tr>${tableHeaders}</tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;
}

// Ruta para la tabla 'users'
app.get("/users", (req, res) => {
    const users = getAll(mydb, "users");
    const htmlTable = convertToHTMLTable(users, "users");
    res.send(htmlTable);
});

// Ruta para la tabla 'animals'
app.get("/animals", (req, res) => {
    const animals = getAll(mydb, "animals");
    const htmlTable = convertToHTMLTable(animals, "animals");
    res.send(htmlTable);
});

// Ruta para la tabla 'entrancecheck'
app.get("/entrancecheck", (req, res) => {
    const entries = getAll(mydb, "entrancecheck");
    const htmlTable = convertToHTMLTable(entries, "entrancecheck");
    res.send(htmlTable);
});

// Ruta para insertar datos en 'users' desde un formulario HTML
app.get("/add-user", (req, res) => {
    res.send(`
        <h3>Agregar Usuario</h3>
        <form action="/users" method="POST">
            <label>Nombre: <input type="text" name="nameEmployee" required></label><br>
            <label>Usuario: <input type="text" name="username" required></label><br>
            <label>Edad: <input type="number" name="age" required></label><br>
            <label>Género: <input type="text" name="gender" required></label><br>
            <button type="submit">Agregar</button>
        </form>
    `);
});

app.post("/users", (req, res) => {
    const data = {
        nameEmployee: req.body.nameEmployee,
        username: req.body.username,
        age: req.body.age,
        gender: req.body.gender,
    };
    insert(mydb, "users", data);
    res.send(`<h3>Usuario agregado correctamente</h3><a href="/users">Ver usuarios</a>`);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
