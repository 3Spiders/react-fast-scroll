import React, { useState } from 'react';
import ScrollView from '../scroll-view';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd-mobile';

interface IList {
  title?: string;
  date?: string;
}
const BasicList: React.FunctionComponent = () => {
  const [listData, setListData] = useState<IList[]>([]);
  const history = useHistory();

  const pullDown = (): Promise<boolean> => {
    console.log('pullDown');
    return new Promise(resolve => {
      setTimeout(() => {
        const newList = createTestData(0, true, []);
        setListData(newList);
        console.log('pullDown resolve');
        resolve(false);
      }, 1000);
    });
  };

  const pullUp = (): Promise<boolean> => {
    console.log('pullUp');
    if (listData.length >= 30) return new Promise(resolve => resolve(true));
    return new Promise(resolve => {
      setTimeout(() => {
        const newList = createTestData(6, false, listData);
        setListData(newList);
        resolve(false);
        console.log('pullUp resolve');
      }, 1000);
    });
  };

  const createTestData = (count: number, isReset: boolean, oldData: any) => {
    let counts: number;
    if (isReset) {
      counts = 0;
    }
    counts = count || 0;

    let res = [];
    const dateStr = new Date().toLocaleString();

    for (let i = 0; i < counts; i++) {
      res.push({
        date: dateStr
      });
    }
    oldData && (res = oldData.concat(res));

    return res;
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

export default BasicList;
