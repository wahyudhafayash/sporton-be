import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import categoryRoutes from "./routes/category.route";
import productRoutes from "./routes/product.route";
import bankRoutes from "./routes/bank.route";
import transactionRoutes from "./routes/transaction.route";
import { authenticate } from "./middlewares/auth.middleware";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/transaction", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Sporton backend API is running.");
});

app.get("/test-middleware", authenticate, (req, res) => {
  res.send("Hore, kamu bisa mengaksesnya karena kamu pakai token!");
});

export default app;
