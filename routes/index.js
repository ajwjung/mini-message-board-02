const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.renderMessages);
indexRouter.get("/new", indexController.renderForm);
indexRouter.post("/new", indexController.createMessagePost);
indexRouter.get("/message/:messageId", indexController.getMessageById);
indexRouter.delete("/message/:messageId", indexController.deleteMessageById);

module.exports = indexRouter;