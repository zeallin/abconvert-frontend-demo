import Footer from "../components/Footer";
import MainContainer from "../components/MainContainer";
import { PickedList } from "../components/PickedList";
import TopNav from "../components/TopNav";

export default function Home() {
  return (
    <>
      <TopNav />
      <MainContainer>
        <PickedList />
      </MainContainer>
      <Footer />
    </>
  );
}
