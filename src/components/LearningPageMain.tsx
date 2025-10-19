import React from 'react';
import { Search } from 'lucide-react';
import Input from './Input'; // Assuming Input component is in the same folder
import Header from '../layout/Header';

interface CourseCardProps {
  title: string;
  description: string;
  difficulty: '쉬워요' | '보통' | '어려워요';
  isCompleted?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  difficulty,
  isCompleted,
}) => {
  const difficultyColors = {
    쉬워요: 'text-green-400',
    보통: 'text-yellow-400',
    어려워요: 'text-red-400',
  };

  return (
    <div
      className={`bg-card-background p-6 rounded-lg border-2 ${
        isCompleted ? 'border-accent-primary1' : 'border-edge'
      }`}
    >
      <h3 className="text-2xl font-bold text-primary-text mb-2">
        {title} {isCompleted && '[V]'}
      </h3>
      <p className="text-secondary-text mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className={`${difficultyColors[difficulty]} font-bold`}>
          {difficulty}
        </span>
        <button className="text-accent-primary1 font-bold hover:underline">
          학습하기 →
        </button>
      </div>
    </div>
  );
};

export default function LearningPage() {
  const courses = [
    {
      title: 'XSS (Cross-Site Scripting)',
      description:
        '사용자의 입력을 필터링하지 않고 그대로 출력할 때, 악성 스크립트를 삽입해 실행시키는 취약점.',
      difficulty: '쉬워요',
      isCompleted: true,
    },
    {
      title: 'Open Redirect (오픈 리다이렉션)',
      description:
        '정상 사이트의 URL을 이용해 공격자가 원하는 악성 사이트로 리다이렉트시키는 취약점.',
      difficulty: '쉬워요',
    },
    {
      title: 'SQL Injection (SQLi)',
      description:
        '입력값이 SQL 쿼리에 그대로 삽입되어, 공격자가 데이터베이스를 조작할 수 있는 취약점.',
      difficulty: '보통',
    },
    {
      title: 'CSRF (Cross-Site Request Forgery)',
      description:
        '사용자가 로그인된 상태에서, 공격자가 의도한 요청을 강제로 보내게 하는 공격.',
      difficulty: '보통',
    },
    {
      title: 'Directory Traversal (경로 조작)',
      description:
        '입력값으로 ../ 등을 사용해 원래 의도된 범위를 벗어난 파일에 접근하는 취약점.',
      difficulty: '어려워요',
    },
    {
      title: 'Command Injection (명령어 삽입)',
      description:
        '입력값이 서버의 시스템 명령어에 포함되어 임의의 명령 실행이 가능한 취약점.',
      difficulty: '어려워요',
    },
  ];

  return (
    <div className=" min-h-screen text-primary-text">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">이론학습</h1>
        <p className="text-lg text-secondary-text">
          실습에 앞서, 해킹과 보안의 핵심 이론을 마스터하세요. 아는 만큼 보이고,
          보이는 만큼 공격하고 방어할 수 있습니다.
        </p>
      </section>

      {/* Search Bar */}
      <section className="container mx-auto px-6 mb-12">
        <div className="max-w-3xl mx-auto">
          <Input placeholder="원하시는 강의가 있나요?" />
        </div>
      </section>

      {/* Courses Grid */}
      <main className="container mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
        </div>
      </main>

      {/* Footer or other sections can go here */}
    </div>
  );
}
