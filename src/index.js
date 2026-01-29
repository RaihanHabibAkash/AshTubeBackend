import dotenv from "dotenv";
import { connectedDB } from "./db/mongoCon.js";
import { app } from "./app.js";

dotenv.config({ path: "../.env" });
const port = process.env.PORT || 8000;

app.on("error", (error) => {
  console.log("Error while starting the server", error);
  process.exit(1);
});

connectedDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Error while connectingMongoDB:", error);
  });
