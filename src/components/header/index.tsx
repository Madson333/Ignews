import logo from "../../../public/images/logo.svg"
import Image from "next/image"
import styles from "./styles.module.scss"
import { SignIButton } from "../SignInButton"
import { ActiveLink } from "../ActiveLink"

export function Header() {


  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logo} alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <>Home</>
          </ActiveLink>

          <ActiveLink activeClassName={styles.active} href="/posts">
            <>Posts</>
          </ActiveLink>

        </nav>
        <SignIButton />
      </div>
    </header >
  )
}