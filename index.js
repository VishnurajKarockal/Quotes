const express = require("express");
const cors = require("cors");
const { quotesRouter } = require("./Routes/quotes.routes");

const app = express();
app.use(cors());
app.use("/quotes", quotesRouter);

app.listen(8080, () => {
  console.log("Server is running at port 8080");
});
