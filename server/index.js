import cors from 'cors'
import express from 'express'
import { router } from './routes/todoRouter.js'

const port = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', router)

app.listen(port)

app.get('/', (req, res) => { //part2
    pool.query('select * from task', (error, result) => {
        if (error) {
            return res.status(500).json({error: error.message})
        }
        return res.status(200).json(result.rows)
    })
})

app.post('/create', (req, res) => { //part 2
    pool.query('insert into task (description) values ($1) returning *',
        [req.body.description],
        (error, result) => {
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: result.rows[0].id})
        }
    )
})

app.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('delete from task where id = $1',
        [id],
        (error, result) => {
            if (error) {
                return res.status(500).json({error: error.message})
            }
            return res.status(200).json({id: id})
        }
    )
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})