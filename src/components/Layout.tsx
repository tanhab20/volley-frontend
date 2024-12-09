import React from 'react';
import Navbar from './Navbar';
import '../styles/Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="layout">
            <Navbar />
            <main className="layout-content">
                {children}
            </main>
            <footer className="layout-footer">
                © SYP Volleymaster
            </footer>
        </div>
    );
};

export default Layout;
