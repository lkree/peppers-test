import React, {useState, useEffect} from "react";
import styled from "styled-components";
import MapImg from '../Assets/img/Map.png';
import cities from '../data/cities';
import {City} from "./City";
import {Photo} from "./Photo";
import zones from '../data/zones';
import accesses from  '../data/accesses';

const Div = styled.div`
  background: url(${MapImg}) no-repeat center;
  width: 841px;
  height: 521px;
`;

export const Map = () => {
  const [photosData, changePhotosData] = useState({
    currentCount: 0,
    src: [],
    coordinates: [],
  });
  const calculateMinMax = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
  const getRandomArrayElement = (array) => array[calculateMinMax(0, array.length-1)];
  const createNewPhotosData = (accesses, zones, renderCount) => {
    const w = (() => {
      const w = () => w;
      w.prototype = {
        /**
         * Functor for initiate chaining
         * @param cb {Function}
         * @param args {*}
         * @returns {Function}
         */
        _then: (cb = () => {}, ...args) => {cb(...args); return w.prototype},
        getAvailablePhotos: (photos, usedPhotos = []) => {
          let randomPhoto = getRandomArrayElement(photos);

          while (usedPhotos.includes(randomPhoto))
            randomPhoto = getRandomArrayElement(photos);

          return randomPhoto;
        },
        /**
         * @param availableCoordinate {Object}
         * @param usedCoordinates {Array<Object>}
         * @returns {{y1: number, x1: number, y2: number, x2: number}}
         */
        getAvailableCoordinates: (availableCoordinate, usedCoordinates = []) => {
          /**
           * @param x1 {Number}
           * @param x2 {Number}
           * @param y1 {Number}
           * @param y2 {Number}
           * @param picSize {Number}
           */
          const getCoordinates = ({x1, x2, y1, y2}, picSize = 60) => {
            const x = calculateMinMax(+x1, +x2), y = calculateMinMax(+y1, +y2);
            return {
              x1: x,
              x2: x + picSize,
              y1: y,
              y2: y + picSize,
            };
          };
          const isIntersection = ({x1, x2, y1, y2}, {x1: _x1, x2: _x2, y1: _y1, y2: _y2}) => {
            if (x1 > _x1 && x1 > _x2)
              return false;
            if (x1 < _x1 && x2 < _x1)
              return false;
            if (y1 > _y1 && y1 > _y2)
              return false;
            if (y1 < _y1 && y2 < _y1)
              return false;

            return true;
          };

          let coordinate = getCoordinates(availableCoordinate);
          let iterationsCount = 0;

          while (!usedCoordinates.every(curr => !isIntersection(coordinate, curr))) {
            coordinate = getCoordinates(availableCoordinate);
            ++iterationsCount;
            if (iterationsCount > 100) return {x1: -100, x2: -100, y1: -100, y2: -100};
          }

          return coordinate;
        },
        getRandomData: () => {
          new Array(renderCount)
            .fill('')
            .forEach(_ => {
              const zoneName = getRandomArrayElement(w.names);
              const usedPhotos = [...w.tempData.map(({photo}) => photo)];
              const photo = w.getAvailablePhotos(zones.find(({name}) => zoneName === name).photos, usedPhotos);
              const usedCoordinates = [...w.tempData.map(({coordinates}) => coordinates)];
              const coordinates = w.getAvailableCoordinates(accesses[getRandomArrayElement(zones.find(({name}) => zoneName === name).access)], usedCoordinates);
              w.tempData.push({
                zoneName, photo, coordinates
              });
            });
        },
        fillTheResult: () => {
          w.result = {
            coordinates: w.tempData.map(({coordinates}) => coordinates),
            src: w.tempData.map(({photo}) => photo),
          };
        },
      };
      Object.setPrototypeOf(w, w.prototype);

      return Object.assign(w, {
        tempData: [],
        result: {},
        names: zones.map(({name}) => name),
      })();
    })();
    const {getRandomData, fillTheResult} = w;

    w
      ._then(getRandomData)
      ._then(fillTheResult);

    return {
      currentCount: renderCount,
      ...w.result
    };
  };
  useEffect(() => {
    setInterval(() => {
      const {maxPhotos} = accesses;
      const renderPhotosCount = calculateMinMax(1, maxPhotos);
      changePhotosData(createNewPhotosData(accesses, zones, renderPhotosCount));
    }, 3000)}, []);
  const renderCities = () => (
    cities.map((props, i) => <City key={i} {...props}/>)
  );
  const renderPhoto = () => photosData.src.map((src, i) => <Photo src={src} coordinates={photosData.coordinates[i]} key={i}/>);

  return (
    <Div>
      {renderCities()}
      {renderPhoto()}
    </Div>
  );
};
