//require('dotenv').config()
express = require('express');

const path = require('path');
const db = require('./models')

const todos = require('./controllers/todo')
const users = require('./controllers/user');

(async () => {
    await db.sequelize.sync()
})();

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/user", users)
app.use("/todo",todos)




app.listen(8080, () => {
    console.log(`Server is running on port `);
});