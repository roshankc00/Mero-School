import { object, string, mixed, number } from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";

const AddLectureForm = () => {
  const handleSubmit = (values:any,{setSubmitting}:any) => {
    console.log(values)

  };
  const initialValue: any = {
    title: "",
    content: "",
    duration: 0,
    file: null,
  };

  const lectureValidationSchema = object().shape({
    title: string().required("title is required"),
    content: string().required("content is required"),
    duration: number().required("duration is required"),
    file: mixed().required("file is required"),
  });
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-bold text-xl"> create Lecture</h2>
      <Formik
        initialValues={initialValue}
        validationSchema={lectureValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }:any) => {
          return (
            <Form>
              <div className="mb-4">
                <label htmlFor="title" className="block mb-2">
                  Title
                </label>
                <Field
                  type="text"
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
                <label htmlFor="title" className="block mb-2">
                  Content
                </label>
                <Field
                  type="text"
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
                <label htmlFor="title" className="block mb-2">
                  Duration
                </label>
                <Field
                  type="number"
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
                <label htmlFor="title" className="block mb-2">
                  File
                </label>
                <Field
                  type="file"
                  name="file"
                  className="w-full border px-4 py-2"
                ></Field>
                <ErrorMessage
                  name="file"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>
              
              <button type="submit" className=""> Submit </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddLectureForm;
