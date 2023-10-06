import {
    ADMIN_ROUTE, USER_PROFILE_ROUTE,
    LOGIN_ROUTE, REGISTRATION_ROUTE,
    MAIN_ROUTE, REVIEW_ROUTE,
    REVIEW_CREATE_ROUTE, REVIEW_ROUTE_EDIT,
    REVIEWS_STORE_ROUTE,
} from "./utils/consts";
import ReviewsStore from "./pages/ReviewsStore";
import Auth from "./pages/Auth";
import ReviewPage from "./pages/ReviewPage";
import ReviewManipulator from "./pages/ReviewManipulator";
import UserPage from "./pages/UserPage";
import Admin from "./pages/Admin";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: ReviewsStore
    },
    {
        path: REVIEW_ROUTE + '/:id',
        Component: ReviewPage
    },
    {
        path: REVIEWS_STORE_ROUTE + '/:type',
        Component: ReviewsStore
    },
    {
        path: REVIEW_CREATE_ROUTE,
        Component: ReviewManipulator
    },
    {
        path: USER_PROFILE_ROUTE + '/:id',
        Component: UserPage
    },
    {
        path: REVIEW_ROUTE_EDIT + '/:id',
        Component: ReviewManipulator
    }
]

export const adminRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
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
    {
        path: REVIEW_ROUTE + '/:id',
        Component: ReviewPage
    },
    {
        path: REVIEWS_STORE_ROUTE + '/:type',
        Component: ReviewsStore
    },
]