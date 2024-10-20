
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./components/Counter";
import CounterWithRecoil from "./components/CounterWithRecoil";
import { RecoilRoot } from "recoil";


function App() {
  
  return (
    <>
    {/* <Counter/> */}
    <RecoilRoot>
    <CounterWithRecoil />
    </RecoilRoot>
    </>
  )

}

export default App;
