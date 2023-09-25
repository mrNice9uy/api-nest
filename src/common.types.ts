export interface IID {
  id: string;
}

export type TOption<KEY extends string = string> = {
  label: string;
  value: KEY;
};
