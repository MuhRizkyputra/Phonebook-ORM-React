import SearchBar from "./SearchBar";
import Phonelist from "./PhoneList";



export default function PhoneBox({
    sort,
    setSort,
    item,
    setItem,
    isLoading,
    setIsLoading,
    setKeyword,
    keyword,
    UpdateData,
    Delete,
    page,
    setPage
}) {

    return (
        <div className="container">
            <div className="header">
                <SearchBar
                    keyword={keyword}
                    setKeyword={setKeyword}
                    sort={sort}
                    setSort={setSort} 
                    setPage={setPage}
                    />
            </div>
            <div className="body">
                <Phonelist
                    item={item}
                    setItem={setItem}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading} 
                    setSort={setSort}
                    sort={sort}
                    UpdateData={UpdateData}
                    Delete={Delete}
                    setPage={setPage}
                    page={page}
                    />
            </div>

        </div>
    )
}
