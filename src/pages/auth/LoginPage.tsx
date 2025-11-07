import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import SocialButton from '../../components/SocialButton';
import FormErrorMessage from '../../components/FormErrorMessage';
import { useAuthStore } from '../../store/authStore'; // Import useAuthStore
import axios from 'axios'; // Keep axios for error handling
import { useState } from 'react';

type ILoginFormInput = {
  username: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);

  // Get login action and isLoading state from Zustand store
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);

  const onSubmit: SubmitHandler<ILoginFormInput> = async (data) => {
    setApiError(null);
    try {
      const success = await login(data.username, data.password);
      if (success) {
        navigate('/'); // Redirect to home page or dashboard
      } else {
        setApiError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'); // Generic error for failed login
      }
    } catch (err: any) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response) {
        setApiError(err.response.data.message || err.message);
      } else {
        setApiError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-text mt-10 mb-10">
            로그인
          </h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            id="username"
            placeholder="아이디"
            {...register('username', { required: '아이디는 필수입니다.' })}
          />
          {errors.username && (
            <FormErrorMessage message={errors.username.message} />
          )}

          <AuthInput
            id="password"
            type="password"
            placeholder="비밀번호"
            {...register('password', { required: '비밀번호는 필수입니다.' })}
          />
          {errors.password && (
            <FormErrorMessage message={errors.password.message} />
          )}

          <hr className="mt-15 text-edge" />
          <div className="flex flex-col items-center space-y-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                id="rememberMe"
                className="rounded border-edge bg-card-background text-accent-primary1 focus:ring-accent-primary1"
                {...register('rememberMe')}
              />
              <span className="text-primary-text">계정 저장</span>
            </label>
            {apiError && <FormErrorMessage message={apiError} />}
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
            <button
              type="button"
              className="text-primary-text hover:text-accent-primary1"
              onClick={() => navigate('/password-reset')}
            >
              계정을 잊으셨나요? →
            </button>
          </div>
        </form>
        <div className="space-y-4 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialButton
              provider="google"
              onClick={() => (window.location.href = '/api/auth/google')}
            >
              Google로 로그인
            </SocialButton>
            <SocialButton
              provider="github"
              onClick={() => (window.location.href = '/api/auth/github')}
            >
              Github으로 로그인
            </SocialButton>
          </div>
        </div>
        <div className="text-center space-x-3.5">
          <p className="text-primary-text">
            계정이 없으신가요?{' '}
            <a href="/signup" className="text-accent-primary1 ml-2">
              회원가입 →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
