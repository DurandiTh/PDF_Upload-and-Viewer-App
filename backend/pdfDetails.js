const mongoose = require("mongoose");

const pdfDetailsSchema = new mongoose.Schema(
    {
        // pdf: String,
        // title: String,
        pdf: { type: String, required: true },
        title: { type: String, required: true },
    },
    {
         collection: "pdfDetails"
    }
);

mongoose.model("pdfDetails", pdfDetailsSchema);