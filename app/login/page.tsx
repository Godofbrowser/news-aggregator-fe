"use client";

import Link from 'next/link';
import { AuthForm } from '@/components/auth/AuthForm';
import { ensureAuth } from '@/containers/ensureAuth';


export default ensureAuth(false, function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Login to NewsHub</h1>
        <AuthForm type="login" />
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
})