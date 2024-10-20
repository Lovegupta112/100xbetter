
import {useRef,useEffect} from 'react'

const useDebounce = (fn,delay) => {

    const ref=useRef();

    clearTimeout(ref.current);
    ref.current=setTimeout(fn,delay);
}

export default useDebounce;