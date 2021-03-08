import 'reflect-metadata'
import './app.css'
import './extensions/document-extensions'
import './extensions/array-extensions'
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

        let fields = []
        let zones: ZoneModel[]
        try {

            await cefSharp.bindObjectAsync('editorScriptManager')
            fields = JSON.parse(editorScriptManager.getFields())
            zones = JSON.parse(editorScriptManager.getZones())

        } catch {
            // alert('volver a ejecutar!')
            //            fields.push({ base: { label: 'País', value: 'España', style: '', bind: 'Curriculum.Person.Direccion.Pais' }, type: 'Text', text: 'España' })
            //          fields.push({ base: { label: 'Fecha de Inicio', value: 'veinte de octubre de dos mil veinte', style: '', bind: 'Curriculum.ExperienciasLaborales.[0].FechaInicio' }, type: 'Date', date: new Date('2020-10-20T00:00:00.000Z').getTime(), minDate: new Date('2020-10-10T00:00:00.000Z').getTime(), maxDate: new Date('2020-10-10T00:00:00.000Z').getTime() })
            fields = JSON.parse(`[{"text":"España","base":{"label":"País","value":"España","style":"","bind":"Curriculum.Person.Direccion.Pais"},"type":"Text"},{"text":"Murica","base":{"label":"Provincia","value":"Murica","style":"","bind":"Curriculum.Person.Direccion.Provincia"},"type":"Text"},{"text":"Las Palas","base":{"label":"Ciudad","value":"Las Palas","style":"","bind":"Curriculum.Person.Direccion.Ciudad"},"type":"Text"},{"number":30334,"maxValue":0,"minValue":0,"base":{"label":"Codigo Postal","value":"30.334","style":"","bind":"Curriculum.Person.Direccion.CodigoPostal"},"type":"Integer"},{"text":"C/ Cementerio","base":{"label":"Vía","value":"C/ Cementerio","style":"","bind":"Curriculum.Person.Direccion.Via"},"type":"Text"},{"number":4,"maxValue":0,"minValue":0,"base":{"label":"Número","value":"4","style":"","bind":"Curriculum.Person.Direccion.Numero"},"type":"Integer"},{"text":"José","base":{"label":"Nombre","value":"José","style":"","bind":"Curriculum.Person.Nombre"},"type":"Text"},{"text":"nose","base":{"label":"Primer Apellido","value":"nose","style":"","bind":"Curriculum.Person.PrimerApellido"},"type":"Text"},{"text":"nose","base":{"label":"Segundo Apellido","value":"nose","style":"","bind":"Curriculum.Person.SegundoAPellido"},"type":"Text"},{"date":"2020-10-10T00:00:00","maxDate":"0001-01-01T00:00:00","minDate":"0001-01-01T00:00:00","base":{"label":"Fecha de Inicio","value":"10/10/2020","style":"","bind":"Curriculum.ExperienciasLaborales.[0].FechaInicio"},"type":"Date"},{"date":"2020-12-12T00:00:00","maxDate":"0001-01-01T00:00:00","minDate":"0001-01-01T00:00:00","base":{"label":"Fecha de Fin","value":"12/12/2020","style":"","bind":"Curriculum.ExperienciasLaborales.[0].FechaFin"},"type":"Date"},{"text":"La que sea","base":{"label":"Empresa","value":"La que sea","style":"","bind":"Curriculum.ExperienciasLaborales.[0].Empresa"},"type":"Text"},{"text":"El que sea","base":{"label":"Puesto","value":"El que sea","style":"","bind":"Curriculum.ExperienciasLaborales.[0].Puesto"},"type":"Text"}]`)
            zones = JSON.parse(`[{"id":"2582d0ff-959a-4c0d-a918-72baa16b9e34","label":"Información Personal","color":"ligthgreen","isVisible":true,"elements":[{"id":"fefc9c36-3cc0-49c2-be29-fd1b3f0064df","template":"<div><p><field bind='Curriculum.Person.Nombre' style=''></field><field bind='Curriculum.Person.PrimerApellido' style=''></field><field bind='Curriculum.Person.SegundoAPellido' style=''></field></p><p><field bind='Curriculum.Person.Direccion.Poblacion' style=''></field></p><p><field bind='Curriculum.Person.Direccion.Provincia' style=''></field></p><p><field bind='Curriculum.Person.Telefono' style=''></field> | <field bind='Curriculum.Person.Email' style=''></field></p><p>Amplia experiencia en análisis, diseño y programación de aplicaciones, especialmente bajo tecnología .Net</p></div>","isVisible":true}]},{"id":"ae7e590e-f255-4ccc-9d26-a39ea38453f6","label":"Competencias","color":"ligthgreen","isVisible":true,"elements":[{"id":"1b3be04b-7454-4c36-9925-7a72adf8e7ac","template":"<p>Competencias</p>","isVisible":true},{"id":"9dae0c4b-c500-48db-aad8-3a487570cdf7","template":"<p>Me dedico al análisis y desarrollo de aplicaciones, profesionalmente, desde 2006. Realizando la mayoría de los proyectos desde cero y estando presente en todo el ciclo de vida del software. El análisis orgánico y el diseño estructural es un mundo que me apasiona.</p>","isVisible":true},{"id":"460cd3b8-a2fb-47eb-ab9b-12e6c73e3651","template":"<p>Mi principal herramienta es Visual Studio con todo los que conlleva, aunque periféricamente también utilizo Elastic Search para generar índices, Kafka para gestionar colas, bases de datos MySQL, etc...</p>","isVisible":true}]},{"id":"bd91f49e-80c7-434b-9e08-41c2748c8aeb","label":"Experiencia Profesional","color":"ligthgreen","isVisible":true,"elements":[{"id":"30c3b248-7abc-4c32-aacc-2dc47ad35602","template":"<p>Experiencia Profesional</p>","isVisible":true},{"id":"9076d52e-6109-4cb1-ad84-d3b0ed94d667","template":"<p style='font-weight: bold;'><field bind='Curriculum.ExperienciasLaborales.[0].FechaInicio' style='font-weight: bold;'></field> - <field bind='Curriculum.ExperienciasLaborales.[0].Empresa' style='font-weight: bold;'></field></p>","isVisible":true},{"id":"7b1e83f7-551b-4a88-8d43-a8ed0f8e289c","template":"<p><field bind='Curriculum.ExperienciasLaborales.[0].Puesto' style=''></field></p>","isVisible":true}]}]`)
        }
        store.dispatch(LoadFields(fields))
        store.dispatch(LoadZones(zones))
    }

}

setTimeout(() => {
    App.main()
})
