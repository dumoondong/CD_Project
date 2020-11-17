import { Checkbox } from 'antd';
import 'antd/dist/antd.css';
//테이블 칼럼 틀
const columnTable = [
    {
        title: <Checkbox />,
        dataIndex: '선택',
        key: '선택',
      },
      {
        title: '부서',
        dataIndex: 'dept',
        key: 'dept',
      },
      {
        title: '직급',
        dataIndex: '직급',
        key: '직급',
      },
      {
        title: '사원번호',
        dataIndex: '사원번호',
        key: '사원번호',
      },
      {
        title: '사원이름',
        dataIndex: '사원이름',
        key: '사원이름',
      },
      {
        title: '비밀번호',
        dataIndex: '비밀번호',
        key: '비밀번호',
      },
      {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '핸드폰번호',
        dataIndex: '핸드폰번호',
        key: '핸드폰번호',
      },
      {
        title: '우편번호',
        dataIndex: '우편번호',
        key: '우편번호',
      },
      {
        title: '주소',
        dataIndex: '주소',
        key: '주소',
      },
      {
        title: '비고',
        dataIndex: '비고',
        key: '비고',
      }
];

export default columnTable