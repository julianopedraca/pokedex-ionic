export interface PokemonDto {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: string;
    types: Types[];
}

interface Types {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}