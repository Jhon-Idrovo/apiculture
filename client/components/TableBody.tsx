import Link from 'next/link';

import { IExpense } from '../store/entities/expenses';
import { IHarvest } from '../store/entities/harvests';
import { IHive } from '../store/entities/hives';
import { ISell } from '../store/entities/sells';

function TableBody({
  rows,
  keysMapping,
}: {
  rows: (IHarvest | ISell | IExpense | IHive)[];
  keysMapping: any;
}) {
  return (
    <>
      {rows.map((row) => (
        <div className="t-row ">
          <div className="t-cell">
            <Link href={`${row._id}`}>
              <a>
                <i className="fas fa-eye" />
              </a>
            </Link>
          </div>
          {Object.keys(keysMapping).map((key) => (
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
              {keysMapping[key].transform(row[key as keyof typeof row])}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default TableBody;
