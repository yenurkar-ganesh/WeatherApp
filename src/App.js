import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";

function App() {
  const [loader, setLoader] = useState(false);

  return (
    <>
      <Hero setLoader={setLoader} />
      {loader && (
        <div className="loader">
          <div className="spinner"></div>
          <h1 className="loader-text">
            `Sit back, We Chasing clouds and collecting weather insights...`
          </h1>
        </div>
      )}
    </>
  );
}

export default App;
