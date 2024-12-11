import Database from "better-sqlite3";

class Modelusers{
    constructor(dbPath) {
        if (!dbPath || typeof dbPath !== 'string') {
            throw new Error('La ruta de la base de datos debe ser una cadena');
        }
        this.db = new Database(dbPath); 
    }
    
    

    getAll(mydb){
        const db = new Database(mydb)
        const query = "select * from users;"
        const users = db.prepare(query).all()
        db.close()
        // console.log(personas)
        return (users)
    }
    
    get(idEmployee) {
        const query = "SELECT * FROM users WHERE idEmployee = ?;";
        const user = this.db.prepare(query).get(idEmployee);  // Ejecutamos la consulta con el idEmployee
        return user;
    }
    /**
     * 
     * @param {*} mydb nombre del archivo de base de datos sqlite3
     * @param {*} datos {first_name,last_name,sexo,edad}
     * @returns 
     */
  
    create(data) {
        const sql = `
            INSERT INTO users (nameEmployee, username, gender, age)
            VALUES (@nameEmployee, @username, @gender, @age);
        `;
        const statement = this.db.prepare(sql); // Asegúrate de que `this.db` sea válido
        const result = statement.run(data);
        return result;
    }

    deleteByUsername(username) {
        const sql = `DELETE FROM users WHERE username = ?`;
        const statement = this.db.prepare(sql);
        const result = statement.run(username);
        return result;
    }
    


update(data, idEmployee) {
    const sql = `
        UPDATE users 
        SET nameEmployee = ?, username = ?, gender = ?, age = ? 
        WHERE idEmployee = ?;
    `;
    const statement = this.db.prepare(sql);
    const result = statement.run(data.nameEmployee, data.username, data.gender, data.age, idEmployee);
    return result;
}

}
 export default Modelusers

