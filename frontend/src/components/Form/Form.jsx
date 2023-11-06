import styled from "styled-components";

const StyledForm = styled.form`
  width: 640px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  gap: 1rem;
  background-color: lightgrey;
`;


export function Form({ children, ...restProps }) {
  return (
    <StyledForm {...restProps}>
      {children}
    </StyledForm>
  )
}