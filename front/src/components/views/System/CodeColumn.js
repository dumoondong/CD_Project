import { Checkbox } from 'antd';
import 'antd/dist/antd.css'; //antd디자인 CSS

const CodeColumn = [
    {
        title: <Checkbox />,
      key: '선택',
    },
    {
        title: '대코드',
        dataIndex: '대코드',
        key: '대코드',
    },
    {
      title: '소코드',
      dataIndex: '소코드',
      key: '소코드',
    },
    {
      title: '코드정보',
      dataIndex: '코드정보',
      key: '코드정보',
    },
    {
      title: '비고',
      dataIndex: '비고',
      key: '비고',
    }
  ];

  export default CodeColumn