import { FormHandles } from "@unform/core"
import { useCallback, useRef } from "react"




export const useVForm = () => {

  const formRef = useRef<FormHandles>(null)
  const isSavingAndNew = useRef(false)
  const isSaveAndClose = useRef(false)
  

  const handleSave = useCallback(() => {
    isSaveAndClose.current = false
    isSavingAndNew.current = false
    formRef.current?.submitForm()
  }, [])

  const handleSaveAndNew = useCallback(() => {
    isSaveAndClose.current = false
    isSavingAndNew.current = true
    formRef.current?.submitForm()
  }, [])

  const handleSaveAndClose = useCallback(() => {
    isSaveAndClose.current = true
    isSavingAndNew.current = false
    formRef.current?.submitForm()
  }, [])

  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current
  }, [])

  const handleIsSaveAndClose = useCallback(() => {
    return isSaveAndClose.current
  }, [])

  return { formRef, 

    save: handleSave,
    saveAndClose: handleSaveAndClose,
    saveAndNew: handleSaveAndNew,

    IsSaveAndClose: handleIsSaveAndClose,
    IsSaveAndNew: handleIsSaveAndNew,
  }
}