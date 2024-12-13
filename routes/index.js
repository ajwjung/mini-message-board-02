const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.renderMessages);
indexRouter.get("/new", indexController.renderForm);
indexRouter.post("/new", indexController.postMessageContents);
indexRouter.get("/message/:messageId", indexController.getMessageById);

module.exports = indexRouter;