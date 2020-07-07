import React, { useState } from 'react';
import ScrollView from '../../components/index';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [listData, setListData] = useState([]);
  const history = useHistory();
  const pullDown = (): Promise<boolean> => {
    console.log('pullDown');
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('pullDown resolve');
        resolve(false);
      }, 2000);
    });
  };

  const pullUp = (): Promise<boolean> => {
    console.log('pullUp');
    return new Promise(resolve => {
      setTimeout(() => {
        // const newList = createTestData(4, false, listData);
        // setListData(newList);
        resolve(false);
        console.log('pullUp resolve');
      }, 2000);
    });
  };

  const createTestData = (count: number, isReset: boolean, oldData: any) => {
    let counts;
    if (isReset) {
      counts = 0;
    }
    counts = count || 0;

    let res = [];
    const dateStr = new Date().toLocaleString();

    for (let i = 0; i < counts; i++) {
      res.push({
        title: `测试第【${counts++}】条新闻标题`,
        date: dateStr
      });
    }
    oldData && (res = oldData.concat(res));

    return res;
  };

  return (
    <ScrollView
      isUseBodyScroll
      pullDown={pullDown}
      pullUp={pullUp}
      up={{ offset: 0 }}
      throttle
      throttleTime={100}
    >
      <div onClick={() => history.push('/')}>返回上一页</div>
      <ul className="data-list">
        {listData.length
          ? listData.map((item, index) => (
              <li key={index}>
                {/* <h3>{item.title}</h3>
                <span>{item.date}</span> */}
              </li>
            ))
          : <div>暂无数据</div>}
      </ul>
    </ScrollView>
  );
};

export default Home;
