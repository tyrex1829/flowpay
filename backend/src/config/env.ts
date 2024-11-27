import env from "dotenv";
env.config();

const requiredENV = ["MONGO_URL", "JWT_SECRET", "PORT", "NODE_ENV"];
requiredENV.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const MONGO_URL = process.env.MONGO_URL!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV!;
