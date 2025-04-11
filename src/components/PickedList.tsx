import PosterService from "../services/poster.service";
import PosterItemList from "./PosterItemList";

export const PickedList = async () => {
  const picks = PosterService.getPicks();

  return (
    <>
      <PosterItemList title="Staff Picks" posters={picks.staffPicks} />
      <PosterItemList title="Top Selling" posters={picks.topSelling} />
      <PosterItemList title="New Release" posters={picks.newRelease} />
    </>
  );
};

export default PickedList;
