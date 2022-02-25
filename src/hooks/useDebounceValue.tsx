import {useEffect, useState} from 'react';

const useDebounceValue = (input: string = '', time: number = 500) => {
  const [debounce, setDebounce] = useState(input);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(input);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return debounce;
};

export default useDebounceValue;
