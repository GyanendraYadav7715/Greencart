import MainBanner from "../components/MainBanner";
import Categories from "../components/Categories";
import BestSeller from "../components/BestSeller";
import CustomerReview from "../components/CustomerReview";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";
const Home = () => {
  return (
    <div className="mt-10 ">
      <MainBanner />
      <Categories />
      <BestSeller />
      <BottomBanner />
      <NewsLetter />
      <CustomerReview />
    </div>
  );
};

export default Home;
