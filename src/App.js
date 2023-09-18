import { useEffect, useRef, useState } from 'react';
import './App.css';
import getInfo from './GetInfo';
import download from './Download';
import Message from './Message';
import logo from './logo.png'

function isValidURL(url) {
  try {
      const urlObject = new URL(url);
      return urlObject.protocol === "http:" || urlObject.protocol === "https:";
  } catch (error) {
      return false;
  }
}

function App() {
  const linkRef = useRef(null);
  const loaderRef = useRef(null)
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(()=>{
    const valid = isValidURL(url)
    if(url !== null && valid){
      loaderRef.current.classList.remove("remove")
      getInfo(url).then(
        (response)=>{setData(response)
        loaderRef.current.classList.add("remove")})
    }
  },[url])




  function pasteUrl(event){
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const valid = isValidURL(pastedText)
    if(valid){
      setUrl(pastedText)
    }else{
      event.preventDefault();
      setMessage({visible:true,content:"Invalid url",type:"error"})
    }
  }
  function changeUrl(event){
    if(event.target.value){
      setUrl(event.target.value)
    }else{
      setMessage({visible:true,content:"Invalid url",type:"error"})
    }
  }

  function handleFind() {
    const valid = isValidURL(url)
        if(valid){
          getInfo(url)
        }else{
          setMessage({visible:true,content:"Invalid url",type:"error"})
        }
  }
  const [message,setMessage] = useState({visible:false,content:"This is test",type:"success"})
  return (
    <div className="App">
      <div className='main'>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className='message'>
          <Message message={message} setMessage={setMessage}/>
        </div>
        <div className='form'>
          <h3> No ads & no redirects!</h3>
          <input type='text' ref={linkRef} placeholder='Paste link here' onPaste={pasteUrl} onChange={changeUrl} /><br />
          <div className='btn-ldr'>
            <button onClick={handleFind}>Find</button>
            <div className='loader remove' ref={loaderRef}></div>
          </div>
        </div>
        {
          (data) ?
            <div className='options'>
              <div className='preview'>
                <img src={data.thumbnail}></img>
                <p>{data.title}</p>
              </div>
              <table>
                <thead>
                  <tr><th>Type</th><th>Quality</th><th>Size</th><th>Download</th></tr>
                </thead>
                <tbody>
                  {data.options.map((option) =>
                    <tr>
                      <td>{option.type}</td>
                      <td>{option.quality}</td>
                      <td>{option.size} mb</td>
                      <td>
                        <div className='btn-ldr'>
                          <button onClick={() => { 
                            document.getElementById(option.itag).classList.remove("remove")
                            download(data.id,option.itag).then(
                              ()=>{
                                document.getElementById(option.itag).classList.add("remove")
                                setMessage({visible:true,content:"File downloaded",type:"success"})
                              }
                            ) 
                          
                          }}>
                            Download
                          </button>
                          <div className='loader remove' id={option.itag}></div>
                        </div>
                      </td>
                    </tr>
                  )
                  }
                </tbody>
              </table>
            </div> : null
        }

      </div>
      <footer>
        <div className='footer'>
          <h3>Api</h3>
          <h3>About us</h3>
          <h3>Terms of use</h3>
          <h3>Privacy policy</h3>
          <h3>Report bugs</h3>
        </div>
      </footer>
    </div>
  )
}
export default App;
