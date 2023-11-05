import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../data/api/firebase';
import { login } from '../data/auth/login';
import { loginAnonymous } from '../data/auth/loginAnonymous';
import { signout } from '../data/auth/signout';
import { signup } from '../data/auth/signup';
import { signupAnonymous } from '../data/auth/signupAnonymous';
import { useAuthStore } from '../stores/useAuthStore';
import { FirestoreError } from 'firebase/firestore';
import { useContext } from 'react';
import Localization from '@/xSetup/context/locales';

export default function executeAuth() {
  const { setAuthCheck, setIsAnonymous, setRefresh } = useAuthStore();
  const l = useContext(Localization)

  const executeSignup = async (email: string, password: string): Promise<void> => {
    try {
      await signup(email, password);
      router.replace('/(main)/Home');
      setRefresh(true);
      setIsAnonymous(false);
      setAuthCheck(true);
    } catch (error: any) {
       switch (error.code) {
         case 'auth/email-already-in-use':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'email-already-in-use' });
           throw l.error_email_in_use;
         case 'auth/wrong-password':
           //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'auth/wrong-password' });
           throw l.error_password_wrong;
         case 'auth/too-many-requests':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'too-many-requests' });
           throw l.error_account_locked;
         case 'auth/invalid-email':
           //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'invalid-email' });
           throw l.error_email_invalid;
         case 'auth/weak-password':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'weak-password' });
           throw l.error_password_too_weak;
         default:
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'error' });
           throw l.error_occurred;
       }
    }
  };

  const executeSignupAnonymous = async (): Promise<void> => {
    try {
      await signupAnonymous();
      router.replace('/(main)/Home');
      setRefresh(true);
      setIsAnonymous(true);
      setAuthCheck(true);
    } catch (error: any) {
       switch (error.code) {
         case 'auth/email-already-in-use':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'email-already-in-use' });
           throw l.error_email_in_use;
         case 'auth/wrong-password':
           //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'auth/wrong-password' });
           throw l.error_password_wrong;
         case 'auth/too-many-requests':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'too-many-requests' });
           throw l.error_account_locked;
         case 'auth/invalid-email':
           //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'invalid-email' });
           throw l.error_email_invalid;
         case 'auth/weak-password':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'weak-password' });
           throw l.error_password_too_weak;
         default:
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'error' });
           throw l.error_occurred;
       }
    }
  };

  const executeLogin = async (email: string, password: string): Promise<void> => {
    try {
      await login(email, password);
      router.replace('/(main)/Home');
      setRefresh(true);
      setIsAnonymous(false);
      setAuthCheck(true);
    } catch (error: any) {
       switch (error.code) {
         case 'auth/email-already-in-use':
          //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'email-already-in-use' });
           throw (l.error_email_in_use);
         case 'auth/wrong-password':
          //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'auth/wrong-password' });
           throw (l.error_password_wrong);
         case 'auth/too-many-requests':
          //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'too-many-requests' });
           throw (l.error_account_locked);
         case 'auth/invalid-email':
          //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'invalid-email' });
           throw (l.error_email_invalid);
         case 'auth/weak-password':
          //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'weak-password' });
           throw (l.error_password_too_weak);
         default:
          //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'error' });
           throw (l.error_occurred);
       }
    }
  };

  const executeLoginAnonymous = async (email: string, password: string): Promise<void> => {
    try {
      await loginAnonymous(email, password);
      router.replace('/(main)/Home');
      setRefresh(true);
      setIsAnonymous(false);
      setAuthCheck(true);
    } catch (error: any) {
      setAuthCheck(null);
       switch (error.code) {
         case 'auth/email-already-in-use':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'email-already-in-use' });
           throw l.error_email_in_use;
         case 'auth/wrong-password':
           //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'auth/wrong-password' });
           throw l.error_password_wrong;
         case 'auth/too-many-requests':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'too-many-requests' });
           throw l.error_account_locked;
         case 'auth/invalid-email':
           //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'invalid-email' });
           throw l.error_email_invalid;
         case 'auth/weak-password':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'weak-password' });
           throw l.error_password_too_weak;
         default:
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'error' });
           throw l.error_occurred;
       }
    }
  };

  const executeLogout = async (): Promise<void> => {
    try {
      await signout();
      router.replace('/Welcome');
      setRefresh(true);
      setIsAnonymous(null);
      setAuthCheck(null);
    } catch (error: any) {
       switch (error.code) {
         case 'auth/email-already-in-use':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'email-already-in-use' });
           throw l.error_email_in_use;
         case 'auth/wrong-password':
           //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'auth/wrong-password' });
           throw l.error_password_wrong;
         case 'auth/too-many-requests':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'too-many-requests' });
           throw l.error_account_locked;
         case 'auth/invalid-email':
           //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'invalid-email' });
           throw l.error_email_invalid;
         case 'auth/weak-password':
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'weak-password' });
           throw l.error_password_too_weak;
         default:
           //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'error' });
           throw l.error_occurred;
       }
    }
  };

  const executeResetPassword = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      router.push('/Login');
    } catch (error: any) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'email-already-in-use' });
            throw l.error_email_in_use;
          case 'auth/wrong-password':
            //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'auth/wrong-password' });
            throw l.error_password_wrong;
          case 'auth/too-many-requests':
            //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'too-many-requests' });
            throw l.error_account_locked;
          case 'auth/invalid-email':
            //  vexoit('AUTH', { method: 'login', status: 'failed', event: 'invalid-email' });
            throw l.error_email_invalid;
          case 'auth/weak-password':
            //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'weak-password' });
            throw l.error_password_too_weak;
          default:
            //  vexoit('AUTH', { method: 'signup', status: 'failed', event: 'error' });
            throw l.error_occurred;
        }
    }
  };

  // Add other authentication-related functions here

  return {
    executeSignup,
    executeLogin,
    executeSignupAnonymous,
    executeLoginAnonymous,
    executeLogout,
    executeResetPassword,
  };
}
