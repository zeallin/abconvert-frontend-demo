import { Poster } from "../types/dataTypes";
import PosterItem from "./PosterItem";

interface ItemListProp {
  title: string;
  posters: Poster[];
}

export const PosterItemList = ({ title, posters }: ItemListProp) => {
  return (
    <>
      <h2 className="h2">{title}</h2>
      <div className="item-list">
        {posters.map((poster) => (
          <PosterItem key={poster.id} poster={poster} />
        ))}
      </div>
    </>
  );
};

export default PosterItemList;
