const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
// Número con código de país, solo dígitos. Ej: 50761234567
const WHATSAPP = process.env.WHATSAPP_NUMBER || "50764202819";

const app = express();
const html = fs
  .readFileSync(path.join(__dirname, "public", "index.html"), "utf8")
  .replaceAll("{{WHATSAPP}}", WHATSAPP);

app.get("/", (_req, res) => res.type("html").send(html));
app.use(express.static(path.join(__dirname, "public"), { index: false }));

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
