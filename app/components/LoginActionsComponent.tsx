import React from 'react';
import './LoginStyleComponent.css';

interface UserActionsProps {
  handleLogout: () => void;
  navigateToSearch: () => void;
  navigateToCreate: () => void;
}

export const UserActions: React.FC<UserActionsProps> = ({
  handleLogout,
  navigateToSearch,
  navigateToCreate,
}) => {
  // Buttons die beim klicken die entsprechende Funktion aufrufen
  return (
    <div className="d-flex justify-content-between">
      <div>
        <button
          onClick={handleLogout}
          className="btn btn-primary ms-3 mt-4 hover-effect"
        >
          Logout
        </button>
        <button
          onClick={navigateToSearch}
          className="btn btn-primary ms-3 mt-4 hover-effect"
        >
          Suchen
        </button>
        <button
          onClick={navigateToCreate}
          className="btn btn-primary ms-3 mt-4 hover-effect"
        >
          Erstellen
        </button>
      </div>
    </div>
  );
};
