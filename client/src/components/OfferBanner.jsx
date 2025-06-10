import {useAppContext} from "../context/AppContext"
const OfferBanner = () => {
    const { currency } = useAppContext();
  return (
    <div class="w-full py-2.5 font-medium text-sm text-primary text-center bg-primary/20">
      <p>
        Special Deal: Free Shipping on Orders Above {currency}100! | 20% OFF on
        First Purchase
      </p>
    </div>
  );
}

export default OfferBanner