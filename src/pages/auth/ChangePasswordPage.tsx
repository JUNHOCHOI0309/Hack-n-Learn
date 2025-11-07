import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import FormErrorMessage from '../../components/FormErrorMessage';

type IChangePasswordFormInput = {
  password: string;
  passwordConfirm: string;
};

export default function ChangePasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IChangePasswordFormInput>();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit: SubmitHandler<IChangePasswordFormInput> = (data) => {
    // TODO: Implement password change logic
    console.log(data);
    alert('Password has been changed successfully!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-h2 font-bold text-primary-text ">
            비밀번호 변경
          </h1>
          <p className="text-secondary-text mt-2">
            새로 사용할 비밀번호를 입력해주세요.
          </p>
        </div>
        <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput
            id="password"
            type="password"
            placeholder="새 비밀번호"
            {...register('password', {
              required: '비밀번호는 필수입니다.',
              minLength: {
                value: 8,
                message: '비밀번호는 8자 이상이어야 합니다.',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                message:
                  '비밀번호는 8자 이상이며, 대소문자, 숫자, 특수문자를 포함해야 합니다.',
              },
            })}
          />
          {errors.password && (
            <FormErrorMessage message={errors.password.message} />
          )}

          <AuthInput
            id="passwordConfirm"
            type="password"
            placeholder="새 비밀번호 확인"
            {...register('passwordConfirm', {
              required: '비밀번호 확인은 필수입니다.',
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다.',
            })}
          />
          {errors.passwordConfirm && (
            <FormErrorMessage message={errors.passwordConfirm.message} />
          )}

          <div className="pt-6">
            <Button type="submit" variant="primary" className="w-full">
              비밀번호 변경
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
