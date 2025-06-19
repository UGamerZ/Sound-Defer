import { RoleDTO } from "@/types/role";
import { PlaylistDTO } from "@/types/playlist";
import { TrackDTO } from "@/types/track";

export interface UserDTO {
  readonly login: string;
  readonly password: string;
  readonly roles: RoleDTO[];
  readonly savedPlaylists: PlaylistDTO[];
  readonly tracks: TrackDTO[];
  readonly createdAt: string;
  readonly updatedAt: string;
}
