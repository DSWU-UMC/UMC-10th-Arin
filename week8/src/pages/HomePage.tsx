import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../constants/pagination";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { Search } from "lucide-react";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY)
    const {
        data: lps,
        isFetching,
        hasNextPage,
        isPending,
        fetchNextPage,
        isError,
    } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.asc);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            !isFetching && hasNextPage && fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (isError) {
        return <div className={"mt-20"}>Error...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <input 
                className={"border p-4 rounded-sm"}
                placeholder={"검색어를 입력하세요."}
                value={search}
                onChange={(e) => setSearch(e.target)} />

            <div className={
                "grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            }>

            </div>
        </div>
    )

    return <div>HomePage</div>
};

export default HomePage;