import React from 'react';
import s from './Header.module.scss';
import Container from '../common/Container';
import Logo from '../../images/logo.png';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import UserInfo from '../UserInfo';
import AuthNavigation from '../AuthNavigation';
import SiteNavigation from '../SiteNavigation';
import { Grid } from '@mui/material';

export default function Header() {
  const isAuthenticated = useSelector(authSelectors.getIsAuthenticated);
  return (
    <header className={s.header}>
      <Container>
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
                <img src={Logo} alt="logo" height="60" width="60" />
              </Grid>
              <Grid item>
                <SiteNavigation />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            {isAuthenticated ? <UserInfo /> : <AuthNavigation />}
          </Grid>
        </Grid>
      </Container>
    </header>
  );
}