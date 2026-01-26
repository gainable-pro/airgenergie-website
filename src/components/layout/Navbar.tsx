'use client';

import Link from 'next/link';
import { Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <div className={`container ${styles.navbarContainer}`}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoText}>Air<span className={styles.logoHighlight}>Energie</span></span>
                </Link>

                {/* Desktop Nav */}
                <nav className={`${styles.navMenu} ${isMenuOpen ? styles.active : ''}`}>
                    <ul className={styles.navLinks}>
                        <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link></li>
                        <li className={styles.dropdown}>
                            <span>Services</span>
                            <ul className={styles.dropdownContent}>
                                <li><Link href="/climatisation">Climatisation</Link></li>
                                <li><Link href="/gainable">Gainable</Link></li>
                                <li><Link href="/pompe-a-chaleur">Pompes à Chaleur</Link></li>
                                <li><Link href="/drv-cta">Tertiaire / DRV</Link></li>
                            </ul>
                        </li>
                        <li><Link href="/zones-intervention" onClick={() => setIsMenuOpen(false)}>Zones</Link></li>
                        <li><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
                        <li><Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
                    </ul>

                    <div className={styles.navActions}>
                        <button className={styles.langSwitch}>FR | EN</button>
                        <a href="tel:0123456789" className="btn btn-primary">
                            <Phone size={18} />
                            <span>04 90 XX XX XX</span>
                        </a>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <button className={styles.mobileToggle} onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </header>
    );
}
