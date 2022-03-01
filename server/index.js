const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");

const port = process.env.PORT || 4000;
const app = express();
env.config();

const userRoute = require("./routes/auth.js");
const adminRoute = require("./routes/admin.js");
const categoryRoute = require("./routes/category");

mongoose.connect("mongodb://localhost/myEcommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("app is connected to db")).catch(console.error());

const User = require("./models/user.js");

app.use(express.json());
app.use("/", userRoute);
app.use("/", adminRoute);
app.use("/", categoryRoute);
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
});