export default function TemplateForm() {
  return (
    <div className="p-8 justify-center items-center">
      <h1 className="font-semibold pt-5 text-4xl">Template Wizard</h1>
      <form action="/api/form" method="post">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="grid grid-cols-1 gap-6">
            <label className="block" htmlFor="templatename">
              <span>Template Name</span>
              <input
                type="text"
                id="templatename"
                name="templatename"
                className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
                required
              />
            </label>

            {/* <label className="block" htmlFor="examname">
                <span>Exam Name</span>
                <input
                  type="text"
                  id="examname"
                  name="examname"
                  className="mt-1
                block
                rounded-md
               bg-gray-200
                border-transparent
               focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
                  required
                />
              </label> */}

            <label htmlFor="rows" className="block">
              <span>Rows</span>
              <input
                type="number"
                id="rows"
                name="rows"
                className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
                required
              />
            </label>

            <label htmlFor="columns" className="block">
              <span>Columns</span>
              <input
                type="number"
                id="columns"
                name="columns"
                className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-300 focus:ring-0"
                required
              />
            </label>

            <label htmlFor="room_strength" className="block">
              <span>Room Strength</span>
              <input
                type="number"
                id="room_strength"
                name="room_strength"
                className="mt-1
                block
                rounded-md
                bg-gray-200
                border-transparent
                focus:border-gray-300 focus:bg-gray-200 focus:ring-0"
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <label htmlFor="count_in_bench" className="block">
              <span>Count in Bench</span>
              <input
                type="number"
                id="count_in_bench"
                name="count_in_bench"
                className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-200 focus:ring-0"
                required
              />
            </label>

            <label htmlFor="rooms">
              <span>Rooms (select multiple)</span> <br />
              <select
                name="rooms"
                id="rooms"
                className="form-multiselect w-1/4"
                multiple
              >
                <option value="F1">F1</option>
                <option value="F2">F2</option>
                <option value="F3">F3</option>
              </select>
            </label>

            <label htmlFor="seperator" className="block">
              <span>Boys/Girls seperation</span>
              <input
                type="checkbox"
                id="seperator"
                name="seperator"
                className="mt-1
                  block
                  rounded-md
                  bg-gray-200
                  border-transparent
                  focus:border-gray-300 focus:bg-gray-200 focus:ring-0"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 w-max"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
