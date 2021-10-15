import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import paths from './utils/routes';
import authOperations from './redux/auth/auth-operation';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Notification from './components/Notification';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);
const TasksPage = lazy(() =>
  import('./pages/TasksPage' /* webpackChunkName: "tasks-page" */),
);
const SingleTaskPage = lazy(() =>
  import('./pages/SingleTaskPage' /* webpackChunkName: "singleTask-page" */),
);
const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "register-page" */),
);
const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "login-page" */),
);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<></>}>
          <Switch>
            <PrivateRoute
              exact
              path={paths.home}
              restricted
              redirectTo={paths.login}>
              <HomePage />
            </PrivateRoute>

            <PrivateRoute
              exact
              path={paths.todos}
              restricted
              redirectTo={paths.login}>
              <TasksPage />
            </PrivateRoute>

            <PrivateRoute
              exact
              path={paths.singleTodos}
              restricted
              redirectTo={paths.login}>
              <SingleTaskPage />
            </PrivateRoute>

            <PublicRoute
              path={paths.register}
              restricted
              redirectTo={paths.home}>
              <RegisterPage />
            </PublicRoute>

            <PublicRoute path={paths.login} restricted redirectTo={paths.home}>
              <LoginPage />
            </PublicRoute>

            <Redirect to="/" />
          </Switch>
        </Suspense>
      </main>
      <Notification />
    </>
  );
};

export default App;