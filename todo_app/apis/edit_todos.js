const express = require('express')
const router = express.Router()

const connection = require('../connection');


router.get('/edit/:id', (req, res)=>{
    id = req.params.id;
    query = 'select *from todo where id =?'
    connection.query(query, [id], (err, result)=>{
        if(!err){
            return res.status(200).json(result)
        }else{
            return res.status(500).json(err)
        }
    })
});

router.patch('/edit', (req, res)=>{
    let todo = req.body;
    query = 'update todo set title=?, description=? where id=?';
    connection.query(query, [todo.title, todo.description, todo.id], (err, result) =>{
        if(!err){
            if(result.affectedRows === 0){
                return res.status(400).json({message: "todo id does not exist"})
            }
            return res.status(200).json({message: "todo as been edited"})
        }
        else{
            return res.status(500).json(err)
        }
    })
})


module.exports = router