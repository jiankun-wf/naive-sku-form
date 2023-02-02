import { PropType as VuePropType } from "vue";

declare type Recordable<T = any> = Record<string, T>;

declare type Nullable<T> = T | null;

declare type NonNullable<T = any> = T extends null | undefined ? never : T;

declare type PropType<T> = VuePropType<T>;

declare type Writable<T> = {
  -readonly [P in keyof T]: T[P];
};

declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T;
};