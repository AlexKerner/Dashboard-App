import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material"
import * as yup from 'yup'
import { LayoutBase } from "../../shared/layouts"
import { ToolbarDetail } from "../../shared/components"
import { CityService } from "../../shared/services/api/cities/CityServices"
import { IVFormError, VForm, VTextField, useVForm } from "../../shared/forms"




interface IFormData {
  name: string
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  name: yup.string().required().min(3)
})



export const CityDetail: React.FC = () => {

  const { id = 'new' } = useParams<'id'>()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false) 
  const [name, setName] = useState('')
  const { formRef, save, saveAndClose, IsSaveAndClose } = useVForm()

  useEffect(() => {
    if (id !== 'new') {
      setIsLoading(true)

      CityService.getById(Number(id))
        .then((result) => {
          setIsLoading(false)
          if (result instanceof Error) {
            alert(result.message)
            navigate('/cities')
          } else {
            setName(result.name)
            console.log(result);

            formRef.current?.setData(result)
          }
        })
    } else {
      formRef.current?.setData({
        name: ''
      })
    }
  }, [id])



  const handleSave = (data: IFormData) => {

    formValidationSchema.validate(data, { abortEarly: false })
      .then ((dataValidated) => {

        setIsLoading(true)

        if (id === 'new') {
    
          CityService.create(dataValidated)
            .then((result) => {
              setIsLoading(false)
    
              if (result instanceof Error) {
                alert(result.message)
              }
               else {
                 alert('Record created successfully')
    
                 if (IsSaveAndClose()) {
    
                  navigate('/cities')
    
                  } else {
                    navigate(`/cities/detail/${result}`)
                  }
              }
            })
        } else {
    
            CityService.updateById(Number(id), {id: Number(id), ... dataValidated})
              .then((result) => {
                setIsLoading(false)
    
                if (result instanceof Error) {
                  alert(result.message)
                } else {
                   alert('Record updated successfully')
                   if (IsSaveAndClose()) {
                    navigate('/cities')
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
      CityService.deleteById(id)
        .then (result => {
          if (result instanceof Error) {
            alert(result.message)
          } else {
              alert('Record deleted successfully!')
              navigate('/cities')
          }
        })
    }
  }
 
  return (

    <LayoutBase   
      title={id === 'new' ? 'New City' : name} 
      toolbar={
        <ToolbarDetail 
          textNewButton="New" 
          showSaveBackButton 
          showDeleteButton={id !== 'new'} 
          showNewButton={id !== 'new'} 
          onClickSave={save} 
          onClickSaveBack={saveAndClose} 
          onClickBack={() => {navigate('/cities')}} 
          onClickDelete={() => handleDelete(Number(id))} 
          onClickNew={() => {navigate('/cities/detail/new')}} /> 
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
                <Typography variant="h6">General</Typography>
              </Grid>

              <Grid container item direction='row' spacing={2} >
                <Grid item xs={12} md={7} lg={4} xl={2}>
                  <VTextField fullWidth disabled={isLoading} label="Name" name="name" onChange={e => setName(e.target.value)}/>
                </Grid>
              </Grid>

            </Grid>

           
          </Box>
        </VForm>
        
    </LayoutBase>
    
  )
}