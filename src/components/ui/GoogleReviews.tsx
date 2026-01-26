import { Star } from 'lucide-react';
import styles from './GoogleReviews.module.css';

export default function GoogleReviews() {
    return (
        <div className={styles.reviewsWidget}>
            <div className={styles.header}>
                <div className={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={24} fill="#FBBC04" color="#FBBC04" />
                    ))}
                </div>
                <div className={styles.rating}>
                    <span className={styles.score}>4.9</span>
                    <span className={styles.outOf}>/5</span>
                </div>
                <p className={styles.subtitle}>Basé sur les avis Google</p>
            </div>

            <div className={styles.cta}>
                <a
                    href="https://share.google/sLKMxADrGA36sYOhR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                >
                    Voir tous nos avis Google
                </a>
            </div>
        </div>
    );
}
