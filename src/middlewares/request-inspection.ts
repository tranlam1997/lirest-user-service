import {logger} from '../common/winston';
import { BaseRequest } from '../base/request';
import { NextFunction } from 'express';
import { BaseResponse } from '@src/base/response';
import requestIp from 'request-ip';

const RequestLogger = logger('RequestInspection');
// log essentail info about the request
export default function requestInspectionMiddleware(req: BaseRequest, _res: BaseResponse, next: NextFunction) {
  RequestLogger.info(`Request received:
    Method: ${req.method},
    Path: ${req.path},
    Body: ${JSON.stringify(req.body)},
    Query: ${JSON.stringify(req.query)},
    Params: ${JSON.stringify(req.params)},
    Headers: ${JSON.stringify(req.headers)},
    Referer: ${req.headers.referer},
    User-Agent: ${req.headers['user-agent']},
    IpAddress: ${requestIp.getClientIp(req)},
    Port: ${req.socket.localPort},
    OriginalUrl: ${req.originalUrl},
    Protocol: ${req.protocol},
    Hostname: ${req.hostname},
  `);
  next();
}