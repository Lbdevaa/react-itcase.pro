import {useState} from 'react'

import styles from './styles.module.css'

type ImageGalleryProps = {
  images: string[]
  alt: string
}

/**
 * Переключение изображений реализовано вручную — по условию задания
 * сторонние слайдеры использовать нельзя.
 *
 * Индекс ограничивается на рендере: набор изображений меняется вместе с цветом,
 * и активный кадр может оказаться за границей нового массива.
 */
export function ImageGallery({images, alt}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (images.length === 0) {
    return <div className={styles.placeholder}>Нет изображений</div>
  }

  const currentIndex = Math.min(activeIndex, images.length - 1)
  const canSwitch = images.length > 1

  const showPrevious = () =>
    setActiveIndex((index) => (Math.min(index, images.length - 1) - 1 + images.length) % images.length)
  const showNext = () =>
    setActiveIndex((index) => (Math.min(index, images.length - 1) + 1) % images.length)

  return (
    <div className={styles.root}>
      <div className={styles.stage}>
        <img src={images[currentIndex]} alt={alt} className={styles.image} />

        {canSwitch ? (
          <>
            <button
              type="button"
              className={[styles.arrow, styles.previous].join(' ')}
              onClick={showPrevious}
              aria-label="Предыдущее изображение"
            >
              ‹
            </button>
            <button
              type="button"
              className={[styles.arrow, styles.next].join(' ')}
              onClick={showNext}
              aria-label="Следующее изображение"
            >
              ›
            </button>
          </>
        ) : null}
      </div>

      {canSwitch ? (
        <div className={styles.thumbs}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={[styles.thumb, index === currentIndex && styles.thumbActive]
                .filter(Boolean)
                .join(' ')}
              onClick={() => setActiveIndex(index)}
              aria-label={`Изображение ${index + 1}`}
              aria-current={index === currentIndex}
            >
              <img src={image} alt="" className={styles.thumbImage} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
