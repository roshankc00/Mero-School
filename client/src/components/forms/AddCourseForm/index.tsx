import {Formik,Form,Field,ErrorMessage} from 'formik'
import {mixed,number,object,string,array} from 'yup'
import {Step, StepLabel, Stepper} from '@mui/material'
const AddCourseForm = () => {
    const steps=["Course Details","Sections and Lectures"]
    // const coursevalidationScheama=object().shape({
    //   title:string().required("title is required").min(3,"minimum should be of 3 charecter"),
    //   description:string().required("description is required").min(10,"description should be of 10 charecter"),
    //   price:number().required("pice is required"),
    //   duration:number().required("duration is required"),
    //   sections:array().of({
    //     title:string().required("title is requrired"),
    //     lectures:array().of({
    //       title: string().required("title is required").min(3,"title  should be of atleast 3 charecter"),
    //       content: string().required("content is required").min(10,"content should be of atleast  3 charecter"),
    //       duration: number().required("duration is required"),
    //       file: mixed().required("file is required"),
    //     })
    //   }
        
    //   )

      

    // })

    const handleSubmit=(values:any)=>{
      try {
        console.log(values)
        
      } catch (error:any) {
        console.log(error)
        
      }

    }


  return (
    <div>
      jjfdnfndfdjf
      <Stepper>
        {
          steps.map((step)=>{
            return(
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            )

          })
        }
      

          </Stepper>
    </div>
  )
}

export default AddCourseForm