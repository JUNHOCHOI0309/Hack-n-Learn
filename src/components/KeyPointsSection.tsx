
export default function KeyPointsSection() {
  return (
    <div className="left-[60px] top-[3837px] absolute justify-start">
      <p className="text-neutral-200 text-3xl font-bold font-['Noto_Sans_KR']">핵심 포인트</p>
      <p className="text-neutral-200 text-base font-normal font-['Cascadia_Code']">   <code>{'comments.append({\'name\': name, \'comment\': comment})'}</code></p>
      <p className="text-neutral-200 text-base font-normal font-['Noto_Sans_KR']">
        <span className="text-pink-400 text-base font-normal font-['Cascadia_Code']">comments</span>에
        <span className="text-pink-400 text-base font-normal font-['Cascadia_Code']">name</span>과
        <span className="text-pink-400 text-base font-normal font-['Cascadia_Code']">comment</span>가 검증없이 공격자가 작성한 그대로 들어갑니다.
      </p>
      <p className="text-neutral-200 text-base font-normal font-['Cascadia_Code']">   <code>{'<li><strong>{{ c.name }}</strong>: {{ c.comment|safe }}</li>'}</code></p>
      <p className="text-neutral-200 text-base font-normal font-['Noto_Sans_KR']">
        기존 Jinja 템플릿에서는 사용자 입력을 자동으로 escape하지만,
        <span className="text-pink-400 text-base font-normal font-['Cascadia_Code']">|safe</span> 옵션으로 인해 사용자의 입력을 그대로 HTML로 넣게 됩니다.
        즉, 서버에 저장된 <span className="text-pink-400 text-base font-normal font-['Cascadia_Code']">c.comment</span>가 출력될 때 HTML 엔티티로 변환되지 않고 그대로 렌더링되어 XSS 취약점이 발생합니다.
      </p>
    </div>
  );
}
