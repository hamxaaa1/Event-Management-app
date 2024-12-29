const { createTodo, getTodos, getTodo, updateTodo, deleteTodo } = require('../Controllers/TodoController')
const { todoValidation } = require('../Middlewares/AuthValidation')
const router = require('express').Router()
const multer = require('multer')


const storage = multer.memoryStorage();
const upload = multer({storage: storage})



router.post('/createTodo', upload.single('photo') , todoValidation, createTodo)
router.get('/getTodos', getTodos)
router.get('/getTodo/:id', getTodo)
router.put('/updateTodo/:id', upload.single('photo'), todoValidation, updateTodo)
router.delete('/deleteTodo/:id', deleteTodo)


module.exports = router 