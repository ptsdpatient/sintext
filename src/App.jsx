import './App.css'
import {useState,useRef} from 'react'
function App() {
  const [theme,setTheme]=useState('white');
  const [text,setText]=useState('');
  const [lineCount,setLineCount]=useState(0);
  const [numberArray,setNumberArray]=useState([0,1,2]);
  const divRef = useRef(null);
  const textareaRef = useRef(null);

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
    a.download = 'variable.txt'; 
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
            <div style={{width:'16%',height:'100vh',backgroundColor:'gray',display:'flex',flexDirection:'column'}}> 
                <button onClick={()=>{changeTheme();alert(numberArray)}}>Theme</button>  
                <button onClick={handleDownload}> Save </button>

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
