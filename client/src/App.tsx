import { ThemeProvider } from "./ThemeContext.tsx";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NothingHere from './NothingHere.tsx';
import Home from './Home.tsx';
import WantToHelp from './WantToHelp.tsx';
import GetAge from './GetAge.tsx';
import GetNicknameCountry from './GetNicknameCountry.tsx';
import WriteWorry from './WriteWorry.tsx';
import ThankYou from './ThankYou.tsx';
import SelectAnswer from './SelectAnswer.tsx';
import ReadWorry from './ReadWorry.tsx';
import GetEmail from './GetEmail.tsx';
import NavBar from './NavBar.tsx';

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-email" element={<GetEmail />}></Route>
          <Route path="/get-age" element={<GetAge />}></Route>
          <Route path="/get-info" element={<GetNicknameCountry />}></Route>
          <Route path="/wanna-help" element={<WantToHelp />}></Route>
          <Route path="/write-worry" element={<WriteWorry />}></Route>
          <Route path="/select-answer" element={<SelectAnswer />}></Route>
          <Route path="/thank-you" element={<ThankYou />}></Route>
          <Route path="/read-worry" element={<ReadWorry />} />
          <Route path="*" element={<NothingHere />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )

  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vitejs.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
