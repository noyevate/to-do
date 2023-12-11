const express = require('express')
const router = express.Router()

const connection = require('../connection');

router.post("/update",(req, res) => {
    let todo = req.body;
    var query = "update todo set completed='1' where id=?";
    connection.query(query, [todo.completed, todo.id], (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "todo id not found"
                })
            }
            return res.status(200).json({
                message: "todo updated sucessfully"
            })
        }
        else {
            return res.status(500).json(err)
        }
    })
});

module.exports = router