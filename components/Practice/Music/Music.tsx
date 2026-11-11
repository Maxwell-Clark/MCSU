'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  Text,
  Group,
  Title,
  Stack,
  Tabs,
  TextInput,
  Badge,
  ActionIcon,
  Slider,
  Box,
} from '@mantine/core';
import {
  IconSearch,
  IconPlayerPlay,
  IconPlayerPause,
  IconPlayerSkipForward,
  IconPlayerSkipBack,
  IconVolume,
  IconVolumeOff,
  IconMusic,
} from '@tabler/icons-react';
import { categoriesInOrder, type ContentItemView } from '@/lib/content-kinds';
import classes from './Music.module.css';

type MusicVideo = {
  id: string;
  title: string;
  artist?: string;
  duration?: string;
  videoId: string;
  category?: string;
};

interface MusicProps {
  /** Active music tracks, in display order (managed in Admin > Media & Resources) */
  items: ContentItemView[];
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string;
          width: string;
          videoId?: string;
          playerVars: Record<string, number>;
          events: {
            onReady: (event: { target: YTPlayer }) => void;
            onStateChange: (event: { data: number }) => void;
            onError: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  loadVideoById: (videoId: string) => void;
  unMute: () => void;
  destroy: () => void;
}

const Music: React.FC<MusicProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<MusicVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [playbackError, setPlaybackError] = useState<string | null>(null);

  const playerRef = useRef<YTPlayer | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  // Track requested before the player finished loading; played from onReady.
  const pendingTrackRef = useRef<MusicVideo | null>(null);
  const volumeRef = useRef(volume);
  const playNextRef = useRef<() => void>(() => {});

  const allVideos = useMemo<MusicVideo[]>(
    () =>
      items
        .filter((item) => item.youtubeId)
        .map((item) => ({
          id: item.id,
          title: item.title,
          artist: item.creator ?? undefined,
          duration: item.duration ?? undefined,
          videoId: item.youtubeId!,
          category: item.category ?? undefined,
        })),
    [items]
  );

  const categories = [
    'all',
    ...categoriesInOrder(items).map((category) => category.toLowerCase()),
  ];

