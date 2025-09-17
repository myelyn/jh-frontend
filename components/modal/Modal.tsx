'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/solid'
import styles from './modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ isOpen, onClose, title, children, className = '' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      onClick={handleOverlayClick}
      className={`${styles.modalMask}`}
    >
      <div className={`${styles.modalContent} ${className}`}>
        <div className={`${styles.modalHeader}`}>
          <div className={`${styles.modalHeaderLeft}`}></div>
          <div className={`${styles.modalHeaderRight}`}></div>
          <div className={`${styles.modalHeaderCenter}`}></div>
          <div className={`${styles.modalHeaderTitle}`}>
            <div className={`${styles.modalHeaderTitleLeft}`}></div>
            <div className={`${styles.modalHeaderTitleText}`}>
              {title}
            </div>
            <div className={`${styles.modalHeaderTitleRight}`}></div>
          </div>
          <XMarkIcon onClick={onClose} className={`${styles.modalHeaderClose}`} />
          
        </div>
        <div className={`${styles.modalBody}`}>
          <div className={`${styles.modalBodyLeftBorder}`}></div>
          <div className={`${styles.modalBodyRightBorder}`}></div>
          <div className={`${styles.modalBodyContent}`}>
            <div className={`${styles.modalBodyContentInner}`}>
              {children}
            </div>
          </div>
        </div>
        <div className={`${styles.modalFooter}`}>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}