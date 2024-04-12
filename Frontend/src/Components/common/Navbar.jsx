import { FaChevronDown } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { NavbarLinks } from "../../data/navbarLinks";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/api";

const Navbar = () => {
  const subLinks = [
    {
      title: "Python",
      link: "/Catalog/python",
    },
    {
      title: "Python",
      link: "/Catalog/python",
    },
  ];

  const { token } = useSelector((state) => state.auth); //initial state nikl li token ki

  const { user } = useSelector((state) => state.profile);

  const { totalItems } = useSelector((state) => state.cart);

  // const [subLinks, setSublinks] = useState([])

  // const fetchSubLinks = async ()=>{
  //     try {

  //     const result = await apiConnector("GET",categories.CATEGORIES_API) //method fir ulr aya ha

  //     console.log("printing sublink data",result)
  //     setSublinks(result.data.data)

  //     } catch (error) {
  //         console.log("could not fetch categor")
  //     }
  //     }

  // useEffect(()=>{
  // fetchSubLinks()

  // },[])

  // --------------------------------------------------------------------

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-16 items-center justify-center  shadow-md ">
      <div className="flex w-10/12 items-center  justify-between ">
        <Link to={"/"}>
          <span className="font-semibold text-xl text-blue-500">Study++</span>
        </Link>

        {/* NAVLINKS ADD KRNE HA */}
        <nav>
          <ul className="flex gap-6 text-blue-500">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="group z-10 relative  flex items-center gap-1 text-blue-400 font-semibold  ">
                      <p className="cursor-pointer ">{link.title}</p>
                      <FaChevronDown />

                      <div className="opacity-0 absolute left-[50%] translate-x-[-44%] translate-y-[40%] top-[50%] flex flex-col rounded-md bg-gray-500 p-4  transition-all duration-200 group-hover:visible  lg:w-[300px] group-hover:translate-y-[1.65em] group-hover:opacity-100 ">
                        <div className="absolute left-[50%] top-0 h-6 w-6 rotate-45 rounded bg-gray-500 translate-y-[-20%] ">

                            </div>

                        {subLinks.length ? (
                            subLinks.map((subLink, index) => (
                                <Link to={`${subLink.link}`} key={index}>
                              <p>{subLink.title}</p>
                            </Link>
                          ))
                          ) : (
                              <div></div>
                              )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-blue-900 font-semibold"
                            : "text-blue-400 font-semibold"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login signup dashbord */}

        <div className="flex gap-x-4 items-center">
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartShopping fontSize={20} />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="px-3 py-3 bg-blue-400 text-white font-semibold rounded-md">
                Login
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="px-3 py-3 bg-blue-400 text-white font-semibold rounded-md">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
