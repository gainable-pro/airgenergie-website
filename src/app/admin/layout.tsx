'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText, Users, LogOut } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className={styles.adminContainer}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>Air Energie</h2>
                    <span className={styles.adminBadge}>ADMIN</span>
                </div>

                <nav className={styles.sidebarNav}>
                    <Link
                        href="/admin/leads"
                        className={`${styles.navItem} ${pathname.includes('/leads') ? styles.active : ''}`}
                    >
                        <Users size={20} /> Leads
                    </Link>
                    <Link
                        href="/admin/articles"
                        className={`${styles.navItem} ${pathname.includes('/articles') ? styles.active : ''}`}
                    >
                        <FileText size={20} /> Articles (Blog)
                    </Link>
                </nav>

                <div className={styles.sidebarFooter}>
                    <button className={styles.logoutBtn}>
                        <LogOut size={18} /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
}
