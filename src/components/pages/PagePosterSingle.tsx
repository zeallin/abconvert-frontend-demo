import PosterDetail from "@/components/PosterDetail";
import Footer from "../Footer";
import MainContainer from "../MainContainer";
import TopNav from "../TopNav";

interface PagePosterSingleProps {
  id: string;
}

export const PagePosterSingle = ({ id }: PagePosterSingleProps) => {
  return (
    <>
      <TopNav />
      <MainContainer>
        <PosterDetail id={id} />
      </MainContainer>
      <Footer />
    </>
  );
};
