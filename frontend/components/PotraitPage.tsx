import styles from '../styles/PotraitPage.module.css'
import Image from 'next/image'

type Props = {
  children: React.ReactNode
}

const Page = ({ children }: Props) => (
  <div className={styles.page}>
      {children}
  </div>
)

export default Page