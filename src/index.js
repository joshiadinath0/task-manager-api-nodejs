const express = require('express')
const User = require('./models/user')
require('./db/mongoose')
const user = require('./models/user')
const Task = require('./models/task')
const { ObjectID } = require('bson')
const { Router, request } = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer = require('multer')

const app = express()
const port = process.env.PORT 



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


