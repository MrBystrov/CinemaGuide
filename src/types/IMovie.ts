export interface IMovie {
    id: number,
    title: string,
    releaseYear: number,
    runtime: number,
    plot: string,
    genres: string[],
    tmdbRating: number,
    backdropUrl: string,
    posterUrl: string,
    language: string,
    budget: Number,
    director: string,
    production: string,
    awardsSummary: string
    revenue: number
    trailerYouTubeId: 'string'
}
