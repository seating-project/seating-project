import drf from "../../pages/api/axiosConfig";
import UserForm from "../../components/ExamForm";
import "../../styles/globals.css";

const ExamFormPage = async () => {
  const getTemplateData = async () => {
    try {
      const res = await drf.get("/templates/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getDepartmentsData = async () => {
    try {
      const res = await drf.get("/departments/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getYearsData = async () => {
    try {
      const res = await drf.get("/years/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getRoomsData = async () => {
    try {
      const res = await drf.get("/rooms/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getPhdStudentsData = async () => {
    try {
      const res = await drf.get("/students/", { params: { ctype: "P" } });
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const templates = await getTemplateData();
  const template_options = templates.map((template: any) => {
    return {
      value: template.template_name,
      label: template.template_name,
    };
  });

  const departments = await getDepartmentsData();
  const department_options = departments.map((department: any) => {
    return {
      value: department.branch_short_name,
      label: department.branch_short_name.toUpperCase(),
    };
  });

  const years = await getYearsData();
  const year_options = years.map((year: any) => {
    return {
      value: year.year,
      label: String(year.year),
    };
  });

  const rooms = await getRoomsData();
  const room_options = rooms.map((room: any) => {
    return {
      value: room.room_number,
      label: room.room_number,
    };
  });

  const phdStudents = await getPhdStudentsData();
  const phdStudent_options = phdStudents.map((phdStudent: any) => {
    return {
      value: phdStudent.register_number,
      label: phdStudent.name + " (" + phdStudent.register_number + ")",
    };
  });

  return (
    <UserForm
      template_opt={template_options}
      rooms_opt={room_options}
      years_opt={year_options}
      department_opt={department_options}
      phdstudents_opt={phdStudent_options}
    />
  );
};

export default ExamFormPage;
