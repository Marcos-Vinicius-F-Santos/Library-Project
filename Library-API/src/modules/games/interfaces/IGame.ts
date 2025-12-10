export interface IGameCreationData {
    title: string;
    releaseYear: number;
    developer: string;
    publisherId: number;
    sagaFranchise: string;
    platformIds: number[];
    genreIds: number[];
}

export interface IGame {
    mediaId: number;
    title: string;
    developer: string;
    publisherName: string;
}