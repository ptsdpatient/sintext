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
  const [settingMenuHidden,setSettingMenuHidden] = useState(false);
 

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
            <div style={{width:'16%',height:'100vh',backgroundColor:'#888'}}> 
                
              <div style={{display:'flex',flexDirection:'column'}}>
                
                <div style={{width:'100%'}}>
                   <input style={{fontFamily:'data',fontSize:'1rem',width:'100%',overflowX:'auto',height:'1.5rem',outline:'none',border:'none',margin:'auto',textIndent:'6px'}} id="file_name" placeholder='newfile.txt'></input>
                </div>
                <div className="uploadIcon" style={{width:'40%',margin:'auto',height:'10vh',borderRadius:'20px'}}>
                <input type="file" title=" " ref={fileInputRef} onChange={handleFileOpen} style={{width:'100%',height:'100%',opacity:'0',border:'none'}}></input>
                </div>
                <div onClick={handleDownload} className="downloadIcon" style={{width:'40%',height:'10vh',borderRadius:'20px',margin:'auto'}}></div>
                
                <div className="settingIcon" style={{width:'40%',height:'10vh',borderRadius:'20px',margin:'auto'}} onClick={()=>{setSettingMenuHidden(settingMenuHidden?false:true)}}></div>
                
                <div style={{display:settingMenuHidden?'none':'block',userSelect:'none'}}>
                <div style={{width:'21%',margin:'auto',marginTop:'1rem'}}>
                <input style={{padding:'0rem',fontSize:'1.2rem',width:'2rem',height:'5vh',margin:'auto',backgroundColor:'#888',border:'none',fontWeight:'bolder',textIndent:'2px'}}></input>
                </div>
                <div style={{width:'70%',display:'flex',alignItems:'center',margin:'auto'}}>
                <div className="minus" style={{width:'33%',height:'5vh',borderRadius:'20px',margin:'auto'}}></div>
                <div className="fontSize" style={{width:'33%',height:'10vh',borderRadius:'20px',margin:'auto'}}></div>
                <div className="plus" style={{width:'33%',height:'5vh',borderRadius:'20px',margin:'auto'}} ></div>
                </div>
                <div style={{textAlign:'center',fontSize:'1.2rem',marginTop:'1rem'}}>sans-serif</div>
                <div className="fontFamily" style={{width:'40%',height:'7vh',borderRadius:'20px',margin:'auto'}}></div>
                
                <div style={{textAlign:'center',fontSize:'1.2rem',marginTop:'1rem'}}>sans-serif</div>
                <div className="theme" style={{width:'40%',height:'7vh',borderRadius:'20px',margin:'auto'}}></div>
               
                
                
                </div>
              </div>
            </div>
            <div style={{width:'100%',height:'100vh',backgroundColor:'darkgrey',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',height:'4%',width:'100%',backgroundColor:'snow',justifyContent:'space-evenly'}}></div> 
                <div style={{width:'100%',height:'92%',display:'flex'}}>
                <div className="indexText" style={{width:'4%',height:'auto',fontFamily:'sans-serif',resize:'none',border:'none',backgroundColor:'snow',overflowY:'auto'}} ref={divRef} onScroll={handleDivScroll}>
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
