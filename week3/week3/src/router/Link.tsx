import type { MouseEvent } from 'react';
import { getCurrentPath, navigateTo } from './utils';

type LinkProps = {
  to: string;
  children: React.ReactNode;
};

export const Link = ({ to, children }: LinkProps) => {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();                     // 서버 요청 차단
    if (getCurrentPath() === to) return;  // 같은 경로면 무시
    navigateTo(to);                         // URL 변경 + 이벤트
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
};