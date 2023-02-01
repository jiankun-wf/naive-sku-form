declare module 'uuid' {
    export const v4: () => string;
}


declare global {
  declare type Recordable<T = any> = Record<string, T>;

  declare type Nullable<T> = T | null;

  declare type NonNullable<T = any> = T extends null | undefined ? never : T;
}