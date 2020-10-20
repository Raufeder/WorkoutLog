require('dotenv').config();

let express = require('express');
let app = express();
let log = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');
const sequalize = require('./db');

sequalize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-sessions'));
app.use('', user) // placeholder I think?
app.use('', log) // placeholder I think?


app.listen(9013, function(){
    console.log('App is listening on 9013')
});