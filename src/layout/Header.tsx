import { Bell, User } from 'lucide-react';
import logo from '../assets/images/logo.png';

export default function Header() {
  return (
    <header className="bg-[#21213f] ">
      <nav className="container mx-auto py-4 flex justify-between items-center">
        <a href="/">
          <img src={logo} alt="Hack 'n' Learn" className="h-6" />
        </a>

        <div className="hidden md:flex items-center space-x-12 text-primary-text">
          <a href="#" className="hover:text-accent-primary1 transition-colors">
            서비스 소개
          </a>
          <a href="#" className="text-accent-primary1 font-bold">
            이론 학습
          </a>
          <a href="#" className="hover:text-accent-primary1 transition-colors">
            실전 문제
          </a>
          <a href="#" className="hover:text-accent-primary1 transition-colors">
            커뮤니티
          </a>
          <a href="#" className="hover:text-accent-primary1 transition-colors">
            랭킹
          </a>
        </div>
        <div className="flex items-center space-x-4 text-primary-text">
          <Bell />
          <span className="flex">
            <User />
            이준수님
          </span>
          <a
            href="#"
            className="text-sm text-secondary-text hover:text-white transition-colors border rounded-[5px] px-1 py-0.5"
          >
            로그아웃
          </a>
        </div>
      </nav>
    </header>
  );
}
