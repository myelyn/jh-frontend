'use client'
import { useState } from 'react';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const [username, setUsername] = useState('管理员');
  const [password, setPassword] = useState('123456');
  const { login, loading } = useAuth();

  const handleLogin = () => {
    login({ username, password });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1>侠客留名</h1>
      <Input 
        placeholder="请输入用户名" 
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input 
        placeholder="请输入密码" 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button 
        onClick={handleLogin} 
        variant="primary"
        disabled={loading}
      >
        {loading ? '登录中...' : '登录'}
      </Button>
    </div>
  );
}
