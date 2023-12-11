const express = require("express");
const router = express.Router();
const connection = require("../connection")

router.get("/get_todos", (req, res) => {
    query= 'select title from todo'
    connection.query(query, (err, result) =>{
        if(!err){
            return res.status(200).json(result)
        }
    })
})

module.exports = router