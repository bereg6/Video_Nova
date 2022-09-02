export function blur() {
    document.getElementById("footer").classList.add("active")
    document.getElementById("header").classList.add("active")
    if (document.getElementById("home")) {
        document.getElementById("home").classList.add("active")
    } else {
        document.getElementById("profile__wrapper").classList.add("active")
    }
}

export function unBlur() {
    document.getElementById("footer").classList.remove("active")
    document.getElementById("header").classList.remove("active")
    if (document.getElementById("home")) {
        document.getElementById("home").classList.remove("active")
    } else {
        document.getElementById("profile__wrapper").classList.remove("active")
    }
}