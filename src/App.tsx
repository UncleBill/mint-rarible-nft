import React, { useRef, useState, InputHTMLAttributes } from "react";
import "rarepress.js";
// rarepress.js@0.0.14 can not run in strict mode
// import rarepress from "rarepress.js";

import "./App.css";

function App() {
  const ref = useRef(null);
  const [result, setResult] = useState("");
  const handleChange: InputHTMLAttributes<HTMLInputElement>["onChange"] =
    async (e) => {
      const file = e.target.files![0];
      mint(file);
    };

  const mint = async (file: File) => {
    await rarepress.init({ host: "https://rinkeby.rarepress.org/v0" });
    let cid = await rarepress.add(file);
    let token = await rarepress.create({
      metadata: {
        name: "Hello World NFT",
        description: "Minting NFT so easy!",
        image: "/ipfs/" + cid,
      },
    });
    setResult(JSON.stringify(token, null, 2));
  };
  return (
    <div className="App">
      <input ref={ref} onChange={handleChange} type="file" name="file" />
      <pre>{result}</pre>
    </div>
  );
}

export default App;
