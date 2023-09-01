import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="w-full pt-2 xl:mx-56 mx-auto">
      <h1 className="text-2xl text-slate font-bold mb-5">
        {"Create Flashcard"}
      </h1>
      <div className="flex items-center space-x-10 mb-3">
        <button
          className="text-sm font-bold text-gray-600"
          title="Create New Flashcard"
        >
          {/* This button will navigate to create flashcard page */}
          <NavLink
            to={"/"}
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid red" : undefined,
              color: isActive ? "red" : "gray",
              paddingBottom: "12px"
            })}
          >
            Create New
          </NavLink>
        </button>
        <button
          className="text-sm font-bold text-gray-600"
          title="My Flashcard"
        >
          {/* This button will navigate to Myflashcard page */}
          <NavLink
            to={"/myflashcard"}
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid red" : undefined,
              color: isActive ? "red" : "gray",
              paddingBottom: "12px"
            })}
          >
            My Flashcard
          </NavLink>
        </button>
      </div>
      <hr className="border bg-slate-300 border-slate-300 mb-4 xl:w-[68%] w-full" />
    </div>
  );
};

export default NavBar;
