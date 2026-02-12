import { useCallback, useEffect, useState } from "react";
import { drugsApi } from "../../api/endpoints/drugs.api";
import type { Drug, DrugPage } from "../../api/types/drug.types";
import { MoreHorizontalIcon } from "lucide-react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowData,
} from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";

import { adminDrugsApi } from "../../api/endpoints/admin";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Extend TableMeta to include removeData
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableMeta<TData extends RowData> {
    removeData?: (id: number) => void;
  }
}

const columnHelper = createColumnHelper<Drug>();

const columns = [
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
    cell: (info) => info.getValue() / 100,
  }),
  columnHelper.accessor("stock", {
    header: () => "STOCK",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("img", {
    header: () => "IMAGE",
    cell: (info) => (
      <img
        src={info.getValue()}
        alt="Drug"
        className="w-20 h-20 object-cover rounded"
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
    id: "dropDown",
    cell: (props) => {
      const entry = props.row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"} size={"icon"}>
              <MoreHorizontalIcon></MoreHorizontalIcon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <Link to={`/admin/drugs/${entry.id}`}>
              <DropdownMenuItem>
                <span className="w-full h-full text-center">edit</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={async () => {
                const remove = props.table.options.meta?.removeData;
                if (!remove) return;
                remove(entry.id);
              }}
              variant={"destructive"}
            >
              <span className="w-full h-full text-center">delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

  const table = useReactTable({
    data: drugs?.content ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      removeData: async (id: number) => {
        await adminDrugsApi.delete(id);
        await fetchDrugs();
      },
    },
  });

  useEffect(() => {
    fetchDrugs();
  }, [fetchDrugs]);

  return (
    <div className="flex flex-col gap-4">
      <div className="head flex justify-between">
        <p className="font-bold text-2xl">Drugs</p>{" "}
        <Button
          variant={"secondary"}
          onClick={() => navigate("new")}
          className="secondary"
        >
          Add
        </Button>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No drugs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminDrugsPage;
