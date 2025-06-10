import useSellerAuth from "../../hooks/useSellerAuth"; 

const SellerLogin = () => {
  const {
    seller,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    onSubmitHandler,
  } = useSellerAuth();  

  if (seller) return null;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50">
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">Seller</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default SellerLogin;
