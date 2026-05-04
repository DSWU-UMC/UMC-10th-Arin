import { useState, useEffect, Children, cloneElement, isValidElement } from 'react';
import { getCurrentPath, PUSHSTATE_EVENT } from './utils';

// 현재 경로를 state로 관리하는 커스텀 훅
const useCurrentPath = () => {
  const [path, setPath] = useState(getCurrentPath());

  useEffect(() => {
    const update = () => setPath(getCurrentPath());

    window.addEventListener(PUSHSTATE_EVENT, update); // Link 클릭
    window.addEventListener('popstate', update);      // 뒤로/앞으로가기

    return () => {
      window.removeEventListener(PUSHSTATE_EVENT, update);
      window.removeEventListener('popstate', update);
    };
  }, []);

  return path;
};

// Routes: 자식 중 현재 경로와 맞는 Route를 찾아 렌더링
export const Routes = ({ children }) => {
  const currentPath = useCurrentPath();

  const activeRoute = Children
    .toArray(children)
    .find((child) =>
      isValidElement(child) && child.props.path === currentPath
    );

  if (!activeRoute) return null;
  return cloneElement(activeRoute as React.ReactElement);
};