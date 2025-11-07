import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import FormErrorMessage from '../../components/FormErrorMessage';

type IPasswordResetFormInput = {
  email: string;
  authCode: string;
};

export default function PasswordResetPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPasswordResetFormInput>();

  const onSubmit: SubmitHandler<IPasswordResetFormInput> = (data) => {
    // TODO: Implement email verification and password reset logic
    console.log(data);
    alert('Password reset logic to be implemented.');
    navigate('/change-password');
  };

  const handleSendCode = () => {
    // TODO: Implement logic to send verification code
    alert('Verification code sent to email.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 space-y-10">
        <div className="text-center">
          <h1 className="text-h2 font-bold text-primary-text ">
            이메일을 인증 해주세요
          </h1>
          <p className="text-secondary-text mt-2">
            메일을 인증하면 메일이 발송돼요
          </p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center gap-3">
            <AuthInput
              id="email"
              type="email"
              placeholder="이메일"
              {...register('email', {
                required: '이메일은 필수입니다.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: '유효한 이메일 형식이 아닙니다.',
                },
              })}
            />
            <Button type="button" variant="secondary" onClick={handleSendCode}>
              인증
            </Button>
          </div>
          {errors.email && <FormErrorMessage message={errors.email.message} />}

          <AuthInput
            id="authCode"
            placeholder="인증 번호"
            {...register('authCode', { required: '인증 번호는 필수입니다.' })}
          />
          {errors.authCode && (
            <FormErrorMessage message={errors.authCode.message} />
          )}

          <div className="pt-10">
            <Button type="submit" variant="secondary" className="w-full">
              메일 확인
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
