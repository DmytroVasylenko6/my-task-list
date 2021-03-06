import { useEffect, useState } from 'react';
import s from './Header.module.scss';
import Logo from '../../images/logo.png';
import LogoDark from '../../images/logo-dark.png';
import { Link } from 'react-router-dom';
import routes from '../../utils/routes';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import authSelectors from '../../redux/auth/auth-selectors';
import UserInfo from '../UserInfo';
import AuthNavigation from '../AuthNavigation';
import SiteNavigation from '../SiteNavigation';
import { Grid } from '@mui/material';
import authOperations from '../../redux/auth/auth-operation';
import { useMedia } from 'react-use';
import classNames from 'classnames';
import MobileMenu from '../MobileMenu';
import ThemeMode from '../ThemeMode';
import LanguageSelect from '../LanguageSelect';
import getTheme from '../../redux/themeMode/themeMode-selector';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const theme = useAppSelector(getTheme);
  const user = useAppSelector(authSelectors.getUser);
  const isAuthenticated = useAppSelector(authSelectors.getIsAuthenticated);
  const isWide = useMedia('(max-width: 900px)');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && user._id)
      dispatch(authOperations.getAvatar(user._id));
  }, [dispatch, user._id, isAuthenticated]);

  const lines = ['lines'];

  if (isOpen) {
    lines.push('active');
  }

  const toggling = () => setIsOpen(!isOpen);
  const handleClickNavItem = (e: React.MouseEvent<HTMLDivElement>): void => {
    let element = e.target as HTMLElement;
    if (element.nodeName === 'A' || element.nodeName === 'BUTTON') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <header className={classNames([s.header, 'theme-header'].join(' '))}>
      <div className={classNames([s.container, 'container'].join(' '))}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item>
            <Grid
              container
              spacing={6}
              direction="row"
              justifyContent="space-between"
              alignItems="center">
              <Grid item>
                <Link to={routes.home}>
                  <img
                    className={s.logo}
                    src={theme === 'dark' ? Logo : LogoDark}
                    alt="logo"
                    height="60"
                    width="60"
                  />
                </Link>
              </Grid>
              {!isWide && (
                <Grid item>
                  <SiteNavigation />
                </Grid>
              )}
            </Grid>
          </Grid>

          {!isWide && (
            <Grid item display="flex" alignItems="center">
              {isAuthenticated ? <UserInfo /> : <AuthNavigation />}
              <ThemeMode />
              <LanguageSelect />
            </Grid>
          )}

          {isWide && (
            <Grid item>
              <div
                data-testid="burger-button"
                onClick={() => toggling()}
                className={classNames(lines.join(' '))}
                role="button"
                aria-label="toggle menu button"
                aria-expanded={isOpen}
                aria-controls="header_nav">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </Grid>
          )}
        </Grid>
      </div>

      {isWide && (
        <MobileMenu
          isOpen={isOpen}
          isAuthenticated={isAuthenticated}
          onClick={handleClickNavItem}
        />
      )}
    </header>
  );
}
