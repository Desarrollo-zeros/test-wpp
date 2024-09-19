require('./routes')
const { restoreSessions, sessions} = require('./sessions')
const { routes } = require('./routes')
const app = require('express')()
const bodyParser = require('body-parser')
const { maxAttachmentSize } = require('./config')
const cors = require('cors'); // Requiere el paquete cors
app.use(cors());

// Initialize Express app
app.disable('x-powered-by')
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));
app.use('/', routes)

restoreSessions()

module.exports = app
