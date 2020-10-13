const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser');
const path = require('path');

const router = express.Router();
const multer = require('multer');
const upload = multer();
const ics = require('ics');



router.use(bodyParser.urlencoded({ extended: true }));

router.post('/add', upload.none(), (req, res) => {
    var parsed = JSON.parse(req.body.datos);
    let randomID = Math.floor(Math.random() * (9999 - 1000)) + 1000;
    ics.createEvents(parsed, (error, value) => {
        if (error) {
            console.log(error)
            return
        }
        console.log(value)
        fs.writeFileSync(`${path.join(path.resolve() + '/src/public/ics/')}calendar_${randomID}.ics`, value)
        res.send({ randomID })
    })
});

router.get('/download/:id', (req, res) => {
    res.download(path.join(path.resolve() + `/src/public/ics/calendar_${req.params.id}.ics`))
})

router.get('/', (req, res) => {
    res.render('addEvent');
})


module.exports = router;