import { Obj } from '@/types';
import { isObject, isArray, camelCaseToSnakeCase } from '@/lib';

export function arrToEnvVal(val: any[]): string {
    let newVal: string = '';

    for (const item of val) {
        const isObj = isObject(val);

        if (isObj)
            newVal += ',' + JSON.stringify(item);
        else
            newVal += ',' + String(item);
    }

    return newVal.slice(1);
}

export function toEnvVal(val: any): string {
    const isObj = isObject(val);
    const isArr = isArray(val);

    if (isObj)
        return JSON.stringify(val);
    if (isArr)
        return arrToEnvVal(val);
    else
        return String(val);
}

export function objToEnv(val: Obj): string {
    let result = '';

    for (const name in val) {
        if (!val.hasOwnProperty(name)) continue;

        const value = val[name] ?? '';

        result += '\n' + camelCaseToSnakeCase(name) + '=' + toEnvVal(value);
    }

    return result.trim();
}

export default objToEnv;
