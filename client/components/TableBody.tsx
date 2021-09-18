import Link from "next/link";
import { IHive } from "../store/entities/hives";
import { ISell } from "../store/entities/sells";
import { IExpense } from "../store/entities/expenses";
import { IHarvest } from "../store/entities/harvests";
function TableBody({
  rows,
  displayRowKeys,
}: {
  rows: (IHarvest | ISell | IExpense | IHive)[];
  displayRowKeys: string[];
}) {
  return (
    <>
      {rows.map((row) => (
        <div className="t-row py-2">
          <div className="t-cell">
            <Link href={`${row._id}`}>
              <a>
                <i className="fas fa-eye" />
              </a>
            </Link>
          </div>
          {displayRowKeys.map((key) => (
            <div
              key={key + row._id}
              className="text-right pl-4 whitespace-nowrap t-cell"
            >
              {/* since typeof 'a'[0] = string we don't have to 
              care about hancling it separately
              cases:
              typeof 'some string'[0] = string
              typeof ['some string'][0] = string
              typeof [{some obj}][0] = object
              */}
              {typeof row[key as any] === "object"
                ? row[key].name
                : (row[key] as string)}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default TableBody;
