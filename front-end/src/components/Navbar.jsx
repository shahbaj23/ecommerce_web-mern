import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Product/AuthSlice";
import { fetchCartData } from "../Product/CartSlice";
import styleNest from "../assets/styleNest.png";
import { RxCross2 } from "react-icons/rx";

const navigation = {
  pages: [
    { name: "Home", to: "/" },
    { name: "Collection", to: "/collection" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#" },
  ],
};

export default function Navbar() {
  const [profileMenu, setProfileMenu] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.authentication);
  const { cartData } = useSelector((state) => state.cart);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartData({ token }));
    }
  }, [dispatch, token]);

  const totleItems = Object.values(cartData || {}).reduce((total, sizes) => {
    return (
      total + Object.values(sizes).reduce((sum, qty) => sum + Number(qty), 0)
    );
  }, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="bg-white sticky top-0 z-50 shadow-sm">
      <Dialog open={open} onClose={setOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        <div className="fixed inset-0 z-50 flex">
          <DialogPanel className="relative w-full max-w-xs bg-white shadow-xl flex flex-col overflow-y-auto">
            <div className="flex px-4 pt-5 pb-2">
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-gray-600"
              >
                <XMarkIcon className="size-6" />
              </button>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 space-y-4">
              {navigation.pages.map((page) => (
                <a
                  key={page.name}
                  href={page.href}
                  className="block text-base font-medium text-gray-800 cursor-pointer"
                >
                  {page.name}
                </a>
              ))}
            </div>
            <div className="border-t border-gray-200 px-4 py-6 space-y-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block text-base font-medium text-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to={`/order/${user?.id}`}
                    className="block text-base font-medium text-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Orders
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="block text-base font-medium text-gray-800 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-base font-medium text-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </Link>

                  <Link
                    to="/signup"
                    className="block text-base font-medium text-gray-800"
                    onClick={() => setOpen(false)}
                  >
                    Create account
                  </Link>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* ------------------- DESKTOP NAVBAR ------------------- */}
      <header className="bg-white">
        <nav className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              className="lg:hidden p-2 text-black"
              onClick={() => setOpen(true)}
            >
              <Bars3Icon className="size-6" />
            </button>

            <Link to="/" className="flex items-center">
              <img
                src={styleNest}
                className="w-[150px] h-[42px]  font-bold text-[22px] text-black"
              />
            </Link>

            <div className="hidden lg:flex lg:space-x-8">
              {navigation.pages.map((page) => (
                <Link
                  key={page.name}
                  to={page.to}
                  className="text-sm font-medium text-black hover:text-gray-200"
                >
                  {page.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <MagnifyingGlassIcon
                onClick={() => setSearchOpen(!searchOpen)}
                className="size-6 text-black cursor-pointer hidden lg:block"
              />

              {user && (
                <Link to="/cart" className="relative cursor-pointer">
                  <ShoppingBagIcon className="size-6 text-black" />
                  <span className="absolute -top-1 -right-2 text-xs bg-red-600 text-white rounded px-1">
                    {totleItems}
                  </span>
                </Link>
              )}

              <div className="hidden lg:flex items-center space-x-6 pl-6 border-l border-white/30">
                {user ? (
                  <>
                    <button
                      onClick={() => setProfileMenu(!profileMenu)}
                      className="text-sm font-medium text-black cursor-pointer hover:text-gray-200"
                    >
                      Profile
                    </button>
                    {profileMenu && (
                      <div className="absolute right-[11px] top-[45px] mt-2 w-[130px] bg-white border border-gray-200 shadow-lg rounded-md z-50s">
                        <Link
                          to=""
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Profile{" "}
                        </Link>
                        <Link
                          to={`/order/${user?.id}`}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-sm font-medium text-black hover:text-gray-200"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-white/40" />
                    <Link
                      to="/signup"
                      className="text-sm font-medium text-black hover:text-gray-200"
                    >
                      Create account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        {searchOpen && (
          <div
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#fcfbfb] w-[380px] flex items-center gap-2 px-3 py-2 border rounded-[18px] shadow-md z-50"
          >
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent outline-none text-sm"
            />

            <RxCross2
              className="cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setSearchOpen(false)}
            />
          </div>
        )}
      </header>
    </div>
  );
}
