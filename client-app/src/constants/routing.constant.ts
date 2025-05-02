const RoutingConstants = {
    Home: "home",
    Activities: "activities",
    ActivityDetail: "activities/:id",
    CreateNewActivity: "activities/create",
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

