import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { rhythm, scale } from '../utils/typography';

const Container = styled.div`
  background-color: rgb(105, 66, 180);
  color: white;
  min-height: 100vh;
  a {
    color: inherit;
    &:visited,
    &:hover {
      color: inherit;
    }
  }
  blockquote {
    border-color: white;
    color: white;
  }
  hr {
    border-top: 1px solid #ccc;
  }
`;

const Column = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  padding: 2rem;
`;

const Nav = styled.div`
  display: flex;
  flex-grow: 0;
  a {
    ${props => props.isRoot && `border-left: 1px solid white`}
    padding: 0 1rem;
    &:last-child {
      ${props => props.isRoot && `border-right: 1px solid white`}
    }
  }
`;

const Header = styled.nav`
  display: flex;
  align-items: center;
  ${props => props.isRoot && `margin-bottom: ${rhythm(1.5)}`}
`;

const UnstyledLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`;

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            margin: 0,
            flex: 1,
          }}
        >
          <UnstyledLink to={`/`}>{title}</UnstyledLink>
        </h1>
      );
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            margin: 0,
            flex: 1,
          }}
        >
          <UnstyledLink to={`/`}>{title}</UnstyledLink>
        </h3>
      );
    }
    const isRoot = location.pathname === rootPath;
    return (
      <Container>
        <Column>
          <Header isRoot={isRoot}>
            {header}
            <Nav isRoot={isRoot}>
              <UnstyledLink to="/">Public</UnstyledLink>
              {/* <UnstyledLink to="/dynamic">Dynamic</UnstyledLink> */}
              <UnstyledLink to="/protected">Protected</UnstyledLink>
              <UnstyledLink to="/cached">Cached</UnstyledLink>
            </Nav>
          </Header>
          <hr />
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </Column>
      </Container>
    );
  }
}

export default Layout;
