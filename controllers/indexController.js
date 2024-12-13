const db = require("../db");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const asyncHandler = require("express-async-handler");

const renderMessages = asyncHandler(async (req, res, next) => {
    const allMessages = await db.getAllMessages();
    res.render("index", { title: "Mini Message Board", messages: allMessages });
});

const renderForm = asyncHandler(async (req, res, next) => {
    res.render("form", { title: "New Message" });
});

const postMessageContents = asyncHandler(async (req, res, next) => {
    const data = req.body;

    await db.addNewMessage(data.messageText, data.userName);

    res.redirect("/");
});

const getMessageById = asyncHandler(async (req, res, next) => {
    const messageId = req.params.messageId;
    
    const message = await db.getMessageById(parseInt(messageId));
    
    if (!message) {
        throw new CustomNotFoundError("Message not found");
    };

    res.render("message", { title: "User Message", message });
});

module.exports = { renderMessages, renderForm, postMessageContents, getMessageById };