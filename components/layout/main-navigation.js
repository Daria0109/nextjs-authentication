import Link from 'next/link';
import classes from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/client';

function MainNavigation() {
  const [session, loading] = useSession();

  async function handleLogout() {
      await signOut();
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
              <li>
                <Link href='/auth'>Login</Link>
              </li>
          )}
          {session && (
              <>
                <li>
                  <Link href='/profile'>Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
