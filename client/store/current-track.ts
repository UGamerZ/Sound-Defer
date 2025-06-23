import { makeAutoObservable } from "mobx";
import { TrackDTO } from "@/types/track";

let intervalId: NodeJS.Timeout;

class CurrentTrackState {
  currentTrack: TrackDTO | undefined;
  audio: HTMLAudioElement | undefined;
  currentTime = 0;
  duration = 0;
  isPlaying = false;

  constructor() {
    makeAutoObservable(this);
  }

  play() {
    this.audio
      ?.play()
      .then(
        () =>
          (intervalId = setInterval(
            () => currentTrackState.setCurrentTime(),
            1000,
          )),
      );
    this.isPlaying = true;
  }

  pause() {
    this.audio?.pause();
    clearInterval(intervalId);
    this.isPlaying = false;
  }

  setTrack(track: TrackDTO | undefined) {
    clearInterval(intervalId);
    this.currentTrack = track;
    if (typeof window !== "undefined")
      this.audio
        ? (this.audio.src =
            "http://192.168.0.113:3000/audios/" + this.currentTrack?.audio)
        : (this.audio = new Audio(
            "http://192.168.0.113:3000/audios/" + this.currentTrack?.audio,
          ));
  }

  changeTrack(track: TrackDTO | undefined) {
    this.setTrack(track);
    this.play();
  }

  setIsPlaying(value: boolean) {
    this.isPlaying = value;
  }

  setDuration() {
    this.duration = this.audio?.duration ?? 0;
  }

  setCurrentTime() {
    this.currentTime = this.audio?.currentTime ?? 0;
    localStorage.setItem("playTime", this.currentTime.toString());
  }

  setCurrentTimeWithValue(time?: number) {
    if (time && this.audio) this.audio.currentTime = time;
    this.setCurrentTime();
  }
}

export const currentTrackState = new CurrentTrackState();
