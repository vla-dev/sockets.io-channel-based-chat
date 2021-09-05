const UserRoutes = require('./routes/user-routes')

const bindTo = (app) => {
    app.get('/api', (req, res) => {
        const title = "API 1.0";
        res.status(200).send(title)
    })

    app.use('/api', UserRoutes);
}

const use = (module) => {
    console.log(module)
}

module.exports = {
    bindTo
};