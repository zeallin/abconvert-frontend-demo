export interface Poster {
  id: string;
  name: string;
  year: number;
  thumbPath: string;
  imagePath: string;
  sizeWidthInch: number;
  sizeHeightInch: number;
  price: number;
  desc: string;
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
