 import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div class="flex flex-col items-center justify-center text-sm max-md:px-4 h-[45vh] py-14">
      <h2 class="text-8xl md:text-5xl font-bold text-primary">
        You cart is empty!
      </h2>
      <div class="h-1 w-16 rounded bg-primary my-5 md:my-7"></div>
      
      <p class="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center">
        🧺 Nothing in here. Why not explore and find something awesome?
      </p>
      <div class="flex items-center gap-4 mt-6">
        <Link
          to="/"
          class="bg-primary px-7 py-2.5 text-white rounded-md active:scale-95 transition-all hover:bg-primary-dull"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound