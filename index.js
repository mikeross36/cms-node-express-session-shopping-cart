"use strict"
const express = require("express")
const path = require("path")
const cookieSession = require("cookie-session")
const bodyParser = require("body-parser")

const viewRouter = require("./routes/viewRoutes")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/admin/productRoutes")
const cartRouter = require("./routes/cartRoutes")

const app = express();

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieSession({
    name: "session",
    keys: ["kjgj7kfjg99kkld33jfgl"]
}))

app.use(viewRouter)
app.use(userRouter)
app.use(productRouter)
app.use(cartRouter)

const PORT = 3000;

app.listen(PORT, () => console.log(`App is running on port ${PORT}...`))