'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useLoginUser } from '@/data/loginUser';
import { loginSchema, LoginInput } from '@/helper/formSchema';
import styles from '@/styles/Login.module.css';

const LoginForm = () => {
  const [message, setMessage] = useState<string>('');
  const loginUserMutation = useLoginUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    const { email, password } = data;

    try {
      const response = await loginUserMutation.mutateAsync({ email, password });
      setMessage(response.message);
      router.push('/home');
    } catch (error) {
      setMessage('An error occurred while logging in');
      console.error('Error logging in:', error);
    }

    reset();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <p className={styles.subtitle}>Welcome back! Sign in to continue.</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={styles.input}
          />
          {errors.email && (
            <span className={styles.errorMessage}>{errors.email.message}</span>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className={styles.input}
          />
          {errors.password && (
            <span className={styles.errorMessage}>{errors.password.message}</span>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <div className={styles.signUpContainer}>
          <p className={styles.signUpText}>New to Peerbloc?</p>
          <Link href="/register" className={styles.signUpLink}>
            Sign Up
          </Link>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.infoContainer}>
      </div>
    </div>
  );
};

export default LoginForm;