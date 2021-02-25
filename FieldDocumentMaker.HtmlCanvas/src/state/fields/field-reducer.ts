import { AnyAction, createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { FieldModel } from './field-model'
import { LoadFields, ChangeField } from './field-actions'
import { IReducer } from '../reducer-interface'

const initialState: FieldModel[] = []
export class FieldReducer implements IReducer<FieldModel[]> {

  reducer: Reducer<FieldModel[], AnyAction>

  constructor() {
    this.reducer = createReducer(initialState, {
      [LoadFields.type]: (_, action: PayloadAction<FieldModel[]>) => action.payload,
      [ChangeField.type]: (state, action: PayloadAction<FieldModel>) => {
        return state.map(field => field.bind === action.payload.bind ? { ...field, maskedValue: action.payload.value } : field)
      }
    })
  }
}
