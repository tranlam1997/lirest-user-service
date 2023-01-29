export const isObject = (obj: any): obj is Record<string, any> => {
  return obj !== null && typeof obj === 'object';
};

export const isString = (str: any): str is string => {
  return typeof str === 'string';
};

export const asyncHandler = (...fn: any[]): any => {
  const [fn1, ...fn2] = fn.flat().reverse();
  const handler = fn1;
  const middlewares = fn2.reverse();
  return middlewares
    .map((middleware) => {
      return (req: any, res: any, next: any) => {
        return Promise.resolve(middleware(req, res, next)).catch(next);
      };
    })
    .concat((req: any, res: any, next: any) => {
      return Promise.resolve(handler(req, res, next)).catch(next);
    });
};

export function convertNanosecondsToMilliseconds(nanoSeconds: number): number {
  return nanoSeconds / 1000000;
}
