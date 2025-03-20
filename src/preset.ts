import { Obj } from '@/types';
import { getFile } from '@/lib';
import { BaseError } from '@/errors';


// Constants

export const DEFAULT_PRESET_DEPTH = 3;


// Functions

export async function getPreset(filename: string, depth = DEFAULT_PRESET_DEPTH): Promise<Obj | null> {

    // Doing some checks

    if (depth <= 0) throw new BaseError('Unable to read the preset: The preset is too deep. Try to reduce the usage of "extends" directive or increase the limit.');


    // Getting the preset

    const presetJson = getFile(filename);

    if (!presetJson) return null;


    // Parsing the preset

    const preset = JSON.parse(presetJson);


    // If the preset has a parent

    const presetParentFilename = preset?.extends ?? null;

    if (presetParentFilename) {
        const presetParent = await getPreset(presetParentFilename, depth - 1) ?? {};
        return { ...presetParent, ...preset };
    }


    return preset;
}
