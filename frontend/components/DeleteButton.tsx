import React from "react";

type Props = {};

const DeleteButton = (props: Props) => {
  return (
    <div>
      <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete Exam
      </button>
    </div>
  );
};

export default DeleteButton;
