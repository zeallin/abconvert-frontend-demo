import BtnAddToCart from "@/components/BtnAddToCart";
import PosterItemList from "@/components/PosterItemList";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PosterService } from "../services/posterService";
interface PosterDetailProps {
  id: string;
}

export const PosterDetail = async ({ id }: PosterDetailProps) => {
  const searchResults = PosterService.search({ id });

  if (searchResults.itemCount === 0) notFound(); // Redirects to 404 page

  const poster = searchResults.items[0];
  const relatedItems = PosterService.search({
    keyword: poster.name,
    pageSize: 5,
  });

  return (
    <>
      <div className="flex justify-center items-center gap-x-5">
        <div className="flex-none">
          <Image
            alt={poster.name}
            className="h-[85vh] w-auto"
            width={1024}
            height={1024}
            src={`/pictures/detail/${poster.thumbPath}`}
          />
        </div>
        <div className="flex-none p-4 border-gold/80 border-1 border-solid">
          <div className="w-96">
            <div className="text-4xl font-semibold">{poster.name}</div>
            <div className="item-price text-xl pt-4">${poster.price} USD</div>
            <div className="item-misc text-xl">{poster.year}</div>
            <div className="item-misc text-xl pb-4">
              {poster.sizeWidthInch}&quot; × {poster.sizeHeightInch}&quot;
            </div>

            <BtnAddToCart poster={poster} />
          </div>
        </div>
      </div>
      <PosterItemList title="Related Posters" posters={relatedItems.items} />
    </>
  );
};

export default PosterDetail;
