const { Router } = require("express");
const indexRouter = Router();

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
];

indexRouter.get("/", (req, res) => {
    res.render("index", { title: "Mini Message Board", messages });
});

indexRouter.get("/new", (req, res) => {
    res.render("form", { title: "New Message" });
});

indexRouter.post("/new", (req, res) => {
    const data = req.body;

    messages.push({ text: data.messageText, user: data.userName, added: new Date() });

    res.redirect("/");
})

module.exports = indexRouter;