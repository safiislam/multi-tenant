import cors from "cors";
import cookieParser from "cookie-parser";

export default function (app) {
  app.use(cookieParser());
  app.use(cors());
}
