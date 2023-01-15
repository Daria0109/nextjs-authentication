import AuthForm from '../components/auth/auth-form';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const redirect = async () => await router.replace('/');
    getSession().then(session => {
      if (session) {
        redirect();
      } else {
        setIsLoading(false);
      }
    })
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>
  }
  return <AuthForm />;
}

export default AuthPage;
