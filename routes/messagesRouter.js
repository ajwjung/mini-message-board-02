const { Router } = require("express");
const indexController = require("../controllers/messagesController");

const indexRouter = Router();

indexRouter.get("/", indexController.renderMessages);
indexRouter.get("/new", indexController.renderForm);
indexRouter.post("/new", indexController.createMessagePost);
indexRouter.get("/message/:messageId", indexController.getMessageById);
indexRouter.delete("/message/:messageId", indexController.deleteMessageById);
indexRouter.get("/message/:messageId/edit", indexController.renderEditForm);
indexRouter.put("/message/:messageId", indexController.editMessageById);

module.exports = indexRouter;