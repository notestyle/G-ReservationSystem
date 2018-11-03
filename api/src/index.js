const httpLib = require("http");
const express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
require("dotenv").config();

const { check_login, get_service_list, save_service } = require("../lib/service");

const app = express();
const http = httpLib.createServer(app);
app.use(bodyParser.json());

app.use(
  "/static",
  express.static(path.join(__dirname, "../../gu-reservation/dist/static"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../../gu-reservation/dist/index.html"))
);

http.listen(process.env.PORT, () =>
  console.log("API listening on port ", process.env.PORT, "!")
);

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    let is_success = await check_login(username, password);
    res.json({ is_success: is_success });
  } catch (err) {
    res.json({ is_success: false, error: err });
  }
});

app.get("/api/get-service-list", async (req, res) => {
  try {
    const { is_active } = req.query;

    let services = await get_service_list(is_active);
    res.json({ services });
  } catch (err) {
    res.json({ services: [], error: err });
  }
});


app.post("/api/save-service", async (req, res) => {
  try {
    await save_service(req.body);
    res.json({ success: true });
  } catch (err) {
    console.log(err)
    res.json({ success: false, error: err });
  }
});