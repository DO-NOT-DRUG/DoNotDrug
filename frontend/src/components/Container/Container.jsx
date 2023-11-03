import { string, node, oneOf } from 'prop-types';
import styled from 'styled-components';


const StyledContainer = styled.section`
  &.center {
    margin-left: auto;
    margin-right: auto;
  }

  &.left {
    margin-right: auto;
  }

  &.right {
    margin-left: auto;
  }

  &.widthSmall {
    max-width: 340px;
  }

  &.widthMedium {
    max-width: 640px;
  }

  &.widthLarge {
    max-width: 1024px;
  }

  ${props => props.className}
`;
  
function Container({
  as: Component,
  className,
  children,
  align,
  width,
  ...restProps
}) {
  // className을 조합하여 StyledContainer에 전달합니다.
  const combineClassNames = `${align} ${width} ${className}`.trim();

  return (
    <StyledContainer as={Component} className={combineClassNames} {...restProps}>
      {children}
    </StyledContainer>
  );
}

Container.defaultProps = {
  as: 'div',
  className: '',
  align: 'center',
  width: 'widthLarge',
};

Container.propTypes = {
  as: string,
  className: string,
  children: node,
  align: oneOf(['center', 'left', 'right']),
  width: oneOf(['widthSmall', 'widthMedium', 'widthLarge']),
};

export default Container;