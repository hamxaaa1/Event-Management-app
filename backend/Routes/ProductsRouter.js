const ensureAuthentication = require('../Middlewares/Auth')

const router = require('express').Router()

router.get('/getProdcuts',  ensureAuthentication, (req,res)=> {
  try {
    res.status(200).json([
      {
        name: "iphone x",
        price: 90000
      },
      {
        name: "iphone 12",
        price: 290000
      },
      {
        name: "iphone 8",
        price: 50000
      },
      {
        name: "iphone 11",
        price: 190000
      },
    ])
  } catch (error) {
    res.status(500).json({
      message: "internal server error"
    })
  }
})

module.exports = router