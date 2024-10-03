import "./App.css";
import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Gifts from "./pages/Gifts";
import GiftDetails from "./pages/GiftDetails";
import PageNotFound from "./pages/PageNotFound";
import { Link } from "react-router-dom";

const App = () => {
  const [gifts, setGifts] = useState([]);

  const fetchGifts = async () => {
    // i need to fetch from the /gifts endpoints using fetch api
    const res = await fetch("http://localhost:3002/gifts"); // question: do i have to specify this port? or can i just use /gifts?
    // debug
    console.log("res", res);

    if (!res.ok) {
      console.error("Failed to fetch gifts");
      return;
    }

    const data = await res.json();
    // debug
    console.log("data", data);
    setGifts(data);
  };

  useEffect(() => {
    // debug
    console.log("fetching gifts");
    fetchGifts();
    // debug
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <Gifts data={gifts} />,
    },
    {
      path: "/gift/:id",
      element: <GiftDetails data={gifts} />,
    },
    {
      path: "/*",
      element: <PageNotFound />,
    },
  ]);

  return (
    <div className="App">
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src="/logo.png" />
            <h1>UnEarthed</h1>
          </div>
          <div className="header-right">
            <Link to="/">
              <button className="homeBtn">Home</button>
            </Link>
          </div>
        </div>
      </header>

      {element}
    </div>
  );
};

export default App;
