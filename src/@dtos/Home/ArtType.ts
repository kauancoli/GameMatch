export type Artwork = {
  imageUrl: string;
  title: string;
  creator?: {
    name: string;
    user: string;
    photo: string;
  };
  createdAt: string;
};

export type ArtProp = {
  title?: string;
  artworks: Artwork[];
  onPress?: () => void;
};
