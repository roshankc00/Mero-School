import { object, string, mixed, number } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postData, postDataWithHeader } from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { errorToast, sucessToast } from "../../../services/toastify.service";
import axios from "axios";

const AddLectureForm = () => {
  const token=useSelector((e:any)=>{
    return e.auth.token
  })
  const handleSubmit = async(values: any, { setSubmitting }: any) => {
    try {

      const data={
        title:values.title,
        photo:values.file,
        duration:values.duration,
        content:values.content,
      } 
      console.log(token)
      const response=await postDataWithHeader('lecture',values,token)
      console.log(response,"thanls")
      if(response.sucess){
        sucessToast(response.message)
      }else{
        errorToast(response.message)
      }       
      setSubmitting(false)     
    } catch (error:any) {
      console.log(error)
      
    }
  };

  // initial value
  const initialValue = {
    title: "",
    content: "",
    duration: "",
    file: null,
  };

  // validation
  const lectureValidationSchema = object().shape({
    title: string().required("title is required"),
    content: string().required("content is required"),
    duration: number().required("duration is required"),
    file: mixed().required("file is required"),
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-bold text-3xl text-red-800 my-5"> Create Lecture</h2>
      <Formik
        initialValues={initialValue}
        validationSchema={lectureValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting}: any) => {
          return (
            <Form>
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
              <div className="mb-4">
                <label htmlFor="content" className="block mb-2">
                  Content
                </label>
                <Field
                  type="textarea"
                  id="content"
                  name="content"
                  className="w-full border px-4 py-2"
                ></Field>
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="duration" className="block mb-2">
                  Duration
                </label>
                <Field
                  type="number"
                  id="duration"
                  name="duration"
                  className="w-full border px-4 py-2"
                ></Field>
                <ErrorMessage
                  name="duration"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="file" className="block mb-2">
                  File
                </label>
                <Field
                  type="file"
                  name="file"
                  id="file"
                  className="w-full border px-4 py-2"
                ></Field>
                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

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

export default AddLectureForm;
