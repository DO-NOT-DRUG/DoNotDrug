import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
  width: 360px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export function Input({ type, id, name, placeholder, ...restProps }) {
  return(
    <StyledInput 
      type={type}
      id={id}
      name={name}
      placeholder={placeholder}
      {...restProps}/>
  );
}

