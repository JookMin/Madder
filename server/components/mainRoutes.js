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

router.get("/", (req, res) => {
    db.query(
		`select H.name as title, GH.hobby as tag, H.state as summary, U.name as host, H.groupId as id 
		from host as H, grouphobby as GH, user as U, groupinfo as GI
		where H.id = U.id`,
		(error, results) =>{
			console.log('결과 : ', results);
			if(error){
				console.log("에러");				
			}
			else{
				console.log("성공");
				res.json(results);
			}
		}
	)
});

module.exports = router;