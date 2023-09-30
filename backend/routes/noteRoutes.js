const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
} = require("../controller/noteController");
const { protect } = require("../middleware/authMiddleware");
const { authUser } = require("../controller/userController");

const router = express.Router(protect, protect);

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(protect, getNoteById)
  .put(protect, UpdateNote)
  .delete(protect, DeleteNote);

module.exports = router;
