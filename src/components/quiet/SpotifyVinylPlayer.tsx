"use client";

import React, { useState, useRef, useEffect } from "react";
import playlistData from "@/data/spotify-playlist.json";

type Track = {
  id: string;
  title: string;
  artist: string;
  previewUrl: string;
  spotifyUrl: string;
  duration: number;
};

const TRACKS: Track[] = playlistData.tracks;
const PLAYLIST_URL = playlistData.playlistUrl;
const PLAYLIST_NAME = playlistData.playlistName;

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function SpotifyVinylPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); // 30s preview standard
  // Initial volume is set very low (8% = 0.08)
  const [volume, setVolume] = useState(0.08);
  const [prevVolume, setPrevVolume] = useState(0.08);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pick a random track from BreZzZ on client mount after hydration finishes
  useEffect(() => {
    if (TRACKS.length > 0) {
      setTrackIndex(Math.floor(Math.random() * TRACKS.length));
    }
  }, []);

  const currentTrack = TRACKS[trackIndex] || TRACKS[0];

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, trackIndex]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {
        // Handled if browser interrupts or user switches fast
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, trackIndex, volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    if (isShuffle) {
      let nextIndex = Math.floor(Math.random() * TRACKS.length);
      if (nextIndex === trackIndex && TRACKS.length > 1) {
        nextIndex = (trackIndex + 1) % TRACKS.length;
      }
      setTrackIndex(nextIndex);
    } else {
      setTrackIndex((prev) => (prev + 1) % TRACKS.length);
    }
    setCurrentTime(0);
  };

  const handlePrev = () => {
    if (currentTime > 3) {
      if (audioRef.current) audioRef.current.currentTime = 0;
      setCurrentTime(0);
    } else {
      setTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
      setCurrentTime(0);
    }
  };

  const handleSeek = (percentage: number) => {
    const target = (percentage / 100) * (duration || 30);
    setCurrentTime(target);
    if (audioRef.current) {
      audioRef.current.currentTime = target;
    }
  };

  const handleVolumeChange = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setVolume(clamped);
    if (clamped > 0) setPrevVolume(clamped);
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  };

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      handleVolumeChange(0);
    } else {
      handleVolumeChange(prevVolume || 0.15);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col items-center group/he select-none my-2">
      {/* Hidden Audio Player connected to Spotify CDN preview */}
      <audio
        ref={audioRef}
        key={currentTrack.previewUrl}
        src={currentTrack.previewUrl}
        preload="auto"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
              setDuration(audioRef.current.duration);
            }
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume;
            if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
              setDuration(audioRef.current.duration);
            } else {
              setDuration(30);
            }
          }
        }}
        onEnded={handleNext}
      />

      {/* Top Vinyl Record (slides into player sleeve on hover) */}
      <div className="relative z-0 h-16 -mb-2 transition-all duration-200 group-hover/he:h-0">
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          className={`duration-500 border-4 rounded-full shadow-md border-zinc-400 transition-all ${
            isPlaying ? "animate-[spin_3s_linear_infinite]" : "animate-[spin_6s_linear_infinite]"
          }`}
        >
          <g>
            <rect width="128" height="128" fill="black" />
            <circle cx="20" cy="20" r="2" fill="white" />
            <circle cx="40" cy="30" r="2" fill="white" />
            <circle cx="60" cy="10" r="2" fill="white" />
            <circle cx="80" cy="40" r="2" fill="white" />
            <circle cx="100" cy="20" r="2" fill="white" />
            <circle cx="120" cy="50" r="2" fill="white" />
            <circle cx="90" cy="30" r="10" fill="white" fillOpacity="0.5" />
            <circle cx="90" cy="30" r="8" fill="white" />
            <path
              d="M0 128 Q32 64 64 128 T128 128"
              fill="#10b981"
              stroke="black"
              strokeWidth="1"
            />
            <path
              d="M0 128 Q32 48 64 128 T128 128"
              fill="#059669"
              stroke="black"
              strokeWidth="1"
            />
            <path
              d="M0 128 Q32 32 64 128 T128 128"
              fill="#047857"
              stroke="black"
              strokeWidth="1"
            />
            <path
              d="M0 128 Q16 64 32 128 T64 128"
              fill="#10b981"
              stroke="black"
              strokeWidth="1"
            />
            <path
              d="M64 128 Q80 64 96 128 T128 128"
              fill="#059669"
              stroke="black"
              strokeWidth="1"
            />
          </g>
        </svg>
        <div className="absolute z-10 w-8 h-8 bg-white border-4 rounded-full shadow-sm border-zinc-400 top-12 left-12" />
      </div>

      {/* Main Player Deck Card */}
      <div className="z-30 flex flex-col w-40 h-20 transition-all duration-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md group-hover/he:h-44 group-hover/he:w-80 rounded-2xl shadow-zinc-400 dark:shadow-black/60 overflow-hidden relative">
        {/* Upper metadata row: Mini spinning vinyl & Song title + Volume pill */}
        <div className="flex flex-row w-full h-0 group-hover/he:h-20 transition-all duration-200 relative">
          <div className="relative flex items-center justify-center w-24 h-24 group-hover/he:-top-6 group-hover/he:-left-4 opacity-0 group-hover/he:animate-[spin_3s_linear_infinite] group-hover/he:opacity-100 transition-all duration-100 flex-shrink-0">
            <svg
              width="96"
              height="96"
              viewBox="0 0 128 128"
              className="duration-500 border-4 rounded-full shadow-md border-zinc-400"
            >
              <g>
                <rect width="128" height="128" fill="black" />
                <circle cx="20" cy="20" r="2" fill="white" />
                <circle cx="40" cy="30" r="2" fill="white" />
                <circle cx="60" cy="10" r="2" fill="white" />
                <circle cx="80" cy="40" r="2" fill="white" />
                <circle cx="100" cy="20" r="2" fill="white" />
                <circle cx="120" cy="50" r="2" fill="white" />
                <circle cx="90" cy="30" r="10" fill="white" fillOpacity="0.5" />
                <circle cx="90" cy="30" r="8" fill="white" />
                <path
                  d="M0 128 Q32 64 64 128 T128 128"
                  fill="#10b981"
                  stroke="black"
                  strokeWidth="1"
                />
                <path
                  d="M0 128 Q32 48 64 128 T128 128"
                  fill="#059669"
                  stroke="black"
                  strokeWidth="1"
                />
                <path
                  d="M0 128 Q32 32 64 128 T128 128"
                  fill="#047857"
                  stroke="black"
                  strokeWidth="1"
                />
                <path
                  d="M0 128 Q16 64 32 128 T64 128"
                  fill="#10b981"
                  stroke="black"
                  strokeWidth="1"
                />
                <path
                  d="M64 128 Q80 64 96 128 T128 128"
                  fill="#059669"
                  stroke="black"
                  strokeWidth="1"
                />
              </g>
            </svg>
            <div className="absolute z-10 w-6 h-6 bg-white border-4 rounded-full shadow-sm border-zinc-400 top-9 left-9" />
          </div>

          <div className="flex flex-col justify-center w-full pl-3 -ml-24 overflow-hidden group-hover/he:-ml-3 text-nowrap pr-28">
            <a
              href={currentTrack.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 transition-colors truncate block"
              title={`Open "${currentTrack.title}" on Spotify`}
            >
              {currentTrack.title}
            </a>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {currentTrack.artist}
            </p>
          </div>

          {/* Volume Control Pill (Top Right on hover) */}
          <div className="absolute top-2.5 right-2.5 hidden group-hover/he:flex items-center gap-1.5 bg-zinc-100/90 dark:bg-zinc-800/90 backdrop-blur-xs px-2 py-1 rounded-full border border-black/5 dark:border-white/5 transition-opacity z-40">
            <button
              type="button"
              onClick={toggleMute}
              title={volume === 0 ? "Unmute" : `Mute (Volume: ${Math.round(volume * 100)}%)`}
              className="text-zinc-500 hover:text-emerald-500 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors cursor-pointer flex items-center justify-center p-0.5"
            >
              {volume === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : volume <= 0.3 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              title={`Volume: ${Math.round(volume * 100)}%`}
              className="w-12 h-1 bg-zinc-300 dark:bg-zinc-600 rounded-full appearance-none cursor-pointer accent-emerald-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <span className="text-[9.5px] font-mono text-zinc-500 dark:text-zinc-400 w-5 text-right tabular-nums select-none">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>

        {/* Progress track */}
        <div className="flex flex-row mx-3 mt-3 bg-emerald-50 dark:bg-zinc-800 rounded-md min-h-4 group-hover/he:mt-0 items-center px-1">
          <span className="hidden pl-2 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 group-hover/he:inline-block">
            {formatTime(currentTime)}
          </span>
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent || 0}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="w-24 group-hover/he:w-full flex-grow h-1 mx-2 my-auto bg-gray-300 dark:bg-zinc-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-zinc-800 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
          />
          <span className="hidden pr-2 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 group-hover/he:inline-block">
            {formatTime(duration)}
          </span>
        </div>

        {/* Controls Row */}
        <div className="flex flex-row items-center justify-center flex-grow mx-3 space-x-4">
          {/* Shuffle / Repeat */}
          <button
            type="button"
            onClick={() => setIsShuffle((s) => !s)}
            title={isShuffle ? "Shuffle from BreZzZ: Active" : "Sequential mode"}
            className="flex items-center justify-center w-0 h-full cursor-pointer group-hover/he:w-12 transition-all duration-200 text-zinc-500 hover:text-emerald-500"
          >
            {isShuffle ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shuffle text-emerald-500"
              >
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
                <line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-repeat text-zinc-500"
              >
                <polyline points="17 1 21 5 17 9" />
                <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                <polyline points="7 23 3 19 7 15" />
                <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
            )}
          </button>

          {/* Previous Track */}
          <button
            type="button"
            onClick={handlePrev}
            title="Previous track"
            className="flex items-center justify-center w-10 h-full cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-skip-back"
            >
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1="5" y1="19" x2="5" y2="5" />
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            type="button"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : `Play random song from ${PLAYLIST_NAME}`}
            className="flex items-center justify-center w-12 h-full cursor-pointer text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 transition-colors"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-pause"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-play ml-0.5"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>

          {/* Next Track */}
          <button
            type="button"
            onClick={handleNext}
            title="Next random track"
            className="flex items-center justify-center w-10 h-full cursor-pointer text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-skip-forward"
            >
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1="19" y1="5" x2="19" y2="19" />
            </svg>
          </button>

          {/* Spotify BreZzZ Playlist Link */}
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noreferrer"
            title={`Open full ${PLAYLIST_NAME} playlist on Spotify`}
            className="flex items-center justify-center w-0 h-full cursor-pointer group-hover/he:w-12 transition-all duration-200 text-zinc-500 hover:text-emerald-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-list"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
