const express = require('express');

const app = express()

app.use('/api/', require('./routes/auth'))

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`App is running on ${port}`);
})