import { useState, useEffect } from 'react';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { ImageModal } from 'components/Modal';
import { Searchbar } from 'components/Searchbar';
import { Button } from 'components/Button';
import fetchImage from 'services/image_api';

export function App() {
  const [isLoader, setIsLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoader(true);
    fetchImage({
      query: query,
      page: page,
      isLoader: true,
    })
      .then(images => {
        setImages(prev => [...prev, ...images.hits]);
        setTotal(images.totalHits);
      })

      .catch(error => console.log(error))
      .finally(
        setTimeout(() => {
          setIsLoader(false);
        }, 700)
      );
  }, [query, page]);

  const handleFormSubmit = ({ value }) => {
    setPage(1);
    setQuery(value);
    setImages([]);
  };

  const openModal = selectedImage => {
    setSelectedImage(selectedImage);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const selectImage = largeImage => {
    setSelectedImage(largeImage);
  };

  const onLoadBtnClick = () => {
    setPage(prev => prev + 1);
  };
  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {images.length === 0 && <h1>There are no pictures</h1>}
      {images.length !== 0 && (
        <ImageGallery onSelect={selectImage} images={images} />
      )}
      {isLoader && <Loader />}
      {images.length < total && <Button onClick={onLoadBtnClick} />}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          isOpen={Boolean(openModal)}
          tags={selectedImage}
          onRequestClose={closeModal}
        />
      )}
    </>
  );
}
