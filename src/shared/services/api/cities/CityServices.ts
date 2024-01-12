import { Environment } from "../../../environment"
import { Api } from "../axios-config"



export interface ICityListing {
  id: number,
  name: string
}

export interface ICityDetail {
  id: number,
  name: string
}

type ICitiesWithTotalCount = {
  data: ICityListing[],
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<ICitiesWithTotalCount | Error> => {
  try {
    const urlRelative = `/cities?_page=${page}&_limit=${Environment.LINE_LIMIT}&name_like=${filter}`

    const { data, headers } = await Api.get(urlRelative)

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LINE_LIMIT),
      }
    }

    return new Error('Error listing records')

  } catch (error) {
      console.error(error)
      return new Error((error as {message: string}).message || 'Error listing records')
  }
}

const getById = async (id: number): Promise<ICityDetail | Error> => {
  try {
    const urlRelative = `/cities/${id}`
    const response = await Api.get(urlRelative)

    if (response.status === 200) {

      const CityDetail: ICityDetail = response.data
      return CityDetail

    } else if (response.status === 404) {

      return new Error('Register not found')

    } else {

      return new Error(`Error in request: ${response.statusText}`);

    }
  } catch (error) {
    console.error(error)

    return new Error((error as {message: string}).message || 'Error listing records')
  }
}

const create = async (newCity: Omit<ICityDetail, 'id'>): Promise<number | Error> => {
  try {

    const urlRelative = `/cities`
    const response = await Api.post(urlRelative, newCity)

    if (response.status === 201) {

      const newCity: number = response.data.id
      return newCity

    } else {

      return new Error('Error in request')

    }
  } catch (error) {

    console.error(error)
    return new Error((error as {message: string}).message || 'Error create')
  }
}

const updateById = async (id: number, City: ICityDetail): Promise<void | Error> => {
  try {

    const urlRelative = `/cities/${id}`
    await Api.put(urlRelative, City)
  } catch (error) {

    console.error(error)
    return new Error((error as {message: string}).message || 'Error updating registry')
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {

    const urlRelative = `/cities/${id}`
    await Api.delete(urlRelative)
  } catch (error) {

    console.error(error)
    return new Error((error as {message: string}).message || 'Error deleting')
  }
}



export const CityService = {
  getAll,
  create, 
  deleteById,
  updateById,
  getById
}
