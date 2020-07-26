import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Button } from 'antd-mobile';
import ScrollView from '../../components/index';

interface IList {
  title?: string;
  date?: string;
}
const AxiosList: React.FunctionComponent = () => {
  const [listData, setListData] = useState<IList[]>([]);
  const history = useHistory();
  const getNewList = () => {
    return axios
      .get('./axios.json')
      .then(res => res.data.data)
      .catch(function(error) {
        console.log(error);
      });
  };

  const pullDown = (): Promise<boolean> => {
    console.log('pullDown');
    setListData([]);
    return getNewList().then(res => {
      if (!res || listData.length >= 30) {
        return new Promise(resolve => resolve(true));
      }
      return new Promise(resolve => {
        setTimeout(() => {
          const newData = listData.concat(res);
          setListData(newData);
          resolve(false);
          console.log('pullDown resolve');
        }, 1000);
      });
    });
  };

  const pullUp = (): Promise<boolean> => {
    console.log('pullUp');
    return getNewList().then(res => {
      if (!res || listData.length >= 30) {
        return new Promise(resolve => resolve(true));
      }
      return new Promise(resolve => {
        setTimeout(() => {
          const newData = listData.concat(res);
          setListData(newData);
          resolve(false);
          console.log('pullUp resolve');
        }, 1000);
      });
    });
  };

  return (
    <>
      <Button onClick={() => history.push('/')}> 返回上一页</Button>
      <ScrollView
        isUseBodyScroll
        pullDown={pullDown}
        pullUp={pullUp}
        up={{ offset: 0 }}
        throttle
        throttleTime={100}
      >
        <ul className="data-list">
          {listData.map((item, index) => (
            <li key={index}>
              <h3>测试第【{index + 1}】条新闻标题</h3>
              <span>{item.date}</span>
            </li>
          ))}
        </ul>
      </ScrollView>
    </>
  );
};

export default AxiosList;
