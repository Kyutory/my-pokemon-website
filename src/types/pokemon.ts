export type Pokemon = {
  id: number;
  name: string;
  imgUrl: string;
  types: string[];
  weight?: number;
  height?: number;
  speed?: number;
  base_stat?: number;
};
