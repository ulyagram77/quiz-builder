import { ConfigService } from '@nestjs/config';
import * as path from 'node:path';

export const DATA_FOLDER_PATH = path.resolve(__dirname, '../../data');

export const isDevMode = (configService: ConfigService) =>
  configService.getOrThrow('NODE_ENV') === 'development';
