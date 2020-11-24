import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; //react-router-dom을 가져옴
//페이지 import
import PrezHoliConfirm from './components/views/President/PresidentHoliConfim';
import PrezHoli from './components/views/President/PresidentHoli';
import PrezMain from './components/views/President/PresidentMain';
import CheckMyPage from './components/views/Employee/MyPage/MyPageCheck';
import MyPage from './components/views/Employee/MyPage/MyPage';
import MainPage from './components/views/Employee/MainPage/MainPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import HolidayUser from './components/views/Employee/HolidayUser/HolidayUser';
import WorkManage from './components/views/Employee/WorkManage/WorkManage';
import Manage from './hoc/System/Manage';
import Code from './hoc/System/Code';
import Holiday from './hoc/System/Holiday';
// import MasterManage from './hoc/Master/MasterManage';
// import MasterOutwork from './hoc/Master/MasterOutwork';
// import MasterPage from './hoc/Master/MasterPage';
// import MasterMain from './hoc/Master/MasterMain';
// import MasterMiddle from './hoc/Master/MasterMiddle';
// import CheckMasterPage from './hoc/Master/CheckMasterPage';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/prezholiconfirm" component={PrezHoliConfirm} />
          <Route exact path="/prezholi" component={PrezHoli} />
          <Route exact path="/prezmain" component={PrezMain} />
          <Route exact path="/ckmypage" component={CheckMyPage} />
          <Route exact path="/mypage" component={MyPage} />
          {/* <Route exact path="/middle" component={MiddlePage} /> */}
          <Route exact path="/main" component={MainPage} />
          {/* <Route exact path="/landing" component={LandingPage} /> */}
          <Route exact path="/" component={LoginPage} />
          {/* <Route exact path="/register" component={RegisterPage} /> */}
          <Route exact path="/holidayuser" component={HolidayUser} />
          <Route exact path="/manage" component={Manage} />
          <Route exact path="/code" component={Code} />
          <Route exact path="/holiday" component={Holiday} />
          <Route exact path="/workmanage" component={WorkManage} />
          {/* <Route exact path="/mastermanage" component={MasterManage} />
          <Route exact path="/masteroutwork" component={MasterOutwork} />
          <Route exact path="/masterpage" component={MasterPage} />
          <Route exact path="/mastermain" component={MasterMain} />
          <Route exact path="/mastermiddle" component={MasterMiddle} />
          <Route exact path="/ckmasterpage" component={CheckMasterPage} /> */}
        </Switch>
      </div>
    </Router>//router(해당 페이지의 최적의 경로로 넘어갈 수 있게 해주는 기능) 설정
  );
}

export default App;