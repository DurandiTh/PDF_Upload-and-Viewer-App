const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema(
    {
        pdf: String,
        title: String,
    },
    {
        collection: "Userinfo",
    }
);

module.exports = mongoose.model("Userinfo",userDetailSchema);