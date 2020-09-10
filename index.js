const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');

const Course = require('./models/course');

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

hbs._renderTemplate = function (template, context, options) {
  options.allowProtoMethodsByDefault = true;
  options.allowProtoPropertiesByDefault = true;

  return template(context, options);
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/courses', coursesRoutes);
app.use('/add', addRoutes);
app.use('/card', cardRoutes);

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const url = `mongodb+srv://kids_:BbVXi-H6mwfAfm7@cluster0.xmdhu.mongodb.net/shop`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
