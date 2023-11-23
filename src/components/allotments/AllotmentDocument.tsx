import AllotmentHeader from "@/components/allotments/AllotmentHeader";
import Page from "@/components/page/LandscapePage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/server";
import type { RouterOutputs } from "@/trpc/shared";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  template: RouterOutputs["template"]["getTemplate"];
  date: string;
};

const AllotmentDocument = async ({ exam, template, date }: Props) => {
  if (exam === null || template === null) {
    return (
      <div>
        <p>Exam or Template not found</p>
      </div>
    );
  }

  const allotments = await api.allotment.createAllotment.query({
    examId: exam.id,
    templateId: template.id,
    date: date,
  });

  const logo = await api.template.getLogo.query({
    id: template.logoId,
  });
  const departments = await api.department.getDepartments.query();

  return (
    <div className="">
      {Object.keys(allotments)?.map((allotment) => {
        let currentIndex = 0;
        let alternateFlag = false;
        let tableCount = 1;
        return (
          <Page key={allotment}>
            <div className="space-y-8">
              <AllotmentHeader
                examName={exam.name}
                date={date}
                startTime={template.startTime}
                endTime={template.endTime}
                image={logo?.image ?? ""}
                roomNumber={allotment}
              />
              <div className="flex w-full justify-center">
                {
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                  [...Array(template.numberOfRows)].map((e, i) => {
                    if (template.roomStrength !== 50) {
                      const currentRow = allotments[allotment]?.slice(
                        currentIndex,
                        currentIndex + template.numberOfColumns,
                      );
                      currentIndex += template.numberOfColumns;
                      alternateFlag ? currentRow : currentRow?.reverse();

                      alternateFlag = !alternateFlag;
                      !alternateFlag &&
                        (tableCount += Number(currentRow?.length) - 1);
                      alternateFlag &&
                        i !== 0 &&
                        (tableCount += Number(currentRow?.length) + 1);
                      let extraStudents: typeof currentRow;
                      if (
                        i === template.numberOfRows - 1 &&
                        currentIndex < (allotments[allotment]?.length ?? 0 - 1)
                      ) {
                        extraStudents = allotments[allotment]?.slice(
                          currentIndex,
                          allotments[allotment]?.length,
                        );
                        console.log(
                          "EXTRA STUDENTS IN",
                          allotment,
                          extraStudents,
                        );
                      }
                      return (
                        <div key={i} className="flex">
                          <Table className="overflow-x-none">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[150px] border text-center text-black">
                                  Row {i + 1}
                                </TableHead>
                                <TableHead className="w-[50px] border text-center text-black">
                                  {exam.secondColumnOptions === "PresentAbsent"
                                    ? "P/A"
                                    : "S.No"}
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {currentRow?.map((student) => {
                                return (
                                  <TableRow
                                    key={
                                      student[0]?.name +
                                        " " +
                                        student[1]?.name ?? " "
                                    }
                                  >
                                    <TableCell className="flex flex-col border p-2 text-xs">
                                      <p>
                                        {student[0]
                                          ? student[0].registerNumber +
                                            " " +
                                            student[0]?.departmentId
                                          : "  "}
                                      </p>
                                      <p>
                                        {student[1]
                                          ? student[1].registerNumber +
                                            " " +
                                            student[1].departmentId
                                          : " "}
                                      </p>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                          {extraStudents && extraStudents.length > 0 && (
                            <Table className="overflow-x-none">
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[100px] border text-center text-black">
                                    Row {i + 2}
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {extraStudents &&
                                  extraStudents.length > 0 &&
                                  extraStudents.map((student) => {
                                    return (
                                      <TableRow
                                        key={
                                          student[0]?.name +
                                            " " +
                                            student[1]?.name ?? " "
                                        }
                                      >
                                        <TableCell className="flex flex-col border p-2 text-xs">
                                          <p>
                                            {student[0]?.registerNumber +
                                              " " +
                                              student[0]?.departmentId ?? "  "}
                                          </p>
                                          <p>
                                            {student[1]?.registerNumber +
                                              " " +
                                              student[1]?.departmentId ?? "  "}
                                          </p>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })}
                              </TableBody>
                            </Table>
                          )}
                        </div>
                      );
                    } else {
                      const currentRow =
                        i === template.numberOfRows - 1
                          ? allotments[allotment]?.slice(
                              currentIndex,
                              currentIndex + 7,
                            )
                          : allotments[allotment]?.slice(
                              currentIndex,
                              currentIndex + 6,
                            );
                      currentIndex += i === template.numberOfRows - 1 ? 7 : 6;
                      alternateFlag ? currentRow?.reverse() : currentRow;
                      alternateFlag = !alternateFlag;
                      !alternateFlag &&
                        (tableCount += Number(currentRow?.length) - 1);
                      alternateFlag &&
                        i !== 0 &&
                        (tableCount += Number(currentRow?.length) + 1);

                      return (
                        <div key={i} className="flex">
                          <Table className="overflow-x-none">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="w-[150px] border text-center text-black">
                                  Row {i + 1}
                                </TableHead>
                                <TableHead className="w-[50px] border text-center text-black">
                                  {exam.secondColumnOptions === "PresentAbsent"
                                    ? "P/A"
                                    : "S.No"}
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {!(i === template.numberOfRows - 1) && (
                                <TableRow>
                                  <TableCell className="flex h-10 flex-col border p-2 text-xs">
                                    &nbsp;
                                  </TableCell>
                                  <TableCell className="h-10 border p-2 text-xs">
                                    &nbsp;
                                  </TableCell>
                                </TableRow>
                              )}
                              {currentRow?.map((student) => {
                                const department1 = departments.find(
                                  (department) =>
                                    department.id === student[0]?.departmentId,
                                )?.shortName;
                                const department2 = departments.find(
                                  (department) =>
                                    department.id === student[1]?.departmentId,
                                )?.shortName;
                                return (
                                  <TableRow
                                    key={
                                      student[0]?.name +
                                        " " +
                                        student[1]?.name ?? " "
                                    }
                                  >
                                    <TableCell className="flex flex-col border p-2 text-sm">
                                      <p className="">
                                        {department1 ? (
                                          <span className="mr-2 font-bold">
                                            {department1}
                                          </span>
                                        ) : (
                                          " "
                                        )}
                                        {student[0]
                                          ? student[0].registerNumber
                                          : "  "}
                                      </p>
                                      <p>
                                        {department2 ? (
                                          <span className="mr-2 font-bold">
                                            {department2}
                                          </span>
                                        ) : (
                                          " "
                                        )}
                                        {student[1]
                                          ? student[1].registerNumber
                                          : " "}
                                      </p>
                                    </TableCell>
                                    <TableCell className="border p-2 text-center text-xs">
                                      {exam.secondColumnOptions ===
                                      "PresentAbsent" ? (
                                        <div className="flex items-center justify-center">
                                          <p className="text-slate-300">
                                            P/A
                                          </p>
                                        </div>
                                      ) : alternateFlag ? (
                                        tableCount++
                                      ) : (
                                        tableCount--
                                      )}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      );
                    }
                  })
                }
              </div>
            </div>
          </Page>
        );
      })}
    </div>
  );
};

export default AllotmentDocument;
