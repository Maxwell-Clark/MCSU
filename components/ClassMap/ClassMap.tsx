'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Text, Stack, Badge, Group } from '@mantine/core';
import { IconMapPin, IconClock, IconUser } from '@tabler/icons-react';
import { locations, classes, mapCenter, getClassesByLocation, dayNames } from '@/data/classData';
import 'leaflet/dist/leaflet.css';
import styles from './ClassMap.module.css';

// Fix for default marker icons in Leaflet with webpack
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const virtualIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: styles.virtualMarker,
});

export function ClassMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className={styles.placeholder}>
        <Text c="dimmed">Loading map...</Text>
      </div>
    );
  }

  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={mapCenter as LatLngExpression}
        zoom={13}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => {
          const locationClasses = getClassesByLocation(location.id);
          const isVirtual = location.id === 'virtual';

          return (
            <Marker
              key={location.id}
              position={location.coordinates as LatLngExpression}
              icon={isVirtual ? virtualIcon : defaultIcon}
            >
              <Popup>
                <Stack gap="xs" className={styles.popup}>
                  <Group gap="xs">
                    <IconMapPin size={16} />
                    <Text fw={600} size="sm">
                      {location.name}
                    </Text>
                  </Group>
                  <Text size="xs" c="dimmed">
                    {location.address}
                  </Text>

                  {locationClasses.length > 0 && (
                    <>
                      <Text size="xs" fw={500} mt="xs">
                        Classes at this location:
                      </Text>
                      {locationClasses.map((classEvent) => (
                        <div key={classEvent.id} className={styles.classItem}>
                          <Group gap="xs" wrap="nowrap">
                            <Badge size="xs" color={classEvent.color} variant="light">
                              {classEvent.dayOfWeek !== undefined
                                ? dayNames[classEvent.dayOfWeek]
                                : 'TBD'}
                            </Badge>
                            <Text size="xs" fw={500}>
                              {classEvent.title}
                            </Text>
                          </Group>
                          <Group gap={4} mt={2}>
                            <IconClock size={12} />
                            <Text size="xs" c="dimmed">
                              {classEvent.startTime} - {classEvent.endTime}
                            </Text>
                          </Group>
                          <Group gap={4}>
                            <IconUser size={12} />
                            <Text size="xs" c="dimmed">
                              {classEvent.instructor}
                            </Text>
                          </Group>
                        </div>
                      ))}
                    </>
                  )}
                </Stack>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
