import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function StudentPage() {
  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">Students</p>
        <Card className="my-4">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between space-x-2">
              <CardTitle className="text-2xl">Update product</CardTitle>
            </div>
            <CardDescription>
              Update your product information, or delete it
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* <UpdateProductForm product={product} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
