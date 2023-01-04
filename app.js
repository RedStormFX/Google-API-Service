const express = require("express");

const Authorization = require("./services/google_auth");

const app = express();
app.use(express.json());
const PORT = 3001;

app.get("/metadata", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } =
    await Authorization.getAuthSheets();
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId: "15XBhRCPujAH6cJ-Mz3HOcEL-jY0X85Cge-PM9kyxFN0",
  });
  res.send(metadata.data);
});

app.get("/getRows", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } =
    await Authorization.getAuthSheets();

  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Лист1",
    valueRenderOption: "UNFORMATTED_VALUE",
  });
  res.send(getRows.data);
});

app.post("/addRow", async (req, res) => {
  const { googleSheets, auth, spreadsheetId } =
    await Authorization.getAuthSheets();

  const row = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "'Лист1'!A1:C1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        ["Item", "Cost", "Stocked", "Ship Date"],
        ["Wheel", "$20.50", "4", "3/1/2016"],
        ["Door", "$15", "2", "3/15/2016"],
        ["Engine", "$100", "1", "3/20/2016"],
        ["Totals", "=SUM(B2:B4)", "=SUM(C2:C4)", "=MAX(D2:D4)"],
      ],
    },
  });
  res.send(row.data);
});

app.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
