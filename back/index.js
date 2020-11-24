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

//nodejs 연습 및 axios 연습 (삭제예정)======================================================
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
//=========================================================================================
//페이지의 복잡성을 해소하기 위한 라우터
app.use('/api/users', UserRouter);
//직원 관리 데이터 삭제 부분 분리 예정
app.post('/api/delete',(req,res)=>{
  req.body.forEach(user => {
    //console.log(user.id);
    db.query(`DELETE FROM employee WHERE id = ?`,[user.id],function(error,result){
      if(error){
        throw error;
      }
    });
  });
  return res.json({
    success : true
  });
});
//출근 버튼(메인페이지 출근 버튼 누르고 또 누르면 출근을 이미 하였다고 뜨기)
app.post('/api/onWork',(req, res) => {
      db.query('SELECT * from employeeWork where id=? AND Date=?',[req.session.userId,req.body.date],(error, userDate) => {
        if(userDate[0] === undefined){ //다른 날짜 유무
          db.query(`INSERT INTO employeeWork(DATE,OnWork,id) VALUES(?,?,?)`,
          [req.body.date, req.body.time, req.session.userId],(error,result) => {
            if(error) throw error;
            return res.json({
              success : true,
              message:'ok'
            });
          });
        } else {
            return res.json({
              success : false,
              message:'no'
            });
        }
      });
    });
//퇴근 버튼
app.post('/api/offWork',(req, res) => {
  db.query('SELECT * from employeeWork where id=? AND Date=?',[req.session.userId,req.body.date],(error, userDate) => {
    console.log(userDate);
    if(userDate[0] != undefined){
      db.query(`update employeeWork SET OffWork =? where id=?;`,
      [req.body.time, req.session.userId],(error,result) => {
        if(error) throw error;
        return res.json({
          success : true,
          message:'ok'
        });
      });
    } else {
        return res.json({
          success : false,
          message:'no'
        });
    }
  });
});
//직원 관리 데이터 표시 부분 분리 예정
app.get('/api/manage', (req, res) => {
  db.query('SELECT * from employee', (error, users) => {
    if (error) throw error;
    let temp = [];
    let data = {};
    let i = 0;
    users.forEach(user => {
      data = {
        key: String(i+1),
        id: user.id,
        dept: user.dept,
        rank: user.rank,
        name: user.name,
        password: user.password,
        email: user.email,
        phone: user.phone,
        zim: user.zim,
        address: user.address,
        des: user.des
      }
      i++;
      temp.push(data);
    });
    res.send(temp);
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

app.get('/api/MasterCode', (req, res) => {
  db.query('SELECT * from MasterCode', (error, rows) => {
    if (error) throw error;
  //   let temp = [];
  //   let data = {};
  //  rows.forEach(row => {
  //  data = {
  //         LargeCode: row.LargeCode,
  //         LargeInfo: row.LargeInfo,
	// }
  //     temp.push(data);

res.send(rows);

});
  });


//휴일설정 db에 저장
app.post('/api/holidaysave', (req, res) => {
  db.query(`INSERT INTO holiday(Date,HoliManage,HoliContent) VALUES(?,?,?)`,
  [req.body.Date, req.body.SaveCode, req.body.HoliContent],(error,result) => {
    if(error) {
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
//공통코드 db에 저장
app.post('/api/smallcodesave', (req, res) => {
  db.query(`INSERT INTO smallcode(SmallCode,SmallInfo,SmallContent) VALUES(?,?,?)`,
  [req.body.SmallCode, req.body.SmallInfo,req.body.SmallContent],(error,result) => {
    if(error) {
      return  res.json({
        smallcodeSaveSuccess: false,
          message: "실패"
          });  
  }
  return res.json({
    smallcodeSaveSuccess: true,
      message: "성공" 
      });  
});
});

app.get('/api/codetable', (req, res) => {
  db.query('SELECT LargeCode,smallcode,SmallInfo,SmallContent FROM mastercode RIGHT JOIN smallcode ON LEFT(SmallCode, 2) = LargeCode;', (error, rows) => {
    if (error) throw error;
    console.log('holiday date\n', rows);
    res.send(rows);
  });
});
//     let temp = [];
//     let data = {};
//     let i = 0;
//     codes.forEach(code => {
//    	data = {
//         key: String(i+1),
//         LargeCode: code.LargeCode,
//         SmallCode: code.SmallCode,
//         Smallinfo: code.SmallInfo,
//         SmallContent:code.SmallContent
//       }  
//       i++;
//       temp.push(data);
//     });
//     res.send(temp);
//   });
// });
        
    
app.get('/api/listdata', (req, res) => {
  db.query('SELECT holi.DATE,small.SmallInfo FROM holiday AS holi JOIN SmallCode AS small ON small.SmallCode = holi.holimanage;', (error, lists) => {
    if (error) throw error;
    console.log('holiday date\n', lists);
    let temp = [];
    let data = {};
    lists.forEach(list => {
      data = {
        title : list.SmallInfo,
      }
    });
    res.send(lists);
  });
});


//console.log(Number(response.data[0].OnWork.split(':')[0])-7);
//근무조회
app.get('/api/worklist', (req, res) => {
  db.query('SELECT * from employeeWork where id=?',[req.session.userId], (error, works) => {
    if (error) throw error;
    let temp = [];
    let data = {};
    let i = 0;
    works.forEach(work => {
      data = {
        key : String(i+1),
        date : work.Date,
        onWork: work.OnWork,
        offWork: work.OffWork
      }
      temp.push(data);
      i++;
    });
    res.send(temp);
  });
});

//mypage조회 연습
app.get('/api/mypage', (req, res) => {
  db.query('SELECT dept from employee', (error, rows) => {
    if (error) throw error;
    console.log('User info is \n', rows);
    res.send(rows);
  });
});

//port number를 콘솔에 출력
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})