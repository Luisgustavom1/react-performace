import React from "react"

export const useLocalStorage = <T extends string | object>(item: string, initialValue = ''): [string, React.Dispatch<(value: T) => T>] => {
  const [localStorageItem, setLocalStorageItem] = React.useState(() => {
    const itemStoraged = localStorage.getItem(item);
    
    if (itemStoraged) {
      return JSON.parse(itemStoraged)
    }

    return initialValue
  })

  const storeItem = (fn: (value: T) => T) => {
    const valueToStore = fn(localStorageItem)

    setLocalStorageItem(valueToStore)
    localStorage.setItem(item, JSON.stringify(valueToStore))
  }

  return [localStorageItem, storeItem]
}