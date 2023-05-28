const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
const {signupRouter} = require('./routers/authRouter');
const {loginRouter} = require('./routers/authRouter');
const {userRouter} = require('./routers/userRouter');
const {demoUserRouter} = require('./routers/demoUserRouter');
const {demoSignupRouter} = require('./routers/authRouter.js')
corsOptions={ origin : "http://localhost:3000" };



app.use(cors(corsOptions));
require('dotenv').config();


// ======= secure Registering ============
app.use('/auth', signupRouter);

//  ======= demo Registering =======
app.use('/demo', demoSignupRouter)

// ======== login =========
app.use('/auth', loginRouter);


app.use('/user', userRouter)
app.use('/demouser', demoUserRouter)

app.listen(process.env.PORT, () => {
  console.log(`========= http://localhost:${process.env.PORT} =========`)
})