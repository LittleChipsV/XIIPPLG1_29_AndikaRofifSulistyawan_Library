const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const bookRoutes = require("./routes/book");
const loanRoutes = require("./routes/loan");
const reviewRoutes = require("./routes/review");

const routeNotFoundHandler = require("./middleware/routeNotFoundHandler");
const errorHandler = require("./middleware/globalErrorHandler");


const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(cookieParser("refresh_token"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/reviews", reviewRoutes);

app.all("*", routeNotFoundHandler);

app.use(errorHandler);


module.exports = app;