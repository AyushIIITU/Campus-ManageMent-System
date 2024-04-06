import styles from "./ComplainPost.module.css"
import Upvote from "../../Upvote"

function ComplainPost() {


  return (
    <>
       <div className={styles.card}>
        
  
        <span className={styles.card__span}>22118</span>
 
        <div className={styles['card-int']}>
          <p className={styles['card-int__title']}>Electricity</p>
          <p className={styles.excerpt}>Wifi is not working in 3rd floor</p>
   <div className={styles.AlingPostFooter}>
   <Upvote/><span className={`badge ${styles.AlingPostFooterDate} text-bg-dark`} >1D</span>
    </div> 
    
  </div>
  </div>
       
    </>
  )
}

export default ComplainPost
