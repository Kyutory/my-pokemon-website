import React, { } from 'react';
import { css } from '@emotion/react';

const matchedDataListStyle = css({
  border: '1px solid black',
  width: '150px',
});

const foucsedDataStyle = css({
  backgroundColor: 'wheat',
});

const MatchedDataList = ({ dataArr, focusedListIndex }) => {
  return (
    <div css={matchedDataListStyle}>
      {dataArr.map((data, index) =>
        <div key={data} css={index === focusedListIndex ? foucsedDataStyle : false}>{data}</div>)}
    </div>
  );
}

export default MatchedDataList;