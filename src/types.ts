export type Obj<T = any> = Record<string, T>;

export type Config = {
    envInput?: string | 0,
    envOutput: string,
    logging: number,
};

export type ExtraConfig = Config & {
    preset: string,
};
