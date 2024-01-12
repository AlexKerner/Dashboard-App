import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material"
import * as yup from 'yup'
import { LayoutBase } from "../../shared/layouts"
import { ToolbarDetail } from "../../shared/components"
import { PeopleService } from "../../shared/services/api/people/PeopleServices"
import { IVFormError, VForm, VTextField, useVForm } from "../../shared/forms"
import { AutoCompleteCity } from "./components/AutoCompleteCity"




interface IFormData {
  fullname: string,
  email: string,
  cityId: number
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  fullname: yup.string().required().min(3),
  email: yup.string().required().email(),
  cityId: yup.number().required().min(3)
})



export const PeopleDetail: React.FC = () => {

  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false) 
  const [name, setName] = useState('')
  const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm()

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true)

      PeopleService.getById(Number(id))
        .then((result) => {
          setIsLoading(false)
          if (result instanceof Error) {
            alert(result.message)
            navigate('/people')
          } else {
            setName(result.fullname)
            console.log(result);

            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        fullname: '',
        email: '',
        cityId: undefined
      })
    }
  }, [id])



  const handleSave = (data: IFormData) => {

    formValidationSchema.validate(data, { abortEarly: false })
      .then ((dataValidated) => {

        setIsLoading(true)

        if (id === 'new') {
    
          PeopleService.create(dataValidated)
            .then((result) => {
              setIsLoading(false)
    
              if (result instanceof Error) {
                alert(result.message)
              }
               else {
                 alert('Record created successfully')
    
                 if (IsSaveAndClose()) {
    
                  navigate('/people')
    
                  } else {
                    navigate(`/people/detail/${result}`)
                  }
              }
            })
        } else {
    
            PeopleService.updateById(Number(id), {id: Number(id), ... dataValidated})
              .then((result) => {
                setIsLoading(false)
    
                if (result instanceof Error) {
                  alert(result.message)
                } else {
                   alert('Record updated successfully')
                   if (IsSaveAndClose()) {
                    navigate('/people')
                   } 
                }
              })
        }

      })
      .catch ((errors: yup.ValidationError) => {
        const validationErrors: IVFormError = {}

        errors.inner.forEach(error => {
          if (!error.path) return

          validationErrors[error.path] = error.message

        })

        formRef.current?.setErrors(validationErrors)

      })

  }

  const handleDelete = (id: number) => {

    if (confirm('Do you really want to delete it?')) {
      PeopleService.deleteById(id)
        .then (result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
              alert('Record deleted successfully!')
              navigate('/people')
          }
        })
    }
  }
 
  return (

    <LayoutBase   
      title={id === 'new' ? 'New Person' : name} 
      toolbar={
        <ToolbarDetail 
          textNewButton="New" 
          showSaveBackButton 
          showDeleteButton={id !== 'new'} 
          showNewButton={id !== 'new'} 
          onClickSave={save} 
          onClickSaveBack={saveAndClose} 
          onClickBack={() => {navigate('/people')}} 
          onClickDelete={() => handleDelete(Number(id))} 
          onClickNew={() => {navigate('/people/detail/new')}} /> 
      }>
        
        <VForm ref={formRef} onSubmit={handleSave} placeholder={undefined}>
          <Box margin={1} display='flex' flexDirection='column' component={Paper} variant="outlined">

            <Grid container direction='column' padding={2} spacing={2}>


              {isLoading && (
                <Grid item>
                  <LinearProgress variant="indeterminate"/>
                </Grid>
              )}


              <Grid item>
                <Typography variant="h6" >General</Typography>
              </Grid>

              <Grid container item direction='row' spacing={2} >
                <Grid item xs={12} md={7} lg={4} xl={2}>
                  <VTextField fullWidth disabled={isLoading} label="Full Name" name="fullname" onChange={e => setName(e.target.value)}/>
                </Grid>
              </Grid>

              <Grid container item direction='row' spacing={2}>
                <Grid item xs={12} md={7} lg={4} xl={2}>
                  <VTextField fullWidth disabled={isLoading} label="Email" name="email" />
                </Grid>
              </Grid>

              <Grid container item direction='row' spacing={2}>
                <Grid item xs={12} md={7} lg={4} xl={2}>
                  <AutoCompleteCity isExternalLoading={isLoading} />
                </Grid>
              </Grid>

            </Grid>

           
          </Box>
        </VForm>
        
    </LayoutBase>
    
  )
}