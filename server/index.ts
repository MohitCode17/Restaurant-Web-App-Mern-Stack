import app from "./src/app";
import { config } from "./src/config/config";
import { connectDB } from "./src/config/db";

// START SERVER
const startServer = async () => {

  // DATABASE CONNECTION
  await connectDB()

  const PORT = config.port || 8000;

  // LISTEN FOR APP
  app.listen(PORT, () =>
    console.log(`Server running at port http://localhost:${PORT}`)
  );
};

startServer();
