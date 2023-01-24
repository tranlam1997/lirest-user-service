import { Request, Response, Router } from 'express';
import { asyncHandler } from '../../shared/helper';
import {passport} from '../../common/keycloak'

const AuthRouter = Router();

export default (app: Router) => {
  AuthRouter.post('/login', (req, res) => {
    passport.authenticate('oidc', { failureRedirect: '/login' }, (err, user, info) => {
      if (err) {
        return res.status(500).send(err);
  }})(req, res)});

  AuthRouter.get('/callback', (req, res, next) => {
    passport.authenticate('oidc', {
      successRedirect: '/testauth',
      failureRedirect: '/'
    })(req, res, next);
  })

  app.use('/auth', AuthRouter);
};
