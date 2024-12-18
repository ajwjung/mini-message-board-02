const path = require("path");
const express = require("express");

const indexRouter = require("./routes/index.js");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message || "Something went wrong");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));