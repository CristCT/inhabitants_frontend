import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartamentosService } from '../services/departamentos/departamentos.service';
import { PisosService } from '../services/pisos/pisos.service';
import { PersonaService } from '../services/persona/persona.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  personaForm!: FormGroup;
  piso: any;
  departamento: any;
  personas: any;

  constructor(
    public fb: FormBuilder,
    public departamentosService: DepartamentosService,
    public pisosService: PisosService,
    public personaService: PersonaService
  ){

  }
  ngOnInit(): void {
    this.personaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      piso: ['', Validators.required],
      departamento: ['', Validators.required],
    });;
    this.pisosService.getAllPisos().subscribe(resp=>{
      this.piso = resp;
    },
    error => {console.log(error)}
    );
    this.personaService.getAllPersonas().subscribe(resp=>{
      this.personas = resp;
    },
    error => {console.log(error)}
    );
    this.personaForm.get('piso')?.valueChanges.subscribe(value=>{
      this.departamentosService.getAllDepartamentosByPiso(value.id).subscribe(resp=>{
        this.departamento = resp;
      },
      error => {console.log(error)}
      );
    });
  }
  guardar(): void {
    this.personaService.savePersona(this.personaForm.value).subscribe(resp=>{
      this.personaForm.reset();
      this.personas = this.personas.filter((persona: any) => persona.id !== resp.id);
      this.personas.push(resp);
    },
    error => {console.log(error)}
    );
  }
  eliminar(persona: any): void {
    this.personaService.deletePersona(persona.id).subscribe(resp=>{
      if (resp) {
        this.personas.pop(persona);
      }
      this.personaService.getAllPersonas().subscribe(resp=>{
        this.personas = resp;
      });
    },
    error => {console.log(error)}
    );
  }
  editar(persona: any): void {
    this.personaForm.setValue({
      id: persona.id,
      nombre: persona.nombre,
      apellido: persona.apellido,
      edad: persona.edad,
      piso: persona.piso,
      departamento: persona.departamento,
    });
  }
}
