const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const user = require('./mocks/pruebaUser');

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, (error) => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

// delete, Example code
app.get('/api/prueba', (req, res) => {
  res.status(200).type('json').send(JSON.stringify(user));
})