import { styled } from 'styled-components';

type OwnProps = {
  children: React.ReactElement;
};

const AppLayout = ({ children }: OwnProps) => {
  return (
    <div>
      <HeaderContainer>
        <Header>
          <div className='title'>
            <a href='/'>
              <img src='../../public/pikachu.png' alt='' />
              <h1>My Pokemon Website</h1>
            </a>
          </div>
          <NavBar>
            <div>
              <a href='/'>Pokedex</a>
            </div>
            <div>
              <a href='/'>Mini Game</a>
            </div>
          </NavBar>
        </Header>
      </HeaderContainer>
      <Main>{children}</Main>
      <FooterContainer>
        <Footer>
          Made by Kyuseok Park
          <a
            href='https://github.com/KS-Bird'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
        </Footer>
      </FooterContainer>
    </div>
  );
};

export default AppLayout;

const HeaderContainer = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
`;

const Header = styled.header`
  width: 1200px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0px 50px;
  .title > a {
    display: flex;
    height: 100%;
  }
`;

const NavBar = styled.nav`
  display: grid;
  text-align: center;
  align-items: center;
  grid-template-rows: 100%;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
`;

const Main = styled.main`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const FooterContainer = styled.div`
  background-color: black;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Footer = styled.footer`
  width: 1200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 50px;
  > a {
    text-decoration: underline;
    margin-left: 50px;
  }
`;
