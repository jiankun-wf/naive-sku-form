import { PropType as VuePropType } from "vue";

declare global {
  export declare type Recordable<T = any> = Record<string, T>;

  export declare type Nullable<T> = T | null;
  
  export declare type NonNullable<T = any> = T extends null | undefined ? never : T;
  
  export declare type PropType<T> = VuePropType<T>;
  
  export declare type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };
  
  export declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
}
