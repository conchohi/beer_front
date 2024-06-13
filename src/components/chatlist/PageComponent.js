import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import useChatMove from "../../hooks/useChatMove";

const PageComponent = ({ serverData, moveToList }) => {
  const { category, searchTerm, searchType, ordeyBy } = useChatMove();

  return (
    <div className="m-4 flex justify-center items-center">
      {serverData.prev ? (
        <div
          className="text-sm rounded-full cursor-pointer m-2 p-2 text-center font-bold shadow-md"
          onClick={() =>
            moveToList({
              page: serverData.prevPage,
              category: category,
              searchType: searchType,
              searchTerm: searchTerm,
              ordeyBy: ordeyBy,
            })
          }
        >
          <FaCaretLeft size="20" />{" "}
        </div>
      ) : (
        <></>
      )}

      {serverData.pageNumList.map((pageNum) => (
        <div
          key={pageNum}
          className={`cursor-pointer m-2 p-2  text-center rounded-full shadow-md  ${
            serverData.current === pageNum
              ? " bg-slate-800 text-white"
              : "bg-white"
          }`}
          onClick={() =>
            moveToList({
              page: pageNum,
              category: category,
              searchType: searchType,
              searchTerm: searchTerm,
              ordeyBy: ordeyBy,
            })
          }
        >
          {pageNum}
        </div>
      ))}

      {serverData.next ? (
        <div
          className="text-sm rounded-full cursor-pointer m-2 p-2 text-center font-bold shadow-md bg-white"
          onClick={() =>
            moveToList({
              page: serverData.nextPage,
              category: category,
              searchType: searchType,
              searchTerm: searchTerm,
              ordeyBy: ordeyBy,
            })
          }
        >
          <FaCaretRight size="20" />{" "}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default PageComponent;
