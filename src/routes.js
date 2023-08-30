import {
    MAIN_ROUTE, ADMIN_ROUTE,
    LOGIN_ROUTE, REGISTRATION_ROUTE,
    USER_PROFILE_ROUTE, REVIEW_ROUTE,
    REVIEWS_STORE_ROUTE, REVIEW_ROUTE_EDIT
} from "./utils/consts";
import Admin from "./pages/Admin";
import ReviewsStore from "./pages/ReviewsStore";
import Auth from "./pages/Auth";
import ReviewPage from "./pages/ReviewPage";
import UserPage from "./pages/UserPage";

export const authRoutes = [
    // {
    //     path: USER_PROFILE_ROUTE + '/:id',
    //     Component: UserPage
    // },
    // {
    //     path: REVIEW_ROUTE_EDIT + '/:id',
    //     Component: ReviewPage
    // }
]

export const adminRoutes = [
    // {
    //     path: ADMIN_ROUTE,
    //     Component: Admin
    // },
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: ReviewsStore
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    // {
    //     path: REVIEW_ROUTE + '/:id',
    //     Component: ReviewPage
    // },
    // {
    //     path: REVIEWS_STORE_ROUTE + '/:type',
    //     Component: ReviewsStore
    // }
]