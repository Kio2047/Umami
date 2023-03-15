declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      DB_USER_USERNAME: string;
      DB_USER_PASSWORD: string;
      DB_NAME: string;
      JWT_SECRET: string;
      // LOCAL_DB_PORT?: number;
      // PORT?: number;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
}

// Convert file into a module by adding empty export statement
export {};
