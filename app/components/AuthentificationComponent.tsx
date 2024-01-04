import { useNavigate } from 'react-router-dom';

// Diese Funktion ist ein Higher-Order-Component (HOC), das eine Komponente umschließt und 
// überprüft, ob der Benutzer authentifiziert ist, bevor er auf die umschlossene Komponente zugreifen kann.
export function withAuth(Component: React.ComponentType) {
  // Die Funktion ProtectedRoute erhält die Eigenschaften der umschlossenen Komponente.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ProtectedRoute(props: any) {
    // useNavigate ist ein Hook von react-router-dom, der zum Navigieren zwischen den Seiten verwendet wird.
    const navigate = useNavigate();
    // Der Token wird aus dem localStorage geholt. 
    // Dieser Token wird normalerweise beim Login gesetzt und bei jeder Anfrage an den Server gesendet, um die Authentifizierung zu überprüfen.
    const token = localStorage.getItem('authToken');

    // Wenn kein Token vorhanden ist, wird der Benutzer zur Startseite umgeleitet und die Funktion gibt null zurück.
    if (!token) {
      navigate('/');
      return null;
    }
    // Wenn ein Token vorhanden ist, wird die umschlossene Komponente gerendert und die übergebenen Eigenschaften werden an sie weitergegeben.
    return <Component {...props} />;
  };
}
