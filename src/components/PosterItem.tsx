import Link from "next/link";
import { Poster } from "../types/dataTypes";
import BtnAddToCart from "./BtnAddToCart";

interface ItemProp {
  poster: Poster;
}

export const PosterItem = ({ poster }: ItemProp) => {
  return (
    <div className="item">
      <Link href={`/poster/${poster.id.toLowerCase()}`}>
        <div
          style={{
            backgroundImage: `url('/pictures/thumb/${poster.thumbPath}')`,
          }}
          className={`item-pic`}
        ></div>
        <div className="item-info-container">
          <div className="item-info">
            <div className="item-title">{poster.name}</div>
            <div className="item-misc">
              {poster.year}, {poster.sizeWidthInch}&quot; ×{" "}
              {poster.sizeHeightInch}&quot;
            </div>
            <div className="item-price">${poster.price} USD</div>
          </div>
        </div>
      </Link>
      <BtnAddToCart poster={poster} />
    </div>
  );
};

export default PosterItem;
