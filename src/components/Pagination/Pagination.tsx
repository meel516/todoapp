import { Button } from "../Button/Button";

interface PaginationProps {
  perPage: number;
  pageNo: number;
  setPageNumber: (page: number) => void;
  totalCount: number;
  hasPrev:number,
  hasNex:number
}

const Pagination: React.FC<PaginationProps> = ({ perPage, pageNo, setPageNumber,totalCount,hasNex,hasPrev }) => {
  return (
    <div className="flex gap-2">
      <Button disabled={!hasPrev} onClick={() => pageNo > 1 && setPageNumber(pageNo - 1)}>Prev</Button>
      <span>{pageNo} of {totalCount}</span>
      <Button disabled={!hasNex} onClick={() => setPageNumber(pageNo + 1)}>Next</Button>
    </div>
  );
};

export default Pagination;
