import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center' }} onClick={closeMenu}>
                    <Image src="/logo.png" alt="AIR G Energie" width={150} height={42} priority style={{ height: 'auto' }} />
                </Link>

                {/* Desktop Navigation Links */}
                <div className={styles.navLinks}>
                    <Link href="/climatisation">Climatisation</Link>
                    <Link href="/gainable">Gainable</Link>
                    <Link href="/pompe-a-chaleur">Pompe à Chaleur</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                {/* CTA Buttons (Desktop) */}
                <div className={styles.ctaGroup}>
                    <a href="tel:0413414901" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={18} />
                        <span className={styles.hideOnMobile}>04 13 41 49 01</span>
                    </a>
                    <Link href="/contact" className="btn btn-primary">
                        Devis Gratuit
                    </Link>
                </div>

                {/* Hamburger Button */}
                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <Link href="/climatisation" onClick={closeMenu}>Climatisation</Link>
                <Link href="/gainable" onClick={closeMenu}>Gainable</Link>
                <Link href="/pompe-a-chaleur" onClick={closeMenu}>Pompe à Chaleur</Link>
                <Link href="/entretien" onClick={closeMenu}>Entretien</Link>
                <Link href="/blog" onClick={closeMenu}>Blog</Link>
                <Link href="/contact" onClick={closeMenu}>Contact</Link>
                <hr style={{ width: '100%', borderColor: '#E2E8F0', margin: '1rem 0' }} />
                <a href="tel:0413414901" className={styles.mobilePhoneBtn}>
                    <Phone size={20} /> 04 13 41 49 01
                </a>
            </div>
        </nav>
    );
}
