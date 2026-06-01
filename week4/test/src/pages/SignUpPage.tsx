import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { Navbar } from '../components/Navbar';

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type Step = 'email' | 'password' | 'nickname';

const EyeOpen = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'/>
    <circle cx='12' cy='12' r='3'/>
  </svg>
);

const EyeOff = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94'/>
    <path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19'/>
    <line x1='1' y1='1' x2='23' y2='23'/>
  </svg>
);

export default function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { values, errors, handleChange, setError, clearError } = useForm({
    email: '',
    password: '',
    confirm: '',
    nickname: '',
  });

  const emailValid = validateEmail(values.email);
  const pwValid = values.password.length >= 6;
  const confirmValid = values.password === values.confirm && values.confirm !== '';

  const handleEmailBlur = () => {
    if (!emailValid) setError('email', '올바른 이메일 형식을 입력해주세요.');
    else clearError('email');
  };

  const handlePwBlur = () => {
    if (!pwValid) setError('password', '비밀번호는 6자 이상이어야 합니다.');
    else clearError('password');
  };

  const handleConfirmBlur = () => {
    if (!confirmValid) setError('confirm', '비밀번호가 일치하지 않습니다.');
    else clearError('confirm');
  };

  return (
    <div className='flex flex-col h-dvh'>
      <Navbar />
      <div className='flex flex-col items-center justify-center flex-1'>
        <div className='w-full max-w-sm flex flex-col gap-4 px-8'>

          <div className='flex items-center justify-center relative mb-2'>
            <button onClick={() => navigate(-1)} className='absolute left-0 text-gray-500 text-xl'>
              {'<'}
            </button>
            <h1 className='text-lg font-bold'>회원가입</h1>
          </div>

          {step === 'email' && (
            <>
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
              <button
                disabled={!emailValid}
                onClick={() => setStep('password')}
                className='w-full bg-[#b2dab1] text-white py-3 rounded-lg font-bold text-sm
                disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer'
              >
                다음
              </button>
            </>
          )}

          {step === 'password' && (
            <>
              <p className='text-gray-500 text-sm border rounded-lg px-4 py-3 bg-gray-50'>
                {values.email}
              </p>

              {/* 비밀번호 */}
              <div>
                <div className='relative'>
                  <input
                    name='password'
                    type={showPw ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handlePwBlur}
                    placeholder='비밀번호'
                    className='w-full border rounded-lg px-4 py-3 pr-10 outline-none focus:border-[#b2dab1] text-sm'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPw((p) => !p)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
                  >
                    {showPw ? <EyeOpen /> : <EyeOff />}
                  </button>
                </div>
                {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password}</p>}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <div className='relative'>
                  <input
                    name='confirm'
                    type={showConfirm ? 'text' : 'password'}
                    value={values.confirm}
                    onChange={handleChange}
                    onBlur={handleConfirmBlur}
                    placeholder='비밀번호 확인'
                    className='w-full border rounded-lg px-4 py-3 pr-10 outline-none focus:border-[#b2dab1] text-sm'
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirm((p) => !p)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400'
                  >
                    {showConfirm ? <EyeOpen /> : <EyeOff />}
                  </button>
                </div>
                {errors.confirm && <p className='text-red-500 text-xs mt-1'>{errors.confirm}</p>}
              </div>

              <button
                disabled={!pwValid || !confirmValid}
                onClick={() => setStep('nickname')}
                className='w-full bg-[#b2dab1] text-white py-3 rounded-lg font-bold text-sm
                disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer'
              >
                다음
              </button>
            </>
          )}

          {step === 'nickname' && (
            <>
              <div className='w-20 h-20 rounded-full bg-gray-200 mx-auto flex items-center justify-center text-3xl'>
                👤
              </div>
              <input
                name='nickname'
                value={values.nickname}
                onChange={handleChange}
                placeholder='닉네임'
                className='w-full border rounded-lg px-4 py-3 outline-none focus:border-[#b2dab1] text-sm'
              />
              <button
                disabled={values.nickname.trim() === ''}
                onClick={() => navigate('/')}
                className='w-full bg-[#b2dab1] text-white py-3 rounded-lg font-bold text-sm
                disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer'
              >
                회원가입 완료
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}