import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";


import { useDebounce } from "../../../shared/hooks";
import { CityService } from "../../../shared/services/api/cities/CityServices";
import { useField } from "@unform/core";




type TAutoCompleteOption = {
  id: number,
  label: string
}

interface AutoCompleteCityProps {
  isExternalLoading: boolean
}

export const AutoCompleteCity: React.FC<AutoCompleteCityProps> = ({isExternalLoading = false}) => {

  const { debounce } = useDebounce()
  const { fieldName,  registerField, defaultValue, clearError, error } = useField('cityId')

  const [options, setOptions] = useState<TAutoCompleteOption[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] =  useState('')
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
    })
  } , [ registerField, fieldName, selectedId ])

  useEffect(() => {

    setIsLoading(true)

    debounce(() => {
      CityService.getAll(1, search )
      .then((result) => {
        setIsLoading(false)

        if (result instanceof Error) {
          // alert(result.message)

        } else {
          console.log(result)
          setOptions(result.data.map(city => ({id: city.id, label: city.name})))
        }
      })
    })
  }, [search])

  const autoCompleteSelectedOptions = useMemo(() => {
    if (!selectedId) return null

    const optionSelected = options.find(option => option.id === selectedId)
    if (!optionSelected) return null

    return optionSelected

  }, [selectedId, options])

  return (
    <Autocomplete 
      value={autoCompleteSelectedOptions}
      onChange={(_, newValue) => { 
        if (newValue === null) {
          setSelectedId(undefined);
          setSearch('');
          clearError();
        } else {
          setSelectedId(newValue?.id);
          setSearch('');
          clearError();
        }
      }}
      getOptionLabel={(option) => option.label}
      loading={isLoading}
      disabled={isExternalLoading}
      popupIcon={(isExternalLoading ||isLoading) ? <CircularProgress size={27}/> : undefined}
      onInputChange={(_, newValue) => setSearch(newValue)}
      options={options}
      
      renderInput={(params) => (
        <TextField 
          {...params} 
          label='City' 
          error={!!error}
          helperText={error}/>
      )}
    />
  )
}