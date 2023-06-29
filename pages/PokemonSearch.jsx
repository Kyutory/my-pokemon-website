import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

import AppLayout from '../components/AppLayout';
import SearchForm from '../components/SearchForm';
import Card from '../components/Card';
import CardInfo from '../components/CardInfo';

const PokemonSearch = () => {
  const [searchInfo, setSearchInfo] = useState({});

  return (
    <AppLayout>
      {console.log(searchInfo)}
      <Helmet>
        <title>포켓몬 | 검색</title>
      </Helmet>
      <SearchForm setSearchInfo={setSearchInfo} />
      {searchInfo.name &&
        < Card name={searchInfo.name} imgSrc={searchInfo.imgURL} color={searchInfo.color}  >
          <CardInfo searchInfo={searchInfo} />
        </Card>}
    </AppLayout >
  );
}

export default PokemonSearch;