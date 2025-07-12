import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// db
import connectDB from "./db.js";

// Routes
import authRouter from "./routes/auth.routes.js";
import booksRouter from "./routes/book.routes.js";
import cartRouter from "./routes/cart.routes.js";
import reviewRouter from "./routes/review.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT ?? 3000;

app.use(
  cors({
    origin:
      process.env.CORS_ORIGIN === "*"
        ? "*"
        : process.env.CORS_ORIGIN?.split(","),
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/books", booksRouter);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/review", reviewRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running in: http://localhost:${PORT}`);
});
