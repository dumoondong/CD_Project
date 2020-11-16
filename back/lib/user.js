//유저와 관련된 기능들
const express = require('express');
const router = express.Router();
const db = require('../config/db');

//로그인(로그인 주소가 넘어옴)
// router.post('/login', (req, res) => { //request부분에 front에서 넘어온 데이터가 저장됨

// });
//회원가입(register router)
router.post('/register',(req, res) =>{
    console.log(req.body);

   db.query(`INSERT INTO employee(id, name, password, email, phone, zim, address, des, dept, rank) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.body.id, req.body.name, req.body.password, req.body.email, req.body.phone, req.body.zim, req.body.address, req.body.des, req.body.dept, req.body.rank],(err,result) => {
        if(err) {
            return  res.json({
                registerSuccess: false,
                message: "등록 실패..."
                });  
        }
        return res.json({
            registerSuccess: true,
            message: "등록 성공!"
            });  
    });
  });

module.exports = router;