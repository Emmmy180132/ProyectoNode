import Database from "better-sqlite3";

class Modelanimals{
    constructor(dbPath) {
        if (!dbPath || typeof dbPath !== 'string') {
            throw new Error('La ruta de la base de datos debe ser una cadena');
        }
        this.db = new Database(dbPath); 
    }

    getAll(ndb){
        console.log("nombre de la bd ",ndb)
        const db = new Database(ndb)
        const query = "select * from animals;"
        const users = db.prepare(query).all()
        db.close()
        return (users)
    }
    
    /**
     * 
     * @param {*} mydb nombre del archivo de base de datos sqlite3
     * @param {*} datos {first_name,last_name,sexo,edad}
     * @returns 
     */
    create(data) {
        const sql = `
            INSERT INTO animals (nameAnim, age, gender, specie)
            VALUES (@nameAnim, @age, @gender, @specie);
        `;
        const statement = this.db.prepare(sql); 
        const result = statement.run(data);
        return result;
    }

// deleteByIdChip(idChip) {
//     const sql = `DELETE FROM users WHERE idChip = ?`;
//     const statement = this.db.prepare(sql);
//     const result = statement.run(idChip);
//     return result;
// }


deleteByName(nameAnim) {
    const sql = `DELETE FROM animals WHERE nameAnim = ?`; 
    const stmt = this.db.prepare(sql);
    return stmt.run(nameAnim);
}

get(idChip) {
    const query = "SELECT * FROM animals WHERE idChip = ?";
    return this.db.prepare(query).get(idChip);
}

// update(data, idChip) {
//     const sql = `
//         UPDATE animals
//         SET nameAnim = ?, age = ?, gender = ?, specie = ?
//         WHERE idChip = ?;
//     `;
//     const statement = this.db.prepare(sql);
//     return statement.run(data.nameAnim, data.age, data.gender, data.specie, idChip);
// }

    update(data, idChip) {
        const sql = `
            UPDATE animals 
            SET nameAnim = ?, age = ?, gender = ?, specie = ? 
            WHERE idChip = ?;
        `;
        const statement = this.db.prepare(sql);
        const result = statement.run(data.nameAnim, data.age, data.gender, data.specie, idChip);
        return result;
    }
}

export default Modelanimals