import { createAction } from '@reduxjs/toolkit'

export const ToogleLoaded = createAction<boolean, 'ToogleLoaded'>('ToogleLoaded')
