import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerGrid}`}>

                {/* Company Info */}
                <div className={styles.col}>
                    <h3 className={styles.colTitle}>AIR G Energie</h3>
                    <p className={styles.description}>
                        Expert en solutions de confort thermique à Miramas et alentours.
                        Installation, entretien et dépannage.
                    </p>
                    <div className={styles.contactInfo}>
                        <div className={styles.contactItem}>
                            <MapPin size={18} className={styles.icon} />
                            <span>Zone Industrielle, 13140 Miramas</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Phone size={18} className={styles.icon} />
                            <span>04 13 41 49 01</span>
                        </div>
                        <div className={styles.contactItem}>
                            <Mail size={18} className={styles.icon} />
                            <span>contact@airgenergie.fr</span>
                        </div>
                    </div>
                </div>

                {/* Services Links */}
                <div className={styles.col}>
                    <h3 className={styles.colTitle}>Services</h3>
                    <ul className={styles.linkList}>
                        <li><Link href="/climatisation">Climatisation Réversible</Link></li>
                        <li><Link href="/gainable">Systèmes Gainables</Link></li>
                        <li><Link href="/pompe-a-chaleur">Pompes à Chaleur</Link></li>
                        <li><Link href="/entretien">Entretien & SAV</Link></li>
                        <li><Link href="/drv-cta">Solutions Tertiaires</Link></li>
                    </ul>
                </div>

                {/* Zones Links */}
                <div className={styles.col}>
                    <h3 className={styles.colTitle}>Zones d&apos;Intervention</h3>
                    <ul className={styles.linkList}>
                        <li><Link href="/ville/miramas">Climatisation Miramas</Link></li>
                        <li><Link href="/ville/istres">Climatisation Istres</Link></li>
                        <li><Link href="/ville/salon-de-provence">Climatisation Salon</Link></li>
                        <li><Link href="/ville/saint-chamas">Climatisation St-Chamas</Link></li>
                        <li><Link href="/zones-intervention">Voir toutes les villes</Link></li>
                    </ul>
                </div>

                {/* Working Hours */}
                <div className={styles.col}>
                    <h3 className={styles.colTitle}>Horaires</h3>
                    <ul className={styles.hoursList}>
                        <li><Clock size={16} /> Lun - Ven: 8h00 - 18h00</li>
                        <li><Clock size={16} /> Samedi: Sur Rendez-vous</li>
                        <li><Phone size={16} /> 04 13 41 49 01</li>
                    </ul>
                </div>
            </div>

            <div className={styles.copyright}>
                <div className="container">
                    <p>&copy; {currentYear} Air Energie. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
