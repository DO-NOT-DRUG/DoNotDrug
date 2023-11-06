import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const HeaderWrapper = styled.header`
  background: ${props => props.theme === 'sticky' ? 'lightgrey' : 'white'};
  padding: 10px;
  position: ${props => props.theme === 'sticky' ? 'fixed' : 'static'};
  top: 0;
  width: 100%;
  z-index: 100;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 15px;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: flex-end;
`;

const NavItem = styled.li`
  margin-left: 10px;
`;

// Example of using the theme prop
const SearchInput = styled.input`
  padding: 8px;
  border: ${props => props.theme === 'sticky' ? '1px solid black' : '1px solid #ddd'};
`;

// Replace the initialNavList with your navigation items
export default function Header({ navList }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsSticky(window.scrollY >= 166);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderWrapper theme={isSticky ? 'sticky' : 'default'}>
      <Container>
        <NavList>
          {/* Map through navList to render navigation items */}
          {navList.map((item, index) => (
            <NavItem key={index}>
              <Link to={item.path}>{item.label}</Link>
            </NavItem>
          ))}
        </NavList>
        <form>
          <SearchInput type="search" placeholder="Search..." theme={isSticky ? 'sticky' : 'default'} />
        </form>
      </Container>
    </HeaderWrapper>
  );
}

Header.defaultProps = {
  navList: [
    // Define your default navigation items here
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    // Add more items as needed
  ],
};