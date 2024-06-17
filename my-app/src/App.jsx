import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { pdfjs } from 'react-pdf';
// import PdfComp from './PdfComp';
import 'bootstrap/dist/css/bootstrap.min.css'

import Viewpdf from './Viewpdf';
// import { MantineProvider } from "@mantine/core";
// import { createBrowserRouter } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString();

function App() {

 
  return (
    // <main className="container mt-5">
    <BrowserRouter>
      <Routes>
        <Route
        exact
        path="/"
        element={<Signup></Signup>}
        >
       </Route>

       <Route
        exact
        path="/view"
        element={<Viewpdf></Viewpdf>}
        >
       </Route>

       <Route path='/login' element={<Login></Login>}></Route>

      </Routes>

      </BrowserRouter>
    // </main>
    
  );
}

export default App;
