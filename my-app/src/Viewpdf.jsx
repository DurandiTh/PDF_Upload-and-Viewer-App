import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { pdfjs } from 'react-pdf';
import PdfComp from './PdfComp';
import { useNavigate } from "react-router-dom"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();
  

function Viewpdf() {
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('http://localhost:5000/view')
    .then(result => {console.log(result)
      if(result.data !== "Success"){
        navigate('/login')
      }
    
       
    })
    .catch(err=> console.log(err))
  }, [])

    const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  useEffect(() => {
    getpdf();
  },[]);

  const getpdf = async () => {
    const result = await axios.get("http://localhost:5000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  }

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file",file);
    console.log(title,file)
    const result = await axios.post("http://localhost:5000/upload-files",
      formData,
      {
        headers: {"Content-Type":"multipart/form-data"},
      }
    );
    console.log(result);
    if (result.data.status === "ok") {
      alert("Uploaded Successfully!!!");
      getpdf();
    }
  };

  const showPdf = (pdf) => {
    // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:5000/files/${pdf}`)
  };
    return ( 
        <div className='App'>
      <form className='formStyle' onSubmit={submitImage}>
        <h4>Upload pdf in React</h4>
        <br/>
        <input
        type='text'
        className='form-control'
        placeholder='Title'
        required
        onChange={(e)=> setTitle(e.target.value)}
        >
        </input>
        <br></br>
        <input
        type='file'
        className='form-control'
        accept='application/pdf'
        required
        onChange={(e) => setFile(e.target.files[0])}
        
        >
        </input>
        <br></br>
        <button className='btn btn-primary'>Submit</button>

      </form>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
        {allImage == null ? "" : allImage.map(data=>{
          return(
            <div className="inner-div">
            <h6>Title: {data.title}</h6>
            <button className='btn btn-primary' onClick={()=>showPdf(data.pdf)}>Show pdf</button>
           </div>
          );
        })}
       </div>
      </div>
      <PdfComp pdfFile={pdfFile}></PdfComp>
    </div>
     );
}

export default Viewpdf;