import React from 'react';
import ScrollView from '../scroll-view';
import { useHistory } from 'react-router-dom';

const Home = () => {
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
        resolve(false);
        console.log('pullUp resolve');
      }, 2000);
    });
  };

  const createTestData = (count, isReset, oldData) => {
    if (isReset) {
      count = 0;
    }
    this.count = this.count || 0;

    let res = [];
    const dateStr = new Date().toLocaleString();

    for (let i = 0; i < count; i++) {
      res.push({
        title: `测试第【${this.count++}】条新闻标题`,
        date: dateStr
      });
    }
    oldData && (res = oldData.concat(res));

    return res;
  };

  return (
    <ScrollView
      useBodyScroll
      pullDown={pullDown}
      pullUp={pullUp}
      up={{ offset: 0 }}
      throttleScrollTimer={2000}
    >
      <div onClick={() => history.push('/')}>返回上一页</div>
    </ScrollView>
  );
};

export default Home;
