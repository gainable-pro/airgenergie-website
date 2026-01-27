import Link from 'next/link';
import Image from 'next/image';
import styles from './ZigZagSection.module.css';

interface ZigZagProps {
    title: string;
    description: string;
    imagePlacement: 'left' | 'right';
    imageSrc?: string;
    imageAlt?: string;
    features?: string[];
    ctaLink?: string;
    ctaText?: string;
    ctaLinkSecondary?: string;
    ctaTextSecondary?: string;
}

export default function ZigZagSection({
    title,
    description,
    imagePlacement,
    imageSrc,
    imageAlt,
    features,
    ctaLink = "/contact",
    ctaText = "Demander un devis",
    ctaLinkSecondary,
    ctaTextSecondary
}: ZigZagProps) {
    const imageContent = (
        <div className={styles.visualCol}>
            <div style={{ position: 'relative', height: '400px', borderRadius: '1rem', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
                {imageSrc ? (
                    <Image src={imageSrc} alt={imageAlt || title} fill style={{ objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '1.2rem' }}>
                        {imageAlt || title}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className={`section-padding ${styles.zigzagRoot}`}>
            <div className={`container ${styles.zigzagContainer} ${imagePlacement === 'right' ? styles.reverse : ''}`}>

                {/* Visual Side */}
                {imageContent}

                {/* Content Side */}
                <div className={styles.contentCol}>
                    <h2>{title}</h2>
                    <p className={styles.description}>{description}</p>

                    {features && (
                        <ul className={styles.featureList}>
                            {features.map((feat, idx) => (
                                <li key={idx}>{feat}</li>
                            ))}
                        </ul>
                    )}

                    <div className={styles.actions}>
                        <Link href={ctaLink} className="btn btn-primary">
                            {ctaText}
                        </Link>
                        {ctaLinkSecondary && ctaTextSecondary && (
                            <Link href={ctaLinkSecondary} className="btn btn-primary" style={{ marginLeft: '1rem', background: 'white', color: 'var(--primary-blue)', border: '2px solid var(--primary-blue)' }}>
                                {ctaTextSecondary}
                            </Link>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
