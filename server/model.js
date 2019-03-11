const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/react-chat";
mongoose.connect(DB_URL);