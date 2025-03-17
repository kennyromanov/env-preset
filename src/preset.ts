import { Obj } from '@/types';
import fs from 'fs';


// Functions

export async function getPreset(filename: string): Promise<Obj | null> {
    const preset = fs.readFileSync(filename, 'utf-8');
    return JSON.parse(preset);
}
