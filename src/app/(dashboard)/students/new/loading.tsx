import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const StudentLoadingPage = () => {
  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Students</p>
        <Card className="my-4">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between space-x-2">
              <Skeleton className="h-8 w-1/12" />
            </div>
            <CardDescription>
              <Skeleton className="h-4 w-1/6" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex w-full  gap-x-8 text-black dark:text-white">
              <div className="w-1/2 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px] " />
                  <Skeleton className="h-8 w-full " />
                  <Skeleton className="h-4 w-[100px] " />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px] " />
                  <Skeleton className="h-8 w-full " />
                  <Skeleton className="h-4 w-[100px] " />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px] " />
                  <Skeleton className="h-8 w-[150px] " />
                  <Skeleton className="h-4 w-[100px] " />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[100px] " />
                  <Skeleton className="h-8 w-full " />
                  <Skeleton className="h-4 w-[100px] " />
                </div>
              </div>
              <div className="flex w-1/2 flex-col justify-around space-y-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px] " />
                    <Skeleton className="h-8 w-[250px] " />
                    <Skeleton className="h-4 w-[100px] " />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px] " />
                    <Skeleton className="h-8 w-[150px] " />
                    <Skeleton className="h-4 w-[100px] " />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[100px] " />
                    <Skeleton className="h-8 w-[150px] " />
                    <Skeleton className="h-4 w-[100px] " />
                  </div>
                </div>
                <Skeleton className="h-10 w-full " />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentLoadingPage;
