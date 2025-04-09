import fs from 'fs';
import minimist from 'minimist';
import * as path from 'path';
import * as console from 'console';
import { ExtraConfig, Obj } from '@/types';
import { getFile } from '@/lib';
import { getPreset } from '@/preset';
import { objToEnv } from '@/env';
import config from '../.epconfig.json';


// Third-parties

const processArgs = process.argv?.slice(2) ?? [];

const args = minimist(processArgs);


// Constants

export const CONFIG_NAME = '.epconfig.json';

export const DEFAULT_INPUT_ENV_NAME = '.env.example';

export const DEFAULT_INPUT_ENV = '# Autogenerated with env-presets';

export const DEFAULT_PRESET_NAME = '.presets/prod.json';

export const DEFAULT_PRESET_DEPTH = 3;

// export const DEFAULT_LOGGING = 0;

export const DEFAULT_OUTPUT_ENV_NAME = '.env';


// Variables

const dir = process.cwd();

const inputArg = args?.input ?? null;

const presetArg = args?.preset ?? null;

const outputArg = args?.output ?? null;


// Functions

export async function getConfig(): Promise<ExtraConfig> {
    const extraConfigPath = path.join(dir, CONFIG_NAME);

    const extraConfig = await getPreset(extraConfigPath);

    return { ...config, ...extraConfig } as ExtraConfig;
}

export async function init(): Promise<void> {

    // Loading custom configuration

    const config = await getConfig();

    // const logging = config?.logging ?? DEFAULT_LOGGING;


    // Getting the input ENV

    const envInputFilename = inputArg || config?.envInput || DEFAULT_INPUT_ENV_NAME;
    const envInputPath = path.join(dir, envInputFilename);
    const envInput = getFile(envInputPath) ?? DEFAULT_INPUT_ENV;


    // Getting the preset

    const presetFilename = presetArg ?? config.preset ?? DEFAULT_PRESET_NAME;
    const presetPath = path.join(dir, presetFilename);
    const preset: Obj = await getPreset(presetPath) ?? {};


    // Writing the ENV

    const envOutputFilename = outputArg ?? config?.envOutput ?? DEFAULT_OUTPUT_ENV_NAME;
    const env = objToEnv(preset);
    const newEnv = envInput + '\n' + env;


    fs.writeFile(envOutputFilename, newEnv.trim(), (err) => {
        if (err) throw err;
    });
}


init().catch(console.error);
