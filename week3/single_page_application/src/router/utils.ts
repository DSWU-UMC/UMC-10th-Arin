export const PUSHSTATE_EVENT = 'pushstate';

// 현재 경로 반환
export const getCurrentPath = () => window.location.pathname;

// URL 변경 + 이벤트 발행
export const navigateTo = (path: string) => {
  history.pushState({}, '', path);
  window.dispatchEvent(new CustomEvent(PUSHSTATE_EVENT));
};