const express = require('express'); //express 모듈을 가져옴
const db   = require('./config/db'); //자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력
const app = express(); //funtion을 이용하여 새로운 express app을 만듬
const port = 5000 //port number
const bodyParser = require('body-parser');
//session
// const session = require('express-session');
// const mysqlStore = require('express-mysql-session')(session);
//router
// const UserRouter = require('./lib/user'); //User 모듈을 가져옴
//웹에서 application/x-www-form-urlencoded에 있는 데이터를 분석해서 가져옴
app.use(bodyParser.urlencoded({extended : true}));
//웹에서 application/json에 있는 데이터를 분석해서 가져옴
app.use(bodyParser.json());
//session
// app.use(session({
//   secret: 'asdqwe##',
//   resave: false,
//   saveUninitialized: true,
//   stroe:new mysqlStore({
//     host:'localhost',
//     port:3306,
//     user:'root',
//     password:'1111',
//     database : 'mydb'
//   })
// }))
//get 가져오는 것. '/'는 주소를 뜻한다. 현재 '/'에 아무것도 안붙으므로 root directory를 뜻한다.
//req => request(요청), res=> response(응답)
app.get('/', (req, res) => {
  res.send('Root => Hello World!/안녕하세요!!!')
})
//위와 마찬가지. 다만, /users에 연결되어 있다
app.get('/users', (req, res) => {
  db.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('mysql Connected...');
    console.log('User info is: ', rows);
    res.send(rows);
  });
});
//axios 연습(해당 주소로 가면 볼 수 있음)
app.get('/api/hello',(req,res)=>{
  res.send('안녕하세요~');
});

//페이지의 복잡성을 해소하기 위한 라우터
//app.use('/api/users', UserRouter);
//app.use('/api/auth', authRouter);
//로그인(로그인 주소가 넘어옴)
app.post('/api/login', (req, res) => { //request부분에 front에서 넘어온 데이터가 저장됨
  console.log('login: ',req.session);
  db.query(`SELECT * from users`, (err,userInfo) => { //검색 부분 (수정해야함. 다른 기능도 만들고 수정)
      if(err) throw err;
      //DB의 첫번째 유저의 데이터랑 front에서 가져온 데이터랑 비교
      if(req.body.email === userInfo[0].email && req.body.password === userInfo[0].password){
          // req.session.username = userInfo[0].username;
          // req.session.save();
          // console.log('in : ',req.session.username)
          return res.json({
          loginSuccess: true,
          message: "로그인 성공!"
          });
      }else{ 
          return res.json({
          loginSuccess: false,
          message: "이메일 또는 패스워드가 올바르지 않습니다."
          });
      }
  });
});

app.get('/api/manage', (req, res) => {
  db.query('SELECT * from employee', (error, rows) => {
    if (error) throw error;
    console.log('User info is: ', rows);
    res.send(rows);
  });
});

//port number를 콘솔에 출력
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
