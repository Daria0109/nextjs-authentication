import { useContext, useState } from 'react';
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import {
  NotificationContext,
  Status
} from '../../providers/notification-provider/notification-provider';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();

  if(!response.ok) {
    throw new Error(data.message || 'Something went wrong...')
  } else {
    return data;
  }
}

function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { toggleNotification } = useContext(NotificationContext);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    toggleNotification({
      status: Status.PENDING,
      title: 'Sending...',
      message: 'Your request is on its way!'
    });

    if (isLogin) {

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password
      });
      if (!result.error) {
        toggleNotification({
          status: Status.SUCCESS,
          title: 'Success!',
          message: 'You are logged in successfully!'
        });
        await router.replace('/profile');
      } else {
        toggleNotification({
          status: Status.ERROR,
          title: 'Error!',
          message: result.error?.toString() || 'Something went wrong...'
        });
      }

    } else {

      try {
        const result = await createUser(email, password);
        toggleNotification({
          status: Status.SUCCESS,
          title: 'Success!',
          message: 'Your account is created successfully!'
        });
        setIsLogin(true);
      } catch (err) {
        toggleNotification({
          status: Status.ERROR,
          title: 'Error!',
          message: err?.toString() || 'Something went wrong...'
        });
      }

    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' value={email} onChange={handleEmailChange} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' value={password} onChange={handlePasswordChange} required />
        </div>
        <div className={classes.actions}>
          <button type="submit ">{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
