import { GlobalStyle } from '../components/GlobalStyleComponent';
import { LoginPage } from './login';
import { useBackgroundStyle } from '../hooks/useBackGroundStyle';

export default function IndexPage() {
  useBackgroundStyle();

  return (
    <>
      <GlobalStyle />
      <LoginPage />
      <div className="center-logo"></div>
    </>
  );
}
