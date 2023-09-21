import styles from '../Styles/banners.module.css'
export default function Banners(){
    return(
        <div className={styles.main}>
            <div className={styles.card}>
            <h3>Fed Up with Annoying Ads?</h3>
            <p>
            Are intrusive ads disrupting your viewing experience on YouTube? 
            Make the switch to Clip Catcher for an ad-free paradise. Say goodbye to interruptions 
            and immerse yourself in pure, distraction-free entertainment
            </p>
            </div>
            <div className={styles.card}>
            <h3>Tired of Complicated Downloads?</h3>
            <p>
            Sick of convoluted methods for saving your favorite YouTube videos? 
            Say goodbye to the hassle with Clip Catcher. Our user-friendly app simplifies video downloads, 
            making it easy for you to store your cherished content offline. Enjoy your videos without the headache!
            </p>
            </div>
            <div className={styles.card}>
            <h3>Downloads Without the Price Tag</h3>
            <p>
            Worried about the cost of downloading your favorite content? Relax with Clip Catcher. We offer unlimited downloads completely free of charge. There are no hidden fees, no premium subscriptions—just endless opportunities to download and enjoy what you love. Clip Catcher, where downloads come without the price tag.
            </p>
            </div>
        </div>
    )
}