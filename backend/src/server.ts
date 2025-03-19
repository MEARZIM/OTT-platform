
import dotenv from "dotenv";
import appAuth from "./modules/auth";

dotenv.config();

const PORT = process.env.PORT || 8000;

appAuth.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
