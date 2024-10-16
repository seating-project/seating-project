"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Edit,
  MoreVertical,
  PlusCircle,
  SlidersHorizontal,
  Trash2,
  View,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/shared";

type Props = {
  data: RouterOutputs["room"]["getRoomsAdminTable"];
  pageCount?: number;
};

const RoomsTable = (props: Props) => {
  const router = useRouter();

  const { toast } = useToast();

  const [isPending, startTransition] = React.useTransition();

  const getRooms = api.room.getRoomsAdminTable.useQuery(undefined, {
    initialData: props.data,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const deleteRoom = api.room.delete.useMutation({
    onSuccess: async () => {
      await getRooms.refetch();
    },
  });

  const columns: ColumnDef<
    RouterOutputs["room"]["getRoomsAdminTable"][number]
  >[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
          className="flex items-center justify-center"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
          className="flex items-center justify-center"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Number",
      accessorKey: "number",
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
    },
    {
      accessorKey: "building",
      header: "Building",
    },
    {
      accessorKey: "block",
      header: "Block",
    },
    {
      accessorKey: "floor",
      header: "Floor",
    },
    {
      // Column for row actions
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const room = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <MoreVertical className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[150px]">
              <DropdownMenuItem asChild>
                <Link href={`/rooms/${room.id}`}>
                  <Edit
                    className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  startTransition(async () => {
                    await deleteRoom.mutateAsync({ id: room.id });
                    toast({
                      title: "Exam deleted",
                      description: `The Exam ${room.number} has been deleted.`,
                    });
                  });
                }}
              >
                <Trash2
                  className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
                  aria-hidden="true"
                />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const data = React.useMemo(() => getRooms.data, [getRooms.data]);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [searchRow, setSearchRow] = React.useState<string>(
    table.getAllColumns()[1]?.id ?? "",
  );

  return (
    <div className="w-full dark:text-white">
      <div className="flex items-center justify-between pb-4">
        <div className="flex gap-x-2  ">
          <Input
            placeholder="Filter records..."
            value={
              (table.getColumn(searchRow)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchRow)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={buttonVariants({ variant: "outline" })}>
                <span className="capitalize">{searchRow}</span>{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanFilter())
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      className="capitalize"
                      onClick={() => setSearchRow(column.id)}
                    >
                      {column.id}
                    </DropdownMenuItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-x-2 ">
          {!(table.getFilteredSelectedRowModel().rows.length === 0) && (
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              size="sm"
              className=""
              onClick={() => {
                startTransition(() => {
                  try {
                    table.getSelectedRowModel().rows.map(
                      async (row) =>
                        await deleteRoom.mutateAsync({
                          id: row.original.id,
                        }),
                    );
                    router.refresh();
                  } catch (error) {
                    error instanceof Error
                      ? toast({
                          title: "Oops!",
                          description: error.message,
                          variant: "destructive",
                        })
                      : toast({
                          title: "Oops!",
                          description: "Something went wrong.",
                          variant: "destructive",
                        });
                  }
                  table.resetRowSelection();
                });
              }}
              disabled={!table.getSelectedRowModel().rows.length || isPending}
            >
              <Trash2 className="mr-2 h-4 w-4" aria-hidden />
              Delete ({table.getSelectedRowModel().rows.length})
            </Button>
          )}
          <Button>
            <Link href="/rooms/new" className="flex items-center gap-x-2">
              <PlusCircle className="h-4 w-4" />
              <p>New</p>
            </Link>
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              table.resetColumnFilters();
              table.resetSorting();
              table.resetRowSelection();
            }}
          >
            Reset
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Download className="mr-2 h-4 w-4" /> Export{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  const rows =
                    table.getFilteredSelectedRowModel().rows.length > 0
                      ? table.getFilteredSelectedRowModel().rows
                      : table.getFilteredRowModel().rows;

                  const visibleColumns = table
                    .getAllColumns()
                    .filter(
                      (column) =>
                        typeof column.accessorFn !== "undefined" &&
                        column.getCanHide(),
                    );

                  const doc = new jsPDF();
                  doc.text("Exams", 14, 16);

                  autoTable(doc, {
                    margin: { top: 20 },
                    startY: 20,
                    head: [
                      // @ts-expect-error - columnDef.header is need to be RowInput
                      visibleColumns.map((column) => column.columnDef.header),
                    ],
                    body: rows.map((row) => {
                      //eslint-disable-next-line @typescript-eslint/no-unsafe-return
                      return [
                        row.original.id,
                        row.original.number,
                        row.original.capacity,
                        row.original.building,
                        row.original.block,
                        row.original.floor,
                      ];
                    }),
                  });
                  doc.save(`Rooms-${new Date().toISOString()}.pdf`);
                }}
              >
                PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" /> View{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="mt-4 flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {String(pageSize)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsTable;
