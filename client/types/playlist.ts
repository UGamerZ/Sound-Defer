export interface PlaylistDTO {
  readonly name: string;
  readonly description: string;
  readonly trackIDs: number[];
  isAlbum?: boolean;
}
