import express from "express";
import path from 'path';
import AppDaoBetterSQLite from '/MyProject/DaoBetterSqlite3.js';
import Modelusers from "./model.users.js";
import Modelanimals from "./model.animals.js";
import ModelEnCheck from "./model.ec.js";

const controllerDB = new AppDaoBetterSQLite('project.db');
const dbPath = path.join(process.cwd(), 'project.db');
const cus = new Modelusers(dbPath);
const can = new Modelanimals(dbPath);
const cec = new ModelEnCheck(dbPath);
const PORT = 3001; // Puerto de la aplicación
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(process.cwd(), 'public')));

app.get('/EntranceC/getAll', async (req, res) => {
  try {
    const EC = await cec.getAll(); // Usamos la misma instancia de db
    res.set({ "content-type": "application/json" });
    res.send(EC);
  } catch (error) {
    console.error('Error al obtener los datos de entrada:', error);
    res.status(500).send('Error al obtener los datos de entrada');
  }
});
// Obtener todos los usuarios
app.get('/users/getAll', async (req, res) => {
    const users = await cus.getAll("project.db");
    console.log(users);
    res.set({"content-type": "application/json"});
    res.send(users);
});

// Insertar un usuario
app.post('/users/insert', (req, res) => {
    const { nameEmployee, username, gender, age } = req.body;

    if (!nameEmployee || !username || !gender || !age) {
        return res.status(400).send('Please fill all the required fields.');
    }

    try {
        const result = cus.create({ nameEmployee, username, gender, age });
        res.send('Successfully registered data!');
    } catch (error) {
        console.error('Process failed:', error);
        res.status(500).send('Process failed while inserting data into the database.');
    }
});

// Eliminar un usuario por username
app.delete('/users/delete/:username', async (req, res) => {
    const username = req.params.username;

    if (!username) {
        return res.status(400).send('Must enter username');
    }

    try {
        const result = await cus.deleteByUsername(username);

        if (result.changes === 0) {
            return res.status(404).send('Username not found.');
        }

        res.send(`The user "${username}" was successfully eliminated.`);
    } catch (error) {
        console.error('Elimination process failed:', error);
        res.status(500).send('Elimination process failed.');
    }
});
app.get('/users/:idEmployee', async (req, res) => {
  const { idEmployee } = req.params;
  try {
      const user = cus.get(idEmployee);  // Usamos el método `get` de tu modelo para obtener el usuario
      if (!user) {
          return res.status(404).send('Usuario no encontrado');
      }
      res.json(user);  // Devolvemos los datos del usuario
  } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).send('Error al obtener el usuario');
  }
});
// Actualizar un usuario
app.put('/users/update/:idEmployee', async (req, res) => {
  const idEmployee = req.params.idEmployee;
  const { nameEmployee, username, gender, age } = req.body;

  if (!nameEmployee || !username || !gender || !age) {
      return res.status(400).send('All fields are required.');
  }

  try {
      const result = await cus.update({ nameEmployee, username, gender, age }, idEmployee);
      if (result.changes === 0) {
          return res.status(404).send('User not found.');
      }
      res.send('User updated successfully.');
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating the user.');
  }
});

// Obtener todos los animales
app.get('/animals/getAll', async (req, res) => {
    const animals = await can.getAll("project.db");
    console.log(animals);
    res.set({"content-type": "application/json"});
    res.send(animals);
});

// Insertar un animal
app.post('/animals/insert', (req, res) => {
    const { nameAnim, age, gender, specie } = req.body;

    if (!nameAnim || !age || !gender || !specie) {
        return res.status(400).send('Please fill all the required fields.');
    }

    try {
        const result = can.create({ nameAnim, age, gender, specie });
        res.send('Successfully registered animal!');
    } catch (error) {
        console.error('Process failed:', error);
        res.status(500).send('Process failed while inserting animal data into the database.');
    }
});

