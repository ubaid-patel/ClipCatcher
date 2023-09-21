import styles from '../Styles/footer.module.css'
export default function Footer(){
    return(
        <div className={styles.footer}>
          <h3>Api</h3>
          <h3>About us</h3>
          <h3>Terms of use</h3>
          <h3>Privacy policy</h3>
          <h3>Report bugs</h3>
        </div>
    )
}