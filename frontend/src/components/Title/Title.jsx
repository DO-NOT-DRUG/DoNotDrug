import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledTitle = styled.h2`
  &.Medium {
    font-size: 1rem;
  }

  &.Large {
    font-size: 1.5rem;
  }

  &.XL {
    font-size: 2rem;
  }
  
  &.XXL {
    font-size: 2.5rem;
    font-weight: bold;
  }

  &.XXXL {
    font-size: 3rem;
  }

  &.center {
    text-align: center;
  }
  
  &.Login {
    color: #6B4EFF;
  }

  ${props => props.className};
`;


export function Title({ as: Component, className, titleStyle, ... restProps }) {
  const combinedClassNames =
    `${titleStyle} ${className}`.trim();

  return <StyledTitle as={Component} className={combinedClassNames} {...restProps} />;
}

/* Props -------------------------------------------------------------------- */

Title.defaultProps = {
  as: 'h2',
  className: '',
  titleStyle: 'Large',
};

Title.propTypes = {
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  className: PropTypes.string,
  titleStyle: PropTypes.oneOf(['Medium', 'Large', 'XL', 'XXL', 'XXXL']),
};