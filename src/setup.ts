import fs from 'fs';
import * as path from 'path';
import { ExtraConfig, Obj } from '@/types';
import { getPreset } from '@/preset';
import { objToEnv } from '@/env';
import config from '../.epconfg.json';
import * as console from "node:console";


// Constants

export const CONFIG_NAME = '.epconfg.json';

export const DEFAULT_INPUT_ENV_NAME = '.env.example';

export const DEFAULT_OUTPUT_ENV_NAME = '.env';

export const DEFAULT_PRESET_NAME = '.presets/prod.json';

export const DEFAULT_PRESET: Obj = {};

// export const DEFAULT_LOGGING = 0;


// Variables

const dir = process.cwd();


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

    const envInputFilename = config?.envInput || DEFAULT_INPUT_ENV_NAME;
    const envInputPath = path.join(dir, envInputFilename);
    const envInput = fs.readFileSync(envInputPath, 'utf-8');


    // Getting the presets

    const presetFilename = config.preset ?? DEFAULT_PRESET_NAME;
    const presetPath = path.join(dir, presetFilename);
    const preset = await getPreset(presetPath) ?? DEFAULT_PRESET;


    // Writing the ENV

    const envOutputFilename = config?.envOutput ?? DEFAULT_OUTPUT_ENV_NAME;
    const env = objToEnv(preset);
    const newEnv = envInput + '\n' + env;


    fs.writeFile(envOutputFilename, newEnv.trim(), (err) => {
        if (err) throw err;
    });
}


init().catch(console.error);
