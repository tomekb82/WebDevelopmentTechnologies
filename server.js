const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/greeting', (req, res) => {
  res.jsonp("Hello " + req.query.name + "!")
})


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})
server.post('/greeting', (req, res) => {
  res.jsonp({greeting: "Hello " + req.body.name + "!"})
})

// Use default router
server.use(router)
server.listen(4300, () => {
  console.log('JSON Server is running')
})
