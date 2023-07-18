const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "jookmin",
  password: "madcamp",
  database: "madder_db",
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log('id : ', id);
    try{
        db.query(
            `select H.name as title, GH.hobby as tag, H.state as summary, U.name as host
            from host as H, grouphobby as GH, user as U
            where H.groupId = ? AND H.id = U.id`,
            [id],
            (error, results)=>{
                if(error){
                    console.log('에러', error);
                }else{
                    console.log('성공');
                    res.json(results);
                }
            }
        )
    } catch (e) {
        console.log('error : ', e);
    }
});

module.exports = router;