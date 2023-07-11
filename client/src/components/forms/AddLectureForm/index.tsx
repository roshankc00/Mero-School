import { object, string, mixed, number } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postDataWithHeader } from "../../../services/axios.service";
import { useSelector } from "react-redux";
import { errorToast, sucessToast } from "../../../services/toastify.service";
import { useNavigate } from "react-router-dom";

const AddLectureForm = () => {
  const navigate=useNavigate()
  const token=useSelector((e:any)=>{
    return e.auth.jwt
  })
  const handleSubmit = async(values: any, { setSubmitting }: any) => {
    try {
      const formData=new FormData();
      formData.append("title",values.title)
      formData.append("duration",values.duration)
      formData.append("file",values.file)
      formData.append("content",values.content)
      console.log(formData)
      const response=await postDataWithHeader('lecture',formData,token)
      console.log(response,"thanlks")
      if(response.sucess){
        sucessToast(response.message)
        navigate('/lecture')
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
        {({ isSubmitting,setFieldValue}: any) => {
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
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e:any)=>{
                    setFieldValue("file",e.currentTarget.files[0])
                  }}
                  className="w-full border px-4 py-2"
                  
                ></input>
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
