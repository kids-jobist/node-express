const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная страница',
    isHome: true,
  });
});

app.get('/courses', (req, res) => {
  res.render('courses', {
    title: 'Список курсов',
    isCourses: true,
  });
});

app.get('/add', (req, res) => {
  res.render('add', {
    title: 'Добавить новый курс',
    isAdd: true,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
