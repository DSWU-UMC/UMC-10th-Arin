import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { Navbar } from '../components/Navbar';

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function LoginPage() {
  const navigate = useNavigate();
  const { values, errors, handleChange, setError, clearError } = useForm({
    email: '',
    password: '',
  });

  const handleEmailBlur = () => {
    if (!validateEmail(values.email)) setError('email', '유효하지 않은 이메일 형식입니다.');
    else clearError('email');
  };

  const handlePasswordBlur = () => {
    if (values.password.length < 6) setError('password', '비밀번호는 최소 6자 이상이어야 합니다.');
    else clearError('password');
  };

  const isValid = validateEmail(values.email) && values.password.length >= 6;

  return (
    <div className='flex flex-col h-dvh'>
      <Navbar />
      <div className='flex flex-col items-center justify-center flex-1'>
        <div className='w-full max-w-sm flex flex-col gap-4 px-8'>
          <div className='flex items-center justify-center relative mb-2'>
            <button
              onClick={() => navigate(-1)}
              className='absolute left-0 text-gray-500 text-xl'
            >
              {'<'}
            </button>
            <h1 className='text-lg font-bold'>로그인</h1>
          </div>

          <div>
            <input
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              placeholder='이메일'
              className='w-full border rounded-lg px-4 py-3 outline-none focus:border-[#b2dab1] text-sm'
            />
            {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
          </div>

          <div>
            <input
              name='password'
              type='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handlePasswordBlur}
              placeholder='비밀번호'
              className='w-full border rounded-lg px-4 py-3 outline-none focus:border-[#b2dab1] text-sm'
            />
            {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
          </div>

          <button
            disabled={!isValid}
            className='w-full bg-[#b2dab1] text-white py-3 rounded-lg font-bold text-sm
            disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer'
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}