import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import Alert from './components/Alert';
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import { useState } from 'react';

function App() {
  const[mode,setMode]=useState("light");//Whether dark mode is enabled or not
  const[alert,setAlert]=useState(null);

  const showAlert = (message,type) => {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const toggleMode = () => {
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor='#021748';
      showAlert("Dark Mode has been enabled","success");
      //document.title="TextUtils:DarkMode"
      // setInterval(() => {
      //   document.title="TextUtils is amazing";
      // }, 2000);
      // setInterval(() => {
      //   document.title="Install textutils";   
      // }, 1500);
    }
    else{
      setMode('light');
      document.body.style.backgroundColor='white';
      showAlert("Light Mode has been enabled","success");
      //document.title="TextUtils:LightMode"
    }
  }
  return (
    <>
    <BrowserRouter>
    {/* <Navbar title="TextUtils" aboutText="About" /> */}
    <Navbar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode}/>
    <Alert alert={alert}/>
    <div className="container my-3">
      <Routes>
        <Route exact path="/about" element={<About mode={mode}/>} />
      </Routes>
      <Routes>
        <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Try Textutils - Word Counter, 
        Character Counter, Remove extra Spaces" mode={mode} />} />
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}
export default App;
