import { UserDTO } from "@/types/user";

export interface TrackDTO {
  readonly id: number;
  readonly name: string;
  readonly genre: string;
  readonly listens: number;
  readonly cover: string;
  readonly audio: string;
  readonly author: UserDTO;
}
