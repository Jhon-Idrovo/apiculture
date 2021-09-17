import Link from "next/link";
import { IHarvest, IHive } from "../store/entities/hives";
import { ISell } from "../store/entities/sells";
import { IExpense } from "../store/entities/expenses";
function TableBody({
  rows,
  displayRowKeys,
}: {
  rows: (IHarvest | ISell | IExpense)[];
  displayRowKeys: string[];
}) {
  return (
    <tbody className="t-body">
      {rows.map((row) => (
        <tr className="text-txt-base border-2" key={row._id}>
          <td className="">
            <Link href={`${row._id}`}>
              <a>
                <i className="fas fa-eye" />
              </a>
            </Link>
          </td>
          {displayRowKeys.map((key) => (
            <td
              key={key + row._id}
              className="text-right pl-4 whitespace-nowrap"
            >
              {/* since typeof 'a'[0] = string we don't have to 
              care about hancling it separately
              cases:
              typeof 'some string'[0] = string
              typeof ['some string'][0] = string
              typeof [{some obj}][0] = object
              */}
              {typeof row[key as any] === "object"
                ? null
                : (row[key] as string)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
