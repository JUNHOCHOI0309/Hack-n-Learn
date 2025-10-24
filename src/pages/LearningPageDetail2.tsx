import CodeDisplay from '../components/CodeDisplay';
import WarningMessage from '../components/WarningMessage';

const pythonCode = `
# vuln_xss_with_login.py
# 교육용: 간단한 로그인 기능이 추가된 저장형 XSS 실습 앱 (로컬 전용)
from flask import Flask, request, redirect, render_template_string, session, url_for

app = Flask(__name__)
app.secret_key = "dev-secret-key-change-this"  # 로컬 테스트 전용

# 간단한 유저(실습용)
USERS = {
    'attacker': 'pw1',
    'victim': 'pw2'
}

# 메모리 댓글 저장 (실습용)
comments = []

INDEX_HTML = """
<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Stored XSS w/ Login (Vulnerable)</title></head>
  <body>
    <h1>저장형 XSS 실습 (로그인 포함)</h1>

    {% if user %}
      <p>로그인: <strong>{{ user }}</strong> | <a href="{{ url_for('logout') }}">로그아웃</a></p>

      <!-- 댓글 폼 -->
      <form method="post" action="/comment">
        <label>댓글: <br><textarea name="comment" rows="4" cols="40"></textarea></label><br>
        <button type="submit">등록</button>
      </form>
    {% else %}
      <p>로그인하지 않았습니다. <a href="{{ url_for('login') }}">로그인</a>하세요.</p>
    {% endif %}

    <h2>등록된 댓글</h2>
    <ul>
      {% for c in comments %}
        <!-- 취약 포인트: safe로 출력 -> 스크립트 실행됨 -->
        <li><strong>{{ c.user }}</strong>: {{ c.comment|safe }}</li>
      {% endfor %}
    </ul>

    <p style="color: red;">⚠️ 이 앱은 의도적으로 취약합니다. 로컬에서만 테스트하세요.</p>
  </body>
</html>
"""

LOGIN_HTML = """
<!doctype html>
<html><body>
  <h1>로그인</h1>
  <form method="post">
    <label>아이디: <input name="username"></label><br>
    <label>비밀번호: <input name="password" type="password"></label><br>
    <button type="submit">로그인</button>
  </form>
  <p><a href="{{ url_for('index') }}">돌아가기</a></p>
</body></html>
"""

@app.route('/')
def index():
    user = session.get('user')
    return render_template_string(INDEX_HTML, user=user, comments=comments)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        u = request.form.get('username','')
        p = request.form.get('password','')
        if USERS.get(u) == p:
            session['user'] = u
            return redirect(url_for('index'))
        else:
            return "로그인 실패 (로컬 실습용). <a href='/login'>다시</a>"
    return render_template_string(LOGIN_HTML)

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))

@app.route('/comment', methods=['POST'])
def comment():
    user = session.get('user')
    if not user:
        return "로그인이 필요합니다", 403
    comment = request.form.get('comment','')
    # 취약: 입력 검증/정제 없이 저장
    comments.append({'user': user, 'comment': comment})
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
`;

export default function LearningPageDetail2() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-8 px-4">
        <WarningMessage />

        <h2 className="text-h2 font-bold font-sans mb-8">
          저장형 XSS 재현 (중급)
        </h2>

        <div className="mb-8">
          <p className="mb-4">
            댓글에{' '}
            <span className="text-code-keyword font-mono">
              &lt;script&gt;alert(document.cookie)&lt;/script&gt;
            </span>{' '}
            를 저장하고, 다른 세션에서 해당 게시물을 열어보세요.
          </p>
        </div>

        <CodeDisplay code={pythonCode} className="mb-8 w-full" />

        <div className="mb-8 space-y-10">
          <p>
            [attacker / pw1] 공격자 계정으로 로그인 후 왼쪽 이미지와 같이
            스크립트 댓글을 남깁니다.
            <br />
            [victim / pw2] 다른 사용자 계정으로 로그인을 하게 되면 스크립트가
            터집니다.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <img
              className="w-full md:w-1/2 rounded-[10px]"
              src="https://placehold.co/612x523"
              alt="Placeholder Image 1"
            />
            <img
              className="w-full md:w-1/2 rounded-[10px]"
              src="https://placehold.co/675x231"
              alt="Placeholder Image 2"
            />
          </div>
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-14 bg-sky-500 mr-4" />
            <p className="text-gray-400">
              위 이미지에서 보이듯 일반적인 댓글 서비스처럼 보이지만, 공격자가
              악의를 가지고 이름이나 댓글창 같은 입력창에
              <br />
              <span className="text-gray-400 font-mono">
                &lt;script&gt;alert("1");&lt;/script&gt;
                <br />
              </span>
              같은 스크립트를 작성하게 되면 다른 세션(다른 아이디)으로 해당
              게시글에 접근했을때 스크립트가 실행되는것을 볼 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-3xl font-bold font-sans mb-4">핵심 포인트</h3>
          <div className="w-full  bg-code-bg rounded-[5px] p-4">
            <p className="font-mono">
              {' '}
              {"comments.append({'name': name, 'comment': comment})"}
            </p>
          </div>
          <p className="mb-4">
            <span className="text-code-keyword font-mono">comments</span>에{' '}
            <span className="text-code-keyword font-mono">name</span>과{' '}
            <span className="text-code-keyword font-mono">comment</span>가
            검증없이 공격자가 작성한 그대로 들어갑니다.
          </p>
          <div className="w-full  bg-code-bg rounded-[5px] p-4">
            <p className="font-mono ">
              {' '}
              {'<li><strong>{{ c.name }}</strong>: {{ c.comment|safe }}</li>'}
            </p>
          </div>
          <p>
            기존 Jinja 템플릿에서는 사용자 입력을 자동으로 escape하지만,{' '}
            <span className="text-code-keyword">|safe</span> 옵션으로 인해
            사용자의 입력을 그대로 HTML로 넣게 됩니다.
            <br />
            즉, 서버에 저장된{' '}
            <span className="text-code-keyword">c.comment</span>가{' '}
            <span className="text-code-keyword">HTML</span>로 해석되어
            실행됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
