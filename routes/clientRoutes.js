const express = require('express');
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "securityappdb",
});
router.get('/', (req, res) => {
    res.render('client', { result: null });
})

//l'utilisation des requettes preparées permet de prevenir les injection SQL
router.post('/search', (req, res) => {
    const nom = req.body.nom;
    db.query(`SELECT * FROM clients JOIN commandes ON clients.nom=commandes.nomclient AND clients.nom=?`,
        [nom],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.render('client', { result });
                console.log(result);
            }
        });
})


module.exports = router;
