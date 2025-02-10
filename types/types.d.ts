declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  interface NodeRequire {
    context: (
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp
    ) => {
      keys: () => string[];
      (key: string): any;
    };
  }
}

export {};
