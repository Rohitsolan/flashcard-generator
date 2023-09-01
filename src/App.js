// import { BrowserRouter, Router } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
// import CreateFlashCard from "./Components/view/CreateFlashCard";
import MyFlashCard from "./view/MyFlashCard";
import Navbar from "./Components/Navbar";
import FlashCardDetails from "./view/FlashCardDetails";
import Header from "./Components/Header";

import CreateFlashCard from "./view/CreateFlashCard";

function App() {
  return (
    <div
      className=" bg-neutral-100 h-screen "
      style={{
        overflowX:
          window.location === "/flascard-details/:groupId" ? "scroll" : "hidden"
      }}
    >
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateFlashCard />} />
        <Route path="/myflashcard" element={<MyFlashCard />} />
        <Route
          path="/flascard-details/:groupId"
          element={<FlashCardDetails />}
        ></Route>
      </Routes>
    </div>
  );
}
export default App;
