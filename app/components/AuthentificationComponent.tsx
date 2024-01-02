import { useNavigate } from 'react-router-dom';

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
