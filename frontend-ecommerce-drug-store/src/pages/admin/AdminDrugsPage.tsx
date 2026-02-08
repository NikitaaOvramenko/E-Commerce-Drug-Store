import { useCallback, useEffect, useState } from "react";
import { drugsApi } from "../../api/endpoints/drugs.api";
import type { Drug, DrugPage } from "../../api/types/drug.types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";
import type { RowData } from "@tanstack/react-table";

// Extend TableMeta to include removeData
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    removeData?: (id: number) => void;
  }
}
import { adminDrugsApi } from "../../api/endpoints/admin";

const columnHelper = createColumnHelper<Drug>();

const column = [
  columnHelper.accessor("id", {
    header: () => "ID",
    cell: (info) => info.getValue(),
  }),

  columnHelper.accessor("name", {
    header: () => "NAME",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: () => "PRICE",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("stock", {
    header: () => "STOCK",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("img", {
    header: () => "IMAGE",
    cell: (url) => (
      <img
        src={url.getValue()}
        alt="Drug"
        className="w-20 h-20 m-auto object-cover"
      />
    ),
  }),
  columnHelper.accessor("brandName", {
    header: () => "BRAND",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("typeName", {
    header: () => "TYPE",
    cell: (info) => info.getValue(),
  }),
  columnHelper.display({
    header: "EDIT",

    cell: (prop) => {
      const entry = prop.row.original;
      return (
        <Link className="h-full w-full" to={`/admin/drugs/${entry.id}`}>
          Edit
        </Link>
      );
    },
  }),
  columnHelper.display({
    header: "REMOVE",

    cell: (prop) => {
      const entry = prop.row.original;

      return (
        <button
          onClick={async () => {
            prop.table.options.meta?.removeData?.(entry.id);
          }}
          className="h-full w-full text-red-600"
        >
          Remove
        </button>
      );
    },
  }),
];

function AdminDrugsPage() {
  const [drugs, setDrugs] = useState<DrugPage>();
  const navigate = useNavigate();

  const fetchDrugs = useCallback(async () => {
    const response: DrugPage = await drugsApi.getAll({ page: 0, size: 10 });
    setDrugs(response);
  }, []);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: drugs?.content ?? [],
    columns: column,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      removeData: async (i: number) => {
        await adminDrugsApi.delete(i);
        fetchDrugs();
      },
    },
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDrugs();
  }, [fetchDrugs]);

  return (
    <div className="flex flex-col gap-10">
      <div className="top flex justify-between h-20 w-full">
        <div className="left flex items-center">
          <p className="font-bold text-3xl">Drugs</p>
        </div>
        <div className="right flex justify-center items-center">
          {" "}
          <button
            onClick={() => navigate("/admin/drugs/new")}
            className="add h-8 w-20 font-bold bg-green-500  rounded"
          >
            Add
          </button>
        </div>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border text-center">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDrugsPage;
