import { Router } from 'express'
import { auth } from '../helper/auth.js'
import { pool } from '../helper/db.js'
import { emptyOrRows } from '../helper/utils.js'

const router = Router()

router.get('/', (req, res, next) => {
    pool.query('select * from task', (error, result) => {
        if (error) {
            return next(error)
        }
        return res.status(200).json(emptyOrRows(result))
    })
})

router.post('/create', auth, (req, res, next) => {
    pool.query('insert into task (description) values ($1) returning *',
        [req.body.description],
        (error, result) => {
            if (error) return next(error)
            return res.status(200).json({id: result.rows[0].id})
        }
    )
})

export default router;