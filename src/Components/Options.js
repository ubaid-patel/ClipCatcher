import styles from '../Styles/options.module.css'
import { download } from './Config';
import React from 'react';
export default function Options({data,setMessage }) {
    return (
        <React.Fragment>
           { (data) ?
            <div className={styles.options}>
                <div className={styles.preview}>
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
                                    <div className={styles.btnldr}>
                                        <button onClick={() => {
                                            document.getElementById(option.itag).classList.remove(styles.remove)
                                            download(data.id, option.itag).then(
                                                () => {
                                                    document.getElementById(option.itag).classList.add(styles.remove)
                                                    setMessage({ visible: true, content: "File downloaded", type: "success" })
                                                }
                                            )

                                        }}>
                                            Download
                                        </button>
                                        <div className={`${styles.loader} ${styles.remove}`} id={option.itag}></div>
                                    </div>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </table>
            </div> : null}
        </React.Fragment>
    )
}