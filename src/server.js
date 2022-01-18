//Importing the app and port from the index.js
const { app, port } = require('./index')

app.listen(port, () => {
    console.log('server listening on:', port)

})