export type Artist = {
  imageUrl: string;
  name: string;
  user: string;
  followers: number;
};

export type ArtistsProps = {
  title: string;
  artistis: Artist[];
};
