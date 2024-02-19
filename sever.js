import  express  from 'express'
const app = express()
const bodyParser = require('body-parser')
import initwed from './src/router/wed.js'
import connect from './src/config/connextdb.js';
var cookieParser = require('cookie-parser')
require('dotenv').config();
import cors from 'cors'
app.use(cors({
    origin:true
}))
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
initwed(app)
connect()




let post = process.env.POST || 6969;
// post = undefined => post = 6969

app.listen(post, () => {
    console.log("back-end node-js is runing on the post: " + post);
})