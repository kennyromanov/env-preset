export type Obj<T = any> = Record<string, T>;

export type Config = {
    envInput: string,
    envOutput: string,
    logging: number,
};

export type ExtraConfig = Config & {
    preset: string,
};
