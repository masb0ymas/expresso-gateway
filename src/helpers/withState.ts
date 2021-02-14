import { Request, Express } from 'express'
import { set, get } from 'lodash'
import getterObject from './getterObject'
import Multers from './Multer'

class withState {
  private req: Request

  constructor(req: Request) {
    this.req = req
    this.req.setState = this.setState.bind(this)
    this.req.setFieldState = this.setFieldState.bind(this)
    this.req.getState = this.getState.bind(this)
    this.req.getHeaders = this.getHeaders.bind(this)
    this.req.getQuery = this.getQuery.bind(this)
    this.req.getParams = this.getParams.bind(this)
    this.req.getCookies = this.getCookies.bind(this)
    this.req.getBody = this.getBody.bind(this)
    this.req.setBody = this.setBody.bind(this)
    this.req.getSingleArrayFile = this.getSingleArrayFile.bind(this)
    this.req.pickSingleFieldMulter = this.pickSingleFieldMulter.bind(this)
    this.req.getMultiArrayFile = this.getMultiArrayFile.bind(this)
    this.req.pickMultiFieldMulter = this.pickMultiFieldMulter.bind(this)
  }

  setState(val: object) {
    this.req.state = {
      ...(this.req.state || {}),
      ...val,
    }
  }

  setBody(obj: object) {
    this.req.body = {
      ...this.req.body,
      ...obj,
    }
  }

  setFieldState(key: any, val: any) {
    set(this.req.state, key, val)
  }

  getState(path: any, defaultValue?: any): any {
    return get(this.req.state, path, defaultValue)
  }

  getCookies(path?: any, defaultValue?: any): any {
    return getterObject(this.req.cookies, path, defaultValue)
  }

  getBody(path?: any, defaultValue?: any): any {
    return getterObject(this.req.body, path, defaultValue)
  }

  getHeaders(path?: any, defaultValue?: any): any {
    return getterObject(this.req.headers, path, defaultValue)
  }

  getQuery(path?: any, defaultValue?: any): any {
    return getterObject(this.req.query, path, defaultValue)
  }

  getParams(path?: any, defaultValue?: any): any {
    return getterObject(this.req.params, path, defaultValue)
  }

  getSingleArrayFile(name: string) {
    const data = (getterObject(
      this.req,
      ['files', name, '0'].join('.')
    ) as unknown) as Express.Multer.File
    if (data) {
      return data
    }
  }

  getMultiArrayFile(name: string) {
    const data = get(this.req.files, name, []) as Express.Multer.File
    if (data) {
      return data
    }
  }

  pickSingleFieldMulter(fields: string[]) {
    return Multers.pickSingleFieldMulter(this.req, fields)
  }

  pickMultiFieldMulter(fields: string[]) {
    return Multers.pickMultiFieldMulter(this.req, fields)
  }
}

export default withState
