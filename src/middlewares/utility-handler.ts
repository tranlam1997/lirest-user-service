import express from 'express';
import { expressLogger } from '@src/common/winston';

export default [
  // ecognize the incoming Request Object as strings or arrays.
  express.urlencoded({ extended: true }),
  // express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
  express.json(),
  // serve static files like images, css, js
  express.static('public'),
  // log all requests to console
  expressLogger,
] as any;
