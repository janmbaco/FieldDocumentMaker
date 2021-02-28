import { AnyAction, createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { IReducer } from '../reducer-interface'
import { SubZoneModel } from '../subzones/subzone-model'
import { ChangeSubZone, ModifyZoneColor, LoadZones, ModifyZoneLabel, ModifyZoneColorAndLabel } from './zone-actions'
import { ZoneColors, ZoneModel } from './zone-model'

const initialState: ZoneModel[] = []

export class ZoneReducer implements IReducer<ZoneModel[]> {

  reducer: Reducer<ZoneModel[], AnyAction>

  constructor() {
    this.reducer = createReducer(initialState, {
      [LoadZones.type]: (_, action: PayloadAction<ZoneModel[]>) => action.payload,
      [ModifyZoneColor.type]: (state, action: PayloadAction<{ id: string, color: ZoneColors }>) => state.map(zone => zone.id === action.payload.id ? { ...zone, color: action.payload.color } : zone),
      [ModifyZoneLabel.type]: (state, action: PayloadAction<{ id: string, label: string }>) => state.map(zone => zone.id === action.payload.id ? { ...zone, label: action.payload.label } : zone),
      [ModifyZoneColorAndLabel.type]: (state, action: PayloadAction<{ id: string, color: ZoneColors, label: string }>) => state.map(zone => zone.id === action.payload.id ? { ...zone, color: action.payload.color, label: action.payload.label } : zone),
      [ChangeSubZone.type]: (state, action: PayloadAction<{ zoneLabel: string, subzone: SubZoneModel }>) => {
        return state.map(zone => {
          if (zone.label === action.payload.zoneLabel) {
            return {
              ...zone, elements: zone.elements.map(subzone => {
                if (subzone.id === action.payload.subzone.id) {
                  return action.payload.subzone
                } else {
                  return subzone
                }
              })
            }
          } else {
            return zone
          }
        })
      }
    })
  }
}
