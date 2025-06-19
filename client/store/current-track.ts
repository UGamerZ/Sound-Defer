import { makeAutoObservable } from "mobx";
import { TrackDTO } from "@/types/track";

class CurrentTrackState {
  currentTrack: TrackDTO | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setTrack(track: TrackDTO | undefined) {
    this.currentTrack = track;
  }
}

export const currentTrackState = new CurrentTrackState();
