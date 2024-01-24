import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {
        style: 'styles.css'
    }) 
})

export default router