import Link from 'next/link';
import Image from 'next/image';
import { Phone } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                    <Image src="/logo.png" alt="AIR G Energie" width={180} height={50} priority style={{ height: 'auto' }} />
                </Link>

                {/* Navigation Links */}
                <div className={styles.navLinks}>
                    <Link href="/climatisation">Climatisation</Link>
                    <Link href="/gainable">Gainable</Link>
                    <Link href="/pompe-a-chaleur">Pompe à Chaleur</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                {/* CTA Buttons */}
                <div className={styles.ctaGroup}>
                    <a href="tel:0413414901" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Phone size={18} />
                        04 13 41 49 01
                    </a>
                    <Link href="/contact" className="btn btn-primary">
                        Devis Gratuit
                    </Link>
                </div>
            </div>
        </nav>
    );
}
