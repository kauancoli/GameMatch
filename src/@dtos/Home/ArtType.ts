export type Player = {
  name: string;
  user: string;
  imageUrl: string;
  favoriteGames: string[];
  age: number;
};

export type PlayerProps = {
  artworks: Player[];
};
