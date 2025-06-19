import { TrackDTO } from "@/types/track";
import { UserDTO } from "@/types/user";

export interface AccessResponse {
  readonly access_token: string;
}

export interface TrackResponse {
  readonly tracks: TrackDTO[];
  readonly pages: number;
}

export interface UserResponse {
  readonly users: UserDTO[];
  readonly pages: number;
}
