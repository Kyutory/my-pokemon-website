import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';

const DataList = styled.ul({
  border: '1px solid black',
  width: '150px',
  position: 'absolute',
  backgroundColor: 'white',
  listStyle: 'none',
  paddingLeft: '0px',
  marginTop: '0px'
});

const ListItem = styled.li(({ isFocused, isMouseOver }) => {
  return {
    backgroundColor: isFocused || isMouseOver ? 'wheat' : 'white',
    display: 'block',
  }
});

const MatchedDataList = ({ dataArr, focusedListIndex, setInputValue }) => {

  const [mouseOverIndex, setMouseOverIndex] = useState(-1);

  const onMouseDownListItem = useCallback((e) => {
    setInputValue(e.target.innerHTML);
  }, []);

  const onMouseOverListItem = useCallback((index) => (e) => {
    setMouseOverIndex(index);
  }, []);

  return (
    <div>
      <DataList>
        {dataArr.map((data, index) =>
          <ListItem
            key={data}
            index={index}
            onMouseDown={onMouseDownListItem}
            onMouseOver={onMouseOverListItem(index)}
            isFocused={index === focusedListIndex}
            isMouseOver={index === mouseOverIndex}
          >
            {data}
          </ListItem>
        )}
      </DataList>
    </div >

  );
}

export default MatchedDataList;