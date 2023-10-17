export interface PokemonDto {
    id: number;
    name: string;
    height: number;
    weight: number;
    spritesPixel:string;
    sprites: string;
    types: Types[];
    description?: string;
}

interface Types {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}