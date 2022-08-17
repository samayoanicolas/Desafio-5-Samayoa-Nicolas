const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;
const bodyParser = require('body-parser');

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on('error', (error) => console.log(`Error en servidor ${error}`));
app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));


//Configuracion del motor//

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',//layout inicial
    layoutsDir: __dirname + '/views/layouts',  //direccion de los layouts
    partialsDir: __dirname + '/views/partials', //los componentes
  })
);

let productsHC = [
  {id: 1, title: 'Escuadra', price: 75.66, thumbnail: './public/escuadra.jpg'},
  {id: 2, title: 'Calculadora',price: 72.66, thumbnail: './public/calculadora.jpg'},
  {id: 3, title: 'Lapicera', price: 100, thumbnail: './public/lapicera.jpg'},
  {id: 4, title: 'Cuaderno A4', price: 139.99, thumbnail: './public/cuaderno.jpg'}
];

app.get('/products', (req, res) => {
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  res.render('productslist', { products: productsHC, productsExist: true });
});

app.get('/form', (req, res) => {
  
  res.render('form',{});
});



app.post('/products', (req, res) => {
  const  {body}  = req;
  productsHC.push(body);
  res.render('productslist', { products: productsHC, productsExist: true });
});



