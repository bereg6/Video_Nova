/*----------blur----------*/
export function blur() {
    document.getElementById("footer").classList.add("active")
    document.getElementById("header").classList.add("active")
    if (document.getElementById("home")) {
        document.getElementById("home").classList.add("active")
        setTimeout(() => {
                document.getElementsByClassName("form")[0].style.opacity = "1"
        }, 300)
    } else {
        document.getElementById("profile__wrapper").classList.add("active")
        setTimeout(() => {
            if (document.getElementsByClassName("form")) {
                document.getElementsByClassName("form")[0].style.opacity = "1"
            }
        }, 300)
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