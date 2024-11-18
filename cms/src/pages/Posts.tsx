import dayjs from "dayjs";
import { PageWrapper } from "@/components/PageWrapper";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Posts = () => {
  return (
    <div>
      <PageWrapper
        breadcrumbs={[
          {
            title: "Posts",
          },
        ]}
      >
        <DataTable />
      </PageWrapper>
    </div>
  );
};

interface Post {
  id: string;
  title: string;
  tags: string[];
  date: string;
  published: boolean;
  content: string;
  categories: string[];
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        to={`/posts/${row.original.id}`}
        className="text-blue-500 font-semibold hover:text-blue-900"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "categories",
    header: "Categories",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => dayjs(row.original.date).format("MMMM DD, YYYY"),
  },
];

const DataTable = () => {
  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Search by title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button>Add new</Button>
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
                            header.getContext()
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
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
    </>
  );
};

const posts: Post[] = [
  {
    id: "1",
    title: "First Post",
    tags: ["tag1", "tag2"],
    date: "2021-01-01",
    published: true,
    content: "This is the first post",
    categories: ["category1"],
  },
  {
    id: "2",
    title: "Second Post",
    tags: ["tag1", "tag2"],
    date: "2021-01-02",
    published: true,
    content: "This is the second post",
    categories: ["category2"],
  },
  {
    id: "3",
    title: "Third Post",
    tags: ["tag1", "tag2"],
    date: "2021-01-03",
    published: true,
    content: "This is the third post",
    categories: ["category3"],
  },
];
