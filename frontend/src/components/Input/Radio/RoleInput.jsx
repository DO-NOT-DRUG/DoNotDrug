import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  heigth: 40px;
  width: 40px;
  border: 1px solid #ccc;
`;

export function RoleInput({ type, name, value, className, ...restProps }) {
  const combineClassName = `${className}`.trim();

  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      checked={value}
      className={combineClassName}
      onChange={(e) => debounce(onClick(e, 500))}
      {...restProps}
    />
  );
}

RoleInput.prototype = {
  className: PropTypes.string,
};
