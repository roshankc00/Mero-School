import { Formik, Form, Field, ErrorMessage } from "formik";
import { mixed, number, object, string, array } from "yup";
import { Step, StepLabel, Stepper, duration } from "@mui/material";
import { useState } from "react";
const AddCourseForm = () => {
  const [activeStep, setactiveStep] = useState(0)
  const steps = ["Course Details", "Sections and Lectures"];
  const coursevalidationScheama=object().shape({
    title:string().required("title is required").min(3,"minimum should be of 3 charecter"),
    description:string().required("description is required").min(10,"description should be of 10 charecter"),
    price:number().required("pice is required"),
    duration:number().required("duration is required"),
    sections:array().of(object({
      title:string().required("title is requrired"),
      lectures:array().of(object({
        title: string().required("title is required").min(3,"title  should be of atleast 3 charecter"),
        content: string().required("content is required").min(10,"content should be of atleast  3 charecter"),
        duration: number().required("duration is required"),
        file: mixed().required("file is required"),
      }))
    }

    ))

  })




  const handleSubmit = (values: any) => {
    try {
      console.log(values);
    } catch (error: any) {
      console.log(error);
    }
  };

  const initialValues = {
    title: "",
    description: "",
    price: "",
    duration: "",
    section: [
      {
        title: "",
        lectures: [
          {
            title: "",
            content: "",
            duration: "",
            file: null,
          },
        ],
      },
    ],
  };

  return (
    <div>
      jjfdnfndfdjf
      <Stepper activeStep={activeStep}>
        {steps.map((step) => {
          return (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Formik
        initialValues={initialValues}
        validationSchema={coursevalidationScheama}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting,setFieldValue}: any) => {
          return (
            <Form>
              {/* step 1 : Course Detail */}
              {activeStep===1&&
              


              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  className="w-full border px-4 py-2"
                ></Field>
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              }
         

         {/* Section detail  */}
           

              <button type="submit" className="bg-blue-500 hover:bg-blue-600 p-2 text-white fw-fw-bolder">
                {isSubmitting ? "creating...." :"submit"}          
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCourseForm;
