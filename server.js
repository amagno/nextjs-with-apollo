const express = require('express')
const next = require('next')
const session = require('express-session')
const FileStore =  require('session-file-store')(session)

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
    const server = express()
    server.use(session({
        name: 'my-session',
        secret: 'testing123456',
        saveUninitialized: true,
        resave: true,
        store: new FileStore(),
        cookie: {
            expires: (24 * 60)
        }
    }))
    server.use('*', (req, res, next) => {
        console.log(req.session)
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        if(typeof req.session.ip === 'undefined' ) {
            req.session.ip = ip
        }
        return next()
    })
    server.get('/a', (req, res) => {
        return app.render(req, res, '/b', req.query)
    })

    server.get('/b', (req, res) => {
        return app.render(req, res, '/a', req.query)
    })
    server.get('/profile', (req, res) => {
        console.log(req.headers)
    })
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})