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

// 「田」のつく人だけを取得
router.get('/prisma01', async (req, res) => {
  const prisma = new PrismaClient();
  const names = await prisma.names.findMany({
    where: {
      name: { contains: "田" }
    }
  });
  res.json(names);
});

// OR条件 鈴木さんと東京都の人
router.get('/prisma02', async (req, res) => {
  const prisma = new PrismaClient();
  const names = await prisma.names.findMany({
    where: {
      OR: [
        { name: { contains: "鈴木" }},
        { address: { contains: "東京都" }}
      ]
    }
  });
  res.json(names);
});

// AND条件 名前に「田」が入り、東京都の人
router.get('/prisma03', async (req, res) => {
  const prisma = new PrismaClient();
  const names = await prisma.names.findMany({
    where: {
      AND: [
        { name: { contains: "田" }},
        { address: { contains: "東京都" }}
      ]
    }
  });
  res.json(names);
});

// AND条件 (03とおなじ)
router.get('/prisma04', async (req, res) => {
  const prisma = new PrismaClient();
  const names = await prisma.names.findMany({
    where: {
      name: { contains: "田" },
      address: { contains: "東京都" }
    }
  });
  res.json(names);
});

// 更新処理 id=3を埼玉県に更新する
router.get('/upd01', async (req, res) => {
  const prisma = new PrismaClient();
  const names = await prisma.names.update({
    where: {id: 3},
    data: {address: "埼玉県"}
  });
  res.json(names);
});

// 更新処理 id=3を千葉県に戻す
router.get('/upd02', async (req, res) => {
  const prisma = new PrismaClient();
  const names = await prisma.names.update({
    where: {id: 3},
    data: {address: "千葉県"}
  });
  res.json(names);
});

// ejsにprismaで取得したデータを表示
router.get('/ejs', async (req, res) => {
  const prisma = new PrismaClient();
  const allNames = await prisma.names.findMany();

  // ejsに表示
  res.render('names', { names: allNames });
});

module.exports = router;
