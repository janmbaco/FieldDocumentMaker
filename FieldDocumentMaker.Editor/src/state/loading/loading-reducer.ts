import { AnyAction, createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { IReducer } from '../reducer-interface'
import { ToogleLoaded } from './loading-actions'

// tslint:disable-next-line: no-inferrable-types
const initialState: boolean = false

export class LoadingReducer implements IReducer<boolean>{

    reducer: Reducer<boolean, AnyAction>

    constructor() {
        this.reducer = createReducer(initialState, {
            [ToogleLoaded.type]: (_, action: PayloadAction<boolean>) => action.payload
        })
    }
}
