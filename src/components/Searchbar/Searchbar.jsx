import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import { BiSearchAlt } from 'react-icons/bi';
import * as yup from 'yup';

import {
  SearchForm,
  SearchFormButton,
  InputError,
  SearchForInput,
  SearchBox,
} from './Searchbar.styled.js';
const schema = yup.object().shape({
  value: yup.string().trim().required('Please enter the name of the pictures'),
});

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };
  return (
    <Formik
      initialValues={{ value: '' }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <SearchBox>
        <SearchForm>
          <SearchFormButton type="submit">
            <BiSearchAlt size={25} />
          </SearchFormButton>
          <SearchForInput
            name="value"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="value" component={InputError} />
        </SearchForm>
      </SearchBox>
    </Formik>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
