import * as os from 'os';

const _SECOND = 10000;

export const checkOverload = () => {
  setInterval(() => {
    const numCors = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;

    console.log(
      'check SERVER: cores memory(MB)',
      numCors,
      memoryUsage / 1024 / 1024,
    );
  }, _SECOND);
};
