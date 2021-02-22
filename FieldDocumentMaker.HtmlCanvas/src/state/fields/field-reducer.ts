import { AnyAction, createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { FieldModel } from './field-model'
import { LoadFields, ChangeField } from './field-actions'

const initialState: FieldModel[] = []
export class FieldReducer {

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
