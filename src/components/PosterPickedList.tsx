import { PosterService } from "../services/posterService";
import PosterItemList from "./PosterItemList";

export const PosterPickedList = async () => {
  const picks = PosterService.getPicks();

  return (
    <>
      <PosterItemList title="Staff Picks" posters={picks.staffPicks} />
      <PosterItemList title="Top Selling" posters={picks.topSelling} />
      <PosterItemList title="New Release" posters={picks.newRelease} />
    </>
  );
};

export default PosterPickedList;
