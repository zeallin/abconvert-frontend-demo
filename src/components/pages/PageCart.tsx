import CartPosterItemList from "@/components/CartPosterItemList";
import Link from "next/link";
import Footer from "../Footer";
import MainContainer from "../MainContainer";
import TopNav from "../TopNav";

export const PageCart = () => {
  const referrer = "/"; // Fallback to homepage if no referrer

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav isCleanMode={true} />
      <MainContainer>
        <Link href={referrer} className="text-gold-500 hover:underline">
          &lt;&lt; Keep Shopping
        </Link>
        <CartPosterItemList />
      </MainContainer>
      <Footer />
    </div>
  );
};

export default PageCart;
