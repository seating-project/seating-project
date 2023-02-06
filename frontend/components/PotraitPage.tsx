import styles from '../styles/PotraitPage.module.css'

type Props = {
  children: React.ReactNode
}

const Page = ({ children }: Props) => (
  <div className={styles.page}>
      {children}
  </div>
)

export default Page