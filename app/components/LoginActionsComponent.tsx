import React from 'react';

interface UserActionsProps {
  handleLogout: () => void;
  navigateToSearch: () => void;
  navigateToCreate: () => void;
}

export const UserActions: React.FC<UserActionsProps> = ({ handleLogout, navigateToSearch, navigateToCreate,}) => {
  return (
    <div className="d-flex justify-content-between">
      <div>
        <button onClick={handleLogout} style={{ backgroundColor: '#ff4f4f' }} className="btn btn-secondary">Logout</button>
        <button onClick={navigateToSearch} className="btn btn-primary ms-5">Suchen</button>
        <button onClick={navigateToCreate} className="btn btn-primary ms-5">Erstellen</button>
      </div>
    </div>
  );
};