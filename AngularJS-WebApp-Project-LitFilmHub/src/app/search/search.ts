
export interface Film {
    id: number;
    title: string | null;
    director: string | null;
    genre: string | null;
    releaseYear: number | null;
    rating: string | null;
    synopsis: string | null;
    posterImageUrl: string | null;
}

export interface Book {
    id: number;
    title: string | null;
    author: string | null;
    genre: string | null;
    publicationYear: number | null;
    isbn: string | null;
    summary: string | null;
    coverImageUrl: string | null;
}
