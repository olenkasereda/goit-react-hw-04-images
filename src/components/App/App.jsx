import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { ImageModal } from 'components/Modal';
import { Searchbar } from 'components/Searchbar';
import { Component } from 'react';
import { Button } from 'components/Button';
import fetchImage from 'services/image_api';

export class App extends Component {
  state = {
    isLoader: false,
    total: 0,
    images: [],
    selectedImage: null,
    query: '',
    page: 1,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoader: true });
      fetchImage({
        query: this.state.query,
        page: this.state.page,
        isLoader: true,
      })
        .then(images => {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits],
            total: images.totalHits,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(
          setTimeout(() => {
            this.setState({ isLoader: false });
          }, 700)
        );
    }
  }

  handleFormSubmit = ({ value }) => {
    this.setState({ query: value, images: [], page: 1 });
  };

  openModal = selectedImage => {
    this.setState({ selectedImage: selectedImage });
  };

  closeModal = () => {
    this.setState({ selectedImage: null });
  };

  selectImage = largeImage => {
    this.setState({ selectedImage: largeImage });
  };

  onLoadBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.images.length === 0 && <h1>There are no pictures</h1>}
        {this.state.isLoader && <Loader />}
        {this.state.images.length !== 0 && (
          <ImageGallery
            onSelect={this.selectImage}
            images={this.state.images}
          />
        )}
        {this.state.images.length < this.state.total && (
          <Button onClick={this.onLoadBtnClick} />
        )}
        {this.state.selectedImage && (
          <ImageModal
            image={this.state.selectedImage}
            isOpen={Boolean(this.openModal)}
            tags={this.state.selectedImage}
            onRequestClose={this.closeModal}
          />
        )}
      </>
    );
  }
}
