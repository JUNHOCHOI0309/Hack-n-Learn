import HeroSection from '../components/HeroSection';
import HeroImg from '../assets/images/실전문제.jpg'; // Assuming an image for practical problems
import ProblemProgressDisplay from '../components/Challenge/ProblemProgressDisplay';

const ChallengePage: React.FC = () => {
  return (
    <>
      <HeroSection
        title="실전 문제"
        imageUrl={HeroImg}
        subtitle="가상 세계의 방어선을 뚫고 목표를 쟁취하세요. 모든 공격과 방어의 흔적이 당신의 경험이 됩니다."
      />
      <div className="min-h-screen py-12 px-10">
        <div className="max-w-[1440px] mx-auto">
          <section className="mb-12">
            <ProblemProgressDisplay />
          </section>
        </div>
      </div>
    </>
  );
};

export default ChallengePage;
