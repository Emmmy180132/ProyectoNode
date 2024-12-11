import Database from "better-sqlite3";

class ModelEnCheck{
    constructor(dbPath) {
        if (!dbPath || typeof dbPath !== 'string') {
            throw new Error('La ruta de la base de datos debe ser una cadena');
        }
        this.db = new Database(dbPath); 
    }
    

    getAll() {
        const query = "SELECT * FROM entrancecheck"; 
        const entranceData = this.db.prepare(query).all(); // Usar this.db, no abrir una nueva conexión
        return entranceData; 
    }
    
    
    get(TicketNumber) {
        const query = "SELECT * FROM entrancecheck WHERE TicketNumber = ?;";
        const user = this.db.prepare(query).get(TicketNumber);  // Ejecutamos la consulta con el idEmployee
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
            INSERT INTO entrancecheck (AgeGroup, Weekday, Hour, Discount)
            VALUES (@AgeGroup, @Weekday, @Hour, @Discount);
        `;
        const statement = this.db.prepare(sql); // Asegúrate de que `this.db` sea válido
        const result = statement.run(data); // Ejecuta la inserción
        return result; // Devuelve el resultado de la inserción
    }

// Función para eliminar un ticket usando el 'TicketNumber' como clave primaria
deleteTicket(ticketNumber) {
    const deleteQuery = 'DELETE FROM entrancecheck WHERE TicketNumber = ?';
    const stmt = this.db.prepare(deleteQuery);
    const result = stmt.run(ticketNumber);  // Ejecuta la consulta
    return result.changes > 0;  // Si se eliminó al menos un registro, devuelve true
}


update(data, TicketNumber) {
    const sql = `
        UPDATE entrancecheck 
        SET AgeGroup = ?, Weekday = ?, Hour = ?, Discount = ? 
        WHERE TicketNumber = ?;
    `;
    const statement = this.db.prepare(sql);
    const result = statement.run(data.AgeGroup, data.Weekday, data.Hour, data.Discount, TicketNumber);
    return result;
}
}
export default ModelEnCheck