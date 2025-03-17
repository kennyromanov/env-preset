import { Obj } from '@/types';
import { getFile } from '@/lib';


// Functions

export async function getPreset(filename: string): Promise<Obj | null> {
    const preset = getFile(filename);

    if (!preset) return null;

    return JSON.parse(preset);
}
