import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { mixed, number, object, string, array } from "yup";
import { Button, Step, StepLabel, Stepper, duration } from "@mui/material";
import { useState } from "react";
const AddCourseForm = () => {
  const [activeStep, setactiveStep] = useState(0);
  const steps = ["Course Details", "Sections and Lectures"];
  const coursevalidationScheama = object().shape({
    title: string()
      .required("title is required")
      .min(3, "minimum should be of 3 charecter"),
    description: string()
      .required("description is required")
      .min(10, "description should be of 10 charecter"),
    price: number().required("pice is required"),
    duration: number().required("duration is required"),
    sections: array().of(
      object({
        title: string().required("title is requrired"),
        lectures: array().of(
          object({
            title: string()
              .required("title is required")
              .min(3, "title  should be of atleast 3 charecter"),
            content: string()
              .required("content is required")
              .min(10, "content should be of atleast  3 charecter"),
            duration: number().required("duration is required"),
            file: mixed().required("file is required"),
          })
        ),
      })
    ),
  });

  const handleSubmit = (values: any) => {
    try {
      console.log(values);
    } catch (error: any) {
      console.log(error);
    }
  };
  const handleNext=()=>{
    setactiveStep(activeStep+1)
  }
  const handlePrevious=()=>{
    setactiveStep(activeStep-1)
  }

  const initialValues = {
    title: "",
    description: "",
    price: "",
    duration: "",
    sections: [
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
        {({ values, errors, touched, setFieldValue }: any) => {
          return (
            <Form className="max-w-md mx-auto">
              {/* step 1 : Course Detail */}
              {activeStep === 0 && (
                <>
                  <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">
                      Title
                    </label>
                    <Field
                      type="text"
                      id="title"
                      name="title"
                      className={`w-full border px-4 py-2 ${
                        errors.title && touched.title ? "border-red-500" : ""
                      } `}
                    ></Field>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">
                      Description
                    </label>
                    <Field
                      type="text"
                      id="description"
                      name="description"
                      className={`w-full border px-4 py-2 ${
                        errors.description && touched.description
                          ? "border-red-500"
                          : ""
                      } `}
                    ></Field>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="duration" className="block mb-2">
                      Duration
                    </label>
                    <Field
                      type="text"
                      id="duration"
                      name="duration"
                      className={`w-full border px-4 py-2 ${
                        errors.duration && touched.duration
                          ? "border-red-500"
                          : ""
                      } `}
                    ></Field>
                    <ErrorMessage
                      name="duration"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="price" className="block mb-2">
                      Price
                    </label>
                    <Field
                      type="text"
                      id="price"
                      name="price"
                      className={`w-full border px-4 py-2 ${
                        errors.price && touched.price ? "border-red-500" : ""
                      } `}
                    ></Field>
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                </>
              )}

              {/* Section detail  */}
              {activeStep === 1 && (
                <>
                  {values.sections.map((section: any, sectionIndex: number) => {
                    return (
                      <div key={sectionIndex} className="mb-6">
                        <div className="mb-4">
                          <label
                            htmlFor={`sections[${sectionIndex}].title`}
                            className="block mb-2"
                          >
                            Section Title
                          </label>
                          <Field
                            type="text"
                            id={`sections[${sectionIndex}].title`}
                            name={`sections[${sectionIndex}].title`}
                            className={`w-full border px-4 py-2 ${
                              errors.sections?.[sectionIndex]?.title &&
                              touched.sections?.[sectionIndex]?.title
                                ? "border-red-500"
                                : ""
                            } `}
                          ></Field>
                          <ErrorMessage
                            name={`sections[${sectionIndex}].title`}
                            component="div"
                            className="text-red-500 mt-1"
                          />
                        </div>
                        <FieldArray name={`sections[${sectionIndex}].lectures`}>
                          {({ push: addlecture, remove: removeLecture }) =>
                            section.lectures.map(
                              (lecture: any, lectureIndex: number) => {
                                return (
                                  <div key={lectureIndex} className="mb-4">

                                    <div className="mb-4">
                                      <label
                                        htmlFor={`sections[${sectionIndex}].lectures[${lectureIndex}].title`}
                                        className="block mb-2"
                                      >
                                        Lecuture Title
                                      </label>
                                      <Field
                                        type="text"
                                        id={`sections[${sectionIndex}].lectures[${lectureIndex}].title`}
                                        name={`sections[${sectionIndex}].lectures[${lectureIndex}].title`}
                                        className={`w-full border px-4 py-2 ${
                                          errors.sections?.[sectionIndex].lectures[`${lectureIndex}`]
                                            ?.title &&
                                          touched.sections?.[sectionIndex].lectures[`${lectureIndex}`]
                                            ?.title
                                            ? "border-red-500"
                                            : ""
                                        } `}
                                      ></Field>
                                      <ErrorMessage
                                        name={`sections[${sectionIndex}].lectures[${lectureIndex}].title`}
                                        component="div"
                                        className="text-red-500 mt-1"
                                      />
                                    </div>

                                    <div className="mb-4">
                                      <label
                                        htmlFor={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                        className="block mb-2"
                                      >
                                        Lecuture content
                                      </label>
                                      <Field
                                        type="text"
                                        id={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                        name={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                        className={`w-full border px-4 py-2 ${
                                          errors.sections?.[sectionIndex].lectures[`${lectureIndex}`]
                                            ?.content &&
                                          touched.sections?.[sectionIndex].lectures[`${lectureIndex}`]
                                            ?.content
                                            ? "border-red-500"
                                            : ""
                                        } `}
                                      ></Field>
                                      <ErrorMessage
                                        name={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                        component="div"
                                        className="text-red-500 mt-1"
                                      />
                                    </div>


                                    <div className="mb-4">
                                      <label
                                        htmlFor={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                        className="block mb-2"
                                      >
                                        Lecuture duration
                                      </label>
                                      <Field
                                        type="text"
                                        id={`sections[${sectionIndex}].lectures[${lectureIndex}].duration`}
                                        name={`sections[${sectionIndex}].lectures[${lectureIndex}].duration`}
                                        className={`w-full border px-4 py-2 ${
                                          errors.sections?.[sectionIndex].lectures[`${lectureIndex}`]
                                            ?.duration &&
                                          touched.sections?.[sectionIndex].lectures[`${lectureIndex}`]
                                            ?.duration
                                            ? "border-red-500"
                                            : ""
                                        } `}
                                      ></Field>
                                      <ErrorMessage
                                        name={`sections[${sectionIndex}].lectures[${lectureIndex}].duration`}
                                        component="div"
                                        className="text-red-500 mt-1"
                                      />
                                    </div>


                                    <div className="mb-4">
                                      <label
                                        htmlFor={`sections[${sectionIndex}].lectures[${lectureIndex}].content`}
                                        className="block mb-2"
                                      >
                                        Lecuture file
                                      </label>
                                      <Field
                                        type="file"
                                        id={`sections[${sectionIndex}].lectures[${lectureIndex}].file`}
                                        name={`sections[${sectionIndex}].lectures[${lectureIndex}].file`}
                                        className={`w-full border px-4 py-2 ${
                                          errors.sections?.[sectionIndex].lectures[`${lectureIndex}`]
                                            ?.file &&
                                          touched.sections?.[sectionIndex].lectures[`${lectureIndex}`]
                                            ?.file
                                            ? "border-red-500"
                                            : ""
                                        } `}
                                        onChange={(e:any)=>{
                                          setFieldValue(`sections[${sectionIndex}].lectures[${lectureIndex}].file`,e?.currentTarget.files[0])                                 
                                        }}
                                      ></Field>
                                      <ErrorMessage
                                        name={`sections[${sectionIndex}].lectures[${lectureIndex}].file`}
                                        component="div"
                                        className="text-red-500 mt-1"
                                      />
                                    </div>  

                                    {
                                      lectureIndex>0 &&(
                                        <button className="bg-red-500 hover:bg-red-700 p-2 text-white" onClick={()=>{removeLecture(lectureIndex)}}> Remove Lecture </button> 

                                      )
                                    }  
                                    {/* add lecture button start */}
                                    <button type="button" onClick={()=>{
                                      addlecture({
                                        title: "",
                                        content: "",
                                        duration: "",
                                        file: null,
                                      })
                                    }} className="bg-green-500 hover:bg-green-700 text-white font-bold p-2">Add lecture</button>
                                      {/* add lecture button ends  */}








                                  </div>






                                );
                              }
                            )
                          }
                        </FieldArray>
                        {/* remove section */}
                        {
                          sectionIndex>0 &&(
                            <button className="bg-red-500 hover:bg-red-700 p-2 text-white mx-2" onClick={()=>{
                              const updatedSection=[...values.sections]
                              updatedSection.splice(sectionIndex,1)
                              setFieldValue("sections",updatedSection)
                            }}> Remove Lecture </button>
                          )
                        }
                        {/* remove section ends  */}

                        {
                          activeStep===1 &&
                          <button
                           className="bg-blue-400 hover:bg-blue-800 text-white p-2 ms-2"
                           onClick={()=>{
                            setFieldValue("sections",[
                              ...values.sections,{
                                title: "",
                                lectures: [
                                  {
                                    title: "",
                                    content: "",
                                    duration: "",
                                    file: null,
                                  },
                                ]
                              }
                            ])
                           }}                          
                          > Add Section</button>
                        }

                        
                      </div>
                    );

                  })}
            


                </>
              )}

                    <div className="mt-6">
                    {
                      activeStep>0 &&
                      <Button variant="contained"  className="m-2" onClick={()=>{handlePrevious()}}> previous</Button>
                    }
                    {
                      activeStep<steps.length-1 &&
                      <Button variant="contained" className="m-2" onClick={()=>{handleNext()}}> Next</Button>
                    }
                    {activeStep>0 &&

                      <Button type="submit" variant="contained"  className="m-2"> submit </Button>
                    }

                   </div>

            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddCourseForm;
