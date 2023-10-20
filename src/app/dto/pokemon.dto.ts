export interface PokemonDto {
    id: number;
    name: string;
    height: number;
    weight: number;
    spritesPixel:string;
    sprites: string;
    types: Types[];
    stats: Stat[];
    description?: string;
    isFavorite?: boolean;
}

interface Types {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

interface Stat {
    base_stat: number,
    stat: {
        name: string
    }
}