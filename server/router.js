const express = require('express');
const router = express.Router();

const port = process.env.PORT || 5000;

router.get('/', (req, res) => {
    res.send(`server is up and running on the ${port}`);
});

module.exports = router;