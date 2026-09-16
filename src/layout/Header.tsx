import { Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { useAuthStore } from '../store/authStore';
import GooeyNav from '@/components/GooeyNav';
import { isPortfolioMode } from '../config/runtime';

export default function Header() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  const navLinks = [
    { name: '서비스 소개', path: '/about' },
    { name: '이론 학습', path: '/learning' },
    { name: '실전 문제', path: '/challenge' },
    { name: '커뮤니티', path: '/community' },
    { name: '랭킹', path: '/ranking' },
  ].filter((link) =>
    isPortfolioMode
      ? link.path === '/about' || link.path === '/learning'
      : true
  );

  const handleLogout = async () => {
    await logout();
  };

  const gooeyNavItems = navLinks.map((link) => ({
    label: link.name,
    href: link.path,
  }));

  const currentPathIndex = navLinks.findIndex((link) =>
    location.pathname.startsWith(link.path)
  );

  return (
    <header className="bg-[#21213f]">
      <nav className="container mx-auto py-2 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="Hack 'n' Learn" className="h-6" />
        </Link>

        <div className="hidden md:flex items-center justify-center flex-1">
          <GooeyNav
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            animationTime={600}
            timeVariance={300}
            colors={['#B19EEF', '#ffffff', '#B19EEF', '#ffffff']}
            items={gooeyNavItems}
            initialActiveIndex={currentPathIndex}
          />
        </div>

        <div className="flex items-center space-x-4 text-primary-text">
          {isPortfolioMode ? (
            <span className="rounded-full border border-accent-primary1/60 bg-accent-primary1/10 px-3 py-1 text-xs font-semibold tracking-wider text-accent-primary1">
              PORTFOLIO · READ ONLY
            </span>
          ) : isAuthenticated ? (
            <>
              <Bell />

              <Link to="/mypage" className="flex items-center space-x-1">
                <User />
                <span>{user?.nickname}님</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-secondary-text hover:text-white transition-colors border rounded-[5px] px-1 py-0.5"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="text-sm text-secondary-text hover:text-white transition-colors border rounded-[5px] px-2 py-1">
                  로그인
                </button>
              </Link>
              <Link to="/signup">
                <button className="text-sm text-white bg-accent-primary1 hover:bg-accent-primary2 transition-colors border rounded-[5px] px-2 py-1">
                  회원가입
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
