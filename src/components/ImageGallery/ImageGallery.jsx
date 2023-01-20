import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { ImageGalleryStyled } from './ImageGallery.styled';

export function ImageGallery({ images, onSelect }) {
  return (
    <ImageGalleryStyled>
      {images.map(image => (
        <ImageGalleryItem image={image} onSelect={onSelect} key={image.id} />
      ))}
    </ImageGalleryStyled>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};
