import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();

// CORS Middleware
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const router = jsonServer.router("./data/db.json");
server.db = router.db; // needed for json-server-auth

// Setup defaults (logger, static, cors, no-cache)
const middlewares = jsonServer.defaults();

// Permission rules (see below for meaning)
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  orders: 660,
  users: 600,
});

// Apply middlewares
server.use(middlewares);
server.use(rules);        // <-- protect routes based on role
server.use(auth);         // <-- enable login/register/auth check
server.use("/api", router); // <-- your API base path

// Start the server
server.listen(3001, () => {
  console.log("🚀 JSON Server running on http://localhost:3001");
});
