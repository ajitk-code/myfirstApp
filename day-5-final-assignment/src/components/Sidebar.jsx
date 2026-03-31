import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ReceiptText, QrCode, Languages, HelpCircle } from 'lucide-react';
import IdbiLogo from './IdbiLogo';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <IdbiLogo width={180} textColor="var(--idbi-green)" />
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/transactions" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <ReceiptText size={20} />
          <span>Transaction Reports</span>
        </NavLink>
        <NavLink to="/qr-details" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <QrCode size={20} />
          <span>QR Details</span>
        </NavLink>
        <NavLink to="/language" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <Languages size={20} />
          <span>Language Update</span>
        </NavLink>
        <NavLink to="/help" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
          <HelpCircle size={20} />
          <span>Help & Support</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <NavLink to="/login" className="nav-link logout-link">
          <span>Logout</span>
        </NavLink>
      </div>
    </aside>
  );
}
