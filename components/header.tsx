import Link from 'next/link'

import { signIn, signOut, useSession } from 'components/client'
import styles from './header.module.css'

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header () {
  const [session, loading] = useSession()

  return (
    <header>
            <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href='/api/auth/signin'
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href='/api/auth/signout'
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/" legacyBehavior>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about" legacyBehavior>
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/advanced/api-profile" legacyBehavior>
              <a>API rendered profile (advanced)</a>
            </Link>
          </li>
          <li>
            <Link href="/advanced/api-profile" legacyBehavior>
              <a>API rendered profile (advanced)</a>
            </Link>
          </li>
          <li>
            <Link href="/advanced/api-profile" legacyBehavior>
              <a>API rendered profile (advanced)</a>
            </Link>
          </li>
          <li>
            <Link href="/advanced/api-profile" legacyBehavior>
              <a>API rendered profile (advanced)</a>
            </Link>
          </li>
          {!loading &&
            (user ? (
              <>
                <li>
                  <Link href="/profile" legacyBehavior>
                    <a>Client rendered profile</a>
                  </Link>
                </li>
                <li>
                  <Link href="/advanced/ssr-profile" legacyBehavior>
                    <a>Server rendered profile (advanced)</a>
                  </Link>
                </li>
                <li>
                  <a href="/api/auth/logout">Logout</a>
                </li>
              </>
            ) : (
              <li>
                <a href="/api/auth/login">Login</a>
              </li>
            ))}
        </ul>
      </nav>
      <nav>
        <ul className={styles.navItems}>
          <li className={styles.navItem}>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/client'>
              <a>Client</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/server'>
              <a>Server</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/protected'>
              <a>Protected</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/protected-ssr'>
              <a>Protected(SSR)</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/api-example'>
              <a>API</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/credentials'>
              <a>Credentials</a>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href='/email'>
              <a>Email</a>
            </Link>
          </li>
        </ul>
      </nav>
      <style jsx>{`
        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #333;
        }
        nav {
          max-width: 42rem;
          margin: 1.5rem auto;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
          padding-right: 2rem;
        }
        li:nth-child(3) {
          margin-right: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        button {
          font-size: 1rem;
          color: #fff;
          cursor: pointer;
          border: none;
          background: none;
        }
      `}</style>
    </header>
  )
}

export default Header
