import './App.css'
import {useState,useRef} from 'react'
function App() {

  const [text,setText]=useState('');
  const [lineCount,setLineCount]=useState(0);
  const [numberArray,setNumberArray]=useState([]);
  const divRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const [settingMenuHidden,setSettingMenuHidden] = useState(false);
  const fonts=["anonymouspro","cascadia","dejavusans","jetbrains","poppins","quicksandbook","sourcecodepro"]
  const themes=["dark","light"]
  const [themeIndex,setThemeIndex]=useState(0);
  const [fontSize,setFontSize]=useState(18)
  const [FontFamilyIndex,setFontFamilyIndex]=useState(0) 
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
  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      setText(text+'   ')
      event.preventDefault(); 
    }
    if(event.key==='Escape'){
      document.getElementById("cmd").focus();
    }
  };
 

  return (
    <>

        <div style={{position:'fixed',width:'100%',height:'100%',display:'flex'}}>
            <div style={{width:'16%',height:'100vh',backgroundColor:themes[themeIndex]==="light"?'rgb(236, 247, 255)':'rgb(32, 32, 32)',minWidth:'10rem'}}> 
              <div style={{display:'flex',flexDirection:'column'}}>
                <div style={{width:'100%'}}>
                   <input style={{letterSpacing:'1.1px',fontFamily:'poppins',padding:'0rem',fontSize:'1rem',width:'100%',overflowX:'auto',height:'1.5rem',outline:'none',border:'none',margin:'auto',textIndent:'6px',color:(themes[themeIndex]==="light")?'#1b1b1b':'snow',backgroundColor:(themes[themeIndex]==="light")?'snow':'rgb(42,42,42)'}} id="file_name" placeholder='newfile.txt'></input>
                </div>
                <div className="uploadIcon" style={{minHeight:'3rem',width:'40%',margin:'auto',height:'10vh',borderRadius:'20px'}}>
                <input type="file" title=" " ref={fileInputRef} onChange={handleFileOpen} style={{width:'100%',height:'100%',opacity:'0',border:'none'}}></input>
                </div>
                <div onClick={handleDownload} className="downloadIcon" style={{minHeight:'3rem',width:'40%',height:'10vh',borderRadius:'20px',margin:'auto'}}></div>
                
                <div className="settingIcon" style={{minHeight:'3rem',width:'40%',height:'10vh',borderRadius:'20px',margin:'auto'}} onClick={()=>{setSettingMenuHidden(settingMenuHidden?false:true)}}></div>
                
                <div style={{width:'100%',display:settingMenuHidden?'none':'flex',flexDirection:'column',userSelect:'none',height:'40vh',justifyContent:'space-evenly',minHeight:'15rem'}}>
                <div>
                
                <div>
                <div style={{width:'70%',display:'flex',alignItems:'center',margin:'auto',minHeight:'4rem'}}>
                <div className="minus" onClick={()=>{if(fontSize>10)setFontSize(fontSize-1)}} style={{minHeight:'1.5rem',width:'25%',height:'5vh',borderRadius:'20px',margin:'auto',backgroundColor:(themes[themeIndex]==="light")?'':'rgb(56,56,56)'}}></div>
                <p style={{fontSize:'1.5rem',color:(themes[themeIndex]==="light")?'#1b1b1b':'#dbe9f3',fontFamily:'poppins',borderRadius:'20px',margin:'auto'}}>{fontSize}</p>
                <div className="plus" onClick={()=>{if(fontSize<99)setFontSize(fontSize+1)}} style={{minHeight:'1.5rem',width:'25%',height:'5vh',borderRadius:'20px',margin:'auto',backgroundColor:(themes[themeIndex]==="light")?'':'rgb(56,56,56)'}} ></div>
                </div>
                </div>
                </div>
                
                <div>
                <div style={{width:'70%',display:'flex',alignItems:'center',margin:'auto',minHeight:'4rem'}}>
                <div className="left" onClick={()=>{ if(themeIndex>0){setThemeIndex(themeIndex-1)}}} style={{minHeight:'1.5rem',width:'25%',height:'5vh',borderRadius:'20px',margin:'auto',backgroundColor:(themes[themeIndex]==="light")?'':'rgb(56,56,56)'}}></div>
                <div className="theme" style={{width:'33%',height:'7vh',minHeight:'3rem',borderRadius:'20px',margin:'auto'}}></div>
                <div className="right" onClick={()=>{ if(themeIndex<1){setThemeIndex(themeIndex+1)}}} style={{minHeight:'1.5rem',width:'25%',height:'5vh',borderRadius:'20px',margin:'auto',backgroundColor:(themes[themeIndex]==="light")?'':'rgb(56,56,56)'}} ></div>
                </div>
                <div style={{textAlign:'center',fontSize:'1.1rem',letterSpacing:'1.2px',color:(themes[themeIndex]==="light")?'#1b1b1b':'#dbe9f3',fontFamily:'poppins'}}>{themes[themeIndex]}</div>
                </div>  
                <div>
                <div style={{width:'70%',display:'flex',alignItems:'center',margin:'auto',minHeight:'4rem'}}>
                <div className="left" onClick={()=>{ if(FontFamilyIndex>0)setFontFamilyIndex(FontFamilyIndex-1)}} style={{minHeight:'1.5rem',width:'25%',height:'5vh',borderRadius:'20px',margin:'auto',backgroundColor:(themes[themeIndex]==="light")?'':'rgb(56,56,56)'}}></div>
                <p style={{fontSize:'1.5rem',fontFamily:'poppins',borderRadius:'20px',color:(themes[themeIndex]==="light")?'#1b1b1b':'#dbe9f3',margin:'auto'}}>Tt</p>
                <div className="right" onClick={()=>{if(FontFamilyIndex<6)setFontFamilyIndex(FontFamilyIndex+1)}} style={{minHeight:'1.5rem',width:'25%',height:'5vh',borderRadius:'20px',margin:'auto',backgroundColor:(themes[themeIndex]==="light")?'':'rgb(56,56,56)'}} ></div>
                </div>
                <div style={{textAlign:'center',fontSize:'1rem',fontFamily:'poppins',color:(themes[themeIndex]==="light")?'#1b1b1b':'#dbe9f3',letterSpacing:'1.2px'}}>{fonts[FontFamilyIndex]}</div>
                </div>
                 
                </div>
              </div>
            </div>
            <div style={{width:'100%',height:'100vh',backgroundColor:(themes[themeIndex]==="light")?'snow':'rgb(42,42,42)',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',height:'4%',width:'100%',backgroundColor:(themes[themeIndex]==="light")?'rgb(248, 252, 255)':'#2a2a2a',justifyContent:'space-evenly'}}><p style={{margin:'0rem',padding:'0rem',fontFamily:'poppins',fontSize:'1rem',paddingBottom:'0rem',color:(themes[themeIndex]==="light")?'#1b1b1b':'gray'}}>save file : s $filename</p><p style={{margin:'0rem',padding:'0rem',fontFamily:'poppins',fontSize:'1rem',paddingBottom:'0rem',color:(themes[themeIndex]==="light")?'#1b1b1b':'gray'}}>upload file : u</p><p style={{margin:'0rem',padding:'0rem',fontFamily:'poppins',fontSize:'1rem',paddingBottom:'0rem',color:(themes[themeIndex]==="light")?'#1b1b1b':'gray'}}>set fontsize : fs $number</p><p style={{margin:'0rem',padding:'0rem',fontFamily:'poppins',fontSize:'1rem',paddingBottom:'0rem',color:(themes[themeIndex]==="light")?'#1b1b1b':'gray'}}>set fontfamily : ff 0-6</p><p style={{margin:'0rem',padding:'0rem',fontFamily:'poppins',fontSize:'1rem',paddingBottom:'0rem',color:(themes[themeIndex]==="light")?'#1b1b1b':'gray'}}>change theme : t 0-1</p></div> 
                <div style={{width:'100%',height:'92%',display:'flex'}}>
               
                <div className="indexText" style={{width:fontSize+fontSize*0.6,color:(themes[themeIndex]==="light")?'#1b1b1b':'snow',backgroundColor:(themes[themeIndex]==="light")?'rgb(248, 252, 255)':'rgb(42,42,42)',height:'auto',fontFamily:fonts[FontFamilyIndex],resize:'none',border:'none',overflowY:'auto'}} ref={divRef} onScroll={handleDivScroll}>
                  {numberArray.map((key,index)=>(<p key={index} style={{margin:'0rem',padding:'0rem',fontSize:fontSize,textAlign:'center',fontFamily:fonts[FontFamilyIndex]}}>{key}</p>))}
                </div>
                <textarea value={text} onKeyDown={handleKeyDown} onChange={handleTextChange} style={{letterSpacing:'1.2px',width:'96%',height:'100%',resize:'none',padding:'0rem',margin:'0rem',border:'none',overflowX:'scroll',whiteSpace: 'nowrap',fontFamily:fonts[FontFamilyIndex],fontSize:fontSize,paddingLeft:fontSize*0.4 ,color:(themes[themeIndex]==="light")?'#1b1b1b':'snow',backgroundColor:(themes[themeIndex]==="light")?'rgb(248, 252, 255)':'rgb(42,42,42)',paddingBottom:'0rem'}} ref={textareaRef} onScroll={handleTextareaScroll}></textarea> 
                </div>
                <input placeholder="Run Command Here (Press Esc to Enter)" id="cmd" style={{width:'100%',fontFamily:'poppins',fontSize:'1rem',border:'none',height:'4%',backgroundColor:(themes[themeIndex]==="light")?'#ECF7FF':'#202020',paddingBottom:'0rem',color:(themes[themeIndex]==="light")?'#1b1b1b':'snow'}}></input>
                  
            </div>   
        </div>
            
    </>
  )
}

export default App
