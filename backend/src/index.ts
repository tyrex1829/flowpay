import app from "./app.js";
import { connectDB } from "./config/db.js";
import { MONGO_URL, PORT } from "./config/env.js";

connectDB(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error(`Failed to cenned to the database: ${error.message}`);
    process.exit(1);
  });
