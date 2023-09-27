const express = require("express")
const logger = require("morgan")
const credential = require("./middleware/credentials")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const corsOptions = require("./other_config/cors_options")
const db_init = require("./routes/init_models")

const app = express()
const PORT = process.env.PORT || 3500

app.use(logger("tiny"))
app.use(credential)
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/api/v1/init", db_init)



app.listen()

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });