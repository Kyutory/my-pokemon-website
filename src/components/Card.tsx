import { PokemonData } from '../types/PokemonData';
import styled from 'styled-components';

type OwnProps = {
  pokemon: PokemonData;
};

function Card({ pokemon }: OwnProps) {
  const fullId = `#${'0'.repeat(4 - pokemon.id.toString().length)}${
    pokemon.id
  }`;

  return (
    <Container>
      <ImageFrame>
        <img src={pokemon.imgUrl} alt='' />
      </ImageFrame>
      <Content>
        <div className='id'>{fullId}</div>
        <div className='name'>{pokemon.name}</div>
        <div className='types'>
          {pokemon.types.map((v) => (
            <Oval key={v}>{v}</Oval>
          ))}
        </div>
      </Content>
    </Container>
  );
}

export default Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 300px;
`;

const ImageFrame = styled.div`
  width: 100%;
  min-height: 200px;
  > img {
    background-color: lightgrey;
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: tomato;
  .id {
    width: 100%;
    font-size: 14px;
    padding-left: 20px;
  }
  .name {
    font-size: 20px;
    font-weight: 600;
  }
  .types {
    width: 100%;
    display: flex;
    font-size: 14px;
    justify-content: space-around;
  }
`;

const Oval = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: black;
  border: 1px solid black;
  border-radius: 12px;
  padding: 0.5% 2%;
`;
