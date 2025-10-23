import logo from '../assets/images/logo.png';

export default function LearningPageHeader() {
  return (
    <div className="w-[1440px] h-24 left-0 top-0 absolute bg-slate-800">
      <div className="left-[292px] top-[30px] absolute justify-start text-neutral-200 text-2xl font-medium font-['Noto_Sans_KR']">서비스 소개</div>
      <div className="left-[461px] top-[30px] absolute justify-start text-neutral-200 text-2xl font-medium font-['Noto_Sans_KR']">이론 학습</div>
      <div className="left-[612px] top-[30px] absolute justify-start text-neutral-200 text-2xl font-medium font-['Noto_Sans_KR']">실전 문제</div>
      <div className="left-[763px] top-[30px] absolute justify-start text-neutral-200 text-2xl font-medium font-['Noto_Sans_KR']">보안 뉴스</div>
      <div className="left-[1305px] top-[30px] absolute justify-start text-neutral-200 text-2xl font-medium font-['Noto_Sans_KR']">로그아웃</div>
      <div className="w-6 h-6 left-[1114px] top-[32px] absolute overflow-hidden">
        <div className="w-4 h-5 left-[3px] top-[2px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-200" />
      </div>
      <div className="w-6 h-6 left-[1162px] top-[32px] absolute overflow-hidden">
        <div className="w-3.5 h-4 left-[5px] top-[3px] absolute outline outline-2 outline-offset-[-1px] outline-neutral-200" />
      </div>
      <div className="w-24 h-9 left-[1299px] top-[25px] absolute rounded-[5px] border-2 border-neutral-200" />
      <div className="left-[1192px] top-[30px] absolute justify-start text-neutral-200 text-2xl font-medium font-['Noto_Sans_KR']">이준수님</div>
      <img className="w-48 h-8 left-[39px] top-[28px] absolute" src={logo} alt="Logo" />
    </div>
  );
}
