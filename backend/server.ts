import app from "./src/app";
import { Env } from "./src/config/config";

const PORT = Env.Port
app.listen(PORT, () => {
  console.log("Server is running");
});
