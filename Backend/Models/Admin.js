import mongoose  from "mongoose";


const AdminSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
});

const AdminModel = mongoose.model("Admin", AdminSchema);

export default AdminModel;