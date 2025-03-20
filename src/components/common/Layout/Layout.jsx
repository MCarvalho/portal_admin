import React from 'react';
import AdminHeader from '@/components/common/Header/Header';
import AdminSidebar from '@/components/common/Sidebar/Sidebar';
import styles from './layout.module.css';

const AdminLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <AdminHeader />
      <div className={styles.content}>
        <AdminSidebar />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
