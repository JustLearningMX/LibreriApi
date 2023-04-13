const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config(); //Configura variables de entorno

const cors = require('cors');

app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**CONFIGURACIÓN DE MONGOOSE */
const mongoose = require('mongoose');//Importamos
//Nos conectamos
mongoose.connect(
  // process.env.MONGO_URI, // obtiene la url de conexión desde las variables de entorno
  // mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster0.0l8wy.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`);
  `mongodb+srv://Admin:adminEquipo3@cluster0.0l8wy.mongodb.net/Libreria?retryWrites=true&w=majority`,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
).then(() => {
  console.log("Conectado a la base de datos");
}).catch((err) => {
  console.log("Error al conectarse a la base de datos", err);
});

//Activamos opción de debuggeo para errores
mongoose.set("debug", true);
/**CONFIGURACIÓN DE MONGOOSE */

//Importamos los esquemas que utilizaremos
require('./models/Autor');
require('./models/Comentario');
require('./models/Libro');
require('./models/Usuario');
require('./config/passport');

//Configurando las rutas
app.use('/v1', require('./routes'));
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT=3012
app.listen(process.env.PORT || PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
