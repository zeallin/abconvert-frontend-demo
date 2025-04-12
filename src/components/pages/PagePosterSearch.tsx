import PosterSearchList from "@/components/PosterSearchList";
import { PosterSearchFilters } from "@/services/posterService";
import Footer from "../Footer";
import MainContainer from "../MainContainer";
import TopNav from "../TopNav";

type PosterSearchProp = PosterSearchFilters;

export const PagePosterSearch = (props: PosterSearchProp) => {
  return (
    <>
      <TopNav posterSearchFilters={props} />
      <MainContainer>
        <PosterSearchList {...props} />
      </MainContainer>
      <Footer />
    </>
  );
};
