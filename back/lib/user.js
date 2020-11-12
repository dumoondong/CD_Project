//유저와 관련된 기능들
const express = require('express');
const router = express.Router();
const db = require('../config/db');

//로그인(로그인 주소가 넘어옴)
// router.post('/login', (req, res) => { //request부분에 front에서 넘어온 데이터가 저장됨
//     console.log('login: ',req.session);
//     db.query(`SELECT * from users`, (err,userInfo) => { //검색 부분 (수정해야함. 다른 기능도 만들고 수정)
//         if(err) throw err;
//         //DB의 첫번째 유저의 데이터랑 front에서 가져온 데이터랑 비교
//         if(req.body.email === userInfo[1].email){
//             req.session.username = userInfo[1].username;
//             req.session.save();
//             console.log('in : ',req.session.username)
//             return res.json({
//             loginSuccess: true,
//             message: "로그인 성공!"
//             });
//         }else{ 
//             return res.json({
//             loginSuccess: false,
//             message: "제공된 이메일에 해당하는 유저가 없습니다."
//             });
//         }
//     });
// });
//회원가입(register router)
router.post('/register',(req, res) =>{
    console.log(req.body);
    db.query(`INSERT INTO employee(id, name, password, email, phone, zim, address, des, dept, rank) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [req.body.id, req.body.name, req.body.password, req.body.email, req.body.phone, req.body.zim, req.body.address, req.body.des, req.body.dept, req.body.rank],(err,result) => {
        if(err) throw err;
    });
    return res.json({
        registerSuccess: true,
        message: "등록 성공!"
        });
  });

module.exports = router;