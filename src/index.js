const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const db = require('./config/db/index');
var methodOverride = require('method-override');
const app = express();
const port = 3000;

const route = require('./routes');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));
// Http Logger
// app.use(morgan("combined"));

// // Templeta engine
const viewPath = 'resources/views';
const config = {
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
    },
};

app.engine('.hbs', handlebars.engine(config));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, viewPath));

// Set up Router
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
