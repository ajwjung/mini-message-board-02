const db = require("../db");

async function renderMessages(req, res, next) {
    const allMessages = await db.getAllMessages();
    res.render("index", { title: "Mini Message Board", messages: allMessages });
};

async function renderForm(req, res, next) {
    res.render("form", { title: "New Message" });
};

async function postMessageContents(req, res, next) {
    const data = req.body;

    db.addNewMessage(data.messageText, data.userName);

    res.redirect("/");
};

async function getMessageById(req, res, next) {
    const messageId = req.params.messageId;
    
    const message = await db.getMessageById(parseInt(messageId));
    
    if (!message) {
        res.status("404").send("Message not found");
        return;
    };

    res.render("message", { title: "User Message", message });
};

module.exports = { renderMessages, renderForm, postMessageContents, getMessageById };