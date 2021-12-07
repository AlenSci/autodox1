import { useEffect, useState } from 'react'

function useLocalStorage(key, initialState) {
      const [value, setValue] = useState(() => {
            const jsonV = localStorage.getItem(key)
            if (jsonV != null) return JSON.parse(jsonV)
            if (typeof initialState === 'function') { return initialState() }
            else { return initialState }
      })

      useEffect(() => {
            localStorage.setItem(key, JSON.stringify(value))
      }, [key, value])

      return [value, setValue]
}

export default useLocalStorage
