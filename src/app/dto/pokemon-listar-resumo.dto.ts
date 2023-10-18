export interface PokemonListarResumoDto {
    results: any;
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        other:{
            dream_world: {
                front_default: string
            }
        }
    };
    stats: [];
    types: [];
    flavor_text_entries: []
}