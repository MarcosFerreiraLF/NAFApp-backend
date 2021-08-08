const express = require('express')
const bodyParser = require('body-parser')

require('./db/mongoose')
const app = express()

const User = require('./models/user')

const port = 3000

app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('hello world');
});

app.post('/users', async (req, res) => {

    console.log(req.body)

    const userTest = {
        name: 'Matheus',
        password: 1234567,
        age: 50,
        email: 'test@test.com'
    }
    
    const user = new User(req.body)

    try {
        await user.save()
        // const token = await user.generateAuthToken()
        // res.status(201).send({user, token})
        res.status(201).send({user})
    } catch (error) {
        res.status(400).send(error)
    }
    
})

app.get('/users', async (req, res) => {
    try {
        const user = await User.find()
        res.status(201).send({user})
    } catch (error) {
        res.status(400).send(error)
    }
    
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.id})
        if(!user){
            res.status(404).send('User not found!')
        }
        res.status(201).send({user})
    } catch (error) {
        res.status(400).send(error)
    }
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if(!isValidOperation){
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const user = await User.findById(req.params.id)

        // updates.forEach((update) => {
        //     req.user[update] = req.body[update]
        // })

        // await req.user.save()
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // if(!user){
        //     return res.status(404).send()
        // }
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})