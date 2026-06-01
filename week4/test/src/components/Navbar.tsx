import { NavLink, useNavigate } from 'react-router-dom';

const LINKS = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기 영화' },
  { to: '/movies/now_playing', label: '상영 중' },
  { to: '/movies/top_rated', label: '평점 높은' },
  { to: '/movies/upcoming', label: '개봉 예정' },
];

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between px-4 py-3'>
      <div className='flex gap-3'>
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500'
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <button
        onClick={() => navigate('/login')}
        className='bg-[#dda5e3] text-white px-4 py-2 rounded-lg text-sm
        hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
      >
        로그인
      </button>
    </div>
  );
};