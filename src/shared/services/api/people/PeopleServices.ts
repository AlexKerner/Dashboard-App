import { Environment } from "../../../environment"
import { Api } from "../axios-config"



export interface IPersonListing {
  id: number,
  email: string,
  cityId: number,
  fullname: string
}

export interface IPersonDetail {
  id: number,
  email: string,
  cityId: number,
  fullname: string
}

type IPeopleWithTotalCount = {
  data: IPersonListing[],
  totalCount: number
}

const getAll = async (page = 1, filter = ''): Promise<IPeopleWithTotalCount | Error> => {
  try {
    const urlRelative = `/people?_page=${page}&_limit=${Environment.LINE_LIMIT}&fullname_like=${filter}`

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

const getById = async (id: number): Promise<IPersonDetail | Error> => {
  try {
    const urlRelative = `/people/${id}`
    const response = await Api.get(urlRelative)

    if (response.status === 200) {

      const personDetail: IPersonDetail = response.data
      return personDetail

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

const create = async (newPerson: Omit<IPersonDetail, 'id'>): Promise<number | Error> => {
  try {

    const urlRelative = `/people`
    const response = await Api.post(urlRelative, newPerson)

    if (response.status === 201) {

      const newPerson: number = response.data.id
      return newPerson

    } else {

      return new Error('Error in request')

    }
  } catch (error) {

    console.error(error)
    return new Error((error as {message: string}).message || 'Error create')
  }
}

const updateById = async (id: number, person: IPersonDetail): Promise<void | Error> => {
  try {

    const urlRelative = `/people/${id}`
    await Api.put(urlRelative, person)
  } catch (error) {

    console.error(error)
    return new Error((error as {message: string}).message || 'Error updating registry')
  }
}

const deleteById = async (id: number): Promise<void | Error> => {
  try {

    const urlRelative = `/people/${id}`
    await Api.delete(urlRelative)
  } catch (error) {

    console.error(error)
    return new Error((error as {message: string}).message || 'Error deleting')
  }
}



export const PeopleService = {
  getAll,
  create, 
  deleteById,
  updateById,
  getById
}
