
const isUserAdmin = function () {

    const user = localStorage.getItem("user");

    if (!user) return false;

    const isAdmin = JSON.parse(user).roleId === 1

    return isAdmin;
}

export {
    isUserAdmin
}