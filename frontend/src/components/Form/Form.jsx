import styled from "styled-components";

const StyledForm = styled.form`
  width: 640px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 600px;
  gap: 1rem;
  background-color: lightgrey;
  border-radius: 20px;
`;


export function Form({ children, ...restProps }) {
  return (
    <StyledForm {...restProps}>
      {children}
    </StyledForm>
  )
}