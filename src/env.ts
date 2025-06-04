import { Obj } from '@/types';
import {camelCaseToSnakeCase, isArray, isObject} from '@/lib';


// Constants

export const DEFAULT_OBJ_DEPTH = 3;


export function objToEnv(val: Obj, depth: number = DEFAULT_OBJ_DEPTH): string {

    // Doing some checks

    if (depth <= 0) throw new Error(`Unable to get the env: The object is too deep: '${depth}'`);


    // Defining some variables

    let result: string = '';


    // Defining some functions

    const add = (name: string, val: any): void => {
        result += '\n' + camelCaseToSnakeCase(name) + '=' + val;
    }


    // Iterating for each property

    for (const name in val) {
        if (!val.hasOwnProperty(name)) continue;

        const value = val[name] ?? '<error>';


        // Transforming the value

        if (isArray(value)) add(name, value.map(i => {
            if (isObject(i))
                return JSON.stringify(value);
            else
                return i;
        }));

        else if (isObject(value))
            add(name, JSON.stringify(value));

        else
            add(name, value);
    }


    return result.trim();
}

export default objToEnv;
