import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      fontFamily: 'Microsoft YaHei, 微软雅黑, sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
        试炼聊天室
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '3rem', textAlign: 'center', opacity: 0.8 }}>
        欢迎来到即梦AI聊天室
      </p>
      <Link 
        href="/chatroom"
        style={{
          padding: '15px 30px',
          background: 'linear-gradient(45deg, #f39c12, #e67e22)',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '25px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 15px rgba(243, 156, 18, 0.3)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(243, 156, 18, 0.4)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(243, 156, 18, 0.3)';
        }}
      >
        进入聊天室
      </Link>
    </div>
  );
}
