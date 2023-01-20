import { MagnifyingGlass } from 'react-loader-spinner';
import { LoadContainer } from './Loader.styled';

export function Loader() {
  return (
    <LoadContainer>
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </LoadContainer>
  );
}
