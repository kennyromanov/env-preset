import { Obj } from '@/types';
import fs from 'fs';


// Functions

export function isObject(val: any): val is Obj {
    return val !== null && typeof val === 'object';
}

export function isArray(val: any): val is any[] {
    return Array.isArray(val);
}

export function camelCaseToSnakeCase(val: string): string {

    // Matching the camel case

    const defaultVal = val?.toUpperCase() ?? '';

    const matches = val?.matchAll(RegexHelper.camelCaseItem);

    if (!matches) return defaultVal;


    // Forming the new snake case

    let snakeCase: string = '';

    for (const match of matches) {
        const item = match?.groups?.item ?? null;

        if (!item) continue;

        snakeCase += '_' + item?.toUpperCase();
    }


    return snakeCase.slice(1);
}

export function getFile(filename: string): string|null {
    const isFile = fs.existsSync(filename);

    if (isFile)
        return fs.readFileSync(filename, 'utf-8');
    else
        return null;
}


// Helpers

export class RegexHelper {
    public static camelCaseItem = /(?<item>[A-Z][a-z0-9]*|[a-z]+[0-9]*|[A-Z])/g;
    public static envTpl = /\{(?<name>[a-zA-Z0-9]+)\}/g;
}
