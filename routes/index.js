const { Router } = require("express");
const indexRouter = Router();

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

indexRouter.get("/", (req, res, next) => {
    res.render("index", { title: "Mini Message Board", messages });
});

indexRouter.get("/new", (req, res, next) => {
    res.render("form", { title: "New Message" });
});

indexRouter.post("/new", (req, res, next) => {
    const data = req.body;

    messages.push({
        id: messages.length,
        text: data.messageText,
        user: data.userName,
        added: new Date()
    });

    res.redirect("/");
});

indexRouter.get("/message/:messageId", (req, res, next) => {
    const messageId = req.params.messageId;
    
    const message = messages.find((message) => message.id === parseInt(messageId));
    
    if (!message) {
        return res.status("404").send("Message not found");
    };

    res.render("message", { title: "User Message", message });
});

module.exports = indexRouter;