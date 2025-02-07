// pages/login.tsx
"use client"
import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from "next/navigation";
import { Button } from '@heroui/button';
import { Input } from '@heroui/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    } else {
      router.push('/admin');
    }
  };

  return (
    
      <div className='flex justify-center mt-40'>
    <form onSubmit={handleLogin} className="flex flex-col items-center gap-4 w-[400] ">
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='flex justify-center items-center'
        required
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" color='success'>Login</Button>
    </form>
    </div>
  );
}
