import { useState, useEffect, useLayoutEffect, useRef } from 'react';

const useAnchor = (sourceX, sourceY, destX, destY) => {
  // ex 'bottom', 'left', 'top', 'left'


  const ref = useRef(null);
  console.log('ref :', ref);
  const [elementOffset, setElementOffset] = useState(null);



  useEffect(() => {
    const elRect = ref.current.getBoundingClientRect();
    const x = elRect[sourceX];
    const y = destY === 'right' ? window.innerWidth - elRect[sourceY] : elRect[sourceY];
    console.log('x = ', x, 'y = ', y);
    setElementOffset({
      [destX]: x + window.scrollX,
      [destY]: y + window.scrollY
    });
  }, []);

  // I don't think this useLayoutEffect is getting run

  useLayoutEffect(() => {
    console.log('layout effect useAnchor');
    const elRect = ref.current.getBoundingClientRect();
    console.log('elRect :', elRect);
    const x = elRect[sourceX];
    const y = destY === 'right' ? window.innerWidth - elRect[sourceY] : elRect[sourceY];
    const updateMenuPos = () => {
      setElementOffset({
        [destX]: x + window.scrollX,
        [destY]: y + window.scrollY
      });
    }
    window.addEventListener('resize', updateMenuPos);
    // updateMenuPos();
    return () => {
      window.removeEventListener('resize', updateMenuPos);
    }
  }, []);

  return [ ref, elementOffset ];
};

export default useAnchor;
