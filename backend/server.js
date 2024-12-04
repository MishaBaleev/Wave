const express = require('express'); 
const app = express();
const port = process.env.PORT || 5000;
const db_manager = require("./db/db.js")

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
 
app.listen(port, () => {
  console.log(`Listening on port ${port}`)}
); 

// Создание GET маршрута
app.get('/get_table_data', (req, res) => {
  let table_name = req.query.table_name
  new db_manager().getData(table_name).then(promis_res => {res.send(promis_res)})
}); 