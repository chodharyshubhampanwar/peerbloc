'use client';

import { useState } from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateUser } from '@/data/createUser';
import { registerSchema, RegisterInput } from '@/helper/formSchema';
import styles from '@/styles/Register.module.css';

const RegisterForm = () => {
  const [message, setMessage] = useState<string>('');
  const createUserMutation = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    const { email, password } = data;

    try {
      const response = await createUserMutation.mutateAsync({ email, password });
      setMessage(response.message);
    } catch (error) {
      setMessage('An error occurred while registering');
      console.error('Error registering:', error);
    }

    reset();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Register</h1>
      <p className={styles.subtitle}>Join our community today!</p>
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
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className={styles.input}
          />
          {errors.confirmPassword && (
            <span className={styles.errorMessage}>{errors.confirmPassword.message}</span>
          )}
        </div>
        <button type="submit" className={styles.button}>
          Agree & Register
        </button>
          <div className={styles.signUpContainer}>
          <p className={styles.signUpText}>Already on Peerbloc?</p>
          <Link href="/login" className={styles.signUpLink}>
            Sign In
          </Link>
        </div>
      </form>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.infoContainer}>
      </div>
    </div>
  );
};

export default RegisterForm;