import { Obj } from '@/types';
import { isObject, isArray, camelCaseToSnakeCase, RegexHelper } from '@/lib';

export function getEnvTpl(val: string): string[] {

    // Matching the TPL

    const matches = val?.matchAll(RegexHelper.envTpl);

    if (!matches) return [];


    // Getting the TPL

    const result: string[] = [];

    for (const match of matches) {
        const name = match?.groups?.name ?? null;

        if (!name) continue;

        result.push(name);
    }

    return result;
}

export function replaceEnvTpl(val: string, env: Obj): string {
    const items = getEnvTpl(val);
    let result = val;

    for (const name of items) {
        const value = env[name] ?? null;

        if (!value) continue;

        result = result.replace('{' + name + '}', value);
    }

    return result;
}

export function arrToEnvStr(val: any[]): string {
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

export function getEnvStr(val: any): string {
    const isObj = isObject(val);
    const isArr = isArray(val);

    if (isObj && !isArr)
        return JSON.stringify(val);
    if (isArr)
        return arrToEnvStr(val);
    else
        return String(val);
}

export function objToEnv(val: Obj): string {

    // Collapsing all the TPL

    const newVal: Obj = {};

    for (const name in val) {
        if (!val.hasOwnProperty(name)) continue;

        const value = val[name] ?? '<error>';

        newVal[name] = replaceEnvTpl(getEnvStr(value), newVal)
    }


    // Forming the ENV

    let result: string = '';

    for (const name in newVal) {
        if (!val.hasOwnProperty(name)) continue;

        const value = newVal[name] ?? '<error>';

        result += '\n' + camelCaseToSnakeCase(name) + '=' + getEnvStr(value);
    }


    return result.trim();
}

export default objToEnv;
