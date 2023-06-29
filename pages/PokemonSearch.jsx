import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';

import AppLayout from '../components/AppLayout';
import PageCard from '../components/PageCard';
import SearchForm from '../components/SearchForm';

const PokemonSearch = () => {
  const [imgURL, setImgURL] = useState('');
  const [selectedData, setSelectedData] = useState('');

  return (
    <AppLayout>
      <Helmet>
        <title>포켓몬 | 검색</title>
      </Helmet>
      <SearchForm setSelectedData={setSelectedData} setImgURL={setImgURL} />
      {selectedData && <PageCard imgSrc={imgURL} name={selectedData} />}
    </AppLayout>
  );
}

export default PokemonSearch;