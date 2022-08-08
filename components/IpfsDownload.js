import React from "react";
import useIPFS from "../hooks/useIPFS";
import { useState } from "react";


const IPFSDownload = ({ hash, filename }) => {
  const file = useIPFS(hash, filename);
  const [selected, setSelected] = React.useState("");

  const changeSelectOptionHandler = (event) => {
    setSelected(event.target.value);
  };

  const homeDesign = ["Highlighted Projects", "Community Projects"];
  const systemArchiture = ["Parts", "PBU"];
  const products = ["Marine Leisure"];

  let type = null;

  let options = null;

  if (selected === "Home Designs") {
    type = homeDesign;
  } else if (selected === "System Architecture") {
    type = systemArchiture;
  } else if (selected === "Products") {
    type = products;
  }

  if (type) {
    options = type.map((el) => <option key={el}>{el}</option>);
  }

  const [subCategory, setSubCategory] = useState("");

  const [mintAdress, setMintAdress] = useState("");
  const [symbol, setSymbol] = useState("");

  const data = { mintAdress, symbol, selected, subCategory };

  const handleSubmit = (e) => {
    // console.log(data);

    fetch(
      "https://2trles4boa.execute-api.ap-southeast-1.amazonaws.com/addCollectionEmail",
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          senderName: "claim.qubes@gmail.com",
          senderEmail: "jdojade20@gmail.com",
          mintAddress: mintAdress,
          symbol: symbol,
          categories: selected,
          subCategory: subCategory,
          date: new Date(),
        }),
      }
    ).then(() => {
      window.location.reload(false);
      alert("Add my collection data has been send.");
    });
  };
  return (
    <div>
      {file ? (
        <>
          <form id="form-contact">
            <div
              className="row"
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div className="col-md-3">
                <span className="details text-uppercase">
                  Mint address
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                </span>
                <input
                  className="form-control form-control-md mb-2"
                  required
                  type="text"
                  value={mintAdress}
                  onChange={(e) => setMintAdress(e.target.value)}
                />
                <span className="details text-uppercase">
                  Symbol
                  <span style={{ color: "red" }}>*</span>
                </span>
                <br />
                <input
                  className="form-control form-control-md"
                  required
                  type="text"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
                <br />
                <select
                  onChange={changeSelectOptionHandler}
                  className="form-select form-control-lg"
                  placeholder="Categories"
                >
                  <option></option>
                  <option>Home Designs</option>
                  <option>System Architecture</option>
                  <option>Products</option>
                </select>
                <br />
                <select
                  className="form-select form-control-lg"
                  placeholder="Sub-Categories"
                  onChange={(e) => {
                    const selectedOption = e.target.value;
                    setSubCategory(selectedOption);
                  }}
                >
                  <option> </option>
                  {options}
                </select>
              </div>
            </div>
            <div className="col link d-flex align-items justify-content-center">
              <div
                className=""
                style={{
                  width: "100px",
                }}
              >
                <button
                  className="contact-send-button btn btn-lg rounded-pill"
                  id="sendbtn"
                  type="button"
                  onClick={handleSubmit}
                >
                  submit
                </button>
              </div>
            </div>
          </form>
        </>
      ) : (
        // <div className="download-component">
        //   <a className="download-button" href={file} download={filename}>Download</a>
        // </div>
        <p>Downloading file...</p>
      )}
    </div>
  );
};

export default IPFSDownload;
