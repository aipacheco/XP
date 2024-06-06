import dotenv from "dotenv"
dotenv.config()

import { AppDataSource } from "./models/db"
import { app } from "./app"

const PORT = process.env.PORT || 4001

AppDataSource.initialize()
  .then(() => {
    console.log("database conected")
    app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
  })
  .catch((error) => console.log(error))

  