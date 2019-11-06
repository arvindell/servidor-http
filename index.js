/* ############# LIBRERÍAS ############# */
const restify = require("restify");
const corsMiddleware = require("restify-cors-middleware");

/* ############# CONFIGURACIÓN ############# */

var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Para permitir el tráfico entrante externo
const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["*"]
});
server.pre(cors.preflight);
server.use(cors.actual);

/* ############# MANEJADORES ############# */

// Manejador para un GET a /hola/<nombre>
server.get("/hola/:name", (req, res, next) => {
  res.send("Hola, " + req.params.name);
  next();
});

let alumnos = [];

// Manejador para agregar un
server.post("/alumnos", (req, res, next) => {
  alumnos.push(req.body);
  res.send(req.body);
  next();
});

// Manejador para enlistar alumnos
server.get("/alumnos", (req, res, next) => {
  res.send(alumnos);
  next();
});

/* ############# INICIAR SERVIDOR ############# */
server.listen(8080, () => {
  console.log("Servidor escuchando en %s", server.url);
});
