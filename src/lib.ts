import { Obj } from '@/types';


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

    const newMatches = [ ...matches ];

    let snakeCase: string = '';

    for (const match of newMatches) {
        const item = match?.groups?.item ?? null;

        if (!item) continue;

        snakeCase += '_' + item?.toUpperCase();
    }


    return snakeCase.slice(1);
}


// Helpers

export class RegexHelper {
    public static camelCaseItem = /(?<part>[A-Z][a-z0-9]*|[a-z]+[0-9]*|[A-Z])/g;
}
