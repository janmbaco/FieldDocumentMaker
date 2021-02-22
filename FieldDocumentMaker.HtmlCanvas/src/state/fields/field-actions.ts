import { createAction } from '@reduxjs/toolkit'
import { FieldModel } from './field-model'

export const LoadFields = createAction<FieldModel[], 'LoadFields'>('LoadFields')
export const ChangeField = createAction<FieldModel, 'ChangeField'>('ChangeField')
