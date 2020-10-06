import random

musicos = []

class Banda():
  def agregarMusico(self, nombre):
    m = Musico()
    m.Persona(nombre)
    musicos

  def generarInstrumento():
    opc = random.randrange(3)
    i = Instrumento()
    if (opc == 1):
      i = Guitarra()
    elif(opc == 2):
      i = Bajo()
    else:
      i = Violin()   
  
  def presentarBanda:
    for(Musico musico : musicos):
      musico.presentar()
      



