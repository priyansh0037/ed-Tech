import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";

const RenderSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Course Information",
    },

    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish ",
    },
  ];

  const { step } = useSelector((state) => state.course);
  console.log("step no is", step);

  return (
    <div className="h-full">
      <div className="flex ">
        {steps.map((item) => (
          <div key={item.id} className="flex">
            <div >
              <div
                className={`${
                  step == item.id
                    ? " bg-yellow-600 border text-white"
                    : " bg-gray-400 text-white border"
                } w-10`}
              >
                {
                  // agr hmara step 2 ha and wo bda ha item ki id se to icon lga do
                  step > item.id ? <FaCheck /> : item.id
                }
              </div>
            </div>
            {item.id !== steps.length && (
              <p>---------------------------------------</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between ">
        {steps.map((item) => (
          <div key={item.id} >
            <div >
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      {step == 1 && <CourseInformationForm />}
      {/* {step ==2 && <CourseBuilderForm/>}
      {step ==3 && <PublishForm/>}
       */}
    </div>
  );
};

export default RenderSteps;
