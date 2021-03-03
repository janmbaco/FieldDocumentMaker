import { createAction } from '@reduxjs/toolkit'
import { FieldModel } from './field-model'

export const LoadFields = createAction<FieldModel[], 'LoadFields'>('LoadFields')
export const ChangeFieldValue = createAction<{ field: FieldModel, newValue: string }, 'ChangeField'>('ChangeField')
