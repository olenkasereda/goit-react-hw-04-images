import { ImageItem, GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ image, onSelect }) {
  return (
    <ImageItem onClick={() => onSelect(image)}>
      <GalleryItemImage
        src={image.webformatURL}
        alt={image.tags}
        loading="lazy"
      />
    </ImageItem>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};
