import { useEffect, useState } from "react";
import { ethers } from "ethers";

//Images - 
import house from "./assets/houses.png";

// Components
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Home from "./components/Home";

// ABIs
import RealEstate from "./abis/RealEstate.json";
import Escrow from "./abis/Escrow.json";

// Config
import config from "./config.json";

function App() {
  return (
    <div>
      <Navigation />
      <Search />
      <div className="cards__section">
        <h3>Homes for you</h3>

        <hr />

        <div className="cards">
          <div className="card">
            <div className="card__image">
              <img src={house} alt="Home" />
            </div>
            <div className="card__info">
              <h4>1 ETH</h4>
              <p>
                <strong>1</strong> bed | 
                <strong>{" "}2</strong> bath  | 
                <strong>{" "} 300</strong> sqft
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
