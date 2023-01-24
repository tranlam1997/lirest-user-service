'use strict';

import express from 'express';
import { Issuer, Strategy } from 'openid-client';
import passport from 'passport';
import expressSession from 'express-session';

export default async function keycloak(app: express.Application) {
  const keycloakIssuer = await Issuer.discover('http://localhost:8080/realms/lirest');

  const client = new keycloakIssuer.Client({
    client_id: 'lirest-user-service',
    client_secret: 'szJsr8AJ4In7YhkAjiEw52UBorNK1846',
    redirect_uris: ['http://127.0.0.1:3000/api/v1/auth/callback'],
    post_logout_redirect_uris: ['http://localhost:3000/logout/callback'],
    response_types: ['code'],
  });

  const memoryStore = new expressSession.MemoryStore();
  app.use(
    expressSession({
      secret: 'another_long_secret',
      resave: false,
      saveUninitialized: true,
      store: memoryStore,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.authenticate('session'));

  // this creates the strategy
  passport.use(
    'oidc',
    new Strategy({ client }, (tokenSet, userinfo, done) => {
      return done(null, tokenSet.claims());
    }),
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (user: any, done) {
    done(null, user);
  });
}

export { passport }
