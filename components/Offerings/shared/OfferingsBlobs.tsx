import styles from './OfferingsBlobs.module.css';

export type BlobVariant = 'default' | 'minimal' | 'dense';

interface OfferingsBlobsProps {
  variant?: BlobVariant;
}

export function OfferingsBlobs({ variant = 'default' }: OfferingsBlobsProps) {
  const containerClassName = variant !== 'default'
    ? `${styles.blobContainer} ${styles[variant]}`
    : styles.blobContainer;

  return (
    <div className={containerClassName}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
      <div className={`${styles.blob} ${styles.blob4}`} />
      <div className={`${styles.blob} ${styles.blob5}`} />
    </div>
  );
}
