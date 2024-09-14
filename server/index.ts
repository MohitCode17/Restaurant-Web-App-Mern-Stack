import app from "./src/app";
import { config } from "./src/config/config";

// START SERVER
const startServer = () => {
  const PORT = config.port || 8000;

  // LISTEN FOR APP
  app.listen(PORT, () =>
    console.log(`Server running at port http://localhost:${PORT}`)
  );
};

startServer();
