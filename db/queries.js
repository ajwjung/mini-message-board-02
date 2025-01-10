const pool = require("./pool");

async function getAllMessages() {
    try {
        const { rows } = await pool.query("SELECT * FROM messages");    
        return rows;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    } 
};

module.exports = {
    getAllMessages
}