import { AnyAction, Reducer } from '@reduxjs/toolkit'

export interface IReducer<TModel> {
    reducer: Reducer<TModel, AnyAction>
}
