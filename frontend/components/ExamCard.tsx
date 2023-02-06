const ExamCard = ({
    name
  }) => {
    return (
      <div className="w-[250px] h-[250px] bg-white p-4 m-4 rounded-xl shadow-lg hover:shadow-bblue transition backdrop-blur-lg flex flex-col justify-between">
        <div className="flex flex-col">
          <p className="font-bold text-4xl p-2">Template {name}</p>
        </div>
        <div
          className="flex flex-row items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full 
          after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-[#0087ca] after:origin-bottom-right after:transition-transform
          after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left justify-between pr-2"
        >
          <p className="font-normal text-xl p-2"> See more </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 "
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </div>
      </div>
    );
  };
  
  export default ExamCard;
  