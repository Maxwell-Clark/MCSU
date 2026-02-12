'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import classes from './Music.module.css';

type MusicVideo = {
  title: string;
  artist?: string;
  duration?: string;
  videoId: string;
  category?: string;
};

type MusicGroup = {
  category: string;
  videos: MusicVideo[];
};

const musicSections: MusicGroup[] = [
  {
    category: 'melodic',
    videos: [
      {
        title: 'Your Smiling Face',
        artist: 'James Taylor',
        duration: '3:34',
        videoId: 'ZSsfNlS42Cc',
        category: 'Melodic',
      },
      {
        title: 'Orinoco Flow',
        artist: 'Enya',
        duration: '3:34',
        videoId: 'LTrk4X9ACtw',
        category: 'Melodic',
      },
      {
        title: 'Why Worry?',
        artist: 'Clannad',
        duration: '4:28',
        videoId: '4Wns465rgGo',
        category: 'Melodic',
      },
    ],
  },
  {
    category: 'Meditation',
    videos: [
      {
        title: 'Life is Love',
        artist: 'Deuter',
        duration: '7:12',
        videoId: 'hc5q94wu1E8',
        category: 'Meditation',
      },
      {
        title: 'Grass Grows By Itself',
        artist: 'Deuter',
        duration: '7:14',
        videoId: 'gKLEmy4d2h0',
        category: 'Meditation',
      },
      {
        title: 'The Man Who Danced Too Slowly',
        artist: 'Baka Beyond',
        duration: '6:07',
        videoId: 'JSBRb7MFy30',
        category: 'Meditation',
      },
    ],
  },
  {
    category: 'Nature',
    videos: [
      {
        title: 'Ngombi',
        artist: 'Baka Beyond',
        duration: '4:53',
        videoId: '89PBXCp-MSI',
        category: 'Nature',
      },
      {
        title: 'Wilderness',
        artist: 'Clannad',
        duration: '2:06',
        videoId: 'qg0ZkKEZLcs',
        category: 'Nature',
      },
      {
        title: 'Highway In the Sun',
        artist: 'Kohala',
        duration: '3:33',
        videoId: 'xuuqviYcZcU',
        category: 'Nature',
      },
    ],
  },
];

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string;
          width: string;
          videoId: string;
          playerVars: Record<string, number>;
          events: {
            onReady: (event: { target: YTPlayer }) => void;
            onStateChange: (event: { data: number }) => void;
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
  destroy: () => void;
}

const Music: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<MusicVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const categories = ['all', ...musicSections.map((section) => section.category.toLowerCase())];

  const filteredVideos = musicSections
    .filter((section) => activeTab === 'all' || section.category.toLowerCase() === activeTab)
    .flatMap((section) => section.videos)
    .filter(
      (video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.artist?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const allVideos = musicSections.flatMap((section) => section.videos);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsPlayerReady(true);
    };

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const initializePlayer = useCallback(
    (videoId: string) => {
      if (!window.YT || !window.YT.Player) return;

      if (playerRef.current) {
        playerRef.current.loadVideoById(videoId);
        return;
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '0',
        width: '0',
        videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            event.target.setVolume(volume);
            setDuration(event.target.getDuration());
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              if (playerRef.current) {
                setDuration(playerRef.current.getDuration());
              }
              progressInterval.current = setInterval(() => {
                if (playerRef.current) {
                  setCurrentTime(playerRef.current.getCurrentTime());
                }
              }, 1000);
            } else if (event.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              if (progressInterval.current) {
                clearInterval(progressInterval.current);
              }
            } else if (event.data === window.YT.PlayerState.ENDED) {
              playNext();
            }
          },
        },
      });
    },
    [volume]
  );

  const playTrack = useCallback(
    (track: MusicVideo) => {
      setCurrentTrack(track);
      setCurrentTime(0);
      if (isPlayerReady) {
        initializePlayer(track.videoId);
      }
    },
    [isPlayerReady, initializePlayer]
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

  const playPrevious = () => {
    if (!currentTrack) return;
    const currentIndex = allVideos.findIndex((v) => v.videoId === currentTrack.videoId);
    const prevIndex = currentIndex === 0 ? allVideos.length - 1 : currentIndex - 1;
    playTrack(allVideos[prevIndex]);
  };

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    setIsMuted(value === 0);
    if (playerRef.current) {
      playerRef.current.setVolume(value);
    }
  };

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
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
      <div id="youtube-player" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />

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

        <Stack gap="sm" style={{ width: '100%' }}>
          {filteredVideos.map((video, index) => (
            <div
              key={index}
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
