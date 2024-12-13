const messages = [
    {
        id: 0,
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        id: 1,
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

async function getAllMessages() {
    return messages;
};

async function getMessageById(messageId) {
    return messages.find((message) => message.id === parseInt(messageId));
};

async function addNewMessage(text, user) {
    messages.push({ 
        id: messages.length, 
        text: text, 
        user: user, 
        added: new Date() 
    });
};

module.exports = { getAllMessages, getMessageById, addNewMessage };