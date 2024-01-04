import { useNavigate } from 'react-router-dom';

// Diese Funktion ist ein Higher-Order-Component (HOC), das eine Komponente umschließt und
// überprüft, ob der Benutzer authentifiziert ist, bevor er auf die umschlossene Komponente zugreifen kann.
export function withAuth(Component: React.ComponentType) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ProtectedRoute(props: any) {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/');
      return null;
    }
    return <Component {...props} />;
  };
}
