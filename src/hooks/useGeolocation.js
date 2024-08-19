import { useState } from 'react';

export function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition(defaultPosition = null) {
    if (!navigator.geolocation) {
      return new Error('Your browser does not support geolocation');
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );

    return { isLoading, position, error, getPosition };
  }
}
