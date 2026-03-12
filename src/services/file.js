import fs from 'node:fs/promises';
import path from 'node:path';
import cloudinary from 'cloudinary';
import { UPLOADS_DIR } from '../constants/paths.js';
import { getEnv } from '../helpers/getEnv.js';
import { ENV_VARS } from '../constants/env.js';
import createHttpError from 'http-errors';

cloudinary.config({
  cloud_name: getEnv(ENV_VARS.CLOUDINARY_CLOUD_NAME),
  api_key: getEnv(ENV_VARS.CLOUDINARY_API_KEY),
  api_secret: getEnv(ENV_VARS.CLOUDINARY_API_SECRET),
});

export const saveFile = async (file) => {
  const saveFileStrategy = getEnv(ENV_VARS.SAVE_FILE_STRATEGY);

  let url;

  switch (saveFileStrategy) {
    case 'local':
      url = await saveFileToLocal(file);
      break;
    case 'cloudinary':
      url = await saveFileToCloudinary(file);
      break;
    default:
      throw createHttpError(
        500,
        `Unknown save file strategy: ${saveFileStrategy}`,
      );
  }
  return url;
};

export const saveFileToLocal = async (file) => {
  await fs.rename(file.path, path.join(UPLOADS_DIR, file.filename));

  return `${getEnv(ENV_VARS.BACKEND_DOMAIN)}/uploads/${file.filename}`;
};

export const saveFileToCloudinary = async (file) => {
  const result = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);

  return result.secure_url;
};
