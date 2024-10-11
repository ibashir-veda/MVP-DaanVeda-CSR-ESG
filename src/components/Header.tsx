import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BarChart, FileText, Folder, Home, Users, AlertTriangle, Database, FileCheck, Activity, Menu, FileSpreadsheet, Handshake, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import './Header.css';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  const menuItems = [
    { to: "/", icon: <Home size={18} />, label: "Dashboard" },
    { to: "/projects", icon: <Folder size={18} />, label: "Projects" },
    { to: "/reports", icon: <FileText size={18} />, label: "Reports" },
    { to: "/compliance", icon: <FileCheck size={18} />, label: "Compliance" },
    { to: "/stakeholders", icon: <Users size={18} />, label: "Stakeholders" },
    { to: "/partnerships-and-impact", icon: <Handshake size={18} />, label: "Partnerships & Impact" },
    { to: "/risk-assessment", icon: <AlertTriangle size={18} />, label: "Risk" },
    { to: "/documents", icon: <Database size={18} />, label: "Documents" },
    { to: "/real-time-metrics", icon: <Activity size={18} />, label: "Metrics" },
    { to: "/reporting-wizard", icon: <FileSpreadsheet size={18} />, label: "Wizard" },
  ];

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <BarChart className="mr-2" />
          <span className="hidden sm:inline">CSR/ESG Platform</span>
        </Link>
        <nav className="header-nav">
          <ul className="flex-wrap">
            {menuItems.slice(0, 6).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="header-nav-item">
                  {item.icon}
                  <span className="hidden lg:inline ml-1">{item.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-0">
                    <MoreHorizontal size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {menuItems.slice(6).map((item) => (
                    <DropdownMenuItem key={item.to}>
                      <Link to={item.to} className="flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          {user.name ? (
            <span className="mr-4 hidden sm:inline">{user.name}</span>
          ) : (
            <Link to="/login" className="hover:text-blue-200 hidden sm:inline">Login</Link>
          )}
        </div>
        <div className="header-mobile-menu">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.to}>
                  <Link to={item.to} className="flex items-center">
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;