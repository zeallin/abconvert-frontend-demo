import { PosterSearchFilters, PosterService } from "@/services/posterService";
import Checker from "@/utils/checker";
import PosterItemList from "./PosterItemList";

type PosterSearchListProp = PosterSearchFilters;

export const PosterSearchList = async (props: PosterSearchListProp) => {
  const searchResults = PosterService.search(props);

  let title = "";
  if (Checker.isNonEmptyStr(props.keyword)) {
    title = `Search result for "${props.keyword}" (${searchResults.itemCount} posters)`;
  }

  return (
    <>
      <PosterItemList title={title} posters={searchResults.items} />
    </>
  );
};

export default PosterSearchList;
