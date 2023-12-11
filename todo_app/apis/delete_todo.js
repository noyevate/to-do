const express = require('express')
const router = express.Router()

const connection = require('../connection');

router.delete("/delet_todo/:id", (req, res) => {
    const id = req.params.id;
    var query = "delete from todo where id=?";
    connection.query(query, [id], (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "todo Id not found"
                })
            }
            return res.status(200).json({
                message: "todo Deleted Successfully"
            })
        }
        else {
            return res.status(500).json(err)
        }
    })
});
module.exports = router