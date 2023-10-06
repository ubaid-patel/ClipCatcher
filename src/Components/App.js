import { useEffect, useRef, useState } from 'react';
import styles from '../Styles/app.module.css'
import { getInfo} from './Config';
import Message from './Message';
import Footer from './Footer';
import Header from './Header'
import Options from './Options'
import Banners from './Banners';

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
  const [message, setMessage] = useState({ visible: false, content: "", type: "success" })
  useEffect(() => {
    const valid = isValidURL(url)
    if (url !== null && valid) {
      loaderRef.current.classList.remove(styles.remove)
      getInfo(url).then(
        (response) => {
          setData(response)
          loaderRef.current.classList.add(styles.remove)
        })
    }
  }, [url])

  function pasteUrl(event) {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const valid = isValidURL(pastedText)
    if (valid) {
      setUrl(pastedText)
    } else {
      event.preventDefault();
      setMessage({ visible: true, content: "Invalid url", type: "error" })
    }
  }

  function changeUrl(event) {
    if (event.target.value) {
      setUrl(event.target.value)
    } else {
      setMessage({ visible: true, content: "Invalid url", type: "error" })
    }
  }

  function handleFind() {
    const valid = isValidURL(url)
    if (valid) {
      getInfo(url)
    } else {
      setMessage({ visible: true, content: "Invalid url", type: "error" })
    }
  }
  return (
    <div>
      <div className={styles.main}>
        <Header />
        <div className={styles.message}>
          <Message message={message} setMessage={setMessage} />
        </div>
        <div className={styles.form}>
          <input type='text' ref={linkRef} placeholder='Paste youtube link here to downlod' onPaste={pasteUrl} onChange={changeUrl} /><br />
          <div className={styles.btnldr}>
            <button onClick={handleFind}>Find</button>
            <div className={`${styles.loader} ${styles.remove}`} ref={loaderRef}></div>
          </div>
        </div>
        <Options data={data} setMessage={setMessage} />
        <Banners/>
      </div>
      <Footer />
    </div>
  )
}
export default App;