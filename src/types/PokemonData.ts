export type PokemonData = {
  id: number;
  name: string;
  imgUrl: string;
  types: string[];
  color?: string;
  stats?: {
    weight: number;
    height: number;
    speed: number;
    base_stat: number;
  } | null;
};
