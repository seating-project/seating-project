import AllotmentDocument from "@/components/allotments/AllotmentDocument";
import { api } from "@/trpc/server";

type Props = {
  params: Promise<{
    id: string;
    date: string;
  }>;
};
const ExamAllotmentPage = async (props: Props) => {
  const params = await props.params;
  const examId = decodeURIComponent(params.id);
  const date = decodeURIComponent(params.date);

  const exam = await api.exam.getExamById({
    id: Number(examId),
  });

  const template = await api.template.getTemplate({
    id: exam?.templateId ?? 0,
  });

  return (
    <div>
      <AllotmentDocument exam={exam} template={template} date={date} />
    </div>
  );
};

export default ExamAllotmentPage;
