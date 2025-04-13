import CheckoutDetail from "@/components/CheckoutDetail";
import Link from "next/link";
import Footer from "../Footer";
import MainContainer from "../MainContainer";
import TopNav from "../TopNav";

interface PageCheckoutProps {}

export const PageCheckout = ({}: PageCheckoutProps) => {
  const referrer = "/cart"; // Fallback to homepage if no referrer

  return (
    <div className="flex flex-col min-h-screen">
      <TopNav isCleanMode={true} />
      <MainContainer>
        <Link href={referrer} className="text-gold-500 hover:underline">
          &lt;&lt; Back to Cart
        </Link>
        <CheckoutDetail />
      </MainContainer>
      <Footer />
    </div>
  );
};

export default PageCheckout;
