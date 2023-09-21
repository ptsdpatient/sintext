import './App.css'
import {useState,useRef} from 'react'
function App() {

  const [theme,setTheme]=useState('white');
  const [text,setText]=useState('');
  const [lineCount,setLineCount]=useState(0);
  const [numberArray,setNumberArray]=useState([]);
  const divRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  
 

  const handleFileOpen = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        textareaRef.current.value = fileContent;
      };

      reader.readAsText(file);
    }
  };


  const handleDivScroll = () => {
    if (divRef.current && textareaRef.current) {
      textareaRef.current.scrollTop = divRef.current.scrollTop;
    }
  };

  const handleTextareaScroll = () => {
    if (divRef.current && textareaRef.current) {
      divRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleDownload = () => {
    const variableContent = text;
    const blob = new Blob([variableContent], { type: 'text/plain' });
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = document.getElementById('file_name').value; 
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
  };

  const changeTheme =()=>{
    window.document.body.style.backgroundColor=(theme==='white')?'#1b1b1b':'snow'
    setTheme(theme==="white"?'dark':'white')
  }

  const handleTextChange=(e)=>{
    const newText=e.target.value;
    setText(newText)
    const lines=newText.split('\n')
    setLineCount(lines.length)
    setNumberArray(Array.from({ length: lineCount+1 }, (_, index) => {
      const formattedNumber = String(index).padStart(2, '0');
      return formattedNumber;
    }));  
  }
  return (
    <>

        <div style={{position:'fixed',width:'100%',height:'100%',display:'flex'}}>
            <div style={{width:'16%',height:'100vh',backgroundColor:'gray'}}> 
                
              <div style={{display:'flex',flexDirection:'column'}}>
                
                <div style={{width:'100%'}}>
                  <p style={{margin:'0rem',fontFamily:'data',fontSize:'1rem',padding:'0rem',paddingTop:'6px',paddingLeft:'10px'}}>File Name</p>
                  <input style={{margin:'0rem',padding:'0.1rem',fontFamily:'data',fontSize:'1rem',width:'100%',overflowX:'auto',paddingLeft:'10px'}} id="file_name" placeholder='newfile.txt'></input>
                </div>
                <p style={{width:'100%',textAlign:'center',margin:'0rem',fontFamily:'data',fontSize:'1rem',padding:'0rem',paddingTop:'6px'}}>Upload</p>
                <div className="uploadIcon" style={{width:'60%',margin:'auto',height:'10vh',borderRadius:'20px'}}>
                <input type="file" ref={fileInputRef} onChange={handleFileOpen} style={{width:'100%',height:'100%',opacity:'0',border:'none'}}></input>
                </div>
                <p style={{width:'100%',textAlign:'center',margin:'0rem',fontFamily:'data',fontSize:'1rem',padding:'0rem',paddingTop:'6px'}}>Download</p> 
                <div onClick={handleDownload} className="downloadIcon" style={{width:'60%',height:'10vh',borderRadius:'20px',margin:'auto'}}></div>
                
                <div className="settingIcon" style={{width:'60%',height:'10vh',borderRadius:'20px',margin:'auto'}}></div>
                <button onClick={()=>{changeTheme()}}>Theme</button>  

              </div>
            </div>
            <div style={{width:'100%',height:'100vh',backgroundColor:'darkgrey',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',height:'4%',width:'100%',backgroundColor:'snow',justifyContent:'space-evenly'}}></div> 
                <div style={{width:'100%',height:'92%',display:'flex'}}>
                <div className="indexText" style={{cursor:'pointer',width:'4%',height:'auto',fontFamily:'sans-serif',resize:'none',border:'none',backgroundColor:'snow',overflowY:'auto'}} ref={divRef} onScroll={handleDivScroll}>
                  {numberArray.map((key,index)=>(<p key={index} style={{margin:'0rem',padding:'0rem',fontSize:'1rem',textAlign:'center',fontFamily:'data'}}>{key}</p>))}
                </div>
                <textarea value={text} onChange={handleTextChange} style={{width:'96%',height:'100%',resize:'none',padding:'0rem',margin:'0rem',border:'none',overflowX:'scroll',whiteSpace: 'nowrap',fontFamily:'data',fontSize:'1rem'}} ref={textareaRef} onScroll={handleTextareaScroll}></textarea> 
                </div>
                <input value={lineCount-1} style={{width:'100%',border:'none'}}></input>
                  
            </div>   
        </div>
            
    </>
  )
}

export default App
