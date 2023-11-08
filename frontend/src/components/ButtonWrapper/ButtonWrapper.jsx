import styled from 'styled-components';

const StyledButtonWrapper = styled.div`
  width: 100%;
  padding: 50px 0 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  color: #6B4EFF;
`;

export function ButtonWrapper({ children, ...restProps}) {
  return (
    <StyledButtonWrapper {...restProps}>
      {children}
    </StyledButtonWrapper>
  )
}