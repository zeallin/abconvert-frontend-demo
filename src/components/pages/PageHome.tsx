import Footer from "../Footer";
import MainContainer from "../MainContainer";
import PosterPickedList from "../PosterPickedList";
import TopNav from "../TopNav";

export const PageHome = () => {
  return (
    <>
      <TopNav />
      <MainContainer>
        <PosterPickedList />
      </MainContainer>
      <Footer />
    </>
  );
};
