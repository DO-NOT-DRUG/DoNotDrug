import styled from "styled-components";
import PropTypes from 'prop-types';

const StyledButton = styled(({ isSecondary, ...rest }) => <button {...rest} />)`
  padding: 16px 0;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin: 0 auto;

  background-color: ${props => props.isSecondary ? 'white' : '#6B4EFF'};
  color: ${props => props.isSecondary ? '#6B4EFF' : 'white'};
  border: ${props => props.isSecondary ? '1px solid #6B4EFF' : 'none'};
  margin-left: ${props => props.isSecondary ? '8px' : '0'};
  width: ${props => props.isSecondary ? '20%' : '50%'};
  
  &:hover {
    background-color: #5538EE;
    color: white;
  }
`;

export function Button({ isSecondary, className, children, ...restProps}) {
  return (
    <StyledButton isSecondary={isSecondary} className={className} {...restProps}>
      {children}
    </StyledButton>
  )
}

Button.defaultProps = {
  isSecondary: false,
};

Button.propTypes = {
  isSecondary: PropTypes.bool,
};
