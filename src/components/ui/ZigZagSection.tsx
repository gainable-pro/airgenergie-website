import Link from 'next/link';
import styles from './ZigZagSection.module.css';

interface ZigZagProps {
    title: string;
    description: string;
    imagePlacement: 'left' | 'right';
    imageSrc?: string; // Optional if you don't have images yet
    features?: string[];
    ctaLink?: string;
    ctaText?: string;
}

export default function ZigZagSection({
    title,
    description,
    imagePlacement,
    imageSrc,
    features,
    ctaLink = "/contact",
    ctaText = "Demander un devis"
}: ZigZagProps) {
    return (
        <div className={`section-padding ${styles.zigzagRoot}`}>
            <div className={`container ${styles.zigzagContainer} ${imagePlacement === 'right' ? styles.reverse : ''}`}>

                {/* Visual Side */}
                <div className={styles.visualCol}>
                    <div className={styles.imagePlaceholder}>
                        {imageSrc ? (
                            // Simple text for now until images are real
                            <span>IMG: {title}</span>
                        ) : (
                            <span>Visuel: {title}</span>
                        )}
                    </div>
                </div>

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
                    </div>
                </div>

            </div>
        </div>
    );
}
