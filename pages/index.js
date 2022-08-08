import React, { useEffect, useState } from "react";
import Product from "../components/Product";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div className="">
      <WalletMultiButton className="cta-button connect-wallet-button" />
    </div>
  );

  const renderItemBuyContainer = () => (
    <div className="">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <>
      <div className="main-container">
        <section className="showcase1 text-dark p-2 text-center text-sm-start">
          <div className="if-container container-fluid">
            <section className="mt-5 text-center">
              <p className="people-title">LOREM IPSUM IS SIMPLY DUMMY TEXT</p>
              <p className="q-tokenomics-showcase-intro-lead text-uppercase">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book
              </p>
            </section>
          </div>
        </section>

        <section className="p-5">
          <div className="container contacts">
            <form id="form-contact">
              <div
                className="row"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <div className="col link d-flex align-items justify-content-center">
                  {publicKey
                    ? renderItemBuyContainer()
                    : renderNotConnectedContainer()}
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
    // <div className="App">
    //   <div className="container">
    //     <header className="header-container">
    //       <p className="header"> 😳 Buildspace Emoji Store 😈</p>
    //       <p className="sub-text">The only emoji store that accepts shitcoins</p>
    //     </header>

    //     <main>
    //       {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
    //     </main>

    //     <div className="footer-container">
    //       <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
    //       <a
    //         className="footer-text"
    //         href={TWITTER_LINK}
    //         target="_blank"
    //         rel="noreferrer"
    //       >{`built on @${TWITTER_HANDLE}`}</a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default App;
