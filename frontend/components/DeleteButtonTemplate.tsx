"use client";

import React, { MouseEventHandler } from "react";
import drf from "../pages/api/axiosConfig";
import axios from "axios";
// import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { Alert } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { revalidatePath } from "next/cache";

type Props = {
  name: string
};






const DeleteButton = (props: Props) => {

  const router = useRouter();

  const notify = () => toast(`Template ${props.name} has been deleted`, {icon: '❌'});

  const [deleted, setDeleted] = React.useState(false);

  const handleDeleteClick = async () => {
    try {
      
      console.log("delete")
      const res = await axios.delete(`http://127.0.0.1:8000/deletetemplates/${props.name}`);
      console.log(res);
      // alert("Exam deleted successfully");
      
      setDeleted(true);
      notify();

      router.push("/")
      
    } catch (error) {
      console.log(error);
      alert("Failed to delete template");
      // return null;
    }
  };

  return (
    <div>
      <button 
      onClick={handleDeleteClick} 
      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
        Delete Template
      </button>
      <Toaster />
    </div>
  );
};

export default DeleteButton;
  