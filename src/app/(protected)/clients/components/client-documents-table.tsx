import { format } from "date-fns";
import { FileText, Download, ArrowUpDown, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample documents data for clients
const clientDocuments = {
  "1be86f6b-0b6d-4628-be80-9fa20b96e8c9": [
    {
      id: "1",
      name: "Business Plan.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: new Date("2023-05-01"),
      category: "Business Documents",
    },
    {
      id: "2",
      name: "Financial Statements 2022.xlsx",
      type: "Excel",
      size: "1.8 MB",
      uploadDate: new Date("2023-05-01"),
      category: "Financial Documents",
    },
    {
      id: "3",
      name: "Tax Returns 2022.pdf",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: new Date("2023-05-01"),
      category: "Tax Documents",
    },
    {
      id: "4",
      name: "Property Appraisal.pdf",
      type: "PDF",
      size: "5.1 MB",
      uploadDate: new Date("2023-04-28"),
      category: "Collateral Documents",
    },
    {
      id: "5",
      name: "Business License.pdf",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: new Date("2023-04-25"),
      category: "Legal Documents",
    },
  ],
  "2": [
    {
      id: "1",
      name: "Business Plan.pdf",
      type: "PDF",
      size: "3.1 MB",
      uploadDate: new Date("2023-05-05"),
      category: "Business Documents",
    },
    {
      id: "2",
      name: "Financial Statements 2022.xlsx",
      type: "Excel",
      size: "2.2 MB",
      uploadDate: new Date("2023-05-05"),
      category: "Financial Documents",
    },
    {
      id: "3",
      name: "Property Deed.pdf",
      type: "PDF",
      size: "4.5 MB",
      uploadDate: new Date("2023-05-03"),
      category: "Collateral Documents",
    },
  ],
};

export function ClientDocumentsTable({ clientId }: { clientId: string }) {
  const documents =
    clientDocuments[clientId as keyof typeof clientDocuments] || [];

  return (
    <Card className="bg-muted/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Client documents and files</CardDescription>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-center">
            <div>
              <p className="text-muted-foreground">
                No documents found for this client.
              </p>
              <Button className="mt-4" variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center">
                      Document
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-8 data-[state=open]:bg-accent"
                      >
                        <ArrowUpDown className="h-4 w-4" />
                        <span className="sr-only">Sort</span>
                      </Button>
                    </div>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Upload Date
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{document.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {document.category}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(document.uploadDate, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {document.size}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
