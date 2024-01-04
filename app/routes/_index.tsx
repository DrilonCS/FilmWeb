import { GlobalStyle } from '../components/GlobalStyleComponent';
import { LoginPage } from './login';
import { useBackgroundStyle } from '~/hooks/useBackGroundStyle';

export default function IndexPage() {
  // UsebackgroundStyle hook um den Hintergrund zu setzen
  useBackgroundStyle();

  return (
    <>
      {/* Anwenden des globalen Stils */}
      <GlobalStyle />
      {/* Rendern der LoginPage Komponente */}
      <LoginPage />
      {/* Rendern eines div mit der Klasse "center-logo" */}
      <div className="center-logo"></div>
    </>
  );
}
