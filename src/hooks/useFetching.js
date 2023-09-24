import {useState} from "react";

export const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('')
}