// Eliminar un animal por nombre
app.delete('/animals/delete/:nameAnim', async (req, res) => {
    const { nameAnim } = req.params;

    if (!nameAnim) {
        return res.status(400).send('Animal name not found');
    }

    try {
        const result = await can.deleteByName(nameAnim);
        if (result.changes === 0) {
            return res.status(404).send(`The animal called "${nameAnim}" was not found.`);
        }
        res.send(`The animal called "${nameAnim}" was successfully deleted.`);
    } catch (error) {
        console.error('Deletion process failed:', error);
        res.status(500).send('Deletion process failed.');
    }
});

app.get('/animals/:idChip', async (req, res) => {
  const { idChip } = req.params;
  try {
      const animal = can.get(idChip); // Asegúrate de que 'can.get' pueda manejar este tipo de consulta.
      if (!animal) {
          return res.status(404).send('Animal not found');
      }
      res.json(animal);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Error al obtener los datos del animal');
  }
});
// Actualizar un animal en el servidor
app.put('/animals/update/:idChip', async (req, res) => {
  const idChip = req.params.idChip;
  const { nameAnim, age, gender, specie } = req.body;

  if (!nameAnim || !age || !gender || !specie) {
      return res.status(400).send('All fields are required.');
  }

  try {
      const result = await can.update({ nameAnim, age, gender, specie }, idChip);
      if (result.changes === 0) {
          return res.status(404).send('User not found.');
      }
      res.send('User updated successfully.');
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send('Error updating the user.');
  }
});




// Eliminar entrada por ticket number
app.delete('/EntranceC/delete/:ticketNumber', async (req, res) => {
    const ticketNumber = req.params.ticketNumber;

    try {
        const result = await cec.deleteTicket(ticketNumber);
        if (result) {
            res.send(`Ticket number ${ticketNumber} eliminated.`);
        } else {
            res.status(404).send('Ticket not found.');
        }
    } catch (error) {
        console.error('Process failed:', error);
        res.status(500).send('Elimination process failed');
    }
});

// Insertar datos de entrada
app.post('/EntranceC/insert', (req, res) => {
    const { AgeGroup, Weekday, Hour, Discount } = req.body;

    if (!AgeGroup || !Weekday || !Hour || !Discount) {
        return res.status(400).send('Please fill all the required fields.');
    }

    try {
        const result = cec.create({ AgeGroup, Weekday, Hour, Discount });
        res.send('Successfully check-in data!');
    } catch (error) {
        console.error('Process failed:', error);
        res.status(500).send('Process failed while inserting data into the database.');
    }
});

app.get('/EntranceC/:TicketNumber', async (req, res) => {
  const { TicketNumber } = req.params;
  try {
      const user = await cec.get(TicketNumber);  // Usamos el método `get` de tu modelo para obtener el usuario
      if (!user) {
          return res.status(404).send('Usuario no encontrado');
      }
      res.json(user);  // Devolvemos los datos del usuario
  } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).send('Error al obtener el usuario');
  }
});
// Actualizar un usuario
app.put('/EntranceC/update/:TicketNumber', async (req, res) => {
  const TicketNumber = req.params.TicketNumber;
  const { AgeGroup, Weekday, Hour, Discount } = req.body;

  if (!AgeGroup || !Weekday || !Hour || !Discount) {
      return res.status(400).json({ message: 'All fields are required.' }); // Cambiar a .json()
  }

  try {
      const result = await cec.update({ AgeGroup, Weekday, Hour, Discount }, TicketNumber); // Asegúrate de que se está pasando correctamente
      if (result.changes === 0) {
          return res.status(404).json({ message: 'Ticket not found.' }); // Cambiar a .json()
      }
      res.status(200).json({ message: 'Ticket updated successfully.' }); // Cambiar a .json()
  } catch (error) {
      console.error('Error updating ticket:', error);
      res.status(500).json({ message: 'Error updating the ticket.' }); // Cambiar a .json()
  }
});




app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}/`);
});
