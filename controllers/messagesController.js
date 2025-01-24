const messagesDb = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const alphanumericErr = "must only contain letters and/or numbers.";
const lengthErr = "must be between 1 and 255 characters.";

// Form validation middleware
const validateMessage = [
    body("userName").trim()
        .isAlphanumeric().withMessage(`Username ${alphanumericErr}`),
    body("messageText").trim()
        .isLength({ min: 1, max: 255 }).withMessage(`Message ${lengthErr}`),
]

const renderMessages = asyncHandler(async (req, res, next) => {
    const allMessages = await messagesDb.getAllMessages();
    res.render("index", { title: "Mini Message Board", messages: allMessages });
});

const renderForm = asyncHandler(async (req, res, next) => {
    res.render("form", { title: "New Message", message: null, buttonText: "Submit" });
});

const postMessageContents = asyncHandler(async (req, res, next) => {
    // Handle validation errors (if any)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("createMessage", {
            title: "Create Message",
            errors: errors.array(),
        });
    }

    const data = req.body;

    await messagesDb.addNewMessage(data.messageText, data.userName);

    res.redirect("/");
});

const createMessagePost = [validateMessage, postMessageContents]

const getMessageById = asyncHandler(async (req, res, next) => {
    const messageId = req.params.messageId;
    
    const message = await messagesDb.getMessageById(parseInt(messageId));
    
    if (!message) {
        throw new CustomNotFoundError("Message not found");
    };
    
    res.render("message", { title: "User Message", message: message[0] });
});

const deleteMessageById = asyncHandler(async(req, res, next) => {
    const messageId = req.params.messageId;    

    await messagesDb.deleteMessageById(parseInt(messageId));

    res.redirect("/");
});

const renderEditForm = asyncHandler(async(req, res, next) => {
    const messageId = req.params.messageId;
    const existingMessages = await messagesDb.getMessageById(messageId);
    
    res.render("form", { 
        title: "Edit Message",
        message: existingMessages[0],
        buttonText: "Save"
    });
});

const editMessageById = asyncHandler(async(req, res, next) => {
    const messageId = req.params.messageId;
    const newMessageData = req.body;
    
    await messagesDb.editMessageById(
        messageId, 
        newMessageData.messageText, 
        newMessageData.userName
    );

    res.redirect("/");
});

module.exports = { 
    renderMessages, 
    renderForm, 
    createMessagePost, 
    getMessageById, 
    deleteMessageById,
    renderEditForm,
    editMessageById
};