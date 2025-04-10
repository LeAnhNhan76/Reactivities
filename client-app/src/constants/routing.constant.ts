const RoutingConstants = {
    Home: "home",
    Activities: "activities",
    ActivityDetail: "activities/:id",
    Errors: "errors",
    Profile: "profile/:username",
    NotFound: "*"
}

const HomeRoutingConstants = [
    "",
    RoutingConstants.Home
]

export {
    HomeRoutingConstants, RoutingConstants
}

