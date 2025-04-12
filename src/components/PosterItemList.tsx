import { Poster } from "../types/dataTypes";
import PosterItem from "./PosterItem";

interface ItemListProp {
  title: string;
  posters: Poster[];
}

export const PosterItemList = ({ title, posters }: ItemListProp) => {
  return (
    <>
      <div className="font-montserrat text-xl text-gold-300">{title}</div>
      <div className="item-list">
        {posters.map((poster) => (
          <PosterItem key={poster.id} poster={poster} />
        ))}
      </div>
    </>
  );
};

export default PosterItemList;
