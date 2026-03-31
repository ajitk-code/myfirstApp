import React from 'react';
import { Menu, Bell } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn mobile-menu-btn">
          <Menu size={24} />
        </button>
      </div>
      
      <div className="topbar-right">
        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        <div className="user-profile">
          <img 
            src="https://ui-avatars.com/api/?name=Pabitra+Hotai&background=008771&color=fff&rounded=true" 
            alt="User Avatar" 
            className="avatar" 
          />
          <span className="user-name">Pabitra Hotai</span>
        </div>
      </div>
    </header>
  );
}
