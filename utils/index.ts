import { readdir, stat } from 'fs/promises';
import { extname, resolve } from 'path';

export async function generateLoggingServiceOptions(
  folderPath: string,
  size: number,
) {
  const options = {
    id: 1,
    bytesWritten: 0,
    folderPath,
    size,
  };
  const folder = await readdir(folderPath);
  const logs = folder.filter((file) => extname(file) === '.log');

  if (logs.length) {
    const lastLogName = logs.at(-1);
    const lastLogPath = resolve(folderPath, lastLogName);
    const lastLog = await stat(lastLogPath);

    options.id = logs.length;

    if (lastLog.size < size) {
      options.bytesWritten = lastLog.size;
    }
  }

  return options;
}
