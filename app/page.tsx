import { Login } from '@/components/login';

export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      color: 'white',
      fontFamily: 'Microsoft YaHei, 微软雅黑, sans-serif'
    }}>
      <Login />
    </div>
  );
}
