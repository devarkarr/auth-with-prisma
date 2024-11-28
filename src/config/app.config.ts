import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  PORT: process.env.PORT ?? 300,
  API_VERSION: process.env.API_VERSION,

  CLOUDINARY_CLOUD_NAME:'dtbegxopg', //process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY:'883425885163139' ,//process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET:'XOe9BRU3tQAXh9q7TGfg7jURUUU', //process.env.CLOUDINARY_API_SECRET,

//   CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
//   CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
//   CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
//   CLOUDINARY_API_URL: process.env.CLOUDINARY_API_URL,
}));

