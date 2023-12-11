const express = require("express");
const router = express.Router();
const connection = require("../connection")


router.post("/add", (req, res) => {
    const {title, description} = req.body;
    query = "insert into Todo (title, description) values (?,?)"
    connection.query(query, [title, description], (err, result) =>{
        if(!err){
            return res.status(200).json({
                message: "todo added"
            })
        } else {
            return res.status(401).json({message:err})
        }
    })

})


module.exports = router