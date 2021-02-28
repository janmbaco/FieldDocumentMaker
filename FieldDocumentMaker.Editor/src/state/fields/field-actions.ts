import { createAction } from '@reduxjs/toolkit'
import { FieldModel } from './field-model'

export const LoadFields = createAction<FieldModel[], 'LoadFields'>('LoadFields')
export const ChangeFieldValue = createAction<FieldModel, 'ChangeField'>('ChangeField')
