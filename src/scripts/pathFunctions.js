import { checkRole } from "./localStorageFunctions"


export const openPath = (path) => {
  return window.open(`${path}`, '_self')
}

export const openLoggedInPath = async (pathUser, pathAdmin) => {
  const isAdmin = await checkRole()
  console.log(isAdmin)

  isAdmin
    ? openPath(pathAdmin)
    : openPath(pathUser)

  // alert(isAdmin)
}