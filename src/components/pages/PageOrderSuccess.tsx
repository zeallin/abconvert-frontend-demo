import Link from "next/link";
import Footer from "../Footer";
import MainContainer from "../MainContainer";
import TopNav from "../TopNav";

interface PageOrderSuccessProps {}

export const PageOrderSuccess = ({}: PageOrderSuccessProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav isCleanMode={true} />
      <MainContainer>
        <div className="pt-4 flex justify-center item-center">
          <div className="max-w-4xl">
            <div className="font-montserrat text-2xl text-gold-300 pt-20">
              Your payment is completed, thank you!
            </div>
            <div className="text-center pt-4">
              <Link href="/">
                <button className="w-48 text-xl mt-1 text-center p-2 bg-gold-800 text-gold hover:bg-gold-400 hover:text-gold-700">
                  Keep shopping
                </button>
              </Link>
            </div>
          </div>
        </div>
      </MainContainer>
      <Footer />
    </div>
  );
};

export default PageOrderSuccess;
