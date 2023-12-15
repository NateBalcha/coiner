import React from "react";
import homeStore from "../stores/homeStore";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import classNames from "classnames";
import Cryptoimg from "../assets/hero-img.png";
import Crypto from "../assets/trade.png";

export default function Home() {
  const store = homeStore();

  React.useEffect(() => {
    if (store.trending.length === 0) store.fetchCoins();
  }, []);
  return (
    <div>
      <Header />
      <header className="home-search">
        <div className="hero">
          <div className="container">
            {/* Left Side */}
            <div className="left">
              <p>Take a quick look at the current trending coins</p>
              <h1>Search, Study, and Aquire any coin on the market 24/7</h1>
              <p>Compare coins performance over the past 24 hours</p>
              <div className="input-container">
                <input type="email" placeholder="Enter your email" />
                <button className="btn">Learn More</button>
              </div>
            </div>

            {/* Right Side */}
            <div className="right">
              <div className="img-container">
                <img src={Cryptoimg} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* sign-up */}

        <div className="width">
          <h2>Search For a Coin</h2>

          {/* searching icon and searching bar  */}
          <div
            className={classNames("home-search-input", {
              searching: store.searching,
            })}
          >
            <input
              type="text"
              className="coinSearch"
              value={store.query}
              onChange={store.setQuery}
            />
            {console.log(store.query)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="20"
            >
              <path
                fill="currentColor"
                d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
              />
            </svg>
          </div>
        </div>
      </header>
      <div>
        <div className="home-cryptos">
          <div className="width">
            <h2>{store.searched ? "Search results" : "Trending coins"}</h2>
            <div className="home-crypto">
              <div className="home-crypto-title">
                <span>Rank</span>
                <span className="img">Image</span>
                <span className="name">Name</span>
                <span className="price">Price (USD/BTC)</span>
              </div>
            </div>
            <div class="home-cryptos-list">
              {store.coins.map((coin) => {
                return <ListItem key={coin.id} coin={coin} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="signup">
        <div className="container">
          {/* left */}
          <div className="left">
            <img src={Crypto} alt="" />
          </div>

          {/* right */}
          <div className="right">
            <h2>Earn passive income with crypto.</h2>
            <p>
              Earn up to 12% annual rewards on 30+ digital assets. Simply hold
              your assets in the app to automatically earn rewards at the end of
              each month with no lockups and no limits.
            </p>
            <div className="input-container">
              <input type="email" placeholder="Enter your email" />
              <button className="btn">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
