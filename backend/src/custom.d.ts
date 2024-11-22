// custom.d.ts
import { User } from "./models/userModel"; // Import your User model or type
declare global {
  namespace Express {
    interface Request {
      user?: User; // Assuming `User` is the type you use for your user data
    }
  }
}
