import PropTypes from 'prop-types';
import Modal from 'react-modal';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: '1200',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={modalStyles}>
      <h2>{image.tags}</h2>
      <img src={image.largeImageURL} alt={image.tags} width="850" />
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};
