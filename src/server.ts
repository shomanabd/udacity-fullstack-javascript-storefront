import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRouter from "./routes/users";
import ordersRouter from "./routes/orders";
import productsRouter from "./routes/products";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(cors());
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use("/products", productsRouter);

app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});

export default app;
