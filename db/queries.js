const pool = require("./pool");

async function getAllMessages() {
    try {
        const { rows } = await pool.query("SELECT * FROM messages");    
        return rows;
    } catch (error) {
        console.error("Error fetching messages from database:", {
            message: error.message,
            stack: error.stack,
            query: "SELECT * FROM messages;"
        });
    } 
};

async function getMessageById(messageId) {
    try {
        const { rows } = await pool.query("SELECT * FROM messages WHERE id=($1)", [messageId]);
        return rows;
    } catch (error) {
        console.error("Error fetching messages from database:", {
            message: error.message,
            stack: error.stack,
            query: "SELECT * FROM messages WHERE id = ($1);"
        });
    }
};

async function addNewMessage(text, username) {
    try {
        const SQL = `
            INSERT INTO messages (text, username)
            VALUES ($1, $2);
        `;

        await pool.query(SQL, [text, username]);
    } catch (error) {
        console.error("Error inserting new message into database", {
            message: error.message,
            stack: error.stack,
            query: SQL
        })
    }
};

async function deleteMessageById(messageId) {
    try {
        const SQL = `
            DELETE FROM messages
            WHERE id=($1)
        `;

        await pool.query(SQL, [messageId]);
    } catch (error) {
        console.error("Error deleting message from database", {
            message: error.message,
            stack: error.stack,
            query: SQL
        })
    }
};

module.exports = {
    getAllMessages,
    getMessageById,
    addNewMessage,
    deleteMessageById
}