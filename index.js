const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get("/valid-customer", (req, res) => {
    return res.json({success: true});
});

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
})