import { useState, useEffect } from 'react';

export const useToken = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(window.localStorage.getItem('ko6aToken'));
  })
  return token;
};

export const useViewer = () => {
  const [viewer, setViewer] = useState(null);

  useEffect(() => {
    setViewer(window.localStorage.getItem('ko6aToken'));
  })
  return viewer;
}