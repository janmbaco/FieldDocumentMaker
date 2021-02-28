import { createAction } from '@reduxjs/toolkit'
import { SubZoneModel } from '../subzones/subzone-model'
import { ZoneColors, ZoneModel } from './zone-model'

export const LoadZones = createAction<ZoneModel[], 'LoadZones'>('LoadZones')
export const ModifyZoneColor = createAction<{ id: string, color: ZoneColors }, 'ModifyZoneColor'>('ModifyZoneColor')
export const ModifyZoneLabel = createAction<{ id: string, label: string }, 'ModifyZoneLabel'>('ModifyZoneLabel')
export const ModifyZoneColorAndLabel = createAction<{ id: string, color: ZoneColors, label: string }, 'ModifyZoneColorAndLabel'>('ModifyZoneColorAndLabel')
export const ChangeSubZone = createAction<{ zoneLabel: string, subzone: SubZoneModel }, 'ChangeSubZone'>('ChangeSubZone')
