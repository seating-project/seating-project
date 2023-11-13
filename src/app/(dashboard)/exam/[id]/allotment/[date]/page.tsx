import NewAllotments from "@/components/allotments/NewAllotments";
import AllotmentTable from "@/components/tables/AllotmentTable";
import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
    date: string;
  };
};
const ExamAllotmentPage = async (props: Props) => {

  const examId = decodeURIComponent(props.params.id);
  const date = decodeURIComponent(props.params.date);

  const exam = await api.exam.getExamById.query({
    id: Number(examId),
  });

  const template = await api.template.getTemplate.query({
    id: exam?.templateId ?? 0,
  });

  return (
    <div>
      <NewAllotments
        exam={exam}
        template={template}
        date={date}
      />
    </div>
  )
}

export default ExamAllotmentPage