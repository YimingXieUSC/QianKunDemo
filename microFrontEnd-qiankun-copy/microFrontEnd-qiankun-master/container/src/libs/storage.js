export const saveCurrentApp = (currentApp) => {
  sessionStorage.setItem('currentApp', currentApp)
}

export const getCurrentApp = () => {
  return sessionStorage.getItem('currentApp')
}
