var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// prisma
const { PrismaClient } = require('@prisma/client');

router.get('/prisma', async (req, res) => {
  const prisma = new PrismaClient();
  const allNames = await prisma.names.findMany();
  res.json(allNames);
});

module.exports = router;
