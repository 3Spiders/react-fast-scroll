import React from 'react';
import { NavBar, List } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import { exampleList } from './staticData';

const App = () => {
  const { Item } = List;
  const history = useHistory();
  return (
    <>
      <NavBar mode="dark">fast-scroll示例列表</NavBar>
      <List>
        {exampleList.map(el => (
          <Item
            key={el.path}
            arrow="horizontal"
            extra={el.extra}
            onClick={() => {
              history.push(el.path);
            }}
          >
            {el.name}
          </Item>
        ))}
      </List>
    </>
  );
};

export default App;
