import 'reflect-metadata'
import './app.css'
import { Store } from '@reduxjs/toolkit'
import { AppState } from './state/app-state'
import { IStateManagement } from './state/state-management-interface'
import { DIContainer } from './di-container'
import { IEditorFactory } from './components/editor/editor-factory-interface'
import { LoadFields } from './state/fields/field-actions'
import { LoadZones } from './state/zones/zone-actions'
import { FieldModel } from './state/fields/field-model'
import { ZoneModel } from './state/zones/zone-model'

class App {
    static main(): void {
        const container = new DIContainer()

        container.registerFacade()

        const editor = container.resolve<IEditorFactory>('editorFactory').create()

        editor.setInElement(document.body)

        this.loadData(container.resolve<IStateManagement>('stateManagement').Store)

    }

    static async loadData(store: Store<AppState>): Promise<void> {

        let fields: FieldModel[]
        let zones: ZoneModel[]
        try {

            await cefSharp.bindObjectAsync('editorScriptManager')
            fields = JSON.parse(editorScriptManager.getFields())
            zones = JSON.parse(editorScriptManager.getZones())
        } catch {

            fields = JSON.parse('[{"label":"País","value":"España","style":"","bind":"Curriculum.Person.Direccion.Pais","type":"Text"},{"label":"Provincia","value":"Murica","style":"","bind":"Curriculum.Person.Direccion.Provincia","type":"Text"},{"label":"Ciudad","value":"Las Palas","style":"","bind":"Curriculum.Person.Direccion.Ciudad","type":"Text"},{"label":"Codigo Postal","value":"30.334","style":"","bind":"Curriculum.Person.Direccion.CodigoPostal","type":"Integer"},{"label":"Vía","value":"C/ Cementerio","style":"","bind":"Curriculum.Person.Direccion.Via","type":"Text"},{"label":"Número","value":"4","style":"","bind":"Curriculum.Person.Direccion.Numero","type":"Integer"},{"label":"Nombre","value":"José","style":"","bind":"Curriculum.Person.Nombre","type":"Text"},{"label":"Primer Apellido","value":"nose","style":"","bind":"Curriculum.Person.PrimerApellido","type":"Text"},{"label":"Segundo Apellido","value":"nose","style":"","bind":"Curriculum.Person.SegundoAPellido","type":"Text"},{"label":"Fecha de Inicio","value":"10/10/2020","style":"","bind":"Curriculum.ExperienciasLaborales.[0].FechaInicio","type":"Date"},{"label":"Fecha de Fin","value":"12/12/2020","style":"","bind":"Curriculum.ExperienciasLaborales.[0].FechaFin","type":"Date"},{"label":"Empresa","value":"La que sea","style":"","bind":"Curriculum.ExperienciasLaborales.[0].Empresa","type":"Text"},{"label":"Puesto","value":"El que sea","style":"","bind":"Curriculum.ExperienciasLaborales.[0].Puesto","type":"Text"}]')
            zones = JSON.parse('[{"id":"00000000-0000-0000-0000-000000000000","label":"Hola mundo!","color":"ligthgreen","isVisible":true,"elements":[{"id":"00000000-0000-0000-0000-000000000000","template":"<p>Hola <field bind=\'Curriculum.Person.Nombre\' style=\'\'></field>!<p>","isVisible":true}]}]')
        }

        store.dispatch(LoadFields(fields))
        store.dispatch(LoadZones(zones))
    }

}

setTimeout(() => {
    App.main()
})
