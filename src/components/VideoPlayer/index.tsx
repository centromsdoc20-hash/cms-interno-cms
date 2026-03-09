// components/VideoPlayer/index.tsx
import { useState, useRef } from 'react';
import styles from './styles.module.scss';

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (): void => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleTimeUpdate = (): void => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = (): void => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFullscreen = (): void => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleVideoEnd = (): void => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
    setCurrentTime(0);
  };

  return (
    <div className={styles.videoPlayerContainer}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          src={videoUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleVideoEnd}
          onClick={togglePlay}
          className={styles.video}
        />
        
        <div className={styles.videoControls}>
          <button onClick={togglePlay} className={styles.playButton}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <span className={styles.timeDisplay}>
            {formatTime(currentTime)}
          </span>
          
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className={styles.seekBar}
          />
          
          <span className={styles.timeDisplay}>
            {formatTime(duration)}
          </span>
          
          <button onClick={handleFullscreen} className={styles.fullscreenButton}>
            ⛶
          </button>
        </div>
      </div>
    </div>
  );
};