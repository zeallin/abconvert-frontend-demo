export interface Poster {
  id: string;
  name: string;
  year: number | null;
  thumbPath: string;
  imagePath: string;
  sizeWidthInch: number;
  sizeHeightInch: number;
  price: number;
  desc: string | null;
  category: string[];
  color: string[];
}
export interface PosterPicks {
  staffPicks: Poster[];
  topSelling: Poster[];
  newRelease: Poster[];
}
export interface CartItem {
  poster: Poster;
  quantity: number;
}

export type QueryParam = { [key: string]: string | string[] | undefined };
