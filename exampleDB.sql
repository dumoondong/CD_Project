# DB 추가
	create database mydb;
# DB 사용
	use mydb;

# 테이블 추가(임시)=========================================================
# 유저테이블
create table employee(
	id varchar(50),
	name varchar(50),
	password varchar(50),
	email varchar(50),
	phone varchar(50),
	zim varchar(50),
	address varchar(50),
	des varchar(50),
	dept varchar(50),
	rank varchar(50)
);
# 마스터코드테이블
create table MasterCode(
        LargeCode VARCHAR(3) NOT NULL,
        LargeInfo varchar(45)
    );
# 스몰코드테이블
create table SmallCode(
        SmallCode VARCHAR(6) NOT NULL,
        SmallInfo varchar(45),
        SmallContent varchar(45)
    );
# 휴일설정테이블
create table Holiday(
        Date VARCHAR(12) NOT NULL,
        HoliManage VARCHAR(6),
        HoliContent VARCHAR(50)
    );
# 근무조회
create table employeeWork(
		id VARCHAR(50),
        Date VARCHAR(12) NOT NULL ,
        OnWork VARCHAR(6),
        OffWork VARCHAR(6),
        WorkContent VARCHAR(50),
        OverWorkContent VARCHAR(50)
    );
#연가 테이블(임시)
create table LeaveUser(
		id varchar(5),
        StartDate VARCHAR(15) NOT NULL,
        EndDate varchar(15) NOT NULL,
        SelectedLeave varchar(15),
        Des varchar(30)
    );
# 업무조회 테이블(임시)
create table WorkManage(
		sendId varchar(5),
        getId varchar(5),
        startDate VARCHAR(15),
        endDate varchar(15),
        title varchar(50),
        workDes varchar(1000)
    );
#==============================================================================

# 세이프 모드를 품(삭제 및 수정 가능(임시))
set sql_safe_updates=0;

# 테이블 삭제=====================================================================
	DROP TABLE holiday; #휴일
	DROP TABLE SmallCode; #스몰코드
	DROP TABLE employeeWork; #근무조회
	DROP TABLE LeaveUser; #연가
    DROP TABLE MasterCode; #마스터코드
    DROP TABLE WorkManage; #업무조회
#==============================================================================

# 테이블 수정=====================================================================
#스몰 코드 테이블
	alter table smallcode add SmallContent varchar(100);
#==============================================================================

# 데이터 넣기(임시 데이터)===================================================================================================
# 유저
	INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1113','대표임','123','test@test.com','010-0000-0001','11111','춘천시','-','영업부','대표');
	INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1114','직원일','123','test1@test.com','010-0000-0002','11111','홍천군','-','총리부','직원');
	INSERT INTO employee(id,name,password,email,phone,zim,address,des,dept,rank) VALUES('1115','직원이','123','test2@test.com','010-0000-0003','11111','서울시','-','인사부','직원');
# 마스터코드
	INSERT INTO mastercode (LargeCode,LargeInfo) VALUES('HC','holidayCode');
# 스몰코드 (수정 필요)
	INSERT INTO smallcode (smallCode,smallInfo) VALUES('HC001','회사창립일');
	INSERT INTO smallcode (smallCode,smallInfo) VALUES('HC002','법정공휴일');
# 휴일설정
	INSERT INTO holiday (DATE,holimanage,holicontent) VALUES('2020-11-18','HC001','test');
	INSERT INTO holiday (DATE,holimanage,holicontent) VALUES('2020-11-19','HC002','test2');
# 근무조회
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-25','10:00','18:00','1112');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-26','10:00','18:00','1112');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-27','10:00','18:00','1112');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-28','10:00','18:00','1114');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-29','10:00','18:00','1114');
	INSERT INTO employeeWork (DATE,OnWork,OffWork,id) VALUES('2020-11-30','10:00','18:00','1114');
# 연가
	INSERT INTO LeaveUser (id,StartDate,EndDate,SelectedLeave,Des) VALUES('1113','2020-11-22','2020-11-25','연가','-');
	INSERT INTO LeaveUser (id,StartDate,EndDate,SelectedLeave,Des) VALUES('1113','2020-11-02','2020-11-05','병가','-');
	INSERT INTO LeaveUser (id,StartDate,EndDate,SelectedLeave,Des) VALUES('1113','2020-11-12','2020-11-15','공가','-');
# 업무조회
	INSERT INTO WorkManage(sendId,getId,startDate,endDate,title,workDes) VALUES('1112','1113','2020/11/18','2020/11/20','Test','TestDes');
#=======================================================================================================================

# 데이터 삭제========================================================================
# 유저
	delete from employee where id = '1113';
	delete from employee;
# 근무조회
	delete from employeeWork;
# 연가
	delete from LeaveUser;
# 스몰코드
	delete from smallcode;
# 휴일
	delete from holiday;
# 업무조회
	delete from WorkManage;
#=================================================================================

# 데이터 수정========================================================================
# 유저
	update employee SET name = "test" where email="test@test.com";
# 근무조회
	update employeeWork SET OffWork ='23:01',WorkContent='근무',OverWorkContent='초과근무' where id='1113' AND Date='2020/11/25';
#==================================================================================

# 데이터 조회=========================================================================
# 유저
	SELECT * from employee;
    SELECT * from employee where id='1112';
    SELECT * from employee AS EMP 
    join SmallCode AS SC 
	ON EMP.dept = SC.SmallCode OR EMP.rank = SC.SmallCode;
	# SELECT * from employee join WorkManage on WorkManage.getId = '1113';
    SELECT * from employee where not id = '1114';
# 마스터코드
	SELECT * from MasterCode;
    SELECT * from MasterCode where LargeInfo like '%부서%';
# 스몰코드
	SELECT * from SmallCode;
    SELECT * from smallCode where SmallInfo = '회사창립일';
    SELECT * from SmallCode where SmallCode like '%RC%';
    
    SELECT SC.SmallCode,SC.SmallInfo from SmallCode AS SC 
    join employee AS EMP
    ON EMP.dept = SC.SmallCode OR EMP.rank = SC.SmallCode where EMP.id = '1111';
# 휴일설정
	SELECT * from Holiday;
# 근무조회
	SELECT * from employeeWork where id='1117' and Date='2020-11-22';
    SELECT * from employeeWork;
    SELECT * from employeeWork where id='1113' AND Date='2020/11/25';
# 연가
	SELECT * from LeaveUser;
# 업무조회
	SELECT * from WorkManage;
    SELECT * from WorkManage Join employee ON employee.id = WorkManage.sendId where WorkManage.getId = '1113';
# 안먹는 코드
	SELECT holi.DATE,small.SmallInfo FROM holiday AS holi JOIN SmallCode AS small ON small.SmallCode = holi.holimanage;
#======================================================================================