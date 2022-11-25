const express   = require('express');
const crypto    = require('crypto');
const path      = require('path');
const fs        = require('fs');
const router    = express.Router();

const algorithm = 'aes-256-ctr';
const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
const iv        = crypto.randomBytes(16);
const encrypt   = (text) => {
    const cipher    = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text.toString()), cipher.final()]);
    return iv.toString('hex') + '@' + encrypted.toString('hex');
};
const decrypt   = (hash) => {
    hash        = hash.split('@');
    const decipher  = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash[0], 'hex'));
    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash[1], 'hex')), decipher.final()]);
    return decrpyted.toString();
};
router.get('/', (req, res, next) => {
    res.render('console');
});
router.get('/resumeData', (req, res, next) => {
	fs.readFile('./data/resume.json', function(err, data) {
        res.json({ data: JSON.parse(data) });
	});
});

module.exports = router;