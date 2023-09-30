const express = require("express");
const note = require("./data/notes");
const dotenv = require("dotenv");
const Connection = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
dotenv.config();

Connection(process.env.DB_URL);
app.use(express.json());

app.use(cors());

app.get("/api/note", (req, res) => {
  res.json(note);
});

app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
