const express = require("express");

const Authorization = require("./services/google_auth");

const app = express();
const PORT = 3001;

app.get("/metadata", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } =
    await Authorization.getAuthSheets();
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId: "15XBhRCPujAH6cJ-Mz3HOcEL-jY0X85Cge-PM9kyxFN0",
  });
  res.send(metadata);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
