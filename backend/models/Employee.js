const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
    },
    {
        collection: "employee",
    }
);

// module.exports = mongoose.model("employee",EmployeeSchema);
const EmployeeModel = mongoose.model("employees", EmployeeSchema)
module.exports = EmployeeModel