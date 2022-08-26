import { fetchTheLoggedInUser } from "./pureFetchFunctionsReza"

export const getTheStorage = (name) => {
    return localStorage.getItem(name)
}

export const checkRole = async () => {
    const
        userInfo = JSON.parse(getTheStorage('userInfo')),
        { userId, token } = userInfo


    await fetchTheLoggedInUser(userId, token)
        .then(data => {
            // alert(data)
            localStorage.setItem('deskUser', JSON.stringify(data))
        })

    const user = JSON.parse(getTheStorage('deskUser'))
    const { isAdmin } = user
    // alert(isAdmin)
    return isAdmin

}