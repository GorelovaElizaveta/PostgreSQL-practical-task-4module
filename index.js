const express = require('express');
const app = express();
const cors = require('cors');
// const routes = require('./src/routes')
const db = require('./src/models/index') 

app.use(cors());
app.use(express.json());

require('./src/routes/routes')(app);

db.sequelize.sync();

// db.sequelize.sync({force: true});

app.listen(8080, () => {
  console.log('Application listening on port 8080')
})