var express = require('express');
var dashboard = require('./routes/dashboard');
var studentRouter = require('./routes/student');
var userRouter = require('./routes/users');
const cors = require('cors');
var professorRouter = require('./routes/professor');
const port = 3000;
var cityRouter = require('./routes/cities');
var subjectRouter = require('./routes/subject');


var app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Bind route with path
app.use('/dashboard', dashboard);
app.use('/student', studentRouter);
app.use('/user', userRouter);
app.use('/professor', professorRouter);
app.use('/city', cityRouter);
app.use('/subject', subjectRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});


app.listen(port, () => {
    console.log(`Test backend at http://localhost:${port}`);
});