  const filteredVideos = allVideos
    .filter((video) => activeTab === 'all' || video.category?.toLowerCase() === activeTab)
    .filter(
      (video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.artist?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const clearProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const startPlayback = (player: YTPlayer, videoId: string) => {
    // Called synchronously from the click handler so the browser treats it as
    // user-initiated playback and allows sound.
    player.loadVideoById(videoId);
    player.unMute();
    player.setVolume(volumeRef.current);
  };

  // Create a single visible YouTube player once the iframe API is loaded.
  // YouTube refuses to play (or plays muted) in players smaller than 200x200,
  // so the player stays full size and is kept off-screen instead of shrunk.
  useEffect(() => {
    const createPlayer = () => {
      if (playerRef.current) {
        return;
      }
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '200',
        width: '356',
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            setIsPlayerReady(true);
            event.target.setVolume(volumeRef.current);
            if (pendingTrackRef.current) {
              startPlayback(event.target, pendingTrackRef.current.videoId);
              pendingTrackRef.current = null;
            }
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setPlaybackError(null);
              if (playerRef.current) {
                setDuration(playerRef.current.getDuration());
              }
              clearProgress();
              progressInterval.current = setInterval(() => {
                if (playerRef.current) {
                  setCurrentTime(playerRef.current.getCurrentTime());
                }
              }, 1000);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              clearProgress();
            } else if (event.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
              clearProgress();
              playNextRef.current();
            }
          },
          onError: () => {
            // 2/5/100/101/150: invalid id, HTML5 error, removed, or embedding disabled
            setIsPlaying(false);
            clearProgress();
            setPlaybackError("This track can't be played here. Skipping to the next one.");
            playNextRef.current();
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
    }

    return () => {
      clearProgress();
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  const playTrack = useCallback(
    (track: MusicVideo) => {
      setCurrentTrack(track);
      setCurrentTime(0);
      setDuration(0);
      if (isPlayerReady && playerRef.current) {
        startPlayback(playerRef.current, track.videoId);
      } else {
        pendingTrackRef.current = track;
      }
    },
    [isPlayerReady]
  );

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const playNext = useCallback(() => {
    if (!currentTrack) return;
    const currentIndex = allVideos.findIndex((v) => v.videoId === currentTrack.videoId);
    const nextIndex = (currentIndex + 1) % allVideos.length;
    playTrack(allVideos[nextIndex]);
  }, [currentTrack, allVideos, playTrack]);

  useEffect(() => {
    playNextRef.current = playNext;
  }, [playNext]);

  const playPrevious = () => {
    if (!currentTrack) return;
    const currentIndex = allVideos.findIndex((v) => v.videoId === currentTrack.videoId);
    const prevIndex = currentIndex === 0 ? allVideos.length - 1 : currentIndex - 1;
    playTrack(allVideos[prevIndex]);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    if (value > 0) {
      volumeRef.current = value;
    }
    setIsMuted(value === 0);
    if (playerRef.current) {
      playerRef.current.setVolume(value);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume || 70);
        setIsMuted(false);
      } else {
        playerRef.current.setVolume(0);
        setIsMuted(true);
      }
    }
  };

  const handleSeek = (value: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(value, true);
      setCurrentTime(value);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={classes.wrapper}>
      <Stack align="center" gap="xl">
        <div>
          <Title className={classes.sectionTitle} order={2}>
            Meditation Music
          </Title>
          <Text className={classes.tagline}>
            Explore our collection of calming music and nature sounds designed to enhance your
            meditation practice. Each track is carefully selected to help you find peace and
            focus.
          </Text>
        </div>

        {currentTrack && (
          <Box className={classes.playerContainer}>
            <div className={classes.playerVisualizer}>
              <div className={classes.albumArt}>
                <IconMusic size={40} stroke={1.5} />
              </div>
              {isPlaying && (
                <div className={classes.soundBars}>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              )}
            </div>

            <div className={classes.playerInfo}>
              <Text className={classes.playerTitle}>{currentTrack.title}</Text>
              <Text className={classes.playerArtist}>{currentTrack.artist}</Text>
            </div>

            <div className={classes.playerProgress}>
              <Text size="xs" c="dimmed">
                {formatTime(currentTime)}
              </Text>
              <Slider
                value={currentTime}
                onChange={handleSeek}
                max={duration || 100}
                size="xs"
                className={classes.progressSlider}
                label={null}
              />
              <Text size="xs" c="dimmed">
                {formatTime(duration)}
              </Text>
            </div>

            <Group className={classes.playerControls} gap="md">
              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={playPrevious}
                className={classes.controlButton}
              >
                <IconPlayerSkipBack size={20} />
              </ActionIcon>

              <ActionIcon
                variant="filled"
                size="xl"
                radius="xl"
                onClick={togglePlay}
                className={classes.playButton}
              >
                {isPlaying ? <IconPlayerPause size={24} /> : <IconPlayerPlay size={24} />}
              </ActionIcon>

              <ActionIcon
                variant="subtle"
                size="lg"
                onClick={playNext}
                className={classes.controlButton}
              >
                <IconPlayerSkipForward size={20} />
              </ActionIcon>
            </Group>

            <Group className={classes.volumeControl} gap="xs">
              <ActionIcon variant="subtle" size="sm" onClick={toggleMute}>
                {isMuted || volume === 0 ? <IconVolumeOff size={16} /> : <IconVolume size={16} />}
              </ActionIcon>
              <Slider
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                size="xs"
                w={80}
                className={classes.volumeSlider}
                label={null}
              />
            </Group>
          </Box>
        )}

        <div className={classes.videoFrameHidden}>
          <div id="youtube-player" />
        </div>

        {playbackError && (
          <Text size="sm" c="red.7" ta="center">
            {playbackError}
          </Text>
        )}

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          className={classes.tabs}
          classNames={{
            list: classes.tabsList,
            tab: classes.tab,
          }}
        >
          <Tabs.List>
            {categories.map((category) => (
              <Tabs.Tab key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs>

        <TextInput
          placeholder="Search music..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          leftSection={<IconSearch size={16} />}
          style={{ width: '100%' }}
          className={classes.searchInput}
          radius="lg"
        />

        {filteredVideos.length === 0 && (
          <Text c="dimmed" ta="center">
            {allVideos.length === 0 ? 'Music is coming soon.' : 'No tracks match your search.'}
          </Text>
        )}

        <Stack gap="sm" style={{ width: '100%' }}>
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className={`${classes.trackItem} ${currentTrack?.videoId === video.videoId ? classes.trackItemActive : ''}`}
              onClick={() => playTrack(video)}
            >
              <div className={classes.trackLeft}>
                <ActionIcon
                  variant={currentTrack?.videoId === video.videoId ? 'filled' : 'light'}
                  size="lg"
                  radius="xl"
                  className={classes.trackPlayButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (currentTrack?.videoId === video.videoId) {
                      togglePlay();
                    } else {
                      playTrack(video);
                    }
                  }}
                >
                  {currentTrack?.videoId === video.videoId && isPlaying ? (
                    <IconPlayerPause size={18} />
                  ) : (
                    <IconPlayerPlay size={18} />
                  )}
                </ActionIcon>
                <div className={classes.trackInfo}>
                  <Text className={classes.trackTitle}>{video.title}</Text>
                  <Text className={classes.trackArtist}>{video.artist}</Text>
                </div>
              </div>
              <Group gap="sm">
                <Badge className={classes.badge} variant="light" size="sm">
                  {video.category}
                </Badge>
                <Text size="sm" c="dimmed" className={classes.trackDuration}>
                  {video.duration}
                </Text>
              </Group>
            </div>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

export default Music;
