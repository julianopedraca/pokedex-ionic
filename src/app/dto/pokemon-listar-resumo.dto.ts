export interface PokemonListarResumoDto {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        other:{
            dream_world: {
                front_default: string
            }
        }
    };
    types: []
}