import { Link, Route, Routes } from './router';

const ArinPage     = () => <h1>아린 페이지</h1>;
const AeongPage    = () => <h1>애옹 페이지</h1>;
const JoyPage      = () => <h1>조이 페이지</h1>;
const NotFoundPage = () => <h1>404 Not Found</h1>;

const Header = () => (
  <nav>
    <Link to='/arin'>ARIN</Link>
    {' | '}
    <Link to='/aeong'>AEONG</Link>
    {' | '}
    <Link to='/joy'>JOY</Link>
    {' | '}
    <Link to='/not-found'>NOT FOUND</Link>
  </nav>
);

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/arin'      component={ArinPage} />
        <Route path='/aeong'     component={AeongPage} />
        <Route path='/joy'       component={JoyPage} />
        <Route path='/not-found' component={NotFoundPage} />
      </Routes>
    </>
  );
}

export default App;