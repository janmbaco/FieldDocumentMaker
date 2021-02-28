import { AnyAction, createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { FieldModel } from './field-model'
import { LoadFields, ChangeFieldValue } from './field-actions'
import { IReducer } from '../reducer-interface'

const initialState: FieldModel[] = []
export class FieldReducer implements IReducer<FieldModel[]> {

  reducer: Reducer<FieldModel[], AnyAction>

  constructor() {
    this.reducer = createReducer(initialState, {
      [LoadFields.type]: (_, action: PayloadAction<FieldModel[]>) => this.Load(action.payload),
      [ChangeFieldValue.type]: (state, action: PayloadAction<FieldModel>) => {
        return state.map(field => field.bind === action.payload.bind ? this.ChangeFieldValue(field, action.payload.value) : field)
      }
    })
  }

  private Load(fields: FieldModel[]): FieldModel[] {
    return fields
  }

  private ChangeFieldValue(field: FieldModel, newValue: string): FieldModel {
    if (editorScriptManager) {
      return editorScriptManager.interceptFieldChange(field, newValue)
    } else {
      return { ...field, value: newValue }
    }
  }
}
