const express = require('express'); //express 모듈을 가져옴
const db   = require('./config/db'); //자신의 데이터베이스 정보(유저명과 패스워드 등)를 입력
const app = express(); //funtion을 이용하여 새로운 express app을 만듬
const port = 5000 //port number
const bodyParser = require('body-parser');
//router
  const UserRouter = require('./lib/user'); //User 모듈을 가져옴
//웹에서 application/x-www-form-urlencoded에 있는 데이터를 분석해서 가져옴
  app.use(bodyParser.urlencoded({extended : true}));
//웹에서 application/json에 있는 데이터를 분석해서 가져옴
  app.use(bodyParser.json());

//session 사용 모듈
const session = require('express-session');
const mysqlStore = require('express-mysql-session')(session);
const sessionDB = require('./config/sessionDB');
//session 사용
app.use(session({
    secret: 'asdqwe##',
    resave: false,
    saveUninitialized: true,
    store:new mysqlStore(sessionDB)
  }));
//get 가져오는 것. '/'는 주소를 뜻한다. 현재 '/'에 아무것도 안붙으므로 root directory를 뜻한다.
//req => request(요청), res=> response(응답)
app.get('/', (req, res) => { //삭제 예정
  res.send('Root => Hello World!/안녕하세요!!!')
})
//위와 마찬가지. 다만, /users에 연결되어 있다 --삭제 예정
app.get('/users', (req, res) => {
  db.query('SELECT * from Users', (error, rows) => {
    if (error) throw error;
    console.log('mysql Connected...');
    console.log('User info is: ', rows);
    res.send(rows);
  });
});
//axios 연습(해당 주소로 가면 볼 수 있음) --삭제 예정
app.get('/api/hello',(req,res)=>{
  res.send('안녕하세요~');
});
//페이지의 복잡성을 해소하기 위한 라우터
app.use('/api/users', UserRouter);
//직원 관리 데이터 삭제 부분 분리 예정
//우선 데이터가 하나씩만 삭제되게 구현
app.post('/api/delete',(req,res)=>{
  console.log(req.body.check);
  db.query(`DELETE FROM employee WHERE id = ?`,[req.body.check],function(error,result){
    if(error){
      throw error;
    }
  });
});

app.get('/api/onWork'),(req, res) => {
  console.log(req);
  /* 구현 중 */
}

//직원 관리 데이터 표시 부분 분리 예정
app.get('/api/manage', (req, res) => {
  db.query('SELECT * from employee', (error, rows) => {
    if (error) throw error;
    console.log('User info is \n', rows);
    res.send(rows);
  });
});
//로그인한 유저 정보
app.get('/api/userInfo',(req, res) => {
  //console.log(req.session.userId);
  db.query('SELECT * from employee where id = ?',[req.session.userId],(error, rows) => {
    if (error) throw error;
    return res.json({
      userID : rows[0].id,
      userName : rows[0].name
    });
  });
});
//공통코드 관련
app.get('/api/SmallCode', (req, res) => {
  db.query('SELECT * from SmallCode', (error, rows) => {
    if (error) throw error;
    console.log('User info is \n', rows);
    res.send(rows);
  });
});
//휴일설정 db에 저장
app.get('/api/holidaysave', (req, res) => {
  db.query(`INSERT INTO holiday(id, name) VALUES(?, ?)`,
  [req.body.Date, req.body.HoliManage],(err,result) => {
    if(err) {
      return  res.json({
        holidaySaveSuccess: false,
          message: "실패"
          });  
  }
  return res.json({
    holidaySaveSuccess: true,
      message: "성공"
      });  
});
});

//port number를 콘솔에 출력
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})