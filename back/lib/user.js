//유저와 관련된 기능들
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const app = express();
//session 사용 모듈
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
//session 사용
app.use(session({
    secret: 'asdqwe##',
    resave: false,
    saveUninitialized: true,
    store:new mysqlStore({
      host:'localhost',
      port:3306,
      user:'root',
      password:'1111',
      database : 'mydb'
    })
  }));
//로그아웃
router.get('/logout', (req, res) => {
    delete req.session.userId;
    return res.json({
        logoutSuccess : true
    });
});
//로그인(로그인 주소가 넘어옴)
// router.post('/login', (req, res) => { //request부분에 front에서 넘어온 데이터가 저장됨
router.post('/login', (req, res) => { //request부분에 front에서 넘어온 데이터가 저장됨
    // 시스템 관리자 페이지 구분,GRANT
    if(req.body.email === 'root' && req.body.password === '1111'){
        return res.json({
        loginSuccess: true,
        message: "시스템 관리자",
        grant: 'system'
        });
    } else {
        db.query(`select * from employee where email='${req.body.email}'`, (err,userInfo) => { //검색 부분 (수정해야함. 다른 기능도 만들고 수정)
          if(err) throw err;
          if(userInfo[0] === undefined){
            return res.json({
              loginSuccess: false,
              message: "해당 이메일이 없습니다."
              });
          } else {
              if(req.body.email === userInfo[0].email && req.body.password === userInfo[0].password){
                req.session.userId = userInfo[0].id;
                //console.log(userInfo[0].id);
                //console.log(req.session);
                return res.json({
                  loginSuccess: true,
                  message: "로그인 성공!",
                  userID : userInfo[0].id,
                  grant: 'employee'
                  });
            } else { 
                return res.json({
                loginSuccess: false,
                message: "이메일 또는 패스워드가 올바르지 않습니다."
                });
            }
        } 
      });
    }
    
  });
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