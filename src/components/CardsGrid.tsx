import Card from './Card';
import { useAppSelector } from '../app/hooks';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1120px;
  display: grid;
  align-content: center;
  justify-content: center;
  grid-template-rows: repeat(auto-fill, 300px);
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 30px 30px;
  margin: 0px auto;
`;

function CardsGrid() {
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);

  return (
    <Container>
      {pokemons.map((v) => (
        <Card key={v.id} pokemon={v} />
      ))}
    </Container>
  );
}

export default CardsGrid;
