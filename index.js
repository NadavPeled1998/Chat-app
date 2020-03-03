const express = require('express') 
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Chat'
  });
  
  db.connect((err) => {
    if (err){
        throw err
    }
    console.log("Connected!");
  });
app.get('/nickname/:nick', (req, res) => {
    const nickname = req.params.nick
    let sql = `Select id from nickName Where name='${nickname}'`
    db.query(sql,(err,result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.send(result)
    })
})
app.post('/nickname', (req,res) => {
    const nickname = req.body.nickname;
    let sql = `INSERT INTO nickName Set name='${nickname}'`
    db.query(sql,(err,result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.send(result)
    })
})
app.get('/rooms', (req,res) => {
    let sql = `Select room from rooms`
    db.query(sql,(err,result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.send(result)
    })
})
app.post('/rooms', (req,res) => {
    const room = req.body.room
    let sql = `Insert INTO rooms SET room='${room}'`
    db.query(sql,(err,result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.send(result)
    })
})
app.get('/newroom/:room', (req,res) => {
    const room = req.params.room 
    let sql = `Select * from ${room}`
    db.query(sql,(err,result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.send(result)
    })
})
app.post('/newroom', (req,res) => {
    const room = req.body.room
    let sql = `CREATE TABLE ${room}(id int AUTO_INCREMENT, name VARCHAR(30), message VARCHAR(50), PRIMARY KEY (id))`
    db.query(sql,(err,result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.send(result)
    })
})
app.post('/message', (req,res) => {
    const name = req.body.nickname
    const message = req.body.message
    const room = req.body.room
    let sql = `INSERT INTO ${room} Set name='${name}', message='${message}'`
    db.query(sql,(err,result) => {
        if(err){
            throw err
        }
        console.log(result);
        res.send(result)
    })
})

app.listen(5000, () => {
    console.log('server started on port 5000')
});