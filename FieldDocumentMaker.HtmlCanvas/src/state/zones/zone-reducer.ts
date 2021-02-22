import { AnyAction, createReducer, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { ParagraphModel } from '../paragraphs/paragraph-model'
import { ChangeParagraphZone, ModifyZoneColor, LoadZones, ModifyZoneLabel, ModifyZoneColorAndLabel } from './zone-actions'
import { ZoneColors, ZoneModel } from './zone-model'

const initialState: ZoneModel[] = []

export class ZoneReducer {

  reducer: Reducer<ZoneModel[], AnyAction>

  constructor() {
    this.reducer = createReducer(initialState, {
      [LoadZones.type]: (_, action: PayloadAction<ZoneModel[]>) => action.payload,
      [ModifyZoneColor.type]: (state, action: PayloadAction<{ id: string, color: ZoneColors }>) => state.map(zone => zone.id === action.payload.id ? { ...zone, color: action.payload.color } : zone),
      [ModifyZoneLabel.type]: (state, action: PayloadAction<{ id: string, label: string }>) => state.map(zone => zone.id === action.payload.id ? { ...zone, label: action.payload.label } : zone),
      [ModifyZoneColorAndLabel.type]: (state, action: PayloadAction<{ id: string, color: ZoneColors, label: string }>) => state.map(zone => zone.id === action.payload.id ? { ...zone, color: action.payload.color, label: action.payload.label } : zone),
      [ChangeParagraphZone.type]: (state, action: PayloadAction<{ zoneLabel: string, paragraph: ParagraphModel }>) => {
        return state.map(zone => {
          if (zone.label === action.payload.zoneLabel && zone.type === 'Paragraph') {
            return {
              ...zone, elements: (zone.elements as ParagraphModel[]).map(paragraph => {
                if (paragraph.id === action.payload.paragraph.id) {
                  return action.payload.paragraph
                } else {
                  return paragraph
